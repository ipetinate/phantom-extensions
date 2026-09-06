import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { referencedPaths } from "../src/manifest.ts";
import type { Manifest } from "../src/manifest.ts";

export const MINIMAL_PNG = Buffer.from(
  "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489" +
    "0000000d49444154789c6360000002000155c1a4b90000000049454e44ae426082",
  "hex",
);

export const SVG = "<svg xmlns='http://www.w3.org/2000/svg'/>";

export const FRONT_MATTER = `---
title: Sample
tagline: A sample extension for the tests.
version: 1.0.0
author:
  name: Tests
  url: https://example.com/tests
license: MIT
created: 2026-09-01
icon: media/icon.svg
cover: media/cover.png
tags: [sample, tests]
screenshots:
  - media/shot.png
---
`;

export const BODY = "\n## Sample\n\nSome text.\n";

export function languageManifest(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    schemaVersion: 1,
    id: "tests.sample",
    name: "Sample",
    version: "1.0.0",
    publisher: "tests",
    contributes: {
      languages: [{ languageId: "sample", name: "Sample", extensions: ["smp"], icon: "icons/sample.svg" }],
    },
    ...overrides,
  };
}

export const SAMPLE_GRAMMAR: Record<string, unknown> = {
  scopeName: "source.sample",
  patterns: [{ include: "#comment" }, { include: "#string" }],
  repository: {
    comment: { match: "#.*$", name: "comment.line.sample" },
    string: {
      begin: "(=*)\\[",
      end: "\\]\\1",
      name: "string.quoted.sample",
      patterns: [{ include: "$self" }],
    },
  },
};

export const SAMPLE_GRAMMAR_PATH = "syntaxes/sample.tmLanguage.json";

export function grammarEntry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    scopeName: "source.sample",
    path: SAMPLE_GRAMMAR_PATH,
    languageId: "sample",
    license: "MIT",
    grammarSource: "https://example.com/sample/sample.tmLanguage.json",
    ...overrides,
  };
}

export function grammarManifest(entry: Record<string, unknown> = {}, overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return languageManifest({
    contributes: {
      languages: [{ languageId: "sample", name: "Sample", extensions: ["smp"], icon: "icons/sample.svg" }],
      grammars: [grammarEntry(entry)],
    },
    ...overrides,
  });
}

export function grammarFixture(
  root: string,
  name: string,
  grammar: Record<string, unknown> = SAMPLE_GRAMMAR,
  manifest: Record<string, unknown> = grammarManifest(),
  relative = SAMPLE_GRAMMAR_PATH,
): ExtensionFixture {
  const fixture = new ExtensionFixture(root, name, manifest);
  fixture.write(relative, JSON.stringify(grammar));
  return fixture;
}

export function companionServer(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "tailwind",
    name: "Tailwind CSS",
    command: "tailwindcss-language-server",
    args: ["--stdio"],
    languageIds: ["html", "vue"],
    ...overrides,
  };
}

export function serversManifest(server: Record<string, unknown> = {}, overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    schemaVersion: 1,
    id: "tests.servers",
    name: "Servers",
    version: "1.0.0",
    publisher: "tests",
    contributes: {
      servers: [companionServer(server)],
    },
    ...overrides,
  };
}

export function agentsManifest(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    schemaVersion: 1,
    id: "tests.agent",
    name: "Agent",
    version: "1.0.0",
    publisher: "tests",
    contributes: {
      agents: [{ agentId: "sample-agent", name: "Sample Agent", command: "sample", icon: "icons/agent.svg" }],
    },
    ...overrides,
  };
}

export function makeRoot(): string {
  return mkdtempSync(path.join(tmpdir(), "phantom-registry-"));
}

export function removeRoot(root: string): void {
  rmSync(root, { recursive: true, force: true });
}

export class ExtensionFixture {
  readonly directory: string;

  constructor(root: string, name: string, manifest: Record<string, unknown>, document = true) {
    this.directory = path.join(root, name);
    mkdirSync(this.directory, { recursive: true });
    for (const asset of referencedPaths(manifest as unknown as Manifest)) this.write(asset, SVG);
    this.writeManifest(manifest);
    if (document) this.writeDocument();
  }

  writeManifest(manifest: Record<string, unknown>): void {
    this.write("extension.json", JSON.stringify(manifest));
  }

  write(relative: string, content: string | Uint8Array): string {
    const file = path.join(this.directory, relative);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, content);
    return file;
  }

  writeSized(relative: string, size: number): string {
    const file = path.join(this.directory, relative);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, Buffer.alloc(size));
    return file;
  }

  writeDocument(frontMatter = FRONT_MATTER, body = BODY, media = true, name = "extension.mdx"): string {
    if (media) {
      this.write("media/icon.svg", SVG);
      this.write("media/cover.png", MINIMAL_PNG);
      this.write("media/shot.png", MINIMAL_PNG);
    }
    return this.write(name, frontMatter + body);
  }
}

export function withFrontMatter(changes: Record<string, string | null>): string {
  const data = new Map<string, string>();
  let current = "";
  for (const line of FRONT_MATTER.trim().split("\n").slice(1, -1)) {
    if (line.startsWith(" ") || line.startsWith("-")) data.set(current, `${data.get(current) as string}\n${line}`);
    else {
      current = line.split(":")[0] as string;
      data.set(current, line);
    }
  }
  for (const [key, value] of Object.entries(changes)) {
    if (value === null) data.delete(key);
    else data.set(key, value);
  }
  return `---\n${[...data.values()].join("\n")}\n---\n`;
}
