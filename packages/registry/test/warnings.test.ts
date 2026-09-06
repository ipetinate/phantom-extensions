import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadManifest } from "../src/manifest.ts";
import { manifestWarnings } from "../src/warnings.ts";
import {
  ExtensionFixture,
  grammarEntry,
  grammarFixture,
  languageManifest,
  makeRoot,
  removeRoot,
  serversManifest,
} from "./fixture.ts";

let root: string;

beforeEach(() => {
  root = makeRoot();
});

afterEach(() => {
  removeRoot(root);
});

const SERVER = { command: "sample-language-server", args: ["--stdio"] };

function language(extra: Record<string, unknown> = {}): Record<string, unknown> {
  return { languageId: "sample", name: "Sample", extensions: ["smp"], icon: "icons/sample.svg", ...extra };
}

function warningsOf(directory: string): string[] {
  return manifestWarnings(loadManifest(directory));
}

describe("manifestWarnings", () => {
  it("warns about a language that has a server and no grammar", () => {
    const fixture = new ExtensionFixture(root, "server", languageManifest({ contributes: { languages: [language({ server: SERVER })] } }));
    expect(warningsOf(fixture.directory)).toEqual([
      "language 'sample' declares a server and ships no grammar. " +
        "Phantom cannot tell a string from code without one, so the completion list opens inside strings and comments.",
    ]);
  });

  it("stays quiet when the language has both", () => {
    const manifest = languageManifest({
      contributes: { languages: [language({ server: SERVER })], grammars: [grammarEntry()] },
    });
    const fixture = grammarFixture(root, "both", undefined, manifest);
    expect(warningsOf(fixture.directory)).toEqual([]);
  });

  it("stays quiet when the language has no server, because nothing answers a completion there", () => {
    const fixture = new ExtensionFixture(root, "plain", languageManifest());
    expect(warningsOf(fixture.directory)).toEqual([]);
  });

  it("stays quiet about a companion server, which does not own the languages it attaches to", () => {
    const fixture = new ExtensionFixture(root, "companion", serversManifest());
    expect(warningsOf(fixture.directory)).toEqual([]);
  });

  it("names every language of an extension that is missing one", () => {
    const manifest = languageManifest({
      contributes: {
        languages: [language({ server: SERVER }), language({ languageId: "other", name: "Other", extensions: ["oth"], server: SERVER })],
        grammars: [grammarEntry()],
      },
    });
    const fixture = grammarFixture(root, "half", undefined, manifest);
    expect(warningsOf(fixture.directory).map((warning) => warning.split(" ")[1])).toEqual(["'other'"]);
  });
});
