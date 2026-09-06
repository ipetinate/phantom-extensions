import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { build } from "../src/build.ts";
import { ExtensionFixture, MINIMAL_PNG, SVG, languageManifest, makeRoot, removeRoot } from "./fixture.ts";

let root: string;

beforeEach(() => {
  root = makeRoot();
});

afterEach(() => {
  removeRoot(root);
});

function run(options: { maxZipBytes?: number } = {}) {
  return build(path.join(root, "dist"), "tests/registry", {
    offline: true,
    extensionsRoot: path.join(root, "extensions"),
    ...options,
  });
}

describe("build", () => {
  it("carries the card on the index entry", async () => {
    new ExtensionFixture(path.join(root, "extensions"), "sample", languageManifest());
    const entries = await run();
    const card = entries[0]?.card;
    expect(card?.media).toEqual([
      { path: "media/cover.png", bytes: MINIMAL_PNG.length },
      { path: "media/icon.svg", bytes: SVG.length },
      { path: "media/shot.png", bytes: MINIMAL_PNG.length },
    ]);
    expect(card?.mediaBytes).toBe(card?.media.reduce((total, entry) => total + entry.bytes, 0));
    expect(card?.document).toBe("extension.mdx");
    const index = JSON.parse(readFileSync(path.join(root, "dist", "index.json"), "utf8")) as {
      extensions: { card: { title: string }; versions: { version: string }[] }[];
    };
    expect(index.extensions[0]?.card.title).toBe("Sample");
    expect(index.extensions[0]?.versions).toEqual([{ version: "1.0.0", download: entries[0]?.download }]);
  });

  it("writes the release row and the zip", async () => {
    new ExtensionFixture(path.join(root, "extensions"), "sample", languageManifest());
    const entries = await run();
    const archive = path.join(root, "dist", "tests.sample-1.0.0.zip");
    expect(readFileSync(path.join(root, "dist", "releases.tsv"), "utf8")).toBe(`tests.sample-v1.0.0\t${archive}\tSample 1.0.0\n`);
    expect(readFileSync(archive).length).toBe(entries[0]?.download.bytes);
  });

  it("refuses an extension without a document", async () => {
    new ExtensionFixture(path.join(root, "extensions"), "sample", languageManifest(), false);
    await expect(run()).rejects.toThrow(/needs a document/);
  });

  it("holds the zip to its size limit", async () => {
    new ExtensionFixture(path.join(root, "extensions"), "sample", languageManifest());
    await expect(run({ maxZipBytes: 16 })).rejects.toThrow(/the zip is larger than 16 bytes/);
  });
});
