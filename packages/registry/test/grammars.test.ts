import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { build } from "../src/build.ts";
import { collect } from "../src/collect.ts";
import { MAX_GRAMMARS, MAX_OPTIONAL_INCLUDES, withoutBackReferences } from "../src/grammars.ts";
import { checkLayout } from "../src/layout.ts";
import { loadManifest, referencedPaths, type Manifest } from "../src/manifest.ts";
import {
  ExtensionFixture,
  SAMPLE_GRAMMAR,
  SAMPLE_GRAMMAR_PATH,
  grammarEntry,
  grammarFixture,
  grammarManifest,
  languageManifest,
  makeRoot,
  removeRoot,
} from "./fixture.ts";

let root: string;

beforeEach(() => {
  root = makeRoot();
});

afterEach(() => {
  removeRoot(root);
});

function grammarWith(repository: Record<string, unknown>): Record<string, unknown> {
  return { ...SAMPLE_GRAMMAR, repository: { ...(SAMPLE_GRAMMAR["repository"] as Record<string, unknown>), ...repository } };
}

function grammarsOf(directory: string): Record<string, unknown>[] {
  return loadManifest(directory).contributes["grammars"] as Record<string, unknown>[];
}

describe("a grammar entry", () => {
  it("loads, and the grammar file is a referenced path", () => {
    const fixture = grammarFixture(root, "sample");
    const manifest = loadManifest(fixture.directory);
    expect(grammarsOf(fixture.directory)[0]?.["scopeName"]).toBe("source.sample");
    expect(referencedPaths(manifest).has(SAMPLE_GRAMMAR_PATH)).toBe(true);
    expect(() => checkLayout(fixture.directory, manifest)).not.toThrow();
  });

  it.each(["scopeName", "path", "license", "grammarSource"])("needs %s", (key) => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({ [key]: undefined }));
    expect(() => loadManifest(fixture.directory)).toThrow();
  });

  it("lets a grammar exist only to be included", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({ languageId: undefined }));
    expect(grammarsOf(fixture.directory)[0]?.["languageId"]).toBeUndefined();
  });

  it("refuses a scope that is not dotted", () => {
    const fixture = grammarFixture(root, "sample", { ...SAMPLE_GRAMMAR, scopeName: "sample" }, grammarManifest({ scopeName: "sample" }));
    expect(() => loadManifest(fixture.directory)).toThrow(/must be a dotted scope name/);
  });

  it("refuses a path that is not a JSON file", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({ path: "syntaxes/sample.tmLanguage" }), "syntaxes/sample.tmLanguage");
    expect(() => loadManifest(fixture.directory)).toThrow(/must name a \.json file/);
  });

  it("refuses a file that does not exist", () => {
    const fixture = new ExtensionFixture(root, "sample", grammarManifest());
    fixture.write(SAMPLE_GRAMMAR_PATH, "{}");
    fixture.writeManifest(grammarManifest({ path: "syntaxes/missing.tmLanguage.json" }));
    expect(() => loadManifest(fixture.directory)).toThrow(/asset does not exist/);
  });

  it("refuses a file that is not JSON", () => {
    const fixture = new ExtensionFixture(root, "sample", grammarManifest());
    fixture.write(SAMPLE_GRAMMAR_PATH, "scopeName = source.sample");
    expect(() => loadManifest(fixture.directory)).toThrow(/is not valid JSON/);
  });

  it("refuses a file whose scope disagrees with the manifest", () => {
    const fixture = grammarFixture(root, "sample", { ...SAMPLE_GRAMMAR, scopeName: "source.other" });
    expect(() => loadManifest(fixture.directory)).toThrow(/declares scopeName 'source.other', the manifest says 'source.sample'/);
  });

  it("refuses a languageId the extension does not contribute", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({ languageId: "other" }));
    expect(() => loadManifest(fixture.directory)).toThrow(/languageId 'other' is not a language this extension contributes/);
  });

  it("refuses a grammarSource that is not https", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({ grammarSource: "http://example.com/g.json" }));
    expect(() => loadManifest(fixture.directory)).toThrow(/grammarSource must be an https URL/);
  });

  it("refuses two grammars claiming one scope", () => {
    const manifest = grammarManifest();
    const contributes = manifest["contributes"] as { grammars: Record<string, unknown>[] };
    contributes.grammars.push(grammarEntry({ languageId: undefined }));
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, manifest);
    expect(() => loadManifest(fixture.directory)).toThrow(/two grammars claim the scope 'source.sample'/);
  });

  it("holds an extension to the grammar limit", () => {
    const manifest = grammarManifest();
    const contributes = manifest["contributes"] as { grammars: Record<string, unknown>[] };
    for (let index = 0; index < MAX_GRAMMARS; index += 1) contributes.grammars.push(grammarEntry({ scopeName: `source.sample.${index}` }));
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, manifest);
    expect(() => loadManifest(fixture.directory)).toThrow(/more than 32 grammars/);
  });

  it("reads embeddedLanguages and injectTo", () => {
    const entry = { embeddedLanguages: { "meta.embedded.block.html": "html" }, injectTo: ["text.html.markdown"] };
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest(entry));
    const grammar = grammarsOf(fixture.directory)[0];
    expect(grammar?.["embeddedLanguages"]).toEqual({ "meta.embedded.block.html": "html" });
    expect(grammar?.["injectTo"]).toEqual(["text.html.markdown"]);
  });

  it("refuses an embeddedLanguages key that is not a scope", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({ embeddedLanguages: { html: "html" } }));
    expect(() => loadManifest(fixture.directory)).toThrow(/embeddedLanguages key must be a scope name/);
  });

  it("refuses an embeddedLanguages value that is not a language id", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({ embeddedLanguages: { "source.css": "CSS" } }));
    expect(() => loadManifest(fixture.directory)).toThrow(/embeddedLanguages.source.css must be a language id/);
  });

  it("refuses an injectTo entry that is not a scope", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({ injectTo: ["markdown"] }));
    expect(() => loadManifest(fixture.directory)).toThrow(/an injectTo entry must be a dotted scope name/);
  });
});

