import { execFileSync } from "node:child_process";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { gitUpdated, loadDocument, MAX_DOCUMENT_BYTES } from "../src/document.ts";
import { loadManifest, type Manifest } from "../src/manifest.ts";
import { BODY, ExtensionFixture, FRONT_MATTER, MINIMAL_PNG, languageManifest, makeRoot, removeRoot, withFrontMatter } from "./fixture.ts";

let root: string;
let fixture: ExtensionFixture;
let manifest: Manifest;

beforeEach(() => {
  root = makeRoot();
  fixture = new ExtensionFixture(root, "sample", languageManifest(), false);
  manifest = loadManifest(fixture.directory);
});

afterEach(() => {
  removeRoot(root);
});

function load() {
  return loadDocument(fixture.directory, manifest);
}

describe("loadDocument", () => {
  it("refuses a missing document", () => {
    expect(load).toThrow(/needs a document: extension.mdx or extension.md/);
  });

  it("refuses two documents", () => {
    fixture.writeDocument();
    fixture.writeDocument(FRONT_MATTER, BODY, true, "extension.md");
    expect(load).toThrow(/holds both extension.mdx and extension.md; keep one/);
  });

  it("accepts a markdown document", () => {
    fixture.writeDocument(FRONT_MATTER, BODY, true, "extension.md");
    const card = load();
    expect(card.document).toBe("extension.md");
    expect(card.title).toBe("Sample");
  });

  it("names the markdown file in an error", () => {
    fixture.writeDocument("---\ntitle: Sample\nbogus: 1\n---\n", "", true, "extension.md");
    expect(load).toThrow(/extension\.md:3: unknown key 'bogus'/);
  });

  it("builds the card", () => {
    fixture.writeDocument();
    expect(load()).toEqual({
      title: "Sample",
      tagline: "A sample extension for the tests.",
      author: { name: "Tests", url: "https://example.com/tests" },
      license: "MIT",
      created: "2026-09-01",
      updated: "2026-09-01T00:00:00Z",
      icon: "media/icon.svg",
      cover: "media/cover.png",
      tags: ["sample", "tests"],
      screenshots: ["media/shot.png"],
      document: "extension.mdx",
      documentBytes: Buffer.byteLength(FRONT_MATTER + BODY, "utf8"),
    });
  });

  it("leaves the optional fields empty", () => {
    fixture.writeDocument(
      withFrontMatter({ icon: null, cover: null, tags: null, screenshots: null, author: "author: { name: Tests }" }),
    );
    const card = load();
    expect(card.author).toEqual({ name: "Tests", url: null });
    expect(card.icon).toBeNull();
    expect(card.cover).toBeNull();
    expect(card.tags).toEqual([]);
    expect(card.screenshots).toEqual([]);
  });

  it("carries the line of a front matter error", () => {
    fixture.writeDocument("---\ntitle: Sample\nbogus: 1\n---\n", "");
    expect(load).toThrow(/extension\.mdx:3: unknown key 'bogus'/);
  });

  it("refuses a document over the size limit", () => {
    fixture.writeDocument(FRONT_MATTER, BODY + "x".repeat(MAX_DOCUMENT_BYTES));
    expect(load).toThrow(/larger than/);
  });

  it("requires a bounded title", () => {
    fixture.writeDocument(withFrontMatter({ title: null }));
    expect(load).toThrow(/front matter needs 'title'/);
    fixture.writeDocument(withFrontMatter({ title: `title: ${"t".repeat(81)}` }));
    expect(load).toThrow(/'title' is longer than 80/);
  });

  it("bounds the tagline", () => {
    fixture.writeDocument(withFrontMatter({ tagline: `tagline: ${"t".repeat(161)}` }));
    expect(load).toThrow(/'tagline' is longer than 160/);
  });

  it("matches the version against the manifest", () => {
    fixture.writeDocument(withFrontMatter({ version: "version: 2.0.0" }));
    expect(load).toThrow(/'version' is 2.0.0 but extension.json says 1.0.0/);
  });

  it("needs an author name", () => {
    fixture.writeDocument(withFrontMatter({ author: "author: { url: https://example.com }" }));
    expect(load).toThrow(/front matter needs 'name'/);
    fixture.writeDocument(withFrontMatter({ author: "author: Tests" }));
    expect(load).toThrow(/'author' with a 'name'/);
    fixture.writeDocument(withFrontMatter({ author: "author: { name: Tests, email: x }" }));
    expect(load).toThrow(/unknown keys: email/);
    fixture.writeDocument(withFrontMatter({ author: `author: { name: ${"n".repeat(81)} }` }));
    expect(load).toThrow(/'name' is longer than 80/);
  });

  it("takes an https author url only", () => {
    fixture.writeDocument(withFrontMatter({ author: "author: { name: Tests, url: http://example.com }" }));
    expect(load).toThrow(/'author.url' must be an https URL/);
  });

  it("bounds the license", () => {
    fixture.writeDocument(withFrontMatter({ license: null }));
    expect(load).toThrow(/front matter needs 'license'/);
    fixture.writeDocument(withFrontMatter({ license: `license: ${"l".repeat(65)}` }));
    expect(load).toThrow(/'license' is longer than 64/);
  });

  it("takes a date in created", () => {
    fixture.writeDocument(withFrontMatter({ created: null }));
    expect(load).toThrow(/'created' must be a YYYY-MM-DD date/);
    fixture.writeDocument(withFrontMatter({ created: "created: 2026-13-01" }));
    expect(load).toThrow(/'created' is not a valid date/);
    fixture.writeDocument(withFrontMatter({ created: "created: 2026-09-01T00:00:00Z" }));
    expect(load).toThrow(/'created' must be a YYYY-MM-DD date/);
  });

  it("normalises updated to UTC", () => {
    fixture.writeDocument(withFrontMatter({ updated: "updated: 2026-09-05T01:18:54-03:00" }));
    expect(load().updated).toBe("2026-09-05T04:18:54Z");
    fixture.writeDocument(withFrontMatter({ updated: "updated: 2026-09-05T04:18:54Z" }));
    expect(load().updated).toBe("2026-09-05T04:18:54Z");
    fixture.writeDocument(withFrontMatter({ updated: "updated: 2026-09-05" }));
    expect(load().updated).toBe("2026-09-05T00:00:00Z");
  });

  it("needs an offset on updated", () => {
    fixture.writeDocument(withFrontMatter({ updated: "updated: 2026-09-05T04:18:54" }));
    expect(load).toThrow(/needs a UTC offset/);
    fixture.writeDocument(withFrontMatter({ updated: "updated: yesterday" }));
    expect(load).toThrow(/not an ISO 8601 timestamp/);
  });

  it("falls back to created outside git", () => {
    fixture.writeDocument();
    expect(gitUpdated(fixture.directory)).toBeNull();
    expect(load().updated).toBe("2026-09-01T00:00:00Z");
  });

  it("takes updated from the last commit", () => {
    fixture.writeDocument();
    const when = "2026-09-05T01:18:54-03:00";
    const env = {
      ...process.env,
      GIT_AUTHOR_DATE: when,
      GIT_COMMITTER_DATE: when,
      GIT_AUTHOR_NAME: "t",
      GIT_AUTHOR_EMAIL: "t@example.com",
      GIT_COMMITTER_NAME: "t",
      GIT_COMMITTER_EMAIL: "t@example.com",
    };
    for (const command of [["init", "-q"], ["add", "."], ["commit", "-q", "-m", "x"]]) {
      execFileSync("git", command, { cwd: root, env, stdio: "ignore" });
    }
    expect(load().updated).toBe("2026-09-05T04:18:54Z");
  });

  it("holds the icon to a suffix and a location", () => {
    fixture.write("media/icon.jpg", MINIMAL_PNG);
    fixture.writeDocument(withFrontMatter({ icon: "icon: media/icon.jpg" }));
    expect(load).toThrow(/'icon' must end in one of png, svg/);
    fixture.writeDocument(withFrontMatter({ icon: "icon: icons/sample.svg" }));
    expect(load).toThrow(/'icon' must point under media\//);
    fixture.writeDocument(withFrontMatter({ icon: "icon: media/missing.svg" }));
    expect(load).toThrow(/asset does not exist/);
  });

  it("holds the cover to a suffix", () => {
    fixture.writeDocument(withFrontMatter({ cover: "cover: media/icon.svg" }));
    expect(load).toThrow(/'cover' must end in one of jpeg, jpg, png, webp/);
  });

  it("refuses a path that escapes the extension", () => {
    fixture.writeDocument(withFrontMatter({ cover: "cover: media/../extension.json" }));
    expect(load).toThrow(/must be relative and inside/);
  });

  it("holds the tags to the rules", () => {
    const nine = Array.from({ length: 9 }, (_, index) => `t${index}`).join(", ");
    fixture.writeDocument(withFrontMatter({ tags: `tags: [${nine}]` }));
    expect(load).toThrow(/'tags' holds more than 8/);
    fixture.writeDocument(withFrontMatter({ tags: "tags: [Lua]" }));
    expect(load).toThrow(/tag does not match/);
    fixture.writeDocument(withFrontMatter({ tags: `tags: [${"a".repeat(25)}]` }));
    expect(load).toThrow(/tag does not match/);
    fixture.writeDocument(withFrontMatter({ tags: "tags: [a, a]" }));
    expect(load).toThrow(/holds a duplicate/);
    fixture.writeDocument(withFrontMatter({ tags: "tags: lua" }));
    expect(load).toThrow(/'tags' must be a sequence/);
  });

  it("holds the screenshots to the rules", () => {
    for (let index = 0; index < 9; index += 1) fixture.write(`media/s${index}.png`, MINIMAL_PNG);
    const nine = Array.from({ length: 9 }, (_, index) => `media/s${index}.png`).join(", ");
    fixture.writeDocument(withFrontMatter({ screenshots: `screenshots: [${nine}]` }));
    expect(load).toThrow(/'screenshots' holds more than 8/);
    fixture.writeDocument(withFrontMatter({ screenshots: "screenshots: [media/icon.svg]" }));
    expect(load).toThrow(/'screenshots' must end in one of gif, jpeg, jpg, png, webp/);
    fixture.writeDocument(withFrontMatter({ screenshots: "screenshots: [icons/sample.svg]" }));
    expect(load).toThrow(/'screenshots' must point under media\//);
  });
});
