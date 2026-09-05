import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { checkFile, findDocument } from "../src/check.ts";

let directory: string;

beforeEach(() => {
  directory = mkdtempSync(path.join(tmpdir(), "phantom-mdx-"));
});

afterEach(() => {
  rmSync(directory, { recursive: true, force: true });
});

describe("findDocument", () => {
  it("reports a missing document", () => {
    expect(findDocument(directory)).toEqual({ file: null, reason: "no extension.mdx or extension.md" });
  });

  it("finds either name", () => {
    writeFileSync(path.join(directory, "extension.md"), "Text\n");
    expect(findDocument(directory)).toEqual({ file: path.join(directory, "extension.md") });
  });

  it("refuses two documents", () => {
    writeFileSync(path.join(directory, "extension.md"), "Text\n");
    writeFileSync(path.join(directory, "extension.mdx"), "Text\n");
    expect(findDocument(directory)).toEqual({ file: null, reason: "holds both extension.mdx and extension.md; keep one" });
  });
});

describe("checkFile", () => {
  it("accepts plain Markdown in extension.md", () => {
    const file = path.join(directory, "extension.md");
    writeFileSync(file, "---\ntitle: x\n---\n\n## Heading\n\nText with a [link](https://example.com).\n");
    expect(checkFile(file)).toEqual([]);
  });

  it("adds a violation for media that does not exist", () => {
    const file = path.join(directory, "extension.mdx");
    writeFileSync(file, '<Screenshot src="media/a.png" alt="a" />\n');
    expect(checkFile(file)).toEqual([{ code: "media-missing", message: "media/a.png does not exist", line: 1, column: 13 }]);
    mkdirSync(path.join(directory, "media"));
    writeFileSync(path.join(directory, "media", "a.png"), "");
    expect(checkFile(file)).toEqual([]);
  });

  it("reports syntax errors as one violation", () => {
    const file = path.join(directory, "extension.md");
    writeFileSync(file, "<Callout>\n");
    const violations = checkFile(file);
    expect(violations).toHaveLength(1);
    expect(violations[0]!.code).toBe("syntax");
  });
});
