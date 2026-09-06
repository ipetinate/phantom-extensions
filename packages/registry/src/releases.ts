import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { ROOT } from "./paths.ts";

export class ReleaseCheckError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReleaseCheckError";
  }
}

interface CommandResult {
  status: number;
  stdout: string;
  stderr: string;
}

function runGh(...args: string[]): CommandResult {
  const result = spawnSync("gh", args, { encoding: "utf8" });
  if (result.error) throw new ReleaseCheckError(`gh ${args.join(" ")}: ${result.error.message}`);
  return { status: result.status ?? 1, stdout: result.stdout ?? "", stderr: result.stderr ?? "" };
}

export function publishedAssets(tag: string): string[] | null {
  const result = runGh("release", "view", tag, "--json", "assets");
  if (result.status !== 0) {
    if (result.stderr.toLowerCase().includes("release not found")) return null;
    throw new ReleaseCheckError(`gh release view ${tag}: ${result.stderr.trim() || result.stdout.trim()}`);
  }
  const assets = (JSON.parse(result.stdout) as { assets: { name: string }[] }).assets;
  return assets.map((asset) => asset.name);
}

function downloadAsset(tag: string, name: string, into: string): string {
  mkdirSync(into, { recursive: true });
  const result = runGh("release", "download", tag, "--pattern", name, "--dir", into);
  if (result.status !== 0) throw new ReleaseCheckError(`gh release download ${tag}: ${result.stderr.trim()}`);
  return path.join(into, name);
}

function digestOf(file: string): string {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

export interface ReleaseRow {
  tag: string;
  archive: string;
}

export function readRows(dist: string): ReleaseRow[] {
  const rows: ReleaseRow[] = [];
  for (const line of readFileSync(path.join(dist, "releases.tsv"), "utf8").split("\n")) {
    if (!line.trim()) continue;
    const [tag, archive] = line.split("\t");
    rows.push({ tag: tag as string, archive: archive as string });
  }
  return rows;
}

function localDigest(archive: string, recorded: string): string {
  const file = path.isAbsolute(archive) ? archive : path.join(ROOT, archive);
  try {
    return digestOf(file);
  } catch {
    return recorded;
  }
}

interface PublishedEntry {
  id: string;
  version: string;
  download: { sha256: string };
}

export function checkReleases(dist: string): number {
  const index = JSON.parse(readFileSync(path.join(dist, "index.json"), "utf8")) as { extensions: PublishedEntry[] };
  const byTag = new Map(index.extensions.map((entry) => [`${entry.id}-v${entry.version}`, entry]));
  let failures = 0;
  const temp = mkdtempSync(path.join(tmpdir(), "phantom-releases-"));
  try {
    for (const { tag, archive } of readRows(dist)) {
      const entry = byTag.get(tag);
      if (entry === undefined) throw new ReleaseCheckError(`index.json has no entry for ${tag}`);
      const assets = publishedAssets(tag);
      if (assets === null) {
        process.stdout.write(`new      ${tag}\n`);
        continue;
      }
      const name = path.basename(archive);
      if (!assets.includes(name)) {
        process.stdout.write(`::error::${entry.id} ${entry.version} has a release without ${name}; delete the release or raise version\n`);
        failures += 1;
        continue;
      }
      const published = digestOf(downloadAsset(tag, name, path.join(temp, tag)));
      if (published !== localDigest(archive, entry.download.sha256)) {
        process.stdout.write(`::error::${entry.id} ${entry.version} is already published with different bytes; raise version\n`);
        failures += 1;
        continue;
      }
      process.stdout.write(`same     ${tag}\n`);
    }
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
  return failures > 0 ? 1 : 0;
}
