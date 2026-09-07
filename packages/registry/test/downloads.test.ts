import { describe, expect, it } from "vitest";
import { downloadsFor, tallyReleases } from "../src/downloads.ts";

function release(tag: string, ...counts: number[]): unknown {
  return { tag_name: tag, assets: counts.map((download_count) => ({ download_count })) };
}

describe("tallyReleases", () => {
  it("groups a tag by the id in front of its version", () => {
    const tally = tallyReleases([release("phantom.rust-v1.0.6", 12), release("phantom.rust-v1.0.5", 30)]);
    expect(downloadsFor(tally, "phantom.rust", "1.0.6")).toEqual({ total: 42, current: 12 });
  });

  it("sums every asset of one release", () => {
    const tally = tallyReleases([release("phantom.rust-v1.0.6", 12, 3, 1)]);
    expect(downloadsFor(tally, "phantom.rust", "1.0.6")).toEqual({ total: 16, current: 16 });
  });

  it("keeps an id apart from a longer id it prefixes", () => {
    const tally = tallyReleases([release("phantom.type-v1.0.0", 5), release("phantom.typescript-v1.0.0", 7)]);
    expect(downloadsFor(tally, "phantom.type", "1.0.0")).toEqual({ total: 5, current: 5 });
    expect(downloadsFor(tally, "phantom.typescript", "1.0.0")).toEqual({ total: 7, current: 7 });
  });

  it("skips a tag that names no version, such as the index release", () => {
    const tally = tallyReleases([release("index", 900), release("viewer", 40), release("phantom.rust-v1.0.0", 2)]);
    expect(tally.size).toBe(1);
    expect(downloadsFor(tally, "phantom.rust", "1.0.0")).toEqual({ total: 2, current: 2 });
  });

  it("counts a version with no release yet as zero without losing the total", () => {
    const tally = tallyReleases([release("phantom.rust-v1.0.5", 30)]);
    expect(downloadsFor(tally, "phantom.rust", "1.0.6")).toEqual({ total: 30, current: 0 });
  });

  it("ignores an asset whose count is missing, negative or not a number", () => {
    const tally = tallyReleases([
      { tag_name: "phantom.rust-v1.0.0", assets: [{ download_count: 4 }, { download_count: -1 }, { download_count: "9" }, {}] },
    ]);
    expect(downloadsFor(tally, "phantom.rust", "1.0.0")).toEqual({ total: 4, current: 4 });
  });

  it("ignores a release that is not an object or carries no tag", () => {
    expect(tallyReleases([null, "phantom.rust-v1.0.0", { assets: [{ download_count: 9 }] }]).size).toBe(0);
  });

  it("reads a release with no assets as zero", () => {
    const tally = tallyReleases([{ tag_name: "phantom.rust-v1.0.0" }]);
    expect(downloadsFor(tally, "phantom.rust", "1.0.0")).toEqual({ total: 0, current: 0 });
  });
});

describe("downloadsFor", () => {
  it("answers nothing for an extension the tally never saw", () => {
    expect(downloadsFor(tallyReleases([release("phantom.rust-v1.0.0", 2)]), "phantom.lua", "1.0.0")).toBeNull();
  });

  it("answers nothing when there is no tally at all", () => {
    expect(downloadsFor(null, "phantom.rust", "1.0.0")).toBeNull();
  });
});
