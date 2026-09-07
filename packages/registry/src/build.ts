import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fail } from "./checks.ts";
import { collect, iconPath, type Card } from "./collect.ts";
import { CONTRIBUTION_KINDS, entriesOf, type ContributionKind } from "./manifest.ts";
import { fetchPublishedIndex, mergeVersions, publishedVersions, type Download, type VersionEntry } from "./versions.ts";
import { buildPreviewZip, buildZip } from "./zip.ts";

export const MAX_ZIP_BYTES = 32 * 1024 * 1024;

/**
 * The suffix that tells the installable asset from the preview one.
 *
 * Exported rather than inlined because anything that has to tell the two
 * assets of a release apart must spell the suffix the same way this builder
 * named them.
 */
export const PREVIEW_SUFFIX = "-preview";

export interface IndexEntry {
  id: string;
  name: string;
  version: string;
  publisher: string;
  description: string;
  homepage: string | null;
  phantom: string | null;
  dependencies: string[];
  contributes: ContributionKind[];
  languages: string[];
  grammars: string[];
  categories: string[];
  download: Download;
  preview: Download;
  versions: VersionEntry[];
  card: Card;
}

export interface BuildOptions {
  offline?: boolean;
  extensionsRoot?: string;
  maxZipBytes?: number;
}

function asset(repo: string, tag: string, name: string, data: Uint8Array): Download {
  return {
    url: `https://github.com/${repo}/releases/download/${tag}/${name}`,
    sha256: createHash("sha256").update(data).digest("hex"),
    bytes: data.length,
  };
}

export async function build(out: string, repo: string, options: BuildOptions = {}): Promise<IndexEntry[]> {
  const maxZipBytes = options.maxZipBytes ?? MAX_ZIP_BYTES;
  const collected = collect(options.extensionsRoot);
  mkdirSync(out, { recursive: true });
  const published = options.offline === true ? null : await fetchPublishedIndex(repo);
  const entries: IndexEntry[] = [];
  const releases: string[] = [];
  for (const { directory, manifest, card } of collected) {
    const name = `${manifest.id}-${manifest.version}`;
    const tag = `${manifest.id}-v${manifest.version}`;
    const archive = path.join(out, `${name}.zip`);
    const data = buildZip(directory);
    if (data.length > maxZipBytes) fail(directory, `the zip is larger than ${maxZipBytes} bytes`);
    writeFileSync(archive, data);
    const download = asset(repo, tag, `${name}.zip`, data);

    const previewName = `${name}${PREVIEW_SUFFIX}.zip`;
    const previewArchive = path.join(out, previewName);
    const previewData = buildPreviewZip(directory, card.document, iconPath(manifest, card));
    writeFileSync(previewArchive, previewData);
    const preview = asset(repo, tag, previewName, previewData);
    entries.push({
      id: manifest.id,
      name: manifest.name,
      version: manifest.version,
      publisher: manifest.publisher,
      description: manifest.description ?? "",
      homepage: manifest.homepage ?? null,
      phantom: manifest.phantom ?? null,
      dependencies: manifest.dependencies ?? [],
      contributes: CONTRIBUTION_KINDS.filter((kind) => entriesOf(manifest, kind).length > 0),
      languages: entriesOf(manifest, "languages")
        .map((language) => language["languageId"])
        .filter((languageId): languageId is string => typeof languageId === "string"),
      grammars: entriesOf(manifest, "grammars")
        .map((grammar) => grammar["scopeName"])
        .filter((scopeName): scopeName is string => typeof scopeName === "string"),
      // In the order the manifest declared them, deduplicated. The reader
      // sees an extension filed under the first one, and an extension is
      // what its first language is: Elixir contributes Elixir, EEx and
      // HEEx, so sorting these put the Elixir extension under Markup.
      categories: [
        ...new Set(
          entriesOf(manifest, "languages")
            .map((language) => language["category"])
            .filter((category): category is string => typeof category === "string"),
        ),
      ],
      download,
      preview,
      versions: mergeVersions({ version: manifest.version, download }, publishedVersions(published, manifest.id)),
      card,
    });
    releases.push(`${tag}\t${archive}\t${previewArchive}\t${manifest.name} ${manifest.version}\n`);
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
