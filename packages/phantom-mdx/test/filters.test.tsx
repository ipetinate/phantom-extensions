import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Document } from "../src/render.tsx";
import { validate } from "../src/validate.ts";
import { Filter, Filters, filterMode, filterOptions, nextSelection, seedSelection, stepIndex } from "../src/components/Filters.tsx";

function draw(text: string) {
  const view = render(<Document source={text} baseURL="file:///tmp/x/" />);
  expect(view.container.querySelector(".ph-failure")).toBeNull();
  return view;
}

function labels(container: HTMLElement, selector = ".ph-filter"): string[] {
  return [...container.querySelectorAll(selector)].map((chip) => chip.querySelector(".ph-filter-label")!.textContent as string);
}

function on(container: HTMLElement): string[] {
  return labels(container, ".ph-filter.is-on");
}

function press(container: HTMLElement, label: string): void {
  const chip = [...container.querySelectorAll("button.ph-filter")].find(
    (button) => button.querySelector(".ph-filter-label")!.textContent === label,
  );
  fireEvent.click(chip as HTMLButtonElement);
}

const segmented = ['<Filters mode="one" label="Kinds">', '  <Filter label="Files" count="214" />', '  <Filter label="Folders" count="80" />', '  <Filter label="Languages" />', "</Filters>", ""].join("\n");

const multiple = ['<Filters mode="any" label="Tags">', '  <Filter label="Files" />', '  <Filter label="Folders" selected="true" />', '  <Filter label="Languages" selected="true" />', "</Filters>", ""].join("\n");

describe("Filters, segmented", () => {
  it("accepts a segmented row", () => {
    expect(validate(segmented)).toEqual([]);
  });

  it("is a radio group, and holds exactly one segment", () => {
    const { container } = draw(segmented);
    const group = container.querySelector(".ph-filters-one") as HTMLElement;
    expect(group.getAttribute("role")).toBe("radiogroup");
    expect(group.getAttribute("aria-label")).toBe("Kinds");
    expect(labels(container)).toEqual(["Files", "Folders", "Languages"]);
    expect(on(container)).toEqual(["Files"]);
  });

  it("marks the held segment for a reader and for a screen reader", () => {
    const { container } = draw(segmented);
    const chips = [...container.querySelectorAll("button.ph-filter")];
    expect(chips.map((chip) => chip.getAttribute("aria-checked"))).toEqual(["true", "false", "false"]);
    expect(chips.map((chip) => chip.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"]);
  });

  it("holds the segment the author declared", () => {
    const { container } = draw(segmented.replace('<Filter label="Folders" count="80" />', '<Filter label="Folders" count="80" selected="true" />'));
    expect(on(container)).toEqual(["Folders"]);
  });

  it("moves the selection when a segment is pressed, and never holds two", () => {
    const { container } = draw(segmented);
    press(container, "Languages");
    expect(on(container)).toEqual(["Languages"]);
    press(container, "Folders");
    expect(on(container)).toEqual(["Folders"]);
  });

  it("prints the count beside the label when the author gives one", () => {
    const { container } = draw(segmented);
    expect([...container.querySelectorAll(".ph-filter-count")].map((count) => count.textContent)).toEqual(["214", "80"]);
  });
});

describe("Filters, multiple choice", () => {
  it("accepts a multiple choice row", () => {
    expect(validate(multiple)).toEqual([]);
  });

  it("is a group of toggles, and starts on everything the author declared", () => {
    const { container } = draw(multiple);
    const group = container.querySelector(".ph-filters-any") as HTMLElement;
    expect(group.getAttribute("role")).toBe("group");
    expect(on(container)).toEqual(["Folders", "Languages"]);
    expect([...container.querySelectorAll("button.ph-filter")].map((chip) => chip.getAttribute("aria-pressed"))).toEqual([
      "false",
      "true",
      "true",
    ]);
  });

  it("toggles each choice on its own", () => {
    const { container } = draw(multiple);
    press(container, "Files");
    expect(on(container)).toEqual(["Files", "Folders", "Languages"]);
    press(container, "Folders");
    expect(on(container)).toEqual(["Files", "Languages"]);
  });

  it("can end up with nothing selected", () => {
    const { container } = draw(multiple);
    press(container, "Folders");
    press(container, "Languages");
    expect(on(container)).toEqual([]);
  });

  it("selects nothing at the start when the author declares nothing", () => {
    expect(on(draw(multiple.replaceAll(' selected="true"', "")).container)).toEqual([]);
  });
});

describe("Filters, controlled", () => {
  it("draws the selection its caller passes and reports the next one", () => {
    const onChange = vi.fn();
    const { container, rerender } = render(
      <Filters mode="one" value={["Folders"]} onChange={onChange}>
        <Filter label="Files" />
        <Filter label="Folders" />
      </Filters>,
    );
    expect(on(container)).toEqual(["Folders"]);
    press(container, "Files");
    expect(onChange).toHaveBeenCalledWith(["Files"]);
    expect(on(container)).toEqual(["Folders"]);
    rerender(
      <Filters mode="one" value={["Files"]} onChange={onChange}>
        <Filter label="Files" />
        <Filter label="Folders" />
      </Filters>,
    );
    expect(on(container)).toEqual(["Files"]);
  });

  it("reports every choice in the multiple choice shape", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Filters mode="any" value={["Files"]} onChange={onChange}>
        <Filter label="Files" />
        <Filter label="Folders" />
      </Filters>,
    );
    press(container, "Folders");
    expect(onChange).toHaveBeenCalledWith(["Files", "Folders"]);
  });
});

