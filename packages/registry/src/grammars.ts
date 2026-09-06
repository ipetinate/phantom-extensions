import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fail, isHttpsURL, isRecord, requireAsset, requireString, type JsonObject, type JsonValue } from "./checks.ts";
import { quoted } from "./errors.ts";
import { compileError } from "./oniguruma.ts";

export const SCOPE_NAME_PATTERN = /^[A-Za-z0-9_+-]+(\.[A-Za-z0-9_+-]+)+$/;
export const MAX_SCOPE_NAME_LENGTH = 128;
export const MAX_GRAMMARS = 32;
export const MAX_GRAMMAR_BYTES = 4 * 1024 * 1024;
export const MAX_EMBEDDED_LANGUAGES = 64;
export const MAX_INJECT_TO = 16;
export const MAX_LICENSE_LENGTH = 64;

const PATTERN_KEYS = ["match", "begin", "end", "while"] as const;
const CAPTURE_KEYS = ["captures", "beginCaptures", "endCaptures", "whileCaptures"] as const;
const CLOSING_KEYS: ReadonlySet<string> = new Set(["end", "while"]);
const LANGUAGE_ID_PATTERN = /^[a-z0-9_+-]+$/;

export interface GrammarInclude {
  scope: string;
  rulePath: string;
}

export interface GrammarEntry {
  scopeName: string;
  path: string;
  languageId: string | null;
  license: string;
  grammarSource: string;
  embeddedLanguages: Record<string, string>;
  injectTo: string[];
  includes: GrammarInclude[];
}

export function isScopeName(value: unknown): value is string {
  return typeof value === "string" && value.length <= MAX_SCOPE_NAME_LENGTH && SCOPE_NAME_PATTERN.test(value);
}

function requireScopeName(directory: string, value: JsonValue | undefined, what: string): string {
  if (!isScopeName(value)) fail(directory, `${what} must be a dotted scope name such as source.lua: ${quoted(value)}`);
  return value;
}

interface Rule {
  kind: string;
  text: string;
  rulePath: string;
}

function* rulesIn(node: JsonValue | undefined, rulePath: string): Generator<Rule> {
  if (Array.isArray(node)) {
    for (let index = 0; index < node.length; index += 1) yield* rulesIn(node[index], `${rulePath}[${index}]`);
    return;
  }
  if (!isRecord(node)) return;
  for (const key of PATTERN_KEYS) {
    if (typeof node[key] === "string") yield { kind: key, text: node[key], rulePath: `${rulePath}.${key}` };
  }
  if (typeof node["include"] === "string") yield { kind: "include", text: node["include"], rulePath: `${rulePath}.include` };
  yield* rulesIn(node["patterns"], `${rulePath}.patterns`);
  for (const key of CAPTURE_KEYS) {
    const captures = node[key];
    if (!isRecord(captures)) continue;
    for (const [group, capture] of Object.entries(captures)) yield* rulesIn(capture, `${rulePath}.${key}.${group}`);
  }
}

function* rulesOf(grammar: JsonObject): Generator<Rule> {
  yield* rulesIn(grammar["patterns"], "patterns");
  const repository = grammar["repository"];
  if (isRecord(repository)) {
    for (const [key, rule] of Object.entries(repository)) yield* rulesIn(rule, `repository.${key}`);
  }
  const injections = grammar["injections"];
  if (isRecord(injections)) {
    for (const [selector, injection] of Object.entries(injections)) {
      if (isRecord(injection)) yield* rulesIn(injection["patterns"], `injections[${JSON.stringify(selector)}].patterns`);
    }
  }
}

export function withoutBackReferences(pattern: string): string {
  let result = "";
  let index = 0;
  while (index < pattern.length) {
    const character = pattern[index] as string;
    if (character !== "\\") {
      result += character;
      index += 1;
      continue;
    }
    const next = pattern[index + 1];
    if (next === undefined) {
      result += character;
      break;
    }
    if (next < "0" || next > "9") {
      result += character + next;
      index += 2;
      continue;
    }
    let cursor = index + 1;
    while (cursor < pattern.length && (pattern[cursor] as string) >= "0" && (pattern[cursor] as string) <= "9") cursor += 1;
    result += "\\x{FFFF}";
    index = cursor;
  }
  return result;
}

