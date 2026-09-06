import { fail, type JsonValue } from "./checks.ts";
import { quoted } from "./errors.ts";

export const MAX_PROJECT_MARKERS = 32;

export function validateProjectPath(directory: string, owner: string, what: string, value: JsonValue | undefined): void {
  if (typeof value !== "string" || !value) {
    fail(directory, `${owner}: ${what} must be a non-empty string`);
  }
  const segments = value.split("/");
  if (value.startsWith("/") || value.startsWith("~") || segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    fail(directory, `${owner}: ${what} must be relative and must not climb out: ${quoted(value)}`);
  }
}
