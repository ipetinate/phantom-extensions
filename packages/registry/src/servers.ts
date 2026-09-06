import { fail, isHttpsURL, isRecord, requireString, type JsonObject, type JsonValue } from "./checks.ts";
import { quoted } from "./errors.ts";
import { validateInstall } from "./install.ts";
import { MAX_PROJECT_MARKERS, validateProjectPath } from "./projectPaths.ts";

export const SERVER_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const RESOLVER_KINDS = ["typescriptSDKArgument", "typescriptPluginHost"] as const;
export const PLUGIN_HOST_KEYS = ["plugin", "languages"] as const;
export const MAX_SERVER_LANGUAGE_IDS = 32;
export const MIN_JAVA_FEATURE_VERSION = 8;
export const MAX_JAVA_FEATURE_VERSION = 99;

const LANGUAGE_ID_PATTERN = /^[a-z0-9_+-]+$/;
const UNKNOWN_EXPANSION = /\$\{(?!HOME\})/;

export type ResolverKind = (typeof RESOLVER_KINDS)[number];

function validateArguments(directory: string, what: string, value: JsonValue | undefined): void {
  if (value === undefined || value === null) return;
  if (!Array.isArray(value)) fail(directory, `${what}: 'args' must be an array of strings`);
  for (const argument of value) {
    if (typeof argument !== "string") fail(directory, `${what}: 'args' must be an array of strings`);
    if (UNKNOWN_EXPANSION.test(argument)) {
      fail(directory, `${what}: '\${HOME}' is the only token expanded in an argument: ${quoted(argument)}`);
    }
  }
}

function validateJavaCeiling(directory: string, what: string, value: JsonValue | undefined): void {
  if (value === undefined || value === null) return;
  const withinRange = typeof value === "number" && Number.isInteger(value);
  if (!withinRange || value < MIN_JAVA_FEATURE_VERSION || value > MAX_JAVA_FEATURE_VERSION) {
    fail(
      directory,
      `${what}: 'maximumJavaFeatureVersion' must be a whole number between ${MIN_JAVA_FEATURE_VERSION} and ${MAX_JAVA_FEATURE_VERSION}`,
    );
  }
}

function validatePluginHost(directory: string, what: string, resolver: JsonObject): void {
  const plugin = resolver["plugin"];
  if (typeof plugin !== "string" || !plugin) fail(directory, `${what}: resolver 'typescriptPluginHost' needs the 'plugin' it loads`);
  const languages = resolver["languages"];
  if (!Array.isArray(languages) || languages.length === 0) {
    fail(directory, `${what}: resolver 'typescriptPluginHost' needs the languages its plugin serves`);
  }
  for (const languageId of languages) {
    if (typeof languageId !== "string" || !LANGUAGE_ID_PATTERN.test(languageId)) {
      fail(directory, `${what}: bad resolver language ${quoted(languageId)}`);
    }
  }
}

function validateResolver(directory: string, what: string, value: JsonValue | undefined): void {
  if (value === undefined || value === null) return;
  if (!isRecord(value)) fail(directory, `${what}: 'resolver' must be an object`);
  const kind = value["kind"];
  if (typeof kind !== "string" || !(RESOLVER_KINDS as readonly string[]).includes(kind)) {
    fail(directory, `${what}: unknown resolver ${quoted(kind)}; use one of ${RESOLVER_KINDS.join(", ")}`);
  }
  if (kind === "typescriptPluginHost") {
    validatePluginHost(directory, what, value);
    return;
  }
  for (const key of PLUGIN_HOST_KEYS) {
    if (value[key] !== undefined) fail(directory, `${what}: resolver ${quoted(kind)} takes no ${quoted(key)}`);
  }
}

export function validateServerBlock(directory: string, what: string, server: JsonObject): void {
  requireString(directory, server, "command");
  validateArguments(directory, what, server["args"]);
  const options = server["initializationOptions"];
  if (options !== undefined && options !== null && !isRecord(options)) {
    fail(directory, `${what}: 'initializationOptions' must be an object`);
  }
  validateJavaCeiling(directory, what, server["maximumJavaFeatureVersion"]);
  validateResolver(directory, what, server["resolver"]);
  const documentation = server["documentationURL"];
  if (documentation !== undefined && documentation !== null && (typeof documentation !== "string" || !isHttpsURL(documentation))) {
    fail(directory, `${what}: 'documentationURL' must be an https URL`);
  }
  validateInstall(directory, what, server["install"]);
}

function validateLanguageIds(directory: string, what: string, value: JsonValue | undefined): void {
  if (!Array.isArray(value) || value.length === 0) fail(directory, `${what} needs at least one language id`);
  if (value.length > MAX_SERVER_LANGUAGE_IDS) fail(directory, `${what} names more than ${MAX_SERVER_LANGUAGE_IDS} language ids`);
  for (const languageId of value) {
    if (typeof languageId !== "string" || !LANGUAGE_ID_PATTERN.test(languageId)) {
      fail(directory, `${what}: bad language id ${quoted(languageId)}`);
    }
  }
}

function validateMarkers(directory: string, what: string, value: JsonValue | undefined): void {
  if (value === undefined || value === null) return;
  if (!Array.isArray(value)) fail(directory, `${what}: 'projectMarkers' must be an array`);
  if (value.length > MAX_PROJECT_MARKERS) fail(directory, `${what} declares more than ${MAX_PROJECT_MARKERS} projectMarkers`);
  for (const marker of value) validateProjectPath(directory, what, "a projectMarkers entry", marker);
}

export function validateCompanionServer(directory: string, entry: JsonValue, seen: Set<string>): string {
  if (!isRecord(entry)) fail(directory, "each server must be an object");
  const id = requireString(directory, entry, "id", SERVER_ID_PATTERN);
  if (seen.has(id)) fail(directory, `server ${quoted(id)} is declared twice`);
  seen.add(id);
  const what = `server ${quoted(id)}`;
  requireString(directory, entry, "name");
  validateLanguageIds(directory, what, entry["languageIds"]);
  validateMarkers(directory, what, entry["projectMarkers"]);
  validateServerBlock(directory, what, entry);
  return id;
}