function includeTarget(directory: string, file: string, rule: Rule): GrammarInclude | null {
  const reference = rule.text;
  if (reference === "$self" || reference === "$base") return null;
  if (reference.startsWith("#")) {
    if (reference.length === 1) fail(directory, `${file}: ${rule.rulePath} includes nothing`);
    return null;
  }
  const [scope, key, ...rest] = reference.split("#");
  if (!isScopeName(scope) || rest.length > 0 || key === "") {
    fail(directory, `${file}: ${rule.rulePath} must include #rule, $self, $base, a scope or scope#rule: ${quoted(reference)}`);
  }
  return { scope, rulePath: rule.rulePath };
}

function readGrammarFile(directory: string, relative: string): JsonObject {
  const file = path.join(directory, relative);
  const size = statSync(file).size;
  if (size > MAX_GRAMMAR_BYTES) fail(directory, `${relative} is larger than ${MAX_GRAMMAR_BYTES} bytes`);
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    fail(directory, `${relative} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (!isRecord(parsed)) fail(directory, `${relative} must hold a grammar object`);
  return parsed;
}

function grammarPath(directory: string, entry: JsonObject): string {
  const relative = entry["path"];
  requireAsset(directory, relative);
  const file = relative as string;
  if (!file.toLowerCase().endsWith(".json")) fail(directory, `grammar path must name a .json file: ${quoted(file)}`);
  return file;
}

function embeddedLanguagesOf(directory: string, file: string, raw: JsonValue | undefined): Record<string, string> {
  if (raw === undefined || raw === null) return {};
  if (!isRecord(raw)) fail(directory, `${file}: embeddedLanguages must map scope names to language ids`);
  const entries = Object.entries(raw);
  if (entries.length > MAX_EMBEDDED_LANGUAGES) fail(directory, `${file}: more than ${MAX_EMBEDDED_LANGUAGES} embeddedLanguages`);
  const result: Record<string, string> = {};
  for (const [scope, languageId] of entries) {
    if (!isScopeName(scope)) fail(directory, `${file}: embeddedLanguages key must be a scope name: ${quoted(scope)}`);
    if (typeof languageId !== "string" || !LANGUAGE_ID_PATTERN.test(languageId)) {
      fail(directory, `${file}: embeddedLanguages.${scope} must be a language id: ${quoted(languageId)}`);
    }
    result[scope] = languageId;
  }
  return result;
}

function injectToOf(directory: string, file: string, raw: JsonValue | undefined): string[] {
  if (raw === undefined || raw === null) return [];
  if (!Array.isArray(raw)) fail(directory, `${file}: injectTo must be an array of scope names`);
  if (raw.length > MAX_INJECT_TO) fail(directory, `${file}: more than ${MAX_INJECT_TO} injectTo scopes`);
  return raw.map((scope) => requireScopeName(directory, scope, `${file}: an injectTo entry`));
}

function collectIncludes(directory: string, file: string, grammar: JsonObject, compile: boolean): GrammarInclude[] {
  const includes: GrammarInclude[] = [];
  for (const rule of rulesOf(grammar)) {
    if (rule.kind === "include") {
      const target = includeTarget(directory, file, rule);
      if (target !== null) includes.push(target);
      continue;
    }
    if (!compile) continue;
    const pattern = CLOSING_KEYS.has(rule.kind) ? withoutBackReferences(rule.text) : rule.text;
    const error = compileError(pattern);
    if (error !== null) fail(directory, `${file}: ${rule.rulePath} does not compile: ${error}`);
  }
  return includes;
}

function readEntry(directory: string, raw: JsonValue, languageIds: ReadonlySet<string>, compile: boolean): GrammarEntry {
  if (!isRecord(raw)) fail(directory, "each grammar must be an object");
  const scopeName = requireScopeName(directory, raw["scopeName"], "a grammar's scopeName");
  const file = grammarPath(directory, raw);
  const license = requireString(directory, raw, "license");
  if (license.length > MAX_LICENSE_LENGTH) fail(directory, `${file}: license is longer than ${MAX_LICENSE_LENGTH} characters`);
  const grammarSource = requireString(directory, raw, "grammarSource");
  if (!isHttpsURL(grammarSource)) fail(directory, `${file}: grammarSource must be an https URL: ${quoted(grammarSource)}`);
  const languageId = raw["languageId"];
  if (languageId !== undefined && languageId !== null) {
    if (typeof languageId !== "string" || !LANGUAGE_ID_PATTERN.test(languageId)) {
      fail(directory, `${file}: languageId must be a language id: ${quoted(languageId)}`);
    }
    if (!languageIds.has(languageId)) {
      fail(directory, `${file}: languageId ${quoted(languageId)} is not a language this extension contributes`);
    }
  }
  const grammar = readGrammarFile(directory, file);
  if (grammar["scopeName"] !== scopeName) {
    fail(directory, `${file} declares scopeName ${quoted(grammar["scopeName"])}, the manifest says ${quoted(scopeName)}`);
  }
  return {
    scopeName,
    path: file,
    languageId: typeof languageId === "string" ? languageId : null,
    license,
    grammarSource,
    embeddedLanguages: embeddedLanguagesOf(directory, file, raw["embeddedLanguages"]),
    injectTo: injectToOf(directory, file, raw["injectTo"]),
    includes: collectIncludes(directory, file, grammar, compile),
  };
}

function readEntries(directory: string, raw: JsonValue[], languageIds: ReadonlySet<string>, compile: boolean): GrammarEntry[] {
  if (raw.length > MAX_GRAMMARS) fail(directory, `more than ${MAX_GRAMMARS} grammars`);
  const seen = new Set<string>();
  const entries = raw.map((entry) => readEntry(directory, entry, languageIds, compile));
  for (const entry of entries) {
    if (seen.has(entry.scopeName)) fail(directory, `two grammars claim the scope ${quoted(entry.scopeName)}`);
    seen.add(entry.scopeName);
  }
  return entries;
}

export function validateGrammars(directory: string, raw: JsonValue[], languageIds: ReadonlySet<string>): GrammarEntry[] {
  return readEntries(directory, raw, languageIds, true);
}

export function grammarEntries(directory: string, raw: JsonValue[], languageIds: ReadonlySet<string>): GrammarEntry[] {
  return readEntries(directory, raw, languageIds, false);
}

export interface GrammarOwner {
  directory: string;
  id: string;
  dependencies: readonly string[];
  grammars: readonly GrammarEntry[];
}

function providedBy(providers: readonly string[]): string {
  if (providers.length === 1) return `which ${providers[0]} provides; add it to dependencies`;
  const listed = `${providers.slice(0, -1).join(", ")} and ${providers[providers.length - 1]}`;
  return `which ${listed} provide; add one of them to dependencies`;
}

export function checkGrammarDependencies(owners: readonly GrammarOwner[]): void {
  const extensions = new Set(owners.map((owner) => owner.id));
  const providersOfScope = new Map<string, string[]>();
  for (const owner of owners) {
    for (const grammar of owner.grammars) {
      const providers = providersOfScope.get(grammar.scopeName);
      if (providers === undefined) providersOfScope.set(grammar.scopeName, [owner.id]);
      else if (!providers.includes(owner.id)) providers.push(owner.id);
    }
  }
  for (const owner of owners) {
    for (const dependency of owner.dependencies) {
      if (!extensions.has(dependency)) fail(owner.directory, `dependency ${quoted(dependency)} is not an extension in this registry`);
    }
    const declared = new Set(owner.dependencies);
    for (const grammar of owner.grammars) {
      for (const include of grammar.includes) {
        const providers = providersOfScope.get(include.scope);
        if (providers === undefined) continue;
        if (providers.some((provider) => provider === owner.id || declared.has(provider))) continue;
        fail(owner.directory, `${grammar.path}: ${include.rulePath} includes ${quoted(include.scope)}, ${providedBy(providers)}`);
      }
    }
  }
}
