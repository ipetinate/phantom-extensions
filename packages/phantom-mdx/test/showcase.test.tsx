import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Document } from "../src/render.tsx";
import { validate } from "../src/validate.ts";

const source = [
  "<Showcase>",
  "  <Features columns=\"3\">",
  "    <Feature title=\"One\">",
  "      Text",
  "    </Feature>",
  "  </Features>",
  "  <Screenshot src=\"media/a.png\" alt=\"A\" />",
  "</Showcase>",
  "",
].join("\n");

describe("Showcase", () => {
  it("lays the features and the media out in one grid", () => {
    expect(validate(source)).toEqual([]);
    const { container } = render(<Document source={source} baseURL="file:///tmp/x/" />);
    expect(container.querySelector(".ph-failure")).toBeNull();
    const showcase = container.querySelector(".ph-showcase-end");
    expect(showcase?.querySelector(".ph-features")).not.toBeNull();
    expect(showcase?.querySelector(".ph-screenshot")).not.toBeNull();
  });

  it("puts the media first when asked", () => {
    const { container } = render(
      <Document source={source.replace("<Showcase>", "<Showcase media=\"start\">")} baseURL="file:///tmp/x/" />,
    );
    expect(container.querySelector(".ph-showcase-start")).not.toBeNull();
  });

  it("refuses a child it does not lay out and an unknown side", () => {
    const codes = validate("<Showcase>\n  <Callout>\n    Text\n  </Callout>\n</Showcase>\n").map((v) => v.code);
    expect(codes).toContain("children");
    const sides = validate(source.replace("<Showcase>", "<Showcase media=\"middle\">")).map((v) => v.code);
    expect(sides).toContain("bad-enum");
  });
});
