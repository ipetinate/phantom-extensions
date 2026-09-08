import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { CATEGORIES } from "./categories.ts";
import { fail, isRecord, requireAsset, requireString, type JsonObject, type JsonValue } from "./checks.ts";
import { quoted } from "./errors.ts";
import { grammarEntries, validateGrammars, type GrammarEntry } from "./grammars.ts";
import { validateInstall, type Install } from "./install.ts";
import { MAX_BRANCHES, MAX_PATTERNS_PER_LANGUAGE, MAX_SOURCE_LENGTH, fileNamePattern } from "./patterns.ts";
import { validateProjectMarkers, validateProjectPath } from "./projectPaths.ts";
import { validateServerBlock, validateServers } from "./servers.ts";
import { validateViews, viewPaths } from "./views.ts";

export const ID_PATTERN = /^[a-z0-9][a-z0-9._-]*$/;
export const VERSION_PATTERN = /^\d+\.\d+\.\d+$/;
export const LANGUAGE_ID_PATTERN = /^[a-z0-9_+-]+$/;
export const AGENT_ID_PATTERN = /^[a-z0-9_+-]+$/;
export const FORMATTER_ID_PATTERN = /^[a-z0-9_-]+$/;
export const CONTRIBUTION_KINDS = ["languages", "servers", "formatters", "themes", "iconThemes", "grammars", "agents", "views"] as const;
export const RETIRED_LANGUAGE_KEYS = ["syntax", "keywords"] as const;

/**
 * Keys a VS Code extension spells differently, and the key here that means
 * what the author meant. Refused by name rather than ignored: Phantom would
 * read nothing, and the extension would publish claiming files it never gets.
 */
export const FOREIGN_LANGUAGE_KEYS: Readonly<Record<string, string>> = { filenamePatterns: "fileNamePatterns" };
export const WORKING_DIRECTORIES = ["marker", "file", "workspace"] as const;
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
  readonly dependencies?: string[];
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

/**
 * Every rule here is Phantom's rule, and a manifest that breaks one is a
 * manifest whose pattern Phantom silently drops. Each message names the way
 * to write what the author meant instead.
 */
function validateFileNamePatterns(directory: string, languageId: string, language: JsonObject): void {
  const subject = `language ${quoted(languageId)}`;
  for (const [foreign, ours] of Object.entries(FOREIGN_LANGUAGE_KEYS)) {
    if (language[foreign] !== undefined) {
      fail(directory, `${subject} carries ${quoted(foreign)}, which VS Code reads and Phantom does not; spell it ${quoted(ours)}`);
    }
  }

  const patterns = language["fileNamePatterns"];
  if (patterns === undefined) return;
  if (!Array.isArray(patterns)) fail(directory, `${subject}: fileNamePatterns must be an array of globs`);
  if (patterns.length > MAX_PATTERNS_PER_LANGUAGE) {
    fail(directory, `${subject} declares ${patterns.length} file name patterns, more than the ${MAX_PATTERNS_PER_LANGUAGE} Phantom reads`);
  }

  const seen = new Set<string>();
  for (const pattern of patterns) {
    if (typeof pattern !== "string") fail(directory, `${subject} has a file name pattern that is not a string: ${quoted(pattern)}`);
    const compiled = fileNamePattern(pattern);
    if (compiled === null) {
      fail(
        directory,
        `${subject} has a file name pattern Phantom drops: ${quoted(pattern)}. ` +
          `A pattern matches a file's name and never its path, so it holds no '/' and no '\\'; it is at most ${MAX_SOURCE_LENGTH} characters; ` +
          "and the dialect is '*', '**', '?' and '{a,b}', so use a brace list rather than '[abc]', do not nest one, and keep what it " +
          `expands to under ${MAX_BRANCHES} alternatives.`,
      );
    }
    if (seen.has(compiled.source)) fail(directory, `${subject} declares the file name pattern ${quoted(compiled.source)} twice`);
    seen.add(compiled.source);
  }
}

