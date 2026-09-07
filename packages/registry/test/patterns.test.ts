import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { MAX_NAME_LENGTH, MAX_PATTERNS, MAX_PATTERN_LENGTH, canonicalPattern, patternMatches } from "../src/patterns.ts";

/**
 * The dialect, checked against the table Phantom checks itself against.
 *
 * Neither repository can read the other's working copy, so the file is
 * duplicated and the duplication is guarded: both suites hash the bytes and
 * compare them against a constant they declare. Editing one copy fails that
 * side until the digest is updated, and updating a digest is the moment the
 * other copy is remembered. Phantom's copy and constant live in
 * `macos/Tests/Terminal/FileNamePatternTests.swift`.
 */
const CASES_DIGEST = "f825add59767fc6984be0b9c33619f3308656c6a9ff48f7a8400ba712d1203b0";

const CASES_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), "file-name-pattern-cases.json");

interface Cases {
  limits: { maxLength: number; maxPatterns: number; maxNameLength: number };
  accepted: { pattern: string; canonical: string }[];
  rejected: { pattern: string; why: string }[];
  matches: { pattern: string; name: string; matches: boolean }[];
}

const bytes = readFileSync(CASES_PATH);
const cases = JSON.parse(bytes.toString("utf8")) as Cases;

describe("the shared case table", () => {
  it("is the one both suites pin", () => {
    expect(createHash("sha256").update(bytes).digest("hex"), "copy the table to phantom and update both digests").toBe(CASES_DIGEST);
  });

  it("carries the caps this side enforces", () => {
    expect(cases.limits).toEqual({ maxLength: MAX_PATTERN_LENGTH, maxPatterns: MAX_PATTERNS, maxNameLength: MAX_NAME_LENGTH });
  });
});

describe("canonicalPattern", () => {
  it.each(cases.accepted)("accepts $pattern", ({ pattern, canonical }) => {
    expect(canonicalPattern(pattern)).toBe(canonical);
  });

  it.each(cases.rejected)("rejects $pattern", ({ pattern }) => {
    expect(canonicalPattern(pattern)).toBeNull();
  });
});

describe("patternMatches", () => {
  it.each(cases.matches)("$pattern against $name", ({ pattern, name, matches }) => {
    expect(patternMatches(pattern, name)).toBe(matches);
  });

  it("answers a pathological pattern in bounded time", () => {
    const name = "a".repeat(MAX_NAME_LENGTH);
    const started = performance.now();
    for (let stars = 1; stars <= 20; stars += 1) {
      const pattern = canonicalPattern("*a".repeat(stars) + "*b");
      if (pattern === null) continue;
      expect(patternMatches(pattern, name)).toBe(false);
    }
    expect(performance.now() - started).toBeLessThan(500);
  });
});
