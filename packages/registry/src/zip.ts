import { readFileSync } from "node:fs";
import { zipSync, type Zippable } from "fflate";
import { extensionFiles, relativePath } from "./files.ts";

export const ZIP_EPOCH = new Date(1980, 0, 1, 0, 0, 0);
export const ZIP_LEVEL = 6;

const UNIX_SYSTEM = 3;
const FILE_ATTRIBUTES = 0o644 << 16;

export function buildZip(directory: string): Uint8Array {
  const entries: Zippable = {};
  for (const file of extensionFiles(directory)) {
    entries[relativePath(directory, file)] = [
      new Uint8Array(readFileSync(file)),
      { level: ZIP_LEVEL, mtime: ZIP_EPOCH, os: UNIX_SYSTEM, attrs: FILE_ATTRIBUTES },
    ];
  }
  return zipSync(entries, { level: ZIP_LEVEL });
}