describe("the patterns of a grammar", () => {
  it("must compile with Oniguruma, and the failure names the rule", () => {
    const fixture = grammarFixture(root, "sample", grammarWith({ bad: { match: "(", name: "bad" } }));
    expect(() => loadManifest(fixture.directory)).toThrow(/syntaxes\/sample.tmLanguage.json: repository.bad.match does not compile: /);
  });

  it("names a rule nested in patterns and captures", () => {
    const grammar = {
      ...SAMPLE_GRAMMAR,
      patterns: [
        { include: "#comment" },
        {
          begin: "<",
          end: ">",
          patterns: [{ match: "ok" }, { match: "a", captures: { "0": { patterns: [{ match: "[" }] } } }],
        },
      ],
    };
    const fixture = grammarFixture(root, "sample", grammar);
    expect(() => loadManifest(fixture.directory)).toThrow(/patterns\[1\].patterns\[1\].captures.0.patterns\[0\].match does not compile/);
  });

  it("lets an end pattern refer back to what begin captured", () => {
    const fixture = grammarFixture(root, "sample", grammarWith({ heredoc: { begin: "<<(\\w+)", end: "^\\1$", while: undefined } }));
    expect(() => loadManifest(fixture.directory)).not.toThrow();
  });

  it("treats a backreference in a match pattern as Oniguruma does", () => {
    const fixture = grammarFixture(root, "sample", grammarWith({ bad: { match: "\\1" } }));
    expect(() => loadManifest(fixture.directory)).toThrow(/repository.bad.match does not compile/);
  });

  it("accepts the continuation anchor", () => {
    const fixture = grammarFixture(root, "sample", grammarWith({ continued: { begin: "\\G\\s*-", while: "\\G\\s+" } }));
    expect(() => loadManifest(fixture.directory)).not.toThrow();
  });

  it("refuses an include that names neither a rule nor a scope", () => {
    const fixture = grammarFixture(root, "sample", grammarWith({ bad: { patterns: [{ include: "not a scope" }] } }));
    expect(() => loadManifest(fixture.directory)).toThrow(/repository.bad.patterns\[0\].include must include #rule, \$self, \$base, a scope or scope#rule/);
  });

  it("refuses an empty rule include", () => {
    const fixture = grammarFixture(root, "sample", grammarWith({ bad: { patterns: [{ include: "#" }] } }));
    expect(() => loadManifest(fixture.directory)).toThrow(/includes nothing/);
  });

  it("skips a rule the grammar disabled only when the pattern still compiles", () => {
    const fixture = grammarFixture(root, "sample", grammarWith({ off: { match: "fine", disabled: 1 } }));
    expect(() => loadManifest(fixture.directory)).not.toThrow();
  });
});

describe("withoutBackReferences", () => {
  it("replaces a numbered backreference with a codepoint no text holds", () => {
    expect(withoutBackReferences("\\]\\1")).toBe("\\]\\x{FFFF}");
    expect(withoutBackReferences("^\\12x")).toBe("^\\x{FFFF}x");
  });

  it("leaves an escaped backslash before a digit alone", () => {
    expect(withoutBackReferences("\\\\1")).toBe("\\\\1");
  });

  it("leaves other escapes and a trailing backslash alone", () => {
    expect(withoutBackReferences("\\G\\s+\\")).toBe("\\G\\s+\\");
  });
});

describe("a language's retired keys", () => {
  it.each(["syntax", "keywords"])("refuses %s, which the grammar replaced", (key) => {
    const manifest = languageManifest();
    const languages = (manifest["contributes"] as { languages: Record<string, unknown>[] }).languages;
    languages[0]![key] = key === "syntax" ? { string: "preset:cStyleString" } : ["if"];
    const fixture = new ExtensionFixture(root, "sample", manifest);
    expect(() => loadManifest(fixture.directory)).toThrow(new RegExp(`language 'sample' carries '${key}', which a grammar replaced`));
  });
});

describe("dependencies", () => {
  it("reads a list of extension ids", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({}, { dependencies: ["tests.other"] }));
    expect(loadManifest(fixture.directory).dependencies).toEqual(["tests.other"]);
  });

  it("refuses something other than an array", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({}, { dependencies: "tests.other" }));
    expect(() => loadManifest(fixture.directory)).toThrow(/dependencies must be an array of extension ids/);
  });

  it("refuses an entry that is not an extension id", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({}, { dependencies: ["Tests Other"] }));
    expect(() => loadManifest(fixture.directory)).toThrow(/bad dependency 'Tests Other'/);
  });

  it("refuses the extension itself", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({}, { dependencies: ["tests.sample"] }));
    expect(() => loadManifest(fixture.directory)).toThrow(/cannot depend on itself/);
  });

  it("refuses a duplicate", () => {
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, grammarManifest({}, { dependencies: ["tests.other", "tests.other"] }));
    expect(() => loadManifest(fixture.directory)).toThrow(/listed twice/);
  });
});

