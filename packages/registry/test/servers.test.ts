import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CATEGORIES } from "../src/categories.ts";
import { collect } from "../src/collect.ts";
import { loadManifest } from "../src/manifest.ts";
import { MAX_PROJECT_MARKERS } from "../src/projectPaths.ts";
import { FORMATTER_ONLY_KEYS, MAX_SERVERS, MAX_SERVER_LANGUAGE_IDS } from "../src/servers.ts";
import { ExtensionFixture, companionServer, languageManifest, makeRoot, removeRoot, serversManifest } from "./fixture.ts";

let root: string;

beforeEach(() => {
  root = makeRoot();
});

afterEach(() => {
  removeRoot(root);
});

function serverOf(directory: string): Record<string, unknown> {
  const servers = loadManifest(directory).contributes["servers"] as Record<string, unknown>[];
  return servers[0] as Record<string, unknown>;
}

function loadCompanion(server: Record<string, unknown>) {
  const fixture = new ExtensionFixture(root, "companion", serversManifest(server));
  return () => loadManifest(fixture.directory);
}

function loadLanguageServer(server: Record<string, unknown>) {
  const manifest = languageManifest({
    contributes: {
      languages: [
        {
          languageId: "sample",
          name: "Sample",
          extensions: ["smp"],
          icon: "icons/sample.svg",
          server: { command: "sample-language-server", ...server },
        },
      ],
    },
  });
  const fixture = new ExtensionFixture(root, "language", manifest);
  return () => loadManifest(fixture.directory);
}

