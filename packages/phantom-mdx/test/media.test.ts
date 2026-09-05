import { describe, expect, it } from "vitest";
import { IMAGE_SUFFIXES, isAllowedLink, isMediaPath, resolveMedia } from "../src/index.ts";

describe("isMediaPath", () => {
  it("accepts files under media/ with a known suffix", () => {
    expect(isMediaPath("media/a.png")).toBe(true);
    expect(isMediaPath("media/nested/a.WEBP")).toBe(true);
    expect(isMediaPath("media/a.mp4")).toBe(true);
  });

  it("rejects everything else", () => {
    expect(isMediaPath("a.png")).toBe(false);
    expect(isMediaPath("media/")).toBe(false);
    expect(isMediaPath("media/../a.png")).toBe(false);
    expect(isMediaPath("media/./a.png")).toBe(false);
    expect(isMediaPath("media//a.png")).toBe(false);
    expect(isMediaPath("media/a.txt")).toBe(false);
    expect(isMediaPath("media/a%2e%2e/b.png")).toBe(false);
    expect(isMediaPath("media/a.png?x=1")).toBe(false);
    expect(isMediaPath("media/a.png#x")).toBe(false);
    expect(isMediaPath("media\\a.png")).toBe(false);
    expect(isMediaPath("media/a b.png")).toBe(false);
    expect(isMediaPath("/media/a.png")).toBe(false);
    expect(isMediaPath("media/a.svg", IMAGE_SUFFIXES)).toBe(false);
  });
});

describe("resolveMedia", () => {
  const base = "file:///Users/me/Library/Application%20Support/Phantom/extensions/ipetinate.lua/";

  it("resolves against the base with or without a trailing slash", () => {
    expect(resolveMedia("media/a.png", base)).toBe(`${base}media/a.png`);
    expect(resolveMedia("media/a.png", base.slice(0, -1))).toBe(`${base}media/a.png`);
  });

  it("refuses any resolution that escapes the base", () => {
    expect(resolveMedia("media/../../other/a.png", base)).toBeNull();
    expect(resolveMedia("/etc/passwd", base)).toBeNull();
    expect(resolveMedia("file:///etc/a.png", base)).toBeNull();
    expect(resolveMedia("https://example.com/a.png", base)).toBeNull();
    expect(resolveMedia("media/a.png", "not a url")).toBeNull();
  });

  it("refuses a suffix outside the requested set", () => {
    expect(resolveMedia("media/a.svg", base, IMAGE_SUFFIXES)).toBeNull();
    expect(resolveMedia("media/a.mp4", base, IMAGE_SUFFIXES)).toBeNull();
  });
});

describe("isAllowedLink", () => {
  it("allows https and mailto only", () => {
    expect(isAllowedLink("https://example.com/x")).toBe(true);
    expect(isAllowedLink("mailto:a@example.com")).toBe(true);
    expect(isAllowedLink("http://example.com")).toBe(false);
    expect(isAllowedLink("HTTPS://example.com")).toBe(true);
    expect(isAllowedLink("file:///etc/passwd")).toBe(false);
    expect(isAllowedLink("javascript:alert(1)")).toBe(false);
    expect(isAllowedLink("#anchor")).toBe(false);
    expect(isAllowedLink("https://")).toBe(false);
  });
});
