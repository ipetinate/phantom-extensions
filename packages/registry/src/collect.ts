import { readdirSync } from "node:fs";
import path from "node:path";
import { fail } from "./checks.ts";
import { ManifestError } from "./errors.ts";
import { loadDocument, type DocumentCard } from "./document.ts";
import { inlineIcon } from "./icon.ts";
import { isDirectory } from "./files.ts";
import { checkLayout } from "./layout.ts";
import { checkMedia, type MediaEntry } from "./media.ts";
import { checkGrammarDependencies } from "./grammars.ts";
import { loadManifest, manifestGrammars, manifestIcons, manifestTools, type Manifest, type Tool } from "./manifest.ts";
import { describe, EXTENSION_ROOTS } from "./paths.ts";

export interface Card extends DocumentCard {
  iconData: string | null;
  media: MediaEntry[];
  mediaBytes: number;
  tools: Tool[];
}

export interface Collected {
  directory: string;
  manifest: Manifest;
  card: Card;
}

export function iconPath(manifest: Manifest, card: DocumentCard): string | null {
  return card.icon ?? manifestIcons(manifest)[0] ?? null;
}

export function checkIcon(directory: string, manifest: Manifest, card: DocumentCard): void {
  if (card.icon || manifestIcons(manifest).length > 0) return;
  fail(directory, "needs an icon: 'icon' in the document's front matter, or 'icon' on a language or agent in extension.json");
}

function compare(left: string, right: string): number {
  if (left < right) return -1;
  return left > right ? 1 : 0;
}

function byDirectoryName(left: string, right: string): number {
  return compare(path.basename(left), path.basename(right)) || compare(left, right);
}

export function collect(roots: readonly string[] = EXTENSION_ROOTS): Collected[] {
  const collected: Collected[] = [];
  const seen = new Map<string, string>();
  const directories = roots
    .flatMap((root) => readdirSync(root, { withFileTypes: true }).map((entry) => path.join(root, entry.name)))
    .filter(isDirectory)
    .sort(byDirectoryName);
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
      card: {
        ...document,
        iconData: inlineIcon(directory, iconPath(manifest, document)),
        media: media.entries,
        mediaBytes: media.bytes,
        tools: manifestTools(directory, manifest),
      },
    });
  }
  if (collected.length === 0) throw new ManifestError("no extensions found");
  checkGrammarDependencies(
    collected.map(({ directory, manifest }) => ({
      directory,
      id: manifest.id,
      dependencies: manifest.dependencies ?? [],
      grammars: manifestGrammars(directory, manifest),
    })),
  );
  return collected;
}