describe("Filters, keyboard", () => {
  it("moves the selection with the arrow keys in the segmented shape", () => {
    const { container } = draw(segmented);
    const group = container.querySelector(".ph-filters") as HTMLElement;
    (container.querySelector("button.ph-filter") as HTMLButtonElement).focus();
    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(on(container)).toEqual(["Folders"]);
    fireEvent.keyDown(group, { key: "End" });
    expect(on(container)).toEqual(["Languages"]);
    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(on(container)).toEqual(["Files"]);
  });

  it("moves focus but not the selection in the multiple choice shape", () => {
    const { container } = draw(multiple);
    const group = container.querySelector(".ph-filters") as HTMLElement;
    const chips = [...container.querySelectorAll("button.ph-filter")] as HTMLButtonElement[];
    chips[0]!.focus();
    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(document.activeElement).toBe(chips[1]);
    expect(on(container)).toEqual(["Folders", "Languages"]);
  });
});

describe("Filter on its own", () => {
  it("draws a chip with the author's state and nothing to press", () => {
    const { container } = render(
      <>
        <Filter label="Files" selected="true" />
        <Filter label="Folders" />
      </>,
    );
    expect(container.querySelectorAll("button.ph-filter")).toHaveLength(0);
    expect(on(container)).toEqual(["Files"]);
  });
});

describe("Filters, the rules the checker enforces", () => {
  it("refuses a mode it does not draw, a stranger in the row and a chip outside a row", () => {
    expect(validate('<Filters mode="some">\n  <Filter label="A" />\n</Filters>\n').map((v) => v.code)).toEqual(["bad-enum"]);
    expect(validate('<Filters>\n  <Badge label="A" />\n</Filters>\n').map((v) => v.code)).toEqual(["children"]);
    expect(validate('<Filter label="A" />\n').map((v) => v.code)).toEqual(["misplaced"]);
    expect(validate("<Filters>\n  <Filter />\n</Filters>\n").map((v) => v.code)).toEqual(["missing-prop"]);
    expect(validate('<Filters>\n  <Filter label="A" selected="yes" />\n</Filters>\n').map((v) => v.code)).toEqual(["bad-enum"]);
  });
});

describe("the pure parts", () => {
  it("reads the options out of the author's children, through a paragraph", () => {
    expect(filterOptions([<Filter key="a" label="A" selected="true" />, <Filter key="b" label="B" count="3" />])).toEqual([
      { label: "A", count: undefined, selected: true },
      { label: "B", count: "3", selected: false },
    ]);
    expect(
      filterOptions(
        <p>
          <Filter label="A" />
        </p>,
      ),
    ).toEqual([{ label: "A", count: undefined, selected: false }]);
    expect(filterOptions("text")).toEqual([]);
  });

  it("falls back to the one mode for a mode it does not know", () => {
    expect(filterMode("any")).toBe("any");
    expect(filterMode("one")).toBe("one");
    expect(filterMode(undefined)).toBe("one");
    expect(filterMode("segmented")).toBe("one");
  });

  it("seeds one selection from the first declared option, and every declared one in the any mode", () => {
    const options = [
      { label: "A", selected: false },
      { label: "B", selected: true },
      { label: "C", selected: true },
    ];
    expect([...seedSelection("one", options)]).toEqual(["B"]);
    expect([...seedSelection("any", options)]).toEqual(["B", "C"]);
    expect([...seedSelection("one", [{ label: "A", selected: false }])]).toEqual(["A"]);
    expect([...seedSelection("any", [{ label: "A", selected: false }])]).toEqual([]);
    expect([...seedSelection("one", [])]).toEqual([]);
  });

  it("replaces the selection in the one mode and toggles it in the any mode", () => {
    expect([...nextSelection("one", new Set(["A"]), "B")]).toEqual(["B"]);
    expect([...nextSelection("any", new Set(["A"]), "B")]).toEqual(["A", "B"]);
    expect([...nextSelection("any", new Set(["A", "B"]), "B")]).toEqual(["A"]);
  });

  it("wraps around the row and jumps to either end", () => {
    expect(stepIndex("ArrowRight", 2, 3)).toBe(0);
    expect(stepIndex("ArrowLeft", 0, 3)).toBe(2);
    expect(stepIndex("ArrowDown", 0, 3)).toBe(1);
    expect(stepIndex("Home", 2, 3)).toBe(0);
    expect(stepIndex("End", 0, 3)).toBe(2);
    expect(stepIndex("Enter", 0, 3)).toBeNull();
  });
});
