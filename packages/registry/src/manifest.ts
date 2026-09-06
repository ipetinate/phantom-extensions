import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fail, isRecord, requireAsset, requireString, type JsonObject, type JsonValue } from "./checks.ts";
import { quoted } from "./errors.ts";
import { validateInstall, type Install } from "./install.ts";

export const ID_PATTERN = /^[a-z0-9][a-z0-9._-]*$/;
export const VERSION_PATTERN = /^\d+\.\d+\.\d+$/;
export const LANGUAGE_ID_PATTERN = /^[a-z0-9_+-]+$/;
export const AGENT_ID_PATTERN = /^[a-z0-9_+-]+$/;
export const FORMATTER_ID_PATTERN = /^[a-z0-9_-]+$/;
export const CATEGORIES = ["script", "compiled", "markup", "frontendFramework", "styles", "data", "infrastructure"] as const;
export const CONTRIBUTION_KINDS = ["languages", "formatters", "themes", "iconThemes", "agents"] as const;
export const SYNTAX_KINDS = ["string", "number", "type", "function", "attribute"] as const;
export const MAX_MANIFEST_BYTES = 512 * 1024;

export type ContributionKind = (typeof CONTRIBUTION_KINDS)[number];

export interface Manifest {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly publisher: string;
  readonly description?: string;
  readonly homepage?: string;
  readonly phantom?: string;
  readonly contributes: JsonObject;
}

export interface Tool {
  kind: "server" | "formatter" | "agent";
  name: string;
  command: string;
  installHint: string | null;
  install: Install | null;
}

export function entriesOf(manifest: Manifest, kind: ContributionKind): JsonObject[] {
  const entries = manifest.contributes[kind];
  if (!Array.isArray(entries)) return [];
  return entries.filter(isRecord);
}

function rawEntries(contributes: JsonObject, kind: ContributionKind): JsonValue[] {
  const entries = contributes[kind];
  return Array.isArray(entries) ? entries : [];
}

function validateLanguage(directory: string, language: JsonValue): void {
  if (!isRecord(language)) fail(directory, "each language must be an object");
  const languageId = requireString(directory, language, "languageId", LANGUAGE_ID_PATTERN);
  requireString(directory, language, "name");
  const extensions = language["extensions"];
  if (!Array.isArray(extensions) || extensions.length === 0) {
    fail(directory, `language ${quoted(languageId)} needs at least one file extension`);
  }
  for (const extension of extensions) {
    if (typeof extension !== "string" || !LANGUAGE_ID_PATTERN.test(extension)) {
      fail(directory, `bad file extension ${quoted(extension)}`);
    }
  }
  const category = language["category"];
  if (category !== undefined && !(CATEGORIES as readonly JsonValue[]).includes(category)) {
    fail(directory, `unknown category ${quoted(category)}`);
  }
  if (language["icon"] !== undefined) requireAsset(directory, language["icon"]);
  const block = language["blockComment"];
  if (block !== undefined && block !== null) {
    if (!isRecord(block) || !block["open"] || !block["close"]) fail(directory, "blockComment needs 'open' and 'close'");
  }
  const syntax = language["syntax"];
  if (syntax !== undefined && syntax !== null) {
    if (!isRecord(syntax)) fail(directory, "syntax must be an object");
    for (const [kind, pattern] of Object.entries(syntax)) {
      if (!(SYNTAX_KINDS as readonly string[]).includes(kind)) fail(directory, `syntax has no token kind ${quoted(kind)}`);
      if (typeof pattern !== "string" || !pattern) fail(directory, `syntax.${kind} must be a non-empty string`);
      if (pattern.startsWith("preset:")) continue;
      try {
        new RegExp(pattern);
      } catch (error) {
        fail(directory, `syntax.${kind} is not a valid pattern: ${error instanceof Error ? error.message : String(error)}`);
      }
      if (/(?<!\\)\\[1-9]/.test(pattern)) fail(directory, `syntax.${kind} uses a backreference`);
    }
  }
  const server = language["server"];
  if (server !== undefined && server !== null) {
    if (!isRecord(server)) fail(directory, "server must be an object");
    requireString(directory, server, "command");
    validateInstall(directory, `language ${quoted(languageId)} server`, server["install"]);
  }
}

function validateFormatter(directory: string, formatter: JsonValue): void {
  if (!isRecord(formatter)) fail(directory, "each formatter must be an object");
  const id = requireString(directory, formatter, "id", FORMATTER_ID_PATTERN);
  requireString(directory, formatter, "name");
  requireString(directory, formatter, "command");
  const extensions = formatter["extensions"];
  if (!Array.isArray(extensions) || extensions.length === 0) {
    fail(directory, `formatter ${quoted(id)} needs at least one file extension`);
  }
  validateInstall(directory, `formatter ${quoted(id)}`, formatter["install"]);
}

function validateAgent(directory: string, agent: JsonValue): void {
  if (!isRecord(agent)) fail(directory, "each agent must be an object");
  const agentId = requireString(directory, agent, "agentId", AGENT_ID_PATTERN);
  requireString(directory, agent, "name");
  requireString(directory, agent, "command");
  if (agent["icon"] !== undefined) requireAsset(directory, agent["icon"]);
  validateInstall(directory, `agent ${quoted(agentId)}`, agent["install"]);
}

