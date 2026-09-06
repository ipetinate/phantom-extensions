import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { suffixOf } from "./suffixes.ts";

export const MAX_INLINE_ICON_BYTES = 16 * 1024;

const MEDIA_TYPES: Record<string, string> = {
  png: "image/png",
  svg: "image/svg+xml",
};

export function inlineIcon(directory: string, relative: string | null): string | null {
  if (relative === null) return null;
  const mediaType = MEDIA_TYPES[suffixOf(relative)];
  if (mediaType === undefined) return null;
  const file = path.join(directory, relative);
  try {
    if (statSync(file).size > MAX_INLINE_ICON_BYTES) return null;
    return `data:${mediaType};base64,${readFileSync(file).toString("base64")}`;
  } catch {
    return null;
  }
}