function validateLanguage(directory: string, language: JsonValue): string {
  if (!isRecord(language)) fail(directory, "each language must be an object");
  const languageId = requireString(directory, language, "languageId", LANGUAGE_ID_PATTERN);
  for (const key of RETIRED_LANGUAGE_KEYS) {
    if (language[key] !== undefined) {
      fail(directory, `language ${quoted(languageId)} carries ${quoted(key)}, which a grammar replaced; ship one under contributes.grammars`);
    }
  }
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
  validateFileNamePatterns(directory, languageId, language);
  const category = language["category"];
  if (category !== undefined && !(CATEGORIES as readonly JsonValue[]).includes(category)) {
    fail(directory, `unknown category ${quoted(category)}`);
  }
  if (language["icon"] !== undefined) requireAsset(directory, language["icon"]);
  const block = language["blockComment"];
  if (block !== undefined && block !== null) {
    if (!isRecord(block) || !block["open"] || !block["close"]) fail(directory, "blockComment needs 'open' and 'close'");
  }
  const server = language["server"];
  if (server !== undefined && server !== null) {
    if (!isRecord(server)) fail(directory, "server must be an object");
    validateServerBlock(directory, `language ${quoted(languageId)} server`, server);
  }
  return languageId;
}

function validateDependencies(directory: string, id: string, raw: JsonValue | undefined): string[] {
  if (raw === undefined) return [];
  if (!Array.isArray(raw)) fail(directory, "dependencies must be an array of extension ids");
  const seen = new Set<string>();
  for (const dependency of raw) {
    if (typeof dependency !== "string" || !ID_PATTERN.test(dependency)) fail(directory, `bad dependency ${quoted(dependency)}`);
    if (dependency === id) fail(directory, "an extension cannot depend on itself");
    if (seen.has(dependency)) fail(directory, `dependency ${quoted(dependency)} is listed twice`);
    seen.add(dependency);
  }
  return [...seen];
}

export function languageIdsOf(manifest: Manifest): Set<string> {
  return new Set(
    entriesOf(manifest, "languages")
      .map((language) => language["languageId"])
      .filter((languageId): languageId is string => typeof languageId === "string"),
  );
}

