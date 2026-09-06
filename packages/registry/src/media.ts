import { statSync } from "node:fs";
import path from "node:path";
import { fail } from "./checks.ts";
import { extensionFiles, isDirectory, relativePath } from "./files.ts";
import { MEDIA_DIRECTORY, MEDIA_SUFFIXES, VIDEO_SUFFIXES, suffixOf } from "./suffixes.ts";

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
export const MAX_GIF_BYTES = 5 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 12 * 1024 * 1024;
export const MAX_MEDIA_BYTES = 24 * 1024 * 1024;
export const MAX_MEDIA_FILES = 32;

export interface MediaEntry {
  path: string;
  bytes: number;
}

export interface MediaReport {
  entries: MediaEntry[];
  bytes: number;
}

export function checkMedia(directory: string): MediaReport {
  const root = path.join(directory, MEDIA_DIRECTORY);
  const files = isDirectory(root) ? extensionFiles(root) : [];
  if (files.length > MAX_MEDIA_FILES) fail(directory, `${MEDIA_DIRECTORY}/ holds more than ${MAX_MEDIA_FILES} files`);
  const entries: MediaEntry[] = [];
  let total = 0;
  for (const file of files) {
    const relative = relativePath(directory, file);
    const suffix = suffixOf(file);
    let limit: number;
    if ((VIDEO_SUFFIXES as readonly string[]).includes(suffix)) limit = MAX_VIDEO_BYTES;
    else if (suffix === "gif") limit = MAX_GIF_BYTES;
    else if ((MEDIA_SUFFIXES as readonly string[]).includes(suffix)) limit = MAX_IMAGE_BYTES;
    else fail(directory, `${relative}: ${MEDIA_DIRECTORY}/ may only hold ${[...MEDIA_SUFFIXES].sort().join(", ")}`);
    const size = statSync(file).size;
    if (size > limit) fail(directory, `${relative} is larger than ${limit} bytes`);
    total += size;
    entries.push({ path: relative, bytes: size });
  }
  if (total > MAX_MEDIA_BYTES) fail(directory, `${MEDIA_DIRECTORY}/ is larger than ${MAX_MEDIA_BYTES} bytes in total`);
  return { entries, bytes: total };
}
