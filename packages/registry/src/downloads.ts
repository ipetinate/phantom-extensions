const RELEASES_PER_PAGE = 100;

const MAX_PAGES = 50;

const TAG_PATTERN = /^(.+)-v(\d+\.\d+\.\d+)$/;

export interface DownloadCounts {
  total: number;
  current: number;
}

export type DownloadTally = Map<string, Map<string, number>>;

function assetDownloads(assets: unknown): number {
  if (!Array.isArray(assets)) return 0;
  let count = 0;
  for (const asset of assets) {
    if (typeof asset !== "object" || asset === null) continue;
    const downloads = (asset as Record<string, unknown>)["download_count"];
    if (typeof downloads !== "number" || !Number.isFinite(downloads) || downloads < 0) continue;
    count += Math.trunc(downloads);
  }
  return count;
}

export function tallyReleases(releases: readonly unknown[]): DownloadTally {
  const tally: DownloadTally = new Map();
  for (const release of releases) {
    if (typeof release !== "object" || release === null) continue;
    const tag = (release as Record<string, unknown>)["tag_name"];
    if (typeof tag !== "string") continue;
    const match = TAG_PATTERN.exec(tag);
    if (match === null) continue;
    const id = match[1] as string;
    const version = match[2] as string;
    const versions = tally.get(id) ?? new Map<string, number>();
    versions.set(version, (versions.get(version) ?? 0) + assetDownloads((release as Record<string, unknown>)["assets"]));
    tally.set(id, versions);
  }
  return tally;
}

export function downloadsFor(tally: DownloadTally | null, id: string, version: string): DownloadCounts | null {
  const versions = tally?.get(id);
  if (versions === undefined) return null;
  let total = 0;
  for (const count of versions.values()) total += count;
  return { total, current: versions.get(version) ?? 0 };
}

function releaseHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "user-agent": "phantom-registry",
    "x-github-api-version": "2022-11-28",
  };
  const token = process.env["GH_TOKEN"] ?? process.env["GITHUB_TOKEN"] ?? "";
  if (token !== "") headers["authorization"] = `Bearer ${token}`;
  return headers;
}

async function fetchReleasePage(repo: string, page: number): Promise<unknown[] | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=${RELEASES_PER_PAGE}&page=${page}`, {
      headers: releaseHeaders(),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) return null;
    const body = (await response.json()) as unknown;
    return Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

export async function fetchDownloadCounts(repo: string): Promise<DownloadTally | null> {
  const releases: unknown[] = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await fetchReleasePage(repo, page);
    if (batch === null) return null;
    releases.push(...batch);
    if (batch.length < RELEASES_PER_PAGE) break;
  }
  return tallyReleases(releases);
}