describe("contributes.servers", () => {
  it("reads a companion server whole", () => {
    const fixture = new ExtensionFixture(
      root,
      "companion",
      serversManifest({ projectMarkers: ["node_modules/tailwindcss"], installHint: "npm i -g @tailwindcss/language-server" }),
    );
    expect(serverOf(fixture.directory)).toEqual({
      id: "tailwind",
      name: "Tailwind CSS",
      command: "tailwindcss-language-server",
      args: ["--stdio"],
      languageIds: ["html", "vue"],
      projectMarkers: ["node_modules/tailwindcss"],
      installHint: "npm i -g @tailwindcss/language-server",
    });
  });

  it("carries the server on the card, as a program the extension needs", () => {
    new ExtensionFixture(root, "companion", serversManifest({ installHint: "npm i -g @tailwindcss/language-server" }));
    expect(collect([root])[0]?.card.tools).toEqual([
      {
        kind: "server",
        name: "Tailwind CSS",
        command: "tailwindcss-language-server",
        installHint: "npm i -g @tailwindcss/language-server",
        install: null,
      },
    ]);
  });

  it("is a contribution on its own, with no language beside it", () => {
    const fixture = new ExtensionFixture(root, "companion", serversManifest());
    expect(loadManifest(fixture.directory).id).toBe("tests.servers");
  });

  it("takes a server with no id, since the editor keys one by its command", () => {
    const fixture = new ExtensionFixture(root, "companion", serversManifest({ id: undefined }));
    expect(serverOf(fixture.directory)["id"]).toBeUndefined();
  });

  it.each(["Tailwind", "tailwind_css", "-tailwind", "tailwind--css"])("holds the id %s to kebab-case", (id) => {
    expect(loadCompanion({ id })).toThrow(/'id' does not match/);
  });

  it("refuses two servers with one id", () => {
    const manifest = serversManifest();
    (manifest["contributes"] as { servers: Record<string, unknown>[] }).servers.push(companionServer({ command: "another-server" }));
    const fixture = new ExtensionFixture(root, "companion", manifest);
    expect(() => loadManifest(fixture.directory)).toThrow(/server 'tailwind' is declared twice/);
  });

  it("refuses two servers that run one command, which the editor would collapse into one", () => {
    const manifest = serversManifest();
    (manifest["contributes"] as { servers: Record<string, unknown>[] }).servers.push(companionServer({ id: "tailwind-again" }));
    const fixture = new ExtensionFixture(root, "companion", manifest);
    expect(() => loadManifest(fixture.directory)).toThrow(/two servers run 'tailwindcss-language-server'/);
  });

  it("refuses more servers than the editor starts for one file", () => {
    const servers = Array.from({ length: MAX_SERVERS + 1 }, (_, index) => companionServer({ id: `s${index}`, command: `server${index}` }));
    const fixture = new ExtensionFixture(root, "companion", serversManifest({}, { contributes: { servers } }));
    expect(() => loadManifest(fixture.directory)).toThrow(/more than 16 servers/);
  });

  it("needs a command, and falls back to it when there is no name", () => {
    expect(loadCompanion({ command: undefined })).toThrow(/'command'/);
    new ExtensionFixture(root, "companion", serversManifest({ name: undefined }));
    expect(collect([root])[0]?.card.tools[0]?.name).toBe("tailwindcss-language-server");
  });

  it.each(CATEGORIES)("takes the category %s", (category) => {
    expect(loadCompanion({ category })).not.toThrow();
  });

  it("refuses a category the editor cannot draw", () => {
    expect(loadCompanion({ category: "linter" })).toThrow(/unknown category 'linter'/);
  });

  it.each(FORMATTER_ONLY_KEYS)("refuses %s, which decides nothing on a server", (key) => {
    const value = key === "localBinary" ? "node_modules/.bin/tailwindcss-language-server" : "marker";
    expect(loadCompanion({ [key]: value })).toThrow(new RegExp(`'${key}' is a formatter key`));
  });

  it("needs the documents it is offered for", () => {
    expect(loadCompanion({ languageIds: [] })).toThrow(/needs at least one language id/);
    expect(loadCompanion({ languageIds: "html" })).toThrow(/needs at least one language id/);
  });

  it("refuses more language ids than the editor should match", () => {
    const languageIds = Array.from({ length: MAX_SERVER_LANGUAGE_IDS + 1 }, (_, index) => `lang${index}`);
    expect(loadCompanion({ languageIds })).toThrow(/names more than 32 language ids/);
  });

  it("refuses a language id no document could carry", () => {
    expect(loadCompanion({ languageIds: ["HTML"] })).toThrow(/bad language id 'HTML'/);
  });

  it("takes an empty marker list as every project", () => {
    const fixture = new ExtensionFixture(root, "companion", serversManifest({ projectMarkers: [] }));
    expect(serverOf(fixture.directory)["projectMarkers"]).toEqual([]);
  });

  it("refuses more markers than the walk should stat", () => {
    const projectMarkers = Array.from({ length: MAX_PROJECT_MARKERS + 1 }, (_, index) => `marker${index}`);
    expect(loadCompanion({ projectMarkers })).toThrow(/declares more than 32 projectMarkers/);
  });

  it.each(["/etc/passwd", "~/.ssh/id_rsa", "../../tailwind", "node_modules/../../tailwind", "./tailwind", "a//b"])(
    "refuses the marker %s, which resolves against the reader's project and not the extension",
    (marker) => {
      expect(loadCompanion({ projectMarkers: [marker] })).toThrow(/must be relative and must not climb out/);
    },
  );

  it("refuses a marker list that is not a list", () => {
    expect(loadCompanion({ projectMarkers: "node_modules/tailwindcss" })).toThrow(/'projectMarkers' must be an array/);
  });

  it("reads a marker the same way a formatter's is read", () => {
    const projectMarkers = ["node_modules/tailwindcss", { file: "package.json", containsKey: "tailwindcss" }];
    const fixture = new ExtensionFixture(root, "companion", serversManifest({ projectMarkers }));
    expect(serverOf(fixture.directory)["projectMarkers"]).toEqual(projectMarkers);
    expect(loadCompanion({ projectMarkers: [{ file: "Cargo.toml", containsKey: "tailwindcss" }] })).toThrow(
      /containsKey only reads json, yaml, yml/,
    );
  });
});

describe("a server's arguments", () => {
  it("expands the user's home directory and nothing else", () => {
    expect(loadCompanion({ args: ["-data", "${HOME}/.cache/jdtls-workspace"] })).not.toThrow();
    expect(loadLanguageServer({ args: ["-data", "${HOME}/.cache/jdtls-workspace"] })).not.toThrow();
  });

  it.each(["${USER}/x", "${home}", "${HOME", "--tsdk=${TYPESCRIPT}"])("refuses the argument %s", (argument) => {
    expect(loadCompanion({ args: [argument] })).toThrow(/is the only token expanded in an argument/);
  });

  it("leaves a lone dollar alone", () => {
    expect(loadCompanion({ args: ["--price", "$", "a$b"] })).not.toThrow();
  });

  it("refuses arguments that are not strings", () => {
    expect(loadCompanion({ args: "--stdio" })).toThrow(/'args' must be an array of strings/);
    expect(loadCompanion({ args: [7] })).toThrow(/'args' must be an array of strings/);
  });
});

