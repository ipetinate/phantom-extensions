import { VERSION_PATTERN } from "./manifest.ts";

export const MAX_VERSIONS = 10;

export interface Download {
  url: string;
  sha256: string;
  bytes: number;
}

export interface VersionEntry {
  version: string;
  download: Download;
}

function isDownload(value: unknown): value is Download {
  if (typeof value !== "object" || value === null) return false;
  const download = value as Record<string, unknown>;
  return typeof download["url"] === "string" && typeof download["sha256"] === "string" && typeof download["bytes"] === "number";
}

export function readVersionEntry(value: unknown): VersionEntry | null {
  if (typeof value !== "object" || value === null) return null;
  const entry = value as Record<string, unknown>;
  const version = entry["version"];
  if (typeof version !== "string" || !VERSION_PATTERN.test(version)) return null;
  const download = entry["download"];
  if (!isDownload(download)) return null;
  return { version, download: { url: download.url, sha256: download.sha256, bytes: download.bytes } };
}

export function publishedVersions(index: unknown, id: string): VersionEntry[] {
  if (typeof index !== "object" || index === null) return [];
  const extensions = (index as Record<string, unknown>)["extensions"];
  if (!Array.isArray(extensions)) return [];
  const entry = extensions.find((candidate) => typeof candidate === "object" && candidate !== null && (candidate as Record<string, unknown>)["id"] === id);
  if (entry === undefined) return [];
  const listed = (entry as Record<string, unknown>)["versions"];
  const found: VersionEntry[] = [];
  const own = readVersionEntry(entry);
  if (own !== null) found.push(own);
  if (Array.isArray(listed)) {
    for (const candidate of listed) {
      const version = readVersionEntry(candidate);
      if (version !== null) found.push(version);
    }
  }
  return found;
}

export function compareVersions(left: string, right: string): number {
  const a = left.split(".").map(Number);
  const b = right.split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    const difference = (b[index] ?? 0) - (a[index] ?? 0);
    if (difference !== 0) return difference;
  }
  return 0;
}

export function mergeVersions(current: VersionEntry, previous: readonly VersionEntry[]): VersionEntry[] {
  const seen = new Set([current.version]);
  const merged = [current];
  for (const entry of previous) {
    if (!VERSION_PATTERN.test(entry.version) || seen.has(entry.version)) continue;
    seen.add(entry.version);
    merged.push(entry);
  }
  merged.sort((left, right) => compareVersions(left.version, right.version));
  const capped = merged.slice(0, MAX_VERSIONS);
  if (!capped.some((entry) => entry.version === current.version)) {
    capped.pop();
    capped.unshift(current);
  }
  return capped;
}

export function indexURL(repo: string, minute = Math.floor(Date.now() / 60_000)): string {
  return `https://github.com/${repo}/releases/download/index/index.json?t=${minute}`;
}

export async function fetchPublishedIndex(repo: string): Promise<unknown | null> {
  try {
    const response = await fetch(indexURL(repo), { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) return null;
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}
