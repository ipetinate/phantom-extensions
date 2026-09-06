import { readdirSync } from "node:fs";
import path from "node:path";
import { fail } from "./checks.ts";
import { ManifestError } from "./errors.ts";
import { loadDocument, type DocumentCard } from "./document.ts";
import { isDirectory } from "./files.ts";
import { checkLayout } from "./layout.ts";
import { checkMedia, type MediaEntry } from "./media.ts";
import { loadManifest, manifestIcons, type Manifest } from "./manifest.ts";
import { describe, EXTENSIONS } from "./paths.ts";

export interface Card extends DocumentCard {
  media: MediaEntry[];
  mediaBytes: number;
}

export interface Collected {
  directory: string;
  manifest: Manifest;
  card: Card;
}

export function checkIcon(directory: string, manifest: Manifest, card: DocumentCard): void {
  if (card.icon || manifestIcons(manifest).length > 0) return;
  fail(directory, "needs an icon: 'icon' in the document's front matter, or 'icon' on a language or agent in extension.json");
}

export function collect(extensionsRoot: string = EXTENSIONS): Collected[] {
  const collected: Collected[] = [];
  const seen = new Map<string, string>();
  const directories = readdirSync(extensionsRoot, { withFileTypes: true })
    .map((entry) => path.join(extensionsRoot, entry.name))
    .filter(isDirectory)
    .sort();
  for (const directory of directories) {
    const manifest = loadManifest(directory);
    const owner = seen.get(manifest.id);
    if (owner !== undefined) fail(directory, `id '${manifest.id}' is already used by ${owner}`);
    seen.set(manifest.id, describe(directory));
    checkLayout(directory, manifest);
    const media = checkMedia(directory);
    const document = loadDocument(directory, manifest);
    checkIcon(directory, manifest, document);
    collected.push({
      directory,
      manifest,
      card: { ...document, media: media.entries, mediaBytes: media.bytes },
    });
  }
  if (collected.length === 0) throw new ManifestError("no extensions found");
  return collected;
}
