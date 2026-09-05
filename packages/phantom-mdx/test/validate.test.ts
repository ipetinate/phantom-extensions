import { describe, expect, it } from "vitest";
import valid from "./fixtures/valid.mdx?raw";
import { collectMedia, parseDocument, validate } from "../src/index.ts";


function codes(source: string): string[] {
  return validate(source).map((violation) => violation.code);
}

function first(source: string) {
  const violations = validate(source);
  expect(violations.length).toBeGreaterThan(0);
  return violations[0]!;
}

describe("validate", () => {
  it("accepts the fixture that uses every component", () => {
    expect(validate(valid)).toEqual([]);
  });

  it("rejects import", () => {
    const violation = first('import x from "y"\n\nText\n');
    expect(violation.code).toBe("esm");
    expect(violation.line).toBe(1);
  });

  it("rejects export", () => {
    expect(codes("export const a = 1\n\nText\n")).toEqual(["esm"]);
  });

  it("rejects expressions", () => {
    expect(codes("Total: {1+1}\n")).toEqual(["expression"]);
    expect(codes("{1+1}\n")).toEqual(["expression"]);
  });

  it("rejects attribute expressions", () => {
    const violation = first('<Callout kind={x}>\nText\n</Callout>\n');
    expect(violation.code).toBe("expression");
    expect(violation.message).toContain("kind={…}");
  });

  it("rejects unknown components", () => {
    const violation = first("<Unknown />\n");
    expect(violation.code).toBe("unknown-component");
    expect(violation.message).toContain("Callout");
  });

  it("rejects a bad enum", () => {
    const violation = first('<Callout kind="loud">\nText\n</Callout>\n');
    expect(violation.code).toBe("bad-enum");
    expect(violation.message).toContain("note, tip, warning, danger");
  });

  it("rejects a Screenshot without alt", () => {
    const violation = first('<Screenshot src="media/x.png" />\n');
    expect(violation.code).toBe("missing-prop");
    expect(violation.message).toBe("<Screenshot> needs alt");
  });

  it("rejects a media path that escapes media/", () => {
    expect(codes('<Screenshot src="../x.png" alt="x" />\n')).toEqual(["media-path"]);
    expect(codes('<Screenshot src="media/../x.png" alt="x" />\n')).toEqual(["media-path"]);
    expect(codes('<Screenshot src="icons/x.png" alt="x" />\n')).toEqual(["media-path"]);
  });

  it("rejects an svg on Screenshot", () => {
    const violation = first('<Screenshot src="media/x.svg" alt="x" />\n');
    expect(violation.code).toBe("media-path");
    expect(violation.message).toContain("png, jpg, jpeg, webp, gif");
  });

  it("rejects a video with an image suffix and a poster with a video suffix", () => {
    expect(codes('<Video src="media/x.png" />\n')).toEqual(["media-path"]);
    expect(codes('<Video src="media/x.mp4" poster="media/x.mp4" />\n')).toEqual(["media-path"]);
  });

  it("rejects http links and autolinks", () => {
    expect(codes("[a](http://example.com)\n")).toEqual(["link"]);
    expect(codes("<http://example.com>\n")).toEqual(["syntax"]);
    expect(codes("Visit http://example.com today\n")).toEqual(["link"]);
    expect(codes("[a]: http://example.com\n")).toEqual(["link"]);
    expect(codes("[a](javascript:alert(1))\n")).toEqual(["link"]);
    expect(codes("[a](docs/readme.md)\n")).toEqual(["link"]);
  });

  it("accepts https and mailto links", () => {
    expect(validate("[a](https://example.com) [b](mailto:x@example.com) https://example.com\n")).toEqual([]);
  });

  it("rejects HTML elements", () => {
    const violation = first("<div>Text</div>\n");
    expect(violation.code).toBe("html");
    expect(violation.message).toBe("HTML element <div> is not allowed");
  });

  it("rejects a level 1 heading", () => {
    expect(codes("# Title\n\n## Fine\n")).toEqual(["h1"]);
  });

  it("rejects Markdown images", () => {
    expect(codes("![alt](media/x.png)\n")).toEqual(["image"]);
  });

  it("rejects unknown props and bare props", () => {
    expect(first('<Callout color="red">\nText\n</Callout>\n').code).toBe("unknown-prop");
    expect(first('<Video src="media/x.mp4" loop />\n').code).toBe("prop-value");
  });

  it("rejects duplicate props", () => {
    expect(first('<Badge label="a" label="b" />\n').code).toBe("duplicate-prop");
  });

  it("rejects spread attributes", () => {
    expect(first('<Badge {...props} label="a" />\n').code).toBe("expression");
  });

  it("rejects fragments", () => {
    expect(first("<>Text</>\n").code).toBe("fragment");
  });

  it("rejects children where none are allowed", () => {
    expect(first('<Badge label="a">Text</Badge>\n').code).toBe("children");
    expect(first('<Screenshot src="media/x.png" alt="x">\nText\n</Screenshot>\n').code).toBe("children");
  });

  it("rejects Kbd with markup inside", () => {
    expect(first("Press <Kbd>**⌘**</Kbd>\n").code).toBe("children");
  });

  it("rejects strangers inside Steps, Features and Gallery", () => {
    expect(first("<Steps>\nText\n</Steps>\n").code).toBe("children");
    expect(codes('<Steps>\n<Feature title="x">\nText\n</Feature>\n</Steps>\n')).toEqual(["children", "misplaced"]);
    expect(codes('<Features>\n<Step title="x">\nText\n</Step>\n</Features>\n')).toEqual(["children", "misplaced"]);
    expect(codes('<Gallery>\n<Badge label="x" />\n</Gallery>\n')).toEqual(["children"]);
  });

  it("asks for block components on their own lines", () => {
    const violation = first('<Steps>\n<Step title="x">Text</Step>\n</Steps>\n');
    expect(violation.code).toBe("placement");
    expect(violation.message).toBe("<Step> must start on its own line, with its content on the lines between the tags");
    expect(codes('<Steps>\n<Step title="x">Text</Step>\n</Steps>\n')).toEqual(["placement"]);
    expect(codes('<Gallery><Screenshot src="media/a.png" alt="a" /></Gallery>\n')).toEqual([]);
    expect(first('Text <Screenshot src="media/a.png" alt="a" />\n').message).toBe("<Screenshot … /> must stand on its own line");
    expect(codes('Text <Callout>inline</Callout>\n')).toEqual(["placement"]);
  });

  it("allows Kbd and Badge inline", () => {
    expect(validate('Press <Kbd>⌘</Kbd> <Badge label="new" /> now\n')).toEqual([]);
  });

  it("rejects Step and Feature outside their parents", () => {
    expect(codes('<Step title="x">\nText\n</Step>\n')).toEqual(["misplaced"]);
    expect(codes('<Feature title="x">\nText\n</Feature>\n')).toEqual(["misplaced"]);
    expect(codes('<Callout>\n<Step title="x">\nText\n</Step>\n</Callout>\n')).toEqual(["misplaced"]);
  });

  it("rejects an empty required prop and a non-https Requirement url", () => {
    expect(codes('<Steps>\n<Step title="">\nText\n</Step>\n</Steps>\n')).toEqual(["prop-value"]);
    expect(codes('<Requirement command="x" url="http://example.com">\nText\n</Requirement>\n')).toEqual(["link"]);
  });

  it("reports MDX syntax errors with a position", () => {
    const violation = first("<Callout>\nunclosed\n");
    expect(violation.code).toBe("syntax");
    expect(violation.line).toBeGreaterThan(0);
  });

  it("orders violations by position", () => {
    const violations = validate("Text {1}\n\n# Title\n");
    expect(violations.map((violation) => violation.line)).toEqual([1, 3]);
  });
});

describe("collectMedia", () => {
  it("lists image and video paths with positions", () => {
    const { tree } = parseDocument(valid);
    const paths = collectMedia(tree).map((reference) => `${reference.kind}:${reference.path}`);
    expect(paths).toEqual([
      "image:media/editor.png",
      "image:media/one.png",
      "image:media/two.jpg",
      "video:media/tour.mp4",
      "image:media/editor.png",
    ]);
    expect(collectMedia(tree)[0]!.line).toBeGreaterThan(1);
  });
});