const OTHER_GRAMMAR: Record<string, unknown> = {
  scopeName: "source.other",
  patterns: [{ include: "source.sample" }, { include: "source.sample#string" }, { include: "source.nowhere" }],
};

function otherManifest(dependencies?: string[]): Record<string, unknown> {
  return {
    ...languageManifest({ id: "tests.other", name: "Other" }),
    ...(dependencies === undefined ? {} : { dependencies }),
    contributes: {
      languages: [{ languageId: "other", name: "Other", extensions: ["oth"], icon: "icons/other.svg" }],
      grammars: [grammarEntry({ scopeName: "source.other", path: "syntaxes/other.tmLanguage.json", languageId: "other" })],
    },
  };
}

function twinManifest(): Record<string, unknown> {
  return {
    ...languageManifest({ id: "tests.sample-twin", name: "Sample Twin" }),
    contributes: {
      languages: [{ languageId: "sample-twin", name: "Sample Twin", extensions: ["twin"], icon: "icons/twin.svg" }],
      grammars: [grammarEntry({ languageId: "sample-twin" })],
    },
  };
}

describe("resolving includes across the registry", () => {
  it("passes when the providing extension is a dependency", () => {
    grammarFixture(root, "sample");
    grammarFixture(root, "other", OTHER_GRAMMAR, otherManifest(["tests.sample"]), "syntaxes/other.tmLanguage.json");
    expect(collect(root).map((entry) => entry.manifest.id)).toEqual(["tests.other", "tests.sample"]);
  });

  it("fails when the providing extension is not a dependency", () => {
    grammarFixture(root, "sample");
    grammarFixture(root, "other", OTHER_GRAMMAR, otherManifest(), "syntaxes/other.tmLanguage.json");
    expect(() => collect(root)).toThrow(
      /syntaxes\/other.tmLanguage.json: patterns\[0\].include includes 'source.sample', which tests.sample provides; add it to dependencies/,
    );
  });

  it("fails when a dependency names no extension", () => {
    grammarFixture(root, "sample");
    grammarFixture(root, "other", OTHER_GRAMMAR, otherManifest(["tests.sample", "tests.missing"]), "syntaxes/other.tmLanguage.json");
    expect(() => collect(root)).toThrow(/dependency 'tests.missing' is not an extension in this registry/);
  });

  it("lets an include name a scope nobody in the registry provides", () => {
    grammarFixture(root, "other", OTHER_GRAMMAR, otherManifest(), "syntaxes/other.tmLanguage.json");
    expect(collect(root).map((entry) => entry.manifest.id)).toEqual(["tests.other"]);
  });

  it("passes when one of two extensions providing the scope is a dependency", () => {
    grammarFixture(root, "sample");
    grammarFixture(root, "sample-twin", SAMPLE_GRAMMAR, twinManifest());
    grammarFixture(root, "other", OTHER_GRAMMAR, otherManifest(["tests.sample"]), "syntaxes/other.tmLanguage.json");
    expect(collect(root).map((entry) => entry.manifest.id)).toEqual(["tests.other", "tests.sample", "tests.sample-twin"]);
  });

  it("names both providers when neither is a dependency", () => {
    grammarFixture(root, "sample");
    grammarFixture(root, "sample-twin", SAMPLE_GRAMMAR, twinManifest());
    grammarFixture(root, "other", OTHER_GRAMMAR, otherManifest(), "syntaxes/other.tmLanguage.json");
    expect(() => collect(root)).toThrow(
      /includes 'source.sample', which tests.sample and tests.sample-twin provide; add one of them to dependencies/,
    );
  });

  it("sees an include nested in a capture", () => {
    const grammar = {
      scopeName: "source.other",
      patterns: [{ match: "^(exec)\\s+(.*)$", captures: { "2": { patterns: [{ include: "source.sample" }] } } }],
    };
    grammarFixture(root, "sample");
    grammarFixture(root, "other", grammar, otherManifest(), "syntaxes/other.tmLanguage.json");
    expect(() => collect(root)).toThrow(
      /patterns\[0\].captures.2.patterns\[0\].include includes 'source.sample', which tests.sample provides; add it to dependencies/,
    );
  });

  it("lets a grammar include its own extension's scopes without a dependency", () => {
    const grammar = {
      ...SAMPLE_GRAMMAR,
      patterns: [{ include: "source.sample#comment" }, { include: "$base" }],
    };
    grammarFixture(root, "sample", grammar);
    expect(() => collect(root)).not.toThrow();
  });
});

