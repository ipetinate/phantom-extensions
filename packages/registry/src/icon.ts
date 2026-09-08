import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { suffixOf } from "./suffixes.ts";

/**
 * How large a declared icon may be and still be inlined into the index.
 *
 * The index carries every icon as a data URI so the store can draw a row
 * without a request per extension, and it is fetched whole on every refresh —
 * so this is a budget, not a target. Raised from 16 KiB once eleven logos at
 * 256 pixels square landed above it: the honest way under 16 KiB was a
 * 256-colour palette, and that banded every gradient. At 128 pixels — the
 * largest size Phantom draws an icon at — full colour costs 10 to 19 KiB.
 */
export const MAX_INLINE_ICON_BYTES = 24 * 1024;

const MEDIA_TYPES: Record<string, string> = {
  png: "image/png",
  svg: "image/svg+xml",
};

/**
 * How many bytes the declared icon is, or null when there is nothing to weigh
 * — no icon declared, a suffix the index does not inline, or a missing file,
 * each of which is somebody else's error to report.
 */
export function iconBytes(directory: string, relative: string | null): number | null {
  if (relative === null) return null;
  if (MEDIA_TYPES[suffixOf(relative)] === undefined) return null;
  try {
    return statSync(path.join(directory, relative)).size;
  } catch {
    return null;
  }
}

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