export function manifestGrammars(directory: string, manifest: Manifest): GrammarEntry[] {
  return grammarEntries(directory, rawEntries(manifest.contributes, "grammars"), languageIdsOf(manifest));
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
  for (const extension of extensions) {
    if (typeof extension !== "string" || !LANGUAGE_ID_PATTERN.test(extension)) {
      fail(directory, `formatter ${quoted(id)} has a bad file extension ${quoted(extension)}`);
    }
  }
  if (formatter["projectMarkers"] !== undefined) validateProjectMarkers(directory, `formatter ${quoted(id)}`, formatter["projectMarkers"], true);
  if (formatter["localBinary"] !== undefined) validateProjectPath(directory, `formatter ${quoted(id)}`, "localBinary", formatter["localBinary"]);
  const workingDirectory = formatter["workingDirectory"];
  if (workingDirectory !== undefined && !(WORKING_DIRECTORIES as readonly JsonValue[]).includes(workingDirectory)) {
    fail(directory, `formatter ${quoted(id)}: workingDirectory must be one of ${WORKING_DIRECTORIES.join(", ")}`);
  }
  if (workingDirectory === "marker" && formatter["projectMarkers"] === undefined) {
    fail(directory, `formatter ${quoted(id)}: workingDirectory "marker" needs projectMarkers to find one`);
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

export function manifestIconThemes(manifest: Manifest): string[] {
  return entriesOf(manifest, "iconThemes")
    .map((entry) => entry["path"])
    .filter((themePath): themePath is string => typeof themePath === "string")
    .map((themePath) => themePath.split(path.sep).join("/").replace(/\/+$/, ""));
}

export function referencedPaths(manifest: Manifest): Set<string> {
  const paths = new Set<string>();
  for (const language of entriesOf(manifest, "languages")) {
    if (typeof language["icon"] === "string") paths.add(language["icon"]);
  }
  for (const kind of ["themes", "iconThemes", "grammars"] as const) {
    for (const entry of entriesOf(manifest, kind)) {
      if (typeof entry["path"] === "string") paths.add(entry["path"]);
    }
  }
  for (const agent of entriesOf(manifest, "agents")) {
    if (typeof agent["icon"] === "string") paths.add(agent["icon"]);
    const hooks = agent["hooks"];
    if (isRecord(hooks) && typeof hooks["template"] === "string") paths.add(hooks["template"]);
  }
  for (const viewPath of viewPaths(entriesOf(manifest, "views"))) paths.add(viewPath);
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
  for (const server of entriesOf(manifest, "servers")) {
    if (typeof server["command"] !== "string") continue;
    tools.push({
      kind: "server",
      name: toolName(server, server["command"]),
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

/// Refuses a package whose name is several subjects joined together.
///
/// An extension that claims more than one language is fine when the
/// languages are one subject: Dockerfile and Compose are both Docker, and
/// `Dockerfiles` is a name somebody would search for. What is refused is the
/// package that admits it is a list — `Nix, CMake and Bruno`,
/// `PlantUML and Jinja2` — because nobody looking for CMake looks for that,
/// and installing it to read a `CMakeLists.txt` also claims `.nix` and
/// `.bru`.
///
/// The test is the name and the directory, not a judgement about the
/// languages: a conjunction or a comma in the name of a multi-language
/// package, or a directory whose segments are its own language ids. A single
/// subject needs neither.
const JOINED_NAME = /,|\s(?:and|&||e|y)\s/i;

function validateSubject(directory: string, name: string, languageIds: Set<string>): void {
  if (languageIds.size < 2) return;
  if (JOINED_NAME.test(name)) {
    fail(
      directory,
      `name ${quoted(name)} joins several subjects, and the extension claims ${languageIds.size} languages: ` +
        "publish one extension per subject, or give the package the one name they share, the way Dockerfiles does"
    );
  }
  const segments = path.basename(directory).split("-").filter((segment) => segment.length > 0);
  if (segments.length < 2) return;
  const ids = new Set([...languageIds].map((id) => id.toLowerCase()));
  if (segments.every((segment) => ids.has(segment))) {
    fail(
      directory,
      `directory ${quoted(path.basename(directory))} is its own language ids joined together: ` +
        "publish one extension per subject, or give the package the one name they share"
    );
  }
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
  const id = requireString(directory, parsed, "id", ID_PATTERN);
  const name = requireString(directory, parsed, "name");
  requireString(directory, parsed, "version", VERSION_PATTERN);
  requireString(directory, parsed, "publisher");
  if (parsed["phantom"] !== undefined) requireString(directory, parsed, "phantom", VERSION_PATTERN);
  validateDependencies(directory, id, parsed["dependencies"]);
  const contributes = parsed["contributes"];
  if (!isRecord(contributes)) fail(directory, `contributes must hold at least one of ${CONTRIBUTION_KINDS.join(", ")}`);
  for (const kind of CONTRIBUTION_KINDS) {
    const entries = contributes[kind];
    if (entries !== undefined && !Array.isArray(entries)) fail(directory, `contributes.${kind} must be an array`);
  }
  if (!CONTRIBUTION_KINDS.some((kind) => rawEntries(contributes, kind).length > 0)) {
    fail(directory, `contributes must hold at least one of ${CONTRIBUTION_KINDS.join(", ")}`);
  }
  const languageIds = new Set(rawEntries(contributes, "languages").map((language) => validateLanguage(directory, language)));
  validateServers(directory, rawEntries(contributes, "servers"));
  for (const formatter of rawEntries(contributes, "formatters")) validateFormatter(directory, formatter);
  for (const kind of ["themes", "iconThemes"] as const) {
    for (const entry of rawEntries(contributes, kind)) validatePathed(directory, kind, entry);
  }
  validateSubject(directory, name, languageIds);
  validateGrammars(directory, rawEntries(contributes, "grammars"), languageIds);
  for (const agent of rawEntries(contributes, "agents")) validateAgent(directory, agent);
  validateViews(directory, rawEntries(contributes, "views"));
  return parsed as unknown as Manifest;
}