describe("the index", () => {
  it("lists the scopes and the dependencies", async () => {
    const extensions = path.join(root, "extensions");
    grammarFixture(extensions, "sample");
    grammarFixture(extensions, "other", OTHER_GRAMMAR, otherManifest(["tests.sample"]), "syntaxes/other.tmLanguage.json");
    const entries = await build(path.join(root, "dist"), "tests/registry", { offline: true, extensionsRoot: extensions });
    const other = entries.find((entry) => entry.id === "tests.other");
    expect(other?.contributes).toEqual(["languages", "grammars"]);
    expect(other?.grammars).toEqual(["source.other"]);
    expect(other?.dependencies).toEqual(["tests.sample"]);
    const index = JSON.parse(readFileSync(path.join(root, "dist", "index.json"), "utf8")) as { extensions: { id: string; dependencies: string[] }[] };
    expect(index.extensions.find((entry) => entry.id === "tests.sample")?.dependencies).toEqual([]);
  });

  it("carries a manifest that only contributes a grammar", () => {
    const manifest: Manifest = {
      ...(languageManifest({ contributes: { grammars: [grammarEntry({ languageId: undefined })] } }) as unknown as Manifest),
    };
    const fixture = grammarFixture(root, "sample", SAMPLE_GRAMMAR, manifest as unknown as Record<string, unknown>);
    expect(loadManifest(fixture.directory).contributes["languages"]).toBeUndefined();
  });
});

function optionalManifest(optionalIncludes: unknown, dependencies?: string[]): Record<string, unknown> {
  return {
    ...languageManifest({ id: "tests.other", name: "Other" }),
    ...(dependencies === undefined ? {} : { dependencies }),
    contributes: {
      languages: [{ languageId: "other", name: "Other", extensions: ["oth"], icon: "icons/other.svg" }],
      grammars: [
        grammarEntry({ scopeName: "source.other", path: "syntaxes/other.tmLanguage.json", languageId: "other", optionalIncludes }),
      ],
    },
  };
}