function validatePathed(directory: string, kind: ContributionKind, entry: JsonValue): void {
  if (!isRecord(entry)) fail(directory, `each entry in ${kind} must be an object`);
  requireString(directory, entry, "name");
  requireAsset(directory, entry["path"]);
}

export function manifestIcons(manifest: Manifest): string[] {
  return [...entriesOf(manifest, "languages"), ...entriesOf(manifest, "agents")]
    .map((entry) => entry["icon"])
    .filter((icon): icon is string => typeof icon === "string");
}

export function referencedPaths(manifest: Manifest): Set<string> {
  const paths = new Set<string>();
  for (const language of entriesOf(manifest, "languages")) {
    if (typeof language["icon"] === "string") paths.add(language["icon"]);
  }
  for (const kind of ["themes", "iconThemes"] as const) {
    for (const entry of entriesOf(manifest, kind)) {
      if (typeof entry["path"] === "string") paths.add(entry["path"]);
    }
  }
  for (const agent of entriesOf(manifest, "agents")) {
    if (typeof agent["icon"] === "string") paths.add(agent["icon"]);
    const hooks = agent["hooks"];
    if (isRecord(hooks) && typeof hooks["template"] === "string") paths.add(hooks["template"]);
  }
  return new Set([...paths].map((entry) => entry.split(path.sep).join("/")));
}

function toolName(entry: JsonObject, fallback: string): string {
  return typeof entry["name"] === "string" ? entry["name"] : fallback;
}

function installHintOf(entry: JsonObject): string | null {
  return typeof entry["installHint"] === "string" ? entry["installHint"] : null;
}

export function manifestTools(directory: string, manifest: Manifest): Tool[] {
  const tools: Tool[] = [];
  for (const language of entriesOf(manifest, "languages")) {
    const server = language["server"];
    if (!isRecord(server) || typeof server["command"] !== "string") continue;
    tools.push({
      kind: "server",
      name: toolName(language, server["command"]),
      command: server["command"],
      installHint: installHintOf(server),
      install: validateInstall(directory, "server", server["install"]),
    });
  }
  for (const formatter of entriesOf(manifest, "formatters")) {
    if (typeof formatter["command"] !== "string") continue;
    tools.push({
      kind: "formatter",
      name: toolName(formatter, formatter["command"]),
      command: formatter["command"],
      installHint: installHintOf(formatter),
      install: validateInstall(directory, "formatter", formatter["install"]),
    });
  }
  for (const agent of entriesOf(manifest, "agents")) {
    if (typeof agent["command"] !== "string") continue;
    tools.push({
      kind: "agent",
      name: toolName(agent, agent["command"]),
      command: agent["command"],
      installHint: installHintOf(agent),
      install: validateInstall(directory, "agent", agent["install"]),
    });
  }
  return tools;
}

export function loadManifest(directory: string): Manifest {
  const file = path.join(directory, "extension.json");
  let size: number;
  try {
    const stats = statSync(file);
    if (!stats.isFile()) fail(directory, "no extension.json");
    size = stats.size;
  } catch (error) {
    if (error instanceof Error && error.name === "ManifestError") throw error;
    return fail(directory, "no extension.json");
  }
  if (size > MAX_MANIFEST_BYTES) fail(directory, `extension.json is larger than ${MAX_MANIFEST_BYTES} bytes`);
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    fail(directory, `extension.json is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (!isRecord(parsed)) fail(directory, "extension.json must hold an object");
  if (parsed["schemaVersion"] !== 1) fail(directory, "schemaVersion must be 1");
  requireString(directory, parsed, "id", ID_PATTERN);
  requireString(directory, parsed, "name");
  requireString(directory, parsed, "version", VERSION_PATTERN);
  requireString(directory, parsed, "publisher");
  if (parsed["phantom"] !== undefined) requireString(directory, parsed, "phantom", VERSION_PATTERN);
  const contributes = parsed["contributes"];
  if (!isRecord(contributes)) fail(directory, `contributes must hold at least one of ${CONTRIBUTION_KINDS.join(", ")}`);
  for (const kind of CONTRIBUTION_KINDS) {
    const entries = contributes[kind];
    if (entries !== undefined && !Array.isArray(entries)) fail(directory, `contributes.${kind} must be an array`);
  }
  if (!CONTRIBUTION_KINDS.some((kind) => rawEntries(contributes, kind).length > 0)) {
    fail(directory, `contributes must hold at least one of ${CONTRIBUTION_KINDS.join(", ")}`);
  }
  for (const language of rawEntries(contributes, "languages")) validateLanguage(directory, language);
  for (const formatter of rawEntries(contributes, "formatters")) validateFormatter(directory, formatter);
  for (const kind of ["themes", "iconThemes"] as const) {
    for (const entry of rawEntries(contributes, kind)) validatePathed(directory, kind, entry);
  }
  for (const agent of rawEntries(contributes, "agents")) validateAgent(directory, agent);
  return parsed as unknown as Manifest;
}
