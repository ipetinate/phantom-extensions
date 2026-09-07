import { mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { requireAsset } from "../src/checks.ts";
import { collect } from "../src/collect.ts";
import { checkLayout } from "../src/layout.ts";
import { WORKING_DIRECTORIES, loadManifest } from "../src/manifest.ts";
import { MAX_PROJECT_MARKERS } from "../src/projectPaths.ts";
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

describe("fileNamePatterns", () => {
  function withPatterns(patterns: unknown): Record<string, unknown> {
    return languageManifest({
      contributes: { languages: [{ languageId: "dotenv", name: "DotEnv", extensions: ["env"], fileNamePatterns: patterns }] },
    });
  }

  function load(name: string, manifest: Record<string, unknown>): () => unknown {
    const fixture = new ExtensionFixture(root, name, manifest);
    return () => loadManifest(fixture.directory);
  }

  it("takes the pattern the field exists for", () => {
    expect(load("dotenv", withPatterns([".env.*"]))()).toBeTruthy();
  });

  it("refuses a pattern that reaches out of the file's name", () => {
    expect(load("path", withPatterns(["../*.env"]))).toThrow(/never its path/);
  });

  it("refuses a backslash, which is a separator too", () => {
    expect(load("backslash", withPatterns(["src\\*.env"]))).toThrow(/never its path/);
  });

  it("refuses alternation, and says to write one pattern per alternative", () => {
    expect(load("braces", withPatterns(["*.{js,ts}"]))).toThrow(/one pattern per alternative/);
  });

  it("refuses a character class", () => {
    expect(load("class", withPatterns(["[abc].env"]))).toThrow(/Phantom drops/);
  });

  it("refuses a pattern longer than Phantom reads", () => {
    expect(load("long", withPatterns([`${"a".repeat(64)}*`]))).toThrow(/Phantom drops/);
  });

  it("refuses more patterns than Phantom reads", () => {
    expect(load("many", withPatterns(Array.from({ length: 33 }, (_unused, index) => `p${index}.*`)))).toThrow(/more than the 32/);
  });

  it("refuses the same pattern twice, however it is spelled", () => {
    expect(load("twice", withPatterns([".env.*", "  .ENV.*  "]))).toThrow(/twice/);
  });

  it("refuses a pattern that is not a string", () => {
    expect(load("number", withPatterns([7]))).toThrow(/not a string/);
  });

  it("refuses the VS Code spelling of the key, which Phantom would read as nothing", () => {
    const manifest = languageManifest({
      contributes: { languages: [{ languageId: "dotenv", name: "DotEnv", extensions: ["env"], filenamePatterns: [".env.*"] }] },
    });
    expect(load("vscode", manifest)).toThrow(/spell it 'fileNamePatterns'/);
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

function formatterManifest(formatter: Record<string, unknown> = {}): Record<string, unknown> {
  return languageManifest({
    contributes: {
      formatters: [{ id: "tool", name: "Tool", command: "tool", extensions: ["smp"], ...formatter }],
    },
  });
}

function formatterOf(directory: string): Record<string, unknown> {
  const formatters = loadManifest(directory).contributes["formatters"] as Record<string, unknown>[];
  return formatters[0] as Record<string, unknown>;
}

describe("a formatter's project keys", () => {
  it("reads the three of them", () => {
    const fixture = new ExtensionFixture(
      root,
      "tool",
      formatterManifest({
        projectMarkers: [".toolrc", { file: "package.json", containsKey: "tool" }],
        localBinary: "node_modules/.bin/tool",
        workingDirectory: "marker",
      }),
    );
    const formatter = formatterOf(fixture.directory);
    expect(formatter["projectMarkers"]).toEqual([".toolrc", { file: "package.json", containsKey: "tool" }]);
    expect(formatter["localBinary"]).toBe("node_modules/.bin/tool");
    expect(formatter["workingDirectory"]).toBe("marker");
  });

  it("lets a formatter declare none of them", () => {
    const fixture = new ExtensionFixture(root, "tool", formatterManifest());
    expect(formatterOf(fixture.directory)["projectMarkers"]).toBeUndefined();
  });

  it("refuses an empty marker list", () => {
    const fixture = new ExtensionFixture(root, "tool", formatterManifest({ projectMarkers: [] }));
    expect(() => loadManifest(fixture.directory)).toThrow(/at least one entry in projectMarkers/);
  });

  it("refuses more markers than the walk should stat", () => {
    const markers = Array.from({ length: MAX_PROJECT_MARKERS + 1 }, (_, index) => `.toolrc${index}`);
    const fixture = new ExtensionFixture(root, "tool", formatterManifest({ projectMarkers: markers }));
    expect(() => loadManifest(fixture.directory)).toThrow(/more than 32 projectMarkers/);
  });

  it("refuses a marker that is neither a name nor a {file, containsKey} object", () => {
    const fixture = new ExtensionFixture(root, "tool", formatterManifest({ projectMarkers: [7] }));
    expect(() => loadManifest(fixture.directory)).toThrow(/must be a file name or a \{file, containsKey\} object/);
  });

  it.each([{ file: "package.json" }, { containsKey: "tool" }])("needs both halves of a containsKey marker", (marker) => {
    const fixture = new ExtensionFixture(root, "tool", formatterManifest({ projectMarkers: [marker] }));
    expect(() => loadManifest(fixture.directory)).toThrow();
  });

  it("only reads a key out of a manifest the editor can parse", () => {
    const markers = [{ file: "Cargo.toml", containsKey: "tool" }];
    const fixture = new ExtensionFixture(root, "tool", formatterManifest({ projectMarkers: markers }));
    expect(() => loadManifest(fixture.directory)).toThrow(/containsKey only reads json, yaml, yml/);
  });

  it("takes a key out of YAML as well as JSON", () => {
    const markers = [
      { file: "package.yaml", containsKey: "tool" },
      { file: "package.yml", containsKey: "tool" },
    ];
    const fixture = new ExtensionFixture(root, "tool", formatterManifest({ projectMarkers: markers }));
    expect(() => loadManifest(fixture.directory)).not.toThrow();
  });

  it.each(["/etc/passwd", "~/.ssh/id_rsa", "../../../usr/bin/tool", "node_modules/../../tool", "./tool", "a//b"])(
    "refuses the project path %s, which resolves against the reader's project and not the extension",
    (bad) => {
      const binary = new ExtensionFixture(root, "binary", formatterManifest({ localBinary: bad }));
      expect(() => loadManifest(binary.directory)).toThrow(/must be relative and must not climb out/);

      const marker = new ExtensionFixture(root, "marker", formatterManifest({ projectMarkers: [bad] }));
      expect(() => loadManifest(marker.directory)).toThrow(/must be relative and must not climb out/);
    },
  );

  it("holds the working directory to the three the editor implements", () => {
    const fixture = new ExtensionFixture(root, "tool", formatterManifest({ workingDirectory: "elsewhere" }));
    expect(() => loadManifest(fixture.directory)).toThrow(/workingDirectory must be one of marker, file, workspace/);
  });

  it.each(WORKING_DIRECTORIES)("takes the working directory %s", (where) => {
    const markers = where === "marker" ? { projectMarkers: [".toolrc"] } : {};
    const fixture = new ExtensionFixture(root, `tool-${where}`, formatterManifest({ workingDirectory: where, ...markers }));
    expect(() => loadManifest(fixture.directory)).not.toThrow();
  });

  it("refuses a marker working directory with nothing to look for", () => {
    const fixture = new ExtensionFixture(root, "tool", formatterManifest({ workingDirectory: "marker" }));
    expect(() => loadManifest(fixture.directory)).toThrow(/needs projectMarkers to find one/);
  });

  it("refuses a file extension the editor could never match", () => {
    const fixture = new ExtensionFixture(root, "tool", formatterManifest({ extensions: ["js.flow"] }));
    expect(() => loadManifest(fixture.directory)).toThrow(/bad file extension/);
  });
});
