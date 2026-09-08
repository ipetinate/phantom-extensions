import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Document } from "../src/render.tsx";
import { validate } from "../src/validate.ts";
import { SearchField } from "../src/components/SearchField.tsx";

function draw(text: string) {
  const view = render(<Document source={text} baseURL="file:///tmp/x/" />);
  expect(view.container.querySelector(".ph-failure")).toBeNull();
  return view;
}

function field(container: HTMLElement): HTMLInputElement {
  return container.querySelector(".ph-search-input") as HTMLInputElement;
}

describe("SearchField", () => {
  it("accepts a bare field, with and without labels", () => {
    expect(validate("<SearchField />\n")).toEqual([]);
    expect(validate('<SearchField label="Search the icons" placeholder="Name or suffix" />\n')).toEqual([]);
  });

  it("takes what the reader types and filters nothing on its own", () => {
    const { container } = draw("<SearchField />\n");
    fireEvent.change(field(container), { target: { value: "react" } });
    expect(field(container).value).toBe("react");
  });

  it("names itself Search when the author gives it no label", () => {
    const { container } = draw("<SearchField />\n");
    expect(field(container).getAttribute("aria-label")).toBe("Search");
    expect(field(container).getAttribute("placeholder")).toBe("Search");
  });

  it("takes the author's label and placeholder", () => {
    const { container } = draw('<SearchField label="Search the icons" placeholder="Name or suffix" />\n');
    expect(field(container).getAttribute("aria-label")).toBe("Search the icons");
    expect(field(container).getAttribute("placeholder")).toBe("Name or suffix");
  });

  it("hides the clear button until there is something to clear", () => {
    const { container } = draw("<SearchField />\n");
    const clear = container.querySelector(".ph-search-clear") as HTMLButtonElement;
    expect(clear.hidden).toBe(true);
    fireEvent.change(field(container), { target: { value: "react" } });
    expect(clear.hidden).toBe(false);
    fireEvent.click(clear);
    expect(field(container).value).toBe("");
    expect(clear.hidden).toBe(true);
  });

  it("reports every keystroke and draws the value its caller passes", () => {
    const onChange = vi.fn();
    const { container, rerender } = render(<SearchField value="ts" onChange={onChange} />);
    expect(field(container).value).toBe("ts");
    fireEvent.change(field(container), { target: { value: "tsx" } });
    expect(onChange).toHaveBeenCalledWith("tsx");
    expect(field(container).value).toBe("ts");
    rerender(<SearchField value="tsx" onChange={onChange} />);
    expect(field(container).value).toBe("tsx");
  });

  it("reports an empty value when the reader clears a controlled field", () => {
    const onChange = vi.fn();
    const { container } = render(<SearchField value="ts" onChange={onChange} />);
    fireEvent.click(container.querySelector(".ph-search-clear") as HTMLButtonElement);
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("takes no children and no prop it does not have", () => {
    expect(validate("<SearchField>text</SearchField>\n").map((v) => v.code)).toEqual(["placement"]);
    expect(validate('<SearchField value="ts" />\n').map((v) => v.code)).toEqual(["unknown-prop"]);
  });
});
