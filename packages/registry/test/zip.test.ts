import { createHash } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildPreviewZip, buildZip } from "../src/zip.ts";
import { ExtensionFixture, SVG, languageManifest, makeRoot, removeRoot } from "./fixture.ts";

interface CentralEntry {
  name: string;
  versionMadeBy: number;
  versionNeeded: number;
  flags: number;
  method: number;
  time: number;
  date: number;
  externalAttributes: number;
}

function centralDirectory(archive: Uint8Array): CentralEntry[] {
  const view = new DataView(archive.buffer, archive.byteOffset, archive.byteLength);
  let end = archive.length - 22;
  while (end >= 0 && view.getUint32(end, true) !== 0x06054b50) end -= 1;
  const count = view.getUint16(end + 10, true);
  let at = view.getUint32(end + 16, true);
  const entries: CentralEntry[] = [];
  for (let index = 0; index < count; index += 1) {
    const nameLength = view.getUint16(at + 28, true);
    const extraLength = view.getUint16(at + 30, true);
    const commentLength = view.getUint16(at + 32, true);
    entries.push({
      name: new TextDecoder().decode(archive.subarray(at + 46, at + 46 + nameLength)),
      versionMadeBy: view.getUint16(at + 4, true),
      versionNeeded: view.getUint16(at + 6, true),
      flags: view.getUint16(at + 8, true),
      method: view.getUint16(at + 10, true),
      time: view.getUint16(at + 12, true),
      date: view.getUint16(at + 14, true),
      externalAttributes: view.getUint32(at + 38, true),
    });
    at += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

let root: string;
let fixture: ExtensionFixture;

beforeEach(() => {
  root = makeRoot();
  fixture = new ExtensionFixture(root, "sample", languageManifest());
});

afterEach(() => {
  removeRoot(root);
});

describe("buildZip", () => {
  it("writes the same bytes for the same directory", () => {
    const digest = createHash("sha256").update(buildZip(fixture.directory)).digest("hex");
    expect(createHash("sha256").update(buildZip(fixture.directory)).digest("hex")).toBe(digest);
    expect(digest).toBe("546ef4b9376c64e775c76cc5e3e0d92dcf507230ee032d555af06db5d20b3678");
  });

  it("sorts the entries and drops .DS_Store", () => {
    fixture.write(".DS_Store", "x");
    fixture.write("media/.DS_Store", "x");
    expect(centralDirectory(buildZip(fixture.directory)).map((entry) => entry.name)).toEqual([
      "extension.json",
      "extension.mdx",
      "icons/sample.svg",
      "media/cover.png",
      "media/icon.svg",
      "media/shot.png",
    ]);
  });

  it("stamps every entry with 1980, mode 0644 and deflate", () => {
    for (const entry of centralDirectory(buildZip(fixture.directory))) {
      expect(entry.time).toBe(0);
      expect(entry.date).toBe(0x0021);
      expect(entry.method).toBe(8);
      expect(entry.flags).toBe(0);
      expect(entry.versionMadeBy).toBe(0x0314);
      expect(entry.versionNeeded).toBe(20);
      expect(entry.externalAttributes).toBe(0o644 << 16);
    }
  });
});

describe("buildPreviewZip", () => {
  /**
   * The document, its media and the icon it shows. No `extension.json` and
   * no code: this is the asset a store page fetches, and it exists so that
   * reading a page is not recorded as installing an extension.
   */
  it("holds the document, the media and the icon", () => {
    const archive = buildPreviewZip(fixture.directory, "extension.mdx", "icons/sample.svg");
    expect(centralDirectory(archive).map((entry) => entry.name)).toEqual([
      "extension.mdx",
      "icons/sample.svg",
      "media/cover.png",
      "media/icon.svg",
      "media/shot.png",
    ]);
  });

  it("leaves out the manifest and everything else the extension ships", () => {
    fixture.write("syntaxes/sample.tmLanguage.json", "{}");
    fixture.write("LICENSE", "MIT");
    const names = centralDirectory(buildPreviewZip(fixture.directory, "extension.mdx", null)).map((entry) => entry.name);
    expect(names).not.toContain("extension.json");
    expect(names).not.toContain("syntaxes/sample.tmLanguage.json");
    expect(names).not.toContain("LICENSE");
    expect(names).toContain("extension.mdx");
  });

  it("is smaller than the installable zip, which is the reason it exists", () => {
    const preview = buildPreviewZip(fixture.directory, "extension.mdx", "icons/sample.svg");
    expect(preview.length).toBeLessThan(buildZip(fixture.directory).length);
  });

  it("writes the same bytes for the same directory", () => {
    const digest = createHash("sha256").update(buildPreviewZip(fixture.directory, "extension.mdx", null)).digest("hex");
    expect(createHash("sha256").update(buildPreviewZip(fixture.directory, "extension.mdx", null)).digest("hex")).toBe(digest);
  });

  it("carries the icon theme directories the page lists", () => {
    fixture.write("material-icons/icon-theme.json", "{}");
    fixture.write("material-icons/icons/ts.svg", SVG);
    fixture.write("symbols/icon-theme.json", "{}");
    const names = centralDirectory(buildPreviewZip(fixture.directory, "extension.mdx", null, ["material-icons"])).map(
      (entry) => entry.name,
    );
    expect(names).toContain("material-icons/icon-theme.json");
    expect(names).toContain("material-icons/icons/ts.svg");
    expect(names).not.toContain("symbols/icon-theme.json");
  });

  it("carries no theme directory when the extension contributes none", () => {
    fixture.write("material-icons/icon-theme.json", "{}");
    const names = centralDirectory(buildPreviewZip(fixture.directory, "extension.mdx", null)).map((entry) => entry.name);
    expect(names).not.toContain("material-icons/icon-theme.json");
  });

  it("never carries a directory whose name only starts the same way", () => {
    fixture.write("symbols/icon-theme.json", "{}");
    fixture.write("symbols-extra/icon-theme.json", "{}");
    const names = centralDirectory(buildPreviewZip(fixture.directory, "extension.mdx", null, ["symbols"])).map((entry) => entry.name);
    expect(names).toContain("symbols/icon-theme.json");
    expect(names).not.toContain("symbols-extra/icon-theme.json");
  });

  it("stamps its entries the same way", () => {
    for (const entry of centralDirectory(buildPreviewZip(fixture.directory, "extension.mdx", null))) {
      expect(entry.time).toBe(0);
      expect(entry.date).toBe(0x0021);
      expect(entry.method).toBe(8);
      expect(entry.externalAttributes).toBe(0o644 << 16);
    }
  });
});
