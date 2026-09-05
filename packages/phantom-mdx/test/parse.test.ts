import { describe, expect, it } from "vitest";
import { parseDocument, ParseError } from "../src/index.ts";

describe("parseDocument", () => {
  it("strips the front matter from the body and keeps its text", () => {
    const { tree, frontmatter } = parseDocument("---\ntitle: Lua\ntags: [a]\n---\n\n## Heading\n\nText\n");
    expect(frontmatter).toBe("title: Lua\ntags: [a]");
    expect(tree.children.map((node) => node.type)).toEqual(["heading", "paragraph"]);
  });

  it("keeps a thematic break that is not at the top", () => {
    const { tree, frontmatter } = parseDocument("Text\n\n---\n\nMore\n");
    expect(frontmatter).toBeNull();
    expect(tree.children.map((node) => node.type)).toEqual(["paragraph", "thematicBreak", "paragraph"]);
  });

  it("keeps line numbers relative to the whole file", () => {
    const { tree } = parseDocument("---\ntitle: x\n---\n\n## Heading\n");
    expect(tree.children[0]!.position!.start.line).toBe(5);
  });

  it("throws a ParseError with a position on bad MDX", () => {
    expect(() => parseDocument("<Callout>\n")).toThrowError(ParseError);
    try {
      parseDocument("<Callout>\n");
    } catch (error) {
      expect(error).toBeInstanceOf(ParseError);
      expect((error as ParseError).line).toBeGreaterThan(0);
      expect((error as ParseError).column).toBeGreaterThan(0);
    }
  });
});
