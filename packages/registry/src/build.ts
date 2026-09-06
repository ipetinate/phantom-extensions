import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fail } from "./checks.ts";
import { collect, type Card } from "./collect.ts";
import { CONTRIBUTION_KINDS, entriesOf, type ContributionKind } from "./manifest.ts";
import { buildZip } from "./zip.ts";

export const MAX_ZIP_BYTES = 32 * 1024 * 1024;

export interface Download {
  url: string;
  sha256: string;
  bytes: number;
}

export interface IndexEntry {
  id: string;
  name: string;
  version: string;
  publisher: string;
  description: string;
  homepage: string | null;
  phantom: string | null;
  contributes: ContributionKind[];
  languages: string[];
  download: Download;
  card: Card;
}

export interface BuildOptions {
  extensionsRoot?: string;
  maxZipBytes?: number;
}

export function build(out: string, repo: string, options: BuildOptions = {}): IndexEntry[] {
  const maxZipBytes = options.maxZipBytes ?? MAX_ZIP_BYTES;
  const collected = collect(options.extensionsRoot);
  mkdirSync(out, { recursive: true });
  const entries: IndexEntry[] = [];
  const releases: string[] = [];
  for (const { directory, manifest, card } of collected) {
    const name = `${manifest.id}-${manifest.version}`;
    const tag = `${manifest.id}-v${manifest.version}`;
    const archive = path.join(out, `${name}.zip`);
    const data = buildZip(directory);
    if (data.length > maxZipBytes) fail(directory, `the zip is larger than ${maxZipBytes} bytes`);
    writeFileSync(archive, data);
    const download: Download = {
      url: `https://github.com/${repo}/releases/download/${tag}/${name}.zip`,
      sha256: createHash("sha256").update(data).digest("hex"),
      bytes: data.length,
    };
    entries.push({
      id: manifest.id,
      name: manifest.name,
      version: manifest.version,
      publisher: manifest.publisher,
      description: manifest.description ?? "",
      homepage: manifest.homepage ?? null,
      phantom: manifest.phantom ?? null,
      contributes: CONTRIBUTION_KINDS.filter((kind) => entriesOf(manifest, kind).length > 0),
      languages: entriesOf(manifest, "languages")
        .map((language) => language["languageId"])
        .filter((languageId): languageId is string => typeof languageId === "string"),
      download,
      card,
    });
    releases.push(`${tag}\t${archive}\t${manifest.name} ${manifest.version}\n`);
  }
  const index = {
    schemaVersion: 1,
    generatedAt: `${new Date().toISOString().slice(0, 19)}Z`,
    repository: `https://github.com/${repo}`,
    extensions: entries,
  };
  writeFileSync(path.join(out, "index.json"), `${JSON.stringify(index, null, 2)}\n`, "utf8");
  writeFileSync(path.join(out, "releases.tsv"), releases.join(""), "utf8");
  return entries;
}
