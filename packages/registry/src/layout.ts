import { fail } from "./checks.ts";
import { DOCUMENT_NAMES } from "./document.ts";
import { extensionFiles, relativePath } from "./files.ts";
import { referencedPaths, type Manifest } from "./manifest.ts";
import { MEDIA_DIRECTORY } from "./suffixes.ts";

function parentsOf(relative: string): string[] {
  const segments = relative.split("/");
  const parents: string[] = [];
  for (let count = segments.length - 1; count > 0; count -= 1) parents.push(segments.slice(0, count).join("/"));
  return parents;
}

export function checkLayout(directory: string, manifest: Manifest): void {
  const referenced = referencedPaths(manifest);
  for (const file of extensionFiles(directory)) {
    const relative = relativePath(directory, file);
    if (relative === "extension.json") continue;
    if ((DOCUMENT_NAMES as readonly string[]).includes(relative)) continue;
    if (relative.startsWith(`${MEDIA_DIRECTORY}/`)) continue;
    if (!relative.includes("/") && (relative.startsWith("LICENSE") || relative.startsWith("README"))) continue;
    if (referenced.has(relative) || parentsOf(relative).some((parent) => referenced.has(parent))) continue;
    fail(directory, `${relative} is not referenced by the manifest; media belongs under ${MEDIA_DIRECTORY}/`);
  }
}
