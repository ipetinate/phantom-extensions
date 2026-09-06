import { mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { requireAsset } from "../src/checks.ts";
import { collect } from "../src/collect.ts";
import { checkLayout } from "../src/layout.ts";
import { loadManifest } from "../src/manifest.ts";
import { ExtensionFixture, FRONT_MATTER, agentsManifest, languageManifest, makeRoot, removeRoot } from "./fixture.ts";

let root: string;

beforeEach(() => {
  root = makeRoot();
});

afterEach(() => {
  removeRoot(root);
});

describe("loadManifest", () => {
  it("loads a valid manifest", () => {
    const fixture = new ExtensionFixture(root, "sample", languageManifest());
    expect(loadManifest(fixture.directory).id).toBe("tests.sample");
  });

  it("loads a manifest that only contributes agents", () => {
    const fixture = new ExtensionFixture(root, "agent", agentsManifest());
    const agents = loadManifest(fixture.directory).contributes["agents"] as { agentId: string }[];
    expect(agents[0]?.agentId).toBe("sample-agent");
  });

  it("needs a command on an agent", () => {
    const manifest = agentsManifest();
    const agents = (manifest["contributes"] as { agents: Record<string, unknown>[] }).agents;
    delete agents[0]?.["command"];
    const fixture = new ExtensionFixture(root, "agent", manifest);
    expect(() => loadManifest(fixture.directory)).toThrow(/'command'/);
  });

  it("holds an agent to the id pattern", () => {
    const manifest = agentsManifest();
    (manifest["contributes"] as { agents: Record<string, unknown>[] }).agents[0]!["agentId"] = "Sample Agent";
    const fixture = new ExtensionFixture(root, "agent", manifest);
    expect(() => loadManifest(fixture.directory)).toThrow(/'agentId'/);
  });

  it("needs an agent icon that exists", () => {
    const manifest = agentsManifest();
    const fixture = new ExtensionFixture(root, "agent", manifest);
    (manifest["contributes"] as { agents: Record<string, unknown>[] }).agents[0]!["icon"] = "icons/missing.svg";
    fixture.writeManifest(manifest);
    expect(() => loadManifest(fixture.directory)).toThrow(/asset does not exist/);
  });

  it("refuses empty contributes", () => {
    const fixture = new ExtensionFixture(root, "empty", languageManifest({ contributes: { agents: [] } }));
    expect(() => loadManifest(fixture.directory)).toThrow(/contributes must hold at least one of/);
  });
});

describe("collect", () => {
  it("refuses two extensions with one id", () => {
    new ExtensionFixture(root, "one", languageManifest());
    new ExtensionFixture(root, "two", languageManifest());
    expect(() => collect(root)).toThrow(/already used by/);
  });

  it("returns the directory, the manifest and the card", () => {
    new ExtensionFixture(root, "one", languageManifest());
    new ExtensionFixture(root, "two", agentsManifest());
    const collected = collect(root);
    expect(collected.map((entry) => entry.manifest.id)).toEqual(["tests.sample", "tests.agent"]);
    expect(collected.map((entry) => entry.card.title)).toEqual(["Sample", "Sample"]);
    expect(collected[0]?.card.media[0]?.path).toBe("media/cover.png");
  });

  it("requires a document", () => {
    new ExtensionFixture(root, "one", languageManifest(), false);
    expect(() => collect(root)).toThrow(/needs a document: extension.mdx or extension.md/);
  });

  it("requires an icon", () => {
    const manifest = languageManifest();
    delete (manifest["contributes"] as { languages: Record<string, unknown>[] }).languages[0]?.["icon"];
    const fixture = new ExtensionFixture(root, "one", manifest, false);
    fixture.writeDocument(FRONT_MATTER.replace("icon: media/icon.svg\n", ""));
    expect(() => collect(root)).toThrow(/needs an icon/);
  });

  it("accepts a manifest icon in place of the document one", () => {
    const one = new ExtensionFixture(root, "one", languageManifest(), false);
    one.writeDocument(FRONT_MATTER.replace("icon: media/icon.svg\n", ""));
    const two = new ExtensionFixture(root, "two", agentsManifest(), false);
    two.writeDocument(FRONT_MATTER.replace("icon: media/icon.svg\n", ""));
    expect(collect(root).map((entry) => entry.card.icon)).toEqual([null, null]);
  });
});

describe("requireAsset", () => {
  beforeEach(() => {
    mkdirSync(path.join(root, "icons"), { recursive: true });
    writeFileSync(path.join(root, "icons", "a.svg"), "<svg/>");
  });

  it("accepts an existing relative path", () => {
    expect(() => requireAsset(root, "icons/a.svg")).not.toThrow();
  });

  it("rejects an absolute path", () => {
    expect(() => requireAsset(root, "/etc/passwd")).toThrow(/must be relative/);
  });

  it("rejects a parent traversal", () => {
    expect(() => requireAsset(root, "icons/../../a.svg")).toThrow(/must be relative/);
  });

  it("rejects a value that is not a string", () => {
    expect(() => requireAsset(root, null)).toThrow(/must be relative/);
  });

  it("rejects a missing file", () => {
    expect(() => requireAsset(root, "icons/b.svg")).toThrow(/does not exist/);
  });
});

describe("checkLayout", () => {
  it("allows the known files", () => {
    const fixture = new ExtensionFixture(root, "sample", languageManifest(), false);
    const manifest = loadManifest(fixture.directory);
    for (const name of ["LICENSE", "LICENSE.txt", "README.md", "extension.mdx", "extension.md"]) fixture.write(name, "x");
    fixture.write("media/a.png", "x");
    expect(() => checkLayout(fixture.directory, manifest)).not.toThrow();
  });

  it("rejects a stray file", () => {
    const fixture = new ExtensionFixture(root, "sample", languageManifest(), false);
    const manifest = loadManifest(fixture.directory);
    fixture.write("notes.md", "x");
    expect(() => checkLayout(fixture.directory, manifest)).toThrow(/notes.md is not referenced by the manifest/);
  });

  it("rejects a readme in a subdirectory", () => {
    const fixture = new ExtensionFixture(root, "sample", languageManifest(), false);
    const manifest = loadManifest(fixture.directory);
    fixture.write("docs/README.md", "x");
    expect(() => checkLayout(fixture.directory, manifest)).toThrow(/docs\/README.md is not referenced/);
  });

  it("allows files under a referenced directory", () => {
    const manifest = languageManifest();
    (manifest["contributes"] as Record<string, unknown>)["iconThemes"] = [{ name: "Icons", path: "icons-theme" }];
    const fixture = new ExtensionFixture(root, "themed", manifest, false);
    unlinkSync(path.join(fixture.directory, "icons-theme"));
    fixture.write("icons-theme/icon-theme.json", "{}");
    fixture.write("icons-theme/svg/a.svg", "<svg/>");
    expect(() => checkLayout(fixture.directory, loadManifest(fixture.directory))).not.toThrow();
  });

  it("allows an agent icon and a hook template", () => {
    const manifest = agentsManifest();
    (manifest["contributes"] as { agents: Record<string, unknown>[] }).agents[0]!["hooks"] = {
      kind: "file",
      directory: "~/.agent",
      fileName: "plugin.lua",
      template: "hooks/plugin.lua",
    };
    const fixture = new ExtensionFixture(root, "agent", manifest, false);
    expect(() => checkLayout(fixture.directory, loadManifest(fixture.directory))).not.toThrow();
  });
});
