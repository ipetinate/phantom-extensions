import { existsSync } from "node:fs";
import path from "node:path";
import { ManifestError, quoted } from "./errors.ts";
import { describe } from "./paths.ts";

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };

export function isRecord(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function fail(directory: string, message: string): never {
  throw new ManifestError(`${describe(directory)}: ${message}`);
}

export function requireString(directory: string, object: JsonObject, key: string, pattern?: RegExp): string {
  const value = object[key];
  if (typeof value !== "string" || !value) fail(directory, `'${key}' must be a non-empty string`);
  if (pattern && !pattern.test(value)) fail(directory, `'${key}' does not match ${pattern.source}: ${quoted(value)}`);
  return value;
}

export function requireAsset(directory: string, relative: JsonValue | undefined): void {
  if (typeof relative !== "string" || !relative || relative.startsWith("/") || relative.split("/").includes("..")) {
    fail(directory, `asset path must be relative and inside the extension: ${quoted(relative)}`);
  }
  if (!existsSync(path.join(directory, relative))) fail(directory, `asset does not exist: ${relative}`);
}

export function isHttpsURL(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.host !== "";
  } catch {
    return false;
  }
}
