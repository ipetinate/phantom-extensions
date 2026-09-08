import { readFileSync } from "node:fs";
import path from "node:path";
import { zipSync, type Zippable } from "fflate";
import { extensionFiles, relativePath } from "./files.ts";
import { MEDIA_DIRECTORY } from "./suffixes.ts";

export const ZIP_EPOCH = new Date(1980, 0, 1, 0, 0, 0);
export const ZIP_LEVEL = 6;

const UNIX_SYSTEM = 3;
const FILE_ATTRIBUTES = 0o644 << 16;

export function buildZip(directory: string): Uint8Array {
  return zip(
    directory,
    extensionFiles(directory).map((file) => relativePath(directory, file)),
  );
}

/**
 * The document, its media, the icon it shows and the icon themes it lists.
 *
 * Published beside the installable zip so that opening an extension's page
 * in the store does not download the extension. GitHub counts every asset
 * download and the store shows that count, so one asset serving both meant
 * one number for "looked at it" and "installed it".
 *
 * A zip rather than loose files because the renderer stages a directory and
 * the document's image paths are relative to it. A bundle keeps those paths
 * working with no change to the renderer.
 *
 * `themes` names the icon theme directories the document's `<IconBrowser>`
 * reads, so an icon pack's page can show its icons before an install.
 *
 * Its entries are a strict subset of `buildZip`'s, which is why the caller
 * needs no size limit of its own: an extension whose installable zip is
 * within the limit has a preview bundle within it too.
 */
export function buildPreviewZip(directory: string, document: string, icon: string | null, themes: readonly string[] = []): Uint8Array {
  const wanted = new Set<string>([document]);
  if (icon !== null) wanted.add(icon);
  const carried = themes.map((theme) => `${theme}/`);
  const paths = extensionFiles(directory)
    .map((file) => relativePath(directory, file))
    .filter(
      (relative) =>
        wanted.has(relative) || relative.startsWith(`${MEDIA_DIRECTORY}/`) || carried.some((prefix) => relative.startsWith(prefix)),
    );
  return zip(directory, paths);
}

function zip(directory: string, paths: string[]): Uint8Array {
  const entries: Zippable = {};
  for (const relative of paths) {
    entries[relative] = [
      new Uint8Array(readFileSync(path.join(directory, relative))),
      { level: ZIP_LEVEL, mtime: ZIP_EPOCH, os: UNIX_SYSTEM, attrs: FILE_ATTRIBUTES },
    ];
  }
  return zipSync(entries, { level: ZIP_LEVEL });
}
