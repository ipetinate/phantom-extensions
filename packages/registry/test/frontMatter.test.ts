import { describe, expect, it } from "vitest";
import { FrontMatterError } from "../src/errors.ts";
import { parseFrontMatter, type FrontMatter } from "../src/frontMatter.ts";

function parse(text: string, allowed?: ReadonlySet<string>): { data: FrontMatter; bodyLine: number } {
  return parseFrontMatter(text, allowed);
}

function rejects(text: string, line: number, pattern: RegExp, allowed?: ReadonlySet<string>): void {
  let caught: unknown;
  try {
    parse(text, allowed);
  } catch (error) {
    caught = error;
  }
  expect(caught).toBeInstanceOf(FrontMatterError);
  const error = caught as FrontMatterError;
  expect(error.message).toMatch(pattern);
  expect(error.line).toBe(line);
}

describe("parseFrontMatter", () => {
  it("reads scalars in every quoting", () => {
    const { data, bodyLine } = parse('---\nplain: Lua is fun\nsingle: \'it\'\'s\'\ndouble: "a \\"b\\"\\n"\n---\nbody\n');
    expect(data).toEqual({ plain: "Lua is fun", single: "it's", double: 'a "b"\n' });
    expect(bodyLine).toBe(6);
  });

  it("reads a nested mapping", () => {
    const { data } = parse("---\nauthor:\n  name: Isac\n  url: https://example.com\n---\n");
    expect(data).toEqual({ author: { name: "Isac", url: "https://example.com" } });
  });

  it("reads flow mappings and sequences", () => {
    const { data } = parse("---\nauthor: { name: Isac, url: 'https://example.com' }\ntags: [a, \"b\"]\nempty: []\n---\n");
    expect(data).toEqual({ author: { name: "Isac", url: "https://example.com" }, tags: ["a", "b"], empty: [] });
  });

  it("reads block sequences at both indents", () => {
    const { data } = parse("---\ntags:\n  - a\n  - b\nmore:\n- c\n- d\nlast: x\n---\n");
    expect(data).toEqual({ tags: ["a", "b"], more: ["c", "d"], last: "x" });
  });

  it("skips comments and blank lines", () => {
    const { data, bodyLine } = parse("---\n# leading\n\ntitle: Lua # trailing\n\n  # indented comment\ntags: [a] # after flow\n---\n");
    expect(data).toEqual({ title: "Lua", tags: ["a"] });
    expect(bodyLine).toBe(9);
  });

  it("keeps a hash inside quotes", () => {
    const { data } = parse("---\ntitle: 'C# tools'\nother: C#\n---\n");
    expect(data).toEqual({ title: "C# tools", other: "C#" });
  });

  it("reports where the body starts", () => {
    expect(parse("---\ntitle: x\n---\nfirst body line\n").bodyLine).toBe(4);
  });

  it("requires the opening marker", () => {
    rejects("title: x\n---\n", 1, /must start with/);
  });

  it("requires the closing marker", () => {
    rejects("---\ntitle: x\n", 1, /not closed/);
  });

  it("rejects an anchor", () => {
    rejects("---\ntitle: &a Lua\n---\n", 2, /anchors/);
  });

  it("rejects an alias", () => {
    rejects("---\ntitle: *a\n---\n", 2, /anchors/);
  });

  it("rejects a multi-line scalar", () => {
    rejects("---\ntagline: |\n  long\n---\n", 2, /anchors|scalars/);
    rejects("---\ntagline: >\n  long\n---\n", 2, /anchors|scalars/);
  });

  it("rejects deeper nesting", () => {
    rejects("---\nauthor:\n  links:\n    home: x\n---\n", 3, /deeper than one level/);
    rejects("---\nauthor:\n    name: x\n---\n", 3, /deeper than one level/);
  });

  it("rejects tabs", () => {
    rejects("---\ntitle:\tx\n---\n", 2, /tabs/);
  });

  it("rejects an unknown key with its line", () => {
    rejects("---\ntitle: x\nbogus: y\n---\n", 3, /unknown key 'bogus'/, new Set(["title"]));
  });

  it("rejects a duplicate key", () => {
    rejects("---\ntitle: x\ntitle: y\n---\n", 3, /duplicate key/);
  });

  it("rejects an unclosed quote", () => {
    rejects("---\ntitle: 'x\n---\n", 2, /not closed/);
  });

  it("rejects a missing space after the colon", () => {
    rejects("---\ntitle:x\n---\n", 2, /space after/);
  });

  it("rejects a key without a value", () => {
    rejects("---\ntitle:\nother: x\n---\n", 2, /has no value/);
  });

  it("rejects nested flow collections", () => {
    rejects("---\na: [1, [2]]\n---\n", 2, /may not nest/);
    rejects("---\na: { b: { c: d } }\n---\n", 2, /may not nest/);
  });

  it("rejects a mapping inside a sequence item", () => {
    rejects("---\ntags:\n  - name: x\n---\n", 3, /deeper than one level/);
  });

  it("rejects a top level sequence", () => {
    rejects("---\n- a\n---\n", 2, /must be a mapping/);
  });

  it("rejects unexpected indentation", () => {
    rejects("---\ntitle: x\n  other: y\n---\n", 3, /unexpected indentation/);
  });

  it("rejects an unsupported escape", () => {
    rejects('---\ntitle: "\\x41"\n---\n', 2, /unsupported escape/);
  });
});
