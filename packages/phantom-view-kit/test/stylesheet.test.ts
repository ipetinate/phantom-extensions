import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { HOST_TOKENS, KIT_TOKENS } from "../src/theme.ts";
import { TAG_NAMES } from "../src/index.ts";

const stylesheet = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "kit.css"),
  "utf8",
);

interface Rule {
  readonly selector: string;
  readonly body: string;
}

const rules: Rule[] = Array.from(stylesheet.matchAll(/([^{}]+)\{([^{}]*)\}/g)).map((match) => ({
  selector: (match[1] ?? "").trim(),
  body: match[2] ?? "",
}));

describe("the stylesheet", () => {
  it("names a colour only through a token, outside the fallback palette", () => {
    const literals = rules
      .filter((rule) => !rule.selector.startsWith(":root"))
      .filter((rule) => /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i.test(rule.body))
      .map((rule) => rule.selector);

    expect(literals).toEqual([]);
  });

  it("uses no token the kit does not document", () => {
    const documented = new Set<string>([...HOST_TOKENS, ...KIT_TOKENS]);
    const used = new Set(Array.from(stylesheet.matchAll(/var\((--[a-z-]+)/gi)).map((match) => match[1] as string));

    expect([...used].filter((token) => !documented.has(token))).toEqual([]);
  });

  it("defines every token it documents", () => {
    const defined = new Set(Array.from(stylesheet.matchAll(/^\s*(--[a-z-]+):/gim)).map((match) => match[1] as string));

    expect([...HOST_TOKENS, ...KIT_TOKENS].filter((token) => !defined.has(token))).toEqual([]);
  });

  it("reaches nothing off this machine", () => {
    expect(stylesheet).not.toMatch(/@import/i);
    expect(stylesheet).not.toMatch(/url\(\s*['"]?https?:/i);
    expect(stylesheet).not.toMatch(/@font-face/i);
  });

  it("draws no shadow", () => {
    expect(stylesheet).not.toMatch(/box-shadow|text-shadow|filter:\s*drop-shadow/i);
  });

  it("says it is on the page", () => {
    expect(stylesheet).toMatch(/--pk-loaded:\s*1/);
  });

  it("dresses every element the kit defines", () => {
    const undressed = TAG_NAMES.filter((tag) => !rules.some((rule) => rule.selector.includes(tag)));

    expect(undressed).toEqual([]);
  });

  it("lets the active fill win over the selection ring", () => {
    const selected = stylesheet.indexOf("phantom-row[selected]");
    const active = stylesheet.indexOf("phantom-row[active]");

    expect(selected).toBeGreaterThan(-1);
    expect(active).toBeGreaterThan(selected);
  });

  it("carries the app's own numbers for the surface, the ring and the scroll knob", () => {
    expect(stylesheet).toMatch(/--pk-surface: color-mix\(in srgb, var\(--fg\) 8%, transparent\)/);
    expect(stylesheet).toMatch(/--pk-stroke: color-mix\(in srgb, var\(--fg\) 16%, transparent\)/);
    expect(stylesheet).toMatch(/--pk-row-hover: color-mix\(in srgb, var\(--accent\) 12%, transparent\)/);
    expect(stylesheet).toMatch(/--pk-row-active: color-mix\(in srgb, var\(--accent\) 45%, transparent\)/);
    expect(stylesheet).toMatch(/--pk-ring: color-mix\(in srgb, var\(--accent\) 55%, transparent\)/);
    expect(stylesheet).toMatch(/--pk-scroll-knob: color-mix\(in srgb, var\(--fg\) 22%, transparent\)/);
    expect(stylesheet).toMatch(/--pk-scroll-knob-content: color-mix\(in srgb, var\(--fg\) 34%, transparent\)/);
  });
});
