import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { collect } from "../src/collect.ts";
import { INSTALL_MANAGERS } from "../src/install.ts";
import { loadManifest, manifestTools } from "../src/manifest.ts";
import { ExtensionFixture, agentsManifest, languageManifest, makeRoot, removeRoot } from "./fixture.ts";

let root: string;

beforeEach(() => {
  root = makeRoot();
});

afterEach(() => {
  removeRoot(root);
});

const BREW = {
  manager: "brew",
  command: "brew install lua-language-server",
  uninstall: "brew uninstall lua-language-server",
};

function serverManifest(install: unknown, extra: Record<string, unknown> = {}): Record<string, unknown> {
  return languageManifest({
    contributes: {
      languages: [
        {
          languageId: "sample",
          name: "Sample",
          extensions: ["smp"],
          icon: "icons/sample.svg",
          server: { command: "lua-language-server", install, ...extra },
        },
      ],
    },
  });
}

function formatterManifest(install: unknown): Record<string, unknown> {
  return languageManifest({
    contributes: {
      languages: [{ languageId: "sample", name: "Sample", extensions: ["smp"], icon: "icons/sample.svg" }],
      formatters: [{ id: "stylua", name: "StyLua", command: "stylua", extensions: ["smp"], install }],
    },
  });
}

function agentManifest(install: unknown): Record<string, unknown> {
  return agentsManifest({
    contributes: {
      agents: [{ agentId: "sample-agent", name: "Sample Agent", command: "sample", icon: "icons/agent.svg", install }],
    },
  });
}

function load(manifest: Record<string, unknown>) {
  const fixture = new ExtensionFixture(root, "sample", manifest);
  return () => loadManifest(fixture.directory);
}

describe("install on a language server", () => {
  it("carries the commands and the documentation on the card", () => {
    new ExtensionFixture(root, "sample", serverManifest({ commands: [BREW], documentationURL: "https://luals.github.io/wiki/" }));
    const tools = collect([root])[0]?.card.tools;
    expect(tools).toEqual([
      {
        kind: "server",
        name: "Sample",
        command: "lua-language-server",
        installHint: null,
        install: { commands: [BREW], documentationURL: "https://luals.github.io/wiki/" },
      },
    ]);
  });

  it("keeps installHint when there is no install block", () => {
    new ExtensionFixture(root, "sample", serverManifest(undefined, { installHint: "brew install lua-language-server" }));
    expect(collect([root])[0]?.card.tools[0]).toEqual({
      kind: "server",
      name: "Sample",
      command: "lua-language-server",
      installHint: "brew install lua-language-server",
      install: null,
    });
  });

  it("leaves uninstall and documentation null when they are absent", () => {
    new ExtensionFixture(root, "sample", serverManifest({ commands: [{ manager: "npm", command: "npm install -g x" }] }));
    expect(collect([root])[0]?.card.tools[0]?.install).toEqual({
      commands: [{ manager: "npm", command: "npm install -g x", uninstall: null }],
      documentationURL: null,
    });
  });
});

describe("install on a formatter and on an agent", () => {
  it("reads a formatter install block", () => {
    new ExtensionFixture(root, "sample", formatterManifest({ commands: [{ manager: "cargo", command: "cargo install stylua" }] }));
    const tools = collect([root])[0]?.card.tools ?? [];
    expect(tools.map((tool) => tool.kind)).toEqual(["formatter"]);
    expect(tools[0]?.install?.commands[0]?.manager).toBe("cargo");
  });

  it("maps an agent's old array of strings", () => {
    const fixture = new ExtensionFixture(root, "agent", agentManifest({ commands: ["npm install -g codex", "brew install codex"] }));
    const manifest = loadManifest(fixture.directory);
    expect(manifestTools(fixture.directory, manifest)[0]?.install).toEqual({
      commands: [
        { manager: "npm", command: "npm install -g codex", uninstall: null },
        { manager: "brew", command: "brew install codex", uninstall: null },
      ],
      documentationURL: null,
    });
  });
});

describe("install rules", () => {
  it("accepts every manager", () => {
    for (const manager of INSTALL_MANAGERS) {
      const root_ = makeRoot();
      const fixture = new ExtensionFixture(root_, "sample", serverManifest({ commands: [{ manager, command: `${manager} install thing` }] }));
      expect(() => loadManifest(fixture.directory)).not.toThrow();
      removeRoot(root_);
    }
  });

  it("refuses a manager it does not know", () => {
    expect(load(serverManifest({ commands: [{ manager: "apt", command: "apt install thing" }] }))).toThrow(/unknown package manager 'apt'/);
    expect(load(serverManifest({ commands: ["apt install thing"] }))).toThrow(/unknown package manager 'apt'/);
  });

  it("refuses a command that does not start with its manager", () => {
    expect(load(serverManifest({ commands: [{ manager: "brew", command: "npm install thing" }] }))).toThrow(
      /the install command must start with 'brew'/,
    );
  });

  it("refuses a shell in the command", () => {
    const forbidden = [
      "brew install thing | sh",
      "brew install thing; echo",
      "brew install a && brew install b",
      "brew install a & ",
      "brew install $(whoami)",
      "brew install `whoami`",
      "brew install thing < file",
      "brew install thing > file",
      "sudo brew install thing",
      "curl https://example.com/install.sh",
    ];
    for (const command of forbidden) {
      expect(load(serverManifest({ commands: [{ manager: "brew", command }] }))).toThrow(/may not use|must start with/);
    }
  });

  it("holds the uninstall command to the same rules", () => {
    expect(load(serverManifest({ commands: [{ manager: "brew", command: "brew install a", uninstall: "rm -rf /" }] }))).toThrow(
      /the uninstall command must start with 'brew'/,
    );
    expect(
      load(serverManifest({ commands: [{ manager: "brew", command: "brew install a", uninstall: "brew uninstall a; rm x" }] })),
    ).toThrow(/the uninstall command may not use ';'/);
  });

  it("requires an https documentation url", () => {
    expect(load(serverManifest({ commands: [BREW], documentationURL: "http://luals.github.io/" }))).toThrow(
      /'install.documentationURL' must be an https URL/,
    );
  });

  it("refuses an install block that is not an object", () => {
    expect(load(serverManifest("brew install thing"))).toThrow(/'install' must be an object/);
    expect(load(serverManifest({ commands: "brew install thing" }))).toThrow(/'install.commands' must be an array/);
  });
});
