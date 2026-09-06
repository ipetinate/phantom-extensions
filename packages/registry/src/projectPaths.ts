import { fail, isRecord, type JsonValue } from "./checks.ts";
import { quoted } from "./errors.ts";
import { suffixOf } from "./suffixes.ts";

export const MAX_PROJECT_MARKERS = 32;
export const MANIFEST_SUFFIXES = ["json", "yaml", "yml"] as const;

export function validateProjectPath(directory: string, owner: string, what: string, value: JsonValue | undefined): void {
  if (typeof value !== "string" || !value) {
    fail(directory, `${owner}: ${what} must be a non-empty string`);
  }
  const segments = value.split("/");
  if (value.startsWith("/") || value.startsWith("~") || segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    fail(directory, `${owner}: ${what} must be relative and must not climb out: ${quoted(value)}`);
  }
}

export function validateProjectMarkers(directory: string, owner: string, markers: JsonValue | undefined, atLeastOne: boolean): void {
  if (!Array.isArray(markers)) fail(directory, `${owner}: 'projectMarkers' must be an array`);
  if (atLeastOne && markers.length === 0) fail(directory, `${owner} needs at least one entry in projectMarkers`);
  if (markers.length > MAX_PROJECT_MARKERS) fail(directory, `${owner} declares more than ${MAX_PROJECT_MARKERS} projectMarkers`);
  for (const marker of markers) {
    if (typeof marker === "string") {
      validateProjectPath(directory, owner, "a projectMarkers entry", marker);
      continue;
    }
    if (!isRecord(marker)) {
      fail(directory, `${owner}: a projectMarkers entry must be a file name or a {file, containsKey} object`);
    }
    validateProjectPath(directory, owner, "projectMarkers[].file", marker["file"]);
    if (typeof marker["containsKey"] !== "string" || !marker["containsKey"]) {
      fail(directory, `${owner}: projectMarkers[].containsKey must be a non-empty string`);
    }
    const suffix = suffixOf(marker["file"] as string);
    if (!MANIFEST_SUFFIXES.includes(suffix as (typeof MANIFEST_SUFFIXES)[number])) {
      fail(directory, `${owner}: containsKey only reads ${MANIFEST_SUFFIXES.join(", ")}, not ${quoted(marker["file"])}`);
    }
  }
}
