import { describe, expect, it } from "vitest";
import { MAX_VERSIONS, indexURL, mergeVersions, publishedVersions, type VersionEntry } from "../src/versions.ts";

function entry(version: string): VersionEntry {
  return { version, download: { url: `https://example.com/${version}.zip`, sha256: version.repeat(4), bytes: 10 } };
}

function publishedIndex(id: string, own: string, listed: string[]): unknown {
  return {
    extensions: [{ id, ...entry(own), versions: listed.map(entry) }],
  };
}

describe("mergeVersions", () => {
  it("puts a new version in front of the published ones", () => {
    expect(mergeVersions(entry("1.1.0"), [entry("1.0.1"), entry("1.0.0")]).map((item) => item.version)).toEqual([
      "1.1.0",
      "1.0.1",
      "1.0.0",
    ]);
  });

  it("keeps one entry for a version that is already listed", () => {
    const merged = mergeVersions(entry("1.0.0"), [entry("1.0.0"), entry("0.9.0")]);
    expect(merged.map((item) => item.version)).toEqual(["1.0.0", "0.9.0"]);
    expect(merged[0]?.download.sha256).toBe(entry("1.0.0").download.sha256);
  });

  it("sorts by version rather than by the order of the old index", () => {
    expect(mergeVersions(entry("1.0.2"), [entry("1.0.0"), entry("1.0.10"), entry("1.0.1")]).map((item) => item.version)).toEqual([
      "1.0.10",
      "1.0.2",
      "1.0.1",
      "1.0.0",
    ]);
  });

  it("caps the list at ten", () => {
    const previous = Array.from({ length: 20 }, (_, index) => entry(`1.0.${index}`));
    const merged = mergeVersions(entry("2.0.0"), previous);
    expect(merged).toHaveLength(MAX_VERSIONS);
    expect(merged[0]?.version).toBe("2.0.0");
    expect(merged.at(-1)?.version).toBe("1.0.11");
  });

  it("keeps the current version even when ten newer ones are published", () => {
    const previous = Array.from({ length: 12 }, (_, index) => entry(`9.0.${index}`));
    const merged = mergeVersions(entry("1.0.0"), previous);
    expect(merged).toHaveLength(MAX_VERSIONS);
    expect(merged[0]?.version).toBe("1.0.0");
  });

  it("drops an entry whose version is not semver", () => {
    const merged = mergeVersions(entry("1.0.1"), [{ ...entry("1.0.0"), version: "latest" }, entry("0.9.0")]);
    expect(merged.map((item) => item.version)).toEqual(["1.0.1", "0.9.0"]);
  });

  it("returns the current version alone with nothing published", () => {
    expect(mergeVersions(entry("1.0.0"), [])).toEqual([entry("1.0.0")]);
  });
});

describe("publishedVersions", () => {
  it("reads the entry's own version and the ones it lists", () => {
    const index = publishedIndex("tests.sample", "1.0.1", ["1.0.0"]);
    expect(publishedVersions(index, "tests.sample").map((item) => item.version)).toEqual(["1.0.1", "1.0.0"]);
  });

  it("ignores another extension", () => {
    expect(publishedVersions(publishedIndex("tests.other", "1.0.1", []), "tests.sample")).toEqual([]);
  });

  it("drops an entry without a usable download", () => {
    const index = { extensions: [{ id: "tests.sample", version: "1.0.1", download: { url: "https://example.com/a.zip" } }] };
    expect(publishedVersions(index, "tests.sample")).toEqual([]);
  });

  it("reads nothing when the fetch failed", () => {
    expect(publishedVersions(null, "tests.sample")).toEqual([]);
    expect(publishedVersions({ extensions: "no" }, "tests.sample")).toEqual([]);
  });
});

describe("indexURL", () => {
  it("carries the minute so the CDN serves a fresh copy", () => {
    expect(indexURL("owner/name", 29_000_000)).toBe(
      "https://github.com/owner/name/releases/download/index/index.json?t=29000000",
    );
  });
});
