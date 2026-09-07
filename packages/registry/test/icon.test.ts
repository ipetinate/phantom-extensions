import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { build } from "../src/build.ts";
import { MAX_INLINE_ICON_BYTES } from "../src/icon.ts";
import { ExtensionFixture, MINIMAL_PNG, SVG, agentsManifest, languageManifest, makeRoot, removeRoot, withFrontMatter } from "./fixture.ts";

let root: string;

beforeEach(() => {
  root = makeRoot();
});

afterEach(() => {
  removeRoot(root);
});

function run() {
  return build(path.join(root, "dist"), "tests/registry", {
    offline: true,
    roots: [path.join(root, "extensions")],
  });
}

describe("inline icon", () => {
  it("carries the front matter icon as a data URI", async () => {
    new ExtensionFixture(path.join(root, "extensions"), "sample", languageManifest());
    const entries = await run();
    expect(entries[0]?.card.iconData).toBe(`data:image/svg+xml;base64,${Buffer.from(SVG).toString("base64")}`);
  });

  it("falls back to the icon a language contributes", async () => {
    const fixture = new ExtensionFixture(path.join(root, "extensions"), "sample", languageManifest());
    fixture.writeDocument(withFrontMatter({ icon: null }));
    const entries = await run();
    expect(entries[0]?.card.icon).toBeNull();
    expect(entries[0]?.card.iconData).toBe(`data:image/svg+xml;base64,${Buffer.from(SVG).toString("base64")}`);
  });

  it("falls back to the icon an agent contributes", async () => {
    const fixture = new ExtensionFixture(path.join(root, "extensions"), "agent", agentsManifest());
    fixture.writeDocument(withFrontMatter({ icon: null }));
    const entries = await run();
    expect(entries[0]?.card.iconData).toBe(`data:image/svg+xml;base64,${Buffer.from(SVG).toString("base64")}`);
  });

  it("names the media type a PNG icon uses", async () => {
    const fixture = new ExtensionFixture(path.join(root, "extensions"), "sample", languageManifest());
    fixture.write("media/icon.png", MINIMAL_PNG);
    fixture.writeDocument(withFrontMatter({ icon: "icon: media/icon.png" }), undefined, false);
    const entries = await run();
    expect(entries[0]?.card.iconData).toBe(`data:image/png;base64,${MINIMAL_PNG.toString("base64")}`);
  });

  it("leaves out an icon larger than the inline budget", async () => {
    const fixture = new ExtensionFixture(path.join(root, "extensions"), "sample", languageManifest());
    fixture.write("media/icon.svg", `<svg xmlns='http://www.w3.org/2000/svg'>${"x".repeat(MAX_INLINE_ICON_BYTES)}</svg>`);
    const entries = await run();
    expect(entries[0]?.card.iconData).toBeNull();
  });
});

describe("categories", () => {
  it("lists the categories in the order the languages declare them, once", async () => {
    const manifest = languageManifest({
      contributes: {
        languages: [
          { languageId: "a", name: "A", extensions: ["a"], category: "script", icon: "icons/a.svg" },
          { languageId: "b", name: "B", extensions: ["b"], category: "compiled", icon: "icons/b.svg" },
          { languageId: "c", name: "C", extensions: ["c"], category: "script", icon: "icons/c.svg" },
        ],
      },
    });
    new ExtensionFixture(path.join(root, "extensions"), "sample", manifest);
    const entries = await run();
    expect(entries[0]?.categories).toEqual(["script", "compiled"]);
  });

  it("has no categories when nothing declares one", async () => {
    new ExtensionFixture(path.join(root, "extensions"), "agent", agentsManifest());
    const entries = await run();
    expect(entries[0]?.categories).toEqual([]);
  });
});