describe("an optional include", () => {
  it("needs no dependency on the extension providing it", () => {
    grammarFixture(root, "sample");
    grammarFixture(root, "other", OTHER_GRAMMAR, optionalManifest(["source.sample"]), "syntaxes/other.tmLanguage.json");
    expect(collect(root).map((entry) => entry.manifest.id)).toEqual(["tests.other", "tests.sample"]);
  });

  it("covers every site including the scope, whether or not a rule is named", () => {
    const grammar = { scopeName: "source.other", patterns: [{ include: "source.sample#string" }] };
    grammarFixture(root, "sample");
    grammarFixture(root, "other", grammar, optionalManifest(["source.sample"]), "syntaxes/other.tmLanguage.json");
    expect(collect(root).map((entry) => entry.manifest.id)).toEqual(["tests.other", "tests.sample"]);
  });

  it("excuses only the scope it names", () => {
    const grammar = { scopeName: "source.other", patterns: [{ include: "source.sample" }, { include: "source.twin" }] };
    const twin = {
      ...languageManifest({ id: "tests.twin", name: "Twin" }),
      contributes: {
        languages: [{ languageId: "twin", name: "Twin", extensions: ["twn"], icon: "icons/twin.svg" }],
        grammars: [grammarEntry({ scopeName: "source.twin", languageId: "twin" })],
      },
    };
    grammarFixture(root, "sample");
    grammarFixture(root, "twin", { ...SAMPLE_GRAMMAR, scopeName: "source.twin" }, twin);
    grammarFixture(root, "other", grammar, optionalManifest(["source.sample"]), "syntaxes/other.tmLanguage.json");
    expect(() => collect(root)).toThrow(/includes 'source.twin', which tests.twin provides; add it to dependencies/);
  });

  it("leaves a grammar that declares none exactly as strict", () => {
    grammarFixture(root, "sample");
    grammarFixture(root, "other", OTHER_GRAMMAR, optionalManifest(undefined), "syntaxes/other.tmLanguage.json");
    expect(() => collect(root)).toThrow(/includes 'source.sample', which tests.sample provides; add it to dependencies/);
  });

  it("may name a scope the extension also depends on", () => {
    grammarFixture(root, "sample");
    grammarFixture(root, "other", OTHER_GRAMMAR, optionalManifest(["source.sample"], ["tests.sample"]), "syntaxes/other.tmLanguage.json");
    expect(collect(root).map((entry) => entry.manifest.id)).toEqual(["tests.other", "tests.sample"]);
  });

  it("must be an array", () => {
    const fixture = grammarFixture(root, "other", OTHER_GRAMMAR, optionalManifest("source.sample"), "syntaxes/other.tmLanguage.json");
    expect(() => loadManifest(fixture.directory)).toThrow(/optionalIncludes must be an array of scope names/);
  });

  it("refuses a scope the grammar does not include", () => {
    const fixture = grammarFixture(root, "other", OTHER_GRAMMAR, optionalManifest(["source.absent"]), "syntaxes/other.tmLanguage.json");
    expect(() => loadManifest(fixture.directory)).toThrow(/optionalIncludes names 'source.absent', which this grammar does not include/);
  });

  it("refuses the same scope twice", () => {
    const manifest = optionalManifest(["source.sample", "source.sample"]);
    const fixture = grammarFixture(root, "other", OTHER_GRAMMAR, manifest, "syntaxes/other.tmLanguage.json");
    expect(() => loadManifest(fixture.directory)).toThrow(/optionalIncludes lists 'source.sample' twice/);
  });

  it("refuses a scope that is not dotted", () => {
    const fixture = grammarFixture(root, "other", OTHER_GRAMMAR, optionalManifest(["sample"]), "syntaxes/other.tmLanguage.json");
    expect(() => loadManifest(fixture.directory)).toThrow(/an optionalIncludes entry must be a dotted scope name/);
  });

  it("refuses more than the cap", () => {
    const scopes = Array.from({ length: MAX_OPTIONAL_INCLUDES + 1 }, (_, index) => `source.s${index}`);
    const grammar = { scopeName: "source.other", patterns: scopes.map((scope) => ({ include: scope })) };
    const fixture = grammarFixture(root, "other", grammar, optionalManifest(scopes), "syntaxes/other.tmLanguage.json");
    expect(() => loadManifest(fixture.directory)).toThrow(new RegExp(`more than ${MAX_OPTIONAL_INCLUDES} optionalIncludes`));
  });
});
