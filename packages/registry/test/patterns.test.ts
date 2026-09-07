import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  MAX_BRANCHES,
  MAX_CANDIDATE_LENGTH,
  MAX_PATTERNS_PER_LANGUAGE,
  MAX_SOURCE_LENGTH,
  compileGlob,
  fileNamePattern,
  globMatches,
} from "../src/patterns.ts";

/**
 * The dialect, checked against the table Phantom checks itself against.
 *
 * Neither repository can read the other's working copy, so the file is
 * duplicated and the duplication is guarded: both suites hash the bytes and
 * compare them against a constant they declare. Editing one copy fails that
 * side until the digest is updated, and updating a digest is the moment the
 * other copy is remembered. Phantom's copy and constant live in
 * `macos/Tests/Terminal/GlobPatternTests.swift`.
 */
const CASES_DIGEST = "abc31d520a055dca86da45e9c9167008532f8d9b305175b5046e137c970db710";

const CASES_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), "glob-pattern-cases.json");

interface Cases {
  limits: { maxSourceLength: number; maxBranches: number; maxPatternsPerLanguage: number; maxCandidateLength: number };
  accepted: { pattern: string; canonical: string; branches: number }[];
  rejected: { pattern: string; why: string }[];
  matches: { pattern: string; name: string; matches: boolean }[];
  paths: { pattern: string; path: string; matches: boolean }[];
}

const bytes = readFileSync(CASES_PATH);
const cases = JSON.parse(bytes.toString("utf8")) as Cases;

describe("the shared case table", () => {
  it("is the one both suites pin", () => {
    expect(createHash("sha256").update(bytes).digest("hex"), "copy the table to phantom and update both digests").toBe(CASES_DIGEST);
  });

  it("carries the caps this side enforces", () => {
    expect(cases.limits).toEqual({
      maxSourceLength: MAX_SOURCE_LENGTH,
      maxBranches: MAX_BRANCHES,
      maxPatternsPerLanguage: MAX_PATTERNS_PER_LANGUAGE,
      maxCandidateLength: MAX_CANDIDATE_LENGTH,
    });
  });
});

describe("fileNamePattern", () => {
  it.each(cases.accepted)("accepts $pattern as $branches branches", ({ pattern, canonical, branches }) => {
    const compiled = fileNamePattern(pattern);
    expect(compiled?.source).toBe(canonical);
    expect(compiled?.branches.length).toBe(branches);
  });

  it.each(cases.rejected)("rejects $pattern", ({ pattern }) => {
    expect(fileNamePattern(pattern)).toBeNull();
  });

  it("refuses a separator where the dialect allows one", () => {
    expect(fileNamePattern("src/*.env")).toBeNull();
    expect(compileGlob("src/*.env")).not.toBeNull();
  });
});

describe("globMatches", () => {
  it.each(cases.matches)("$pattern against the name $name", ({ pattern, name, matches }) => {
    const compiled = fileNamePattern(pattern);
    expect(compiled).not.toBeNull();
    expect(globMatches(compiled as NonNullable<typeof compiled>, name)).toBe(matches);
  });

  it.each(cases.paths)("$pattern against the path $path", ({ pattern, path: candidate, matches }) => {
    const compiled = compileGlob(pattern);
    expect(compiled).not.toBeNull();
    expect(globMatches(compiled as NonNullable<typeof compiled>, candidate)).toBe(matches);
  });

  /**
   * A brace list nested with `*` is where a backtracking matcher goes
   * exponential, so it is the shape measured here, at the caps one language
   * can reach.
   */
  it("answers a pathological pattern set in bounded time", () => {
    const candidate = "a".repeat(MAX_CANDIDATE_LENGTH);
    const branch = "*a".repeat(10) + "*b";
    const listed = fileNamePattern(`{${branch},${branch}x}`);
    const longest = fileNamePattern("*a".repeat(32));
    expect(listed?.branches.length).toBe(2);
    expect(longest?.branches.length).toBe(1);

    const started = performance.now();
    for (let index = 0; index < MAX_PATTERNS_PER_LANGUAGE; index += 1) {
      expect(globMatches(listed as NonNullable<typeof listed>, candidate)).toBe(false);
      expect(globMatches(longest as NonNullable<typeof longest>, candidate)).toBe(true);
    }
    expect(performance.now() - started).toBeLessThan(1000);
  });

  it("refuses an expansion rather than paying for it", () => {
    const doubling = "{a,b}".repeat(12);
    expect([...doubling].length).toBeLessThanOrEqual(MAX_SOURCE_LENGTH);
    expect(fileNamePattern(doubling)).toBeNull();
  });
});
