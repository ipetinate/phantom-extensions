import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Document } from "../src/render.tsx";
import { validate } from "../src/validate.ts";
import { needsEdge } from "../src/components/Swatches.tsx";

const source = [
  '<Swatches columns="3">',
  '  <Swatch color="#2e3440" name="Background" />',
  '  <Swatch color="#bf616a" name="Red" />',
  '  <Swatch color="#eceff4" name="Bright white" />',
  "</Swatches>",
  "",
].join("\n");

function draw(text: string) {
  const view = render(<Document source={text} baseURL="file:///tmp/x/" />);
  expect(view.container.querySelector(".ph-failure")).toBeNull();
  return view;
}

describe("Swatches", () => {
  it("accepts a row of swatches", () => {
    expect(validate(source)).toEqual([]);
  });

  it("draws a block, the hex and the role name for each colour", () => {
    const { container } = draw(source);
    const swatches = [...container.querySelectorAll<HTMLElement>(".ph-swatch")];
    expect(swatches.length).toBe(3);
    expect(swatches[0]!.style.getPropertyValue("--ph-swatch-color")).toBe("#2e3440");
    expect(swatches[0]!.querySelector(".ph-swatch-block")).not.toBeNull();
    expect(swatches[0]!.querySelector(".ph-swatch-hex")!.textContent).toBe("#2e3440");
    expect(swatches[0]!.querySelector(".ph-swatch-name")!.textContent).toBe("Background");
  });

  it("lays the row out in the number of columns it was given", () => {
    expect(draw(source).container.querySelector(".ph-swatches-3")).not.toBeNull();
    expect(draw(source.replace(' columns="3"', "")).container.querySelector(".ph-swatches")!.className).toBe("ph-swatches");
  });

  it("draws a hairline only around a colour that would vanish into the page", () => {
    const { container } = draw(source);
    const edged = [...container.querySelectorAll(".ph-swatch")].map((swatch) => swatch.classList.contains("has-edge"));
    expect(edged).toEqual([true, false, true]);
  });

  it("decides the hairline from the colour, not from the swatch", () => {
    expect(needsEdge("#2e3440")).toBe(true);
    expect(needsEdge("#fbfbfd")).toBe(true);
    expect(needsEdge("#bf616a")).toBe(false);
    expect(needsEdge("#a3be8c")).toBe(false);
    expect(needsEdge("#81a1c1")).toBe(false);
  });

  it("refuses a colour that is not hex, a stranger inside the row and an unknown prop", () => {
    expect(validate('<Swatches>\n  <Swatch color="nord0" name="Black" />\n</Swatches>\n').map((v) => v.code)).toEqual(["color"]);
    expect(validate('<Swatches>\n  <Badge label="x" />\n</Swatches>\n').map((v) => v.code)).toEqual(["children"]);
    expect(validate('<Swatches>\n  <Swatch color="#000" name="X" hex="#000" />\n</Swatches>\n').map((v) => v.code)).toEqual([
      "unknown-prop",
    ]);
    expect(validate('<Swatches columns="9">\n  <Swatch color="#000" name="X" />\n</Swatches>\n').map((v) => v.code)).toEqual([
      "bad-enum",
    ]);
  });

  it("needs both a colour and a name, and refuses a Swatch outside the row", () => {
    expect(validate("<Swatches>\n  <Swatch />\n</Swatches>\n").map((v) => v.message)).toEqual([
      "<Swatch> needs color",
      "<Swatch> needs name",
    ]);
    expect(validate('<Swatch color="#000" name="X" />\n').map((v) => v.code)).toEqual(["misplaced"]);
  });
});