describe("maximumJavaFeatureVersion", () => {
  it.each([8, 21, 99])("takes the ceiling %i", (maximumJavaFeatureVersion) => {
    expect(loadCompanion({ maximumJavaFeatureVersion })).not.toThrow();
    expect(loadLanguageServer({ maximumJavaFeatureVersion })).not.toThrow();
  });

  it.each([7, 100, 21.5, "21"])("refuses the ceiling %s", (maximumJavaFeatureVersion) => {
    expect(loadCompanion({ maximumJavaFeatureVersion })).toThrow(/must be a whole number between 8 and 99/);
  });
});

describe("resolver", () => {
  it("takes the TypeScript SDK argument", () => {
    expect(loadCompanion({ resolver: { kind: "typescriptSDKArgument" } })).not.toThrow();
    expect(loadLanguageServer({ resolver: { kind: "typescriptSDKArgument" } })).not.toThrow();
  });

  it("takes a plugin host", () => {
    const resolver = { kind: "typescriptPluginHost", plugin: "@vue/typescript-plugin", languages: ["vue"] };
    const fixture = new ExtensionFixture(root, "companion", serversManifest({ resolver }));
    expect(serverOf(fixture.directory)["resolver"]).toEqual(resolver);
  });

  it("refuses a capability the editor does not implement", () => {
    expect(loadCompanion({ resolver: { kind: "pythonVirtualEnvironment" } })).toThrow(/unknown resolver 'pythonVirtualEnvironment'/);
    expect(loadCompanion({ resolver: {} })).toThrow(/unknown resolver/);
    expect(loadCompanion({ resolver: "typescriptSDKArgument" })).toThrow(/'resolver' must be an object/);
  });

  it("needs both halves of a plugin host", () => {
    expect(loadCompanion({ resolver: { kind: "typescriptPluginHost", languages: ["vue"] } })).toThrow(/needs the 'plugin' it loads/);
    expect(loadCompanion({ resolver: { kind: "typescriptPluginHost", plugin: "@vue/typescript-plugin" } })).toThrow(
      /needs the languages its plugin serves/,
    );
    expect(loadCompanion({ resolver: { kind: "typescriptPluginHost", plugin: "@vue/typescript-plugin", languages: ["Vue"] } })).toThrow(
      /bad resolver language 'Vue'/,
    );
  });

  it.each(["plugin", "languages"])("refuses %s on the resolver that hosts no plugin", (key) => {
    const resolver = { kind: "typescriptSDKArgument", [key]: key === "plugin" ? "@vue/typescript-plugin" : ["vue"] };
    expect(loadCompanion({ resolver })).toThrow(new RegExp(`resolver 'typescriptSDKArgument' takes no '${key}'`));
  });
});

describe("the rest of a server block", () => {
  it("takes initializationOptions as an object", () => {
    const fixture = new ExtensionFixture(root, "companion", serversManifest({ initializationOptions: { provideFormatter: true } }));
    expect(serverOf(fixture.directory)["initializationOptions"]).toEqual({ provideFormatter: true });
  });

  it("refuses initializationOptions that are not an object", () => {
    expect(loadCompanion({ initializationOptions: "provideFormatter" })).toThrow(/'initializationOptions' must be an object/);
    expect(loadLanguageServer({ initializationOptions: [true] })).toThrow(/'initializationOptions' must be an object/);
  });

  it("requires an https documentation url", () => {
    expect(loadCompanion({ documentationURL: "http://tailwindcss.com" })).toThrow(/'documentationURL' must be an https URL/);
    expect(loadLanguageServer({ documentationURL: "not a url" })).toThrow(/'documentationURL' must be an https URL/);
  });

  it("holds a companion server's install block to the same rules as a language server's", () => {
    expect(loadCompanion({ install: { commands: [{ manager: "apt", command: "apt install thing" }] } })).toThrow(
      /unknown package manager 'apt'/,
    );
  });
});
