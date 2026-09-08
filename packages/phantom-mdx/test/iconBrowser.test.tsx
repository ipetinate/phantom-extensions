import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DocumentContext } from "../src/context.ts";
import { validate } from "../src/validate.ts";
import { IconBrowser, ROW_HEIGHT } from "../src/components/IconBrowser.tsx";

const BASE = "file:///tmp/ext/";

function themeFile(count: number) {
  const iconDefinitions: Record<string, { iconPath: string }> = {
    folder: { iconPath: "./icons/folder.svg" },
    unmapped: { iconPath: "./icons/unmapped.svg" },
  };
  const fileExtensions: Record<string, string> = {};
  for (let index = 0; index < count; index += 1) {
    iconDefinitions[`icon-${index}`] = { iconPath: `./icons/icon-${index}.svg` };
    fileExtensions[`e${index}`] = `icon-${index}`;
  }
  return { iconDefinitions, fileExtensions, folderNames: { src: "folder" } };
}

function mount(count: number, warn = vi.fn()) {
  const load = vi.fn(() => Promise.resolve(themeFile(count) as unknown));
  const view = render(
    <DocumentContext.Provider value={{ baseURL: BASE, warn }}>
      <IconBrowser theme="symbols" load={load} />
    </DocumentContext.Provider>,
  );
  return { ...view, load, warn };
}

function tiles(container: HTMLElement): string[] {
  return [...container.querySelectorAll(".ph-ib-name")].map((name) => name.textContent as string);
}

function search(container: HTMLElement, value: string): void {
  fireEvent.change(container.querySelector(".ph-search-input") as HTMLInputElement, { target: { value } });
}

function segment(container: HTMLElement, label: string): void {
  const chip = [...container.querySelectorAll("button.ph-filter")].find(
    (button) => button.querySelector(".ph-filter-label")!.textContent === label,
  );
  fireEvent.click(chip as HTMLButtonElement);
}

describe("IconBrowser", () => {
  it("accepts a page that names a theme directory", () => {
    expect(validate('<IconBrowser theme="material-icons" title="Material Icon Theme" height="tall" />\n')).toEqual([]);
  });

  it("reads the theme file once, whatever the theme holds", async () => {
    const { container, load } = mount(400);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    expect(load).toHaveBeenCalledTimes(1);
    expect(load).toHaveBeenCalledWith("file:///tmp/ext/symbols/icon-theme.json");
  });

  it("frames the icons as a window with traffic lights, a toolbar and a scrolling body", async () => {
    const { container } = mount(40);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    const parts = [...(container.querySelector(".ph-win") as HTMLElement).children].map((child) => child.className);
    expect(parts).toEqual(["ph-win-titlebar", "ph-win-toolbar", "ph-win-body"]);
    expect(container.querySelectorAll(".ph-win-light")).toHaveLength(3);
    expect(container.querySelector(".ph-win-title")!.textContent).toBe("symbols");
    expect(container.querySelector(".ph-win-toolbar .ph-search")).not.toBeNull();
    expect(container.querySelector(".ph-win-toolbar .ph-filters-one")).not.toBeNull();
    expect(container.querySelector(".ph-win-body .ph-ib-list")).not.toBeNull();
  });

  it("draws only the rows the box holds, not one node per icon", async () => {
    const { container } = mount(1251);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    const drawn = container.querySelectorAll(".ph-ib-icon").length;
    expect(drawn).toBeGreaterThan(0);
    expect(drawn).toBeLessThan(120);
    expect(container.querySelector(".ph-ib-caption")!.textContent).toBe("1253 of the 1253 icons symbols/icon-theme.json names.");
  });

  it("keeps the scrollbar the length the whole list would have been", async () => {
    const { container } = mount(1251);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    const spaces = [...container.querySelectorAll<HTMLElement>(".ph-ib-space")];
    const rows = container.querySelectorAll(".ph-ib-row").length;
    const held = spaces.reduce((total, space) => total + Number.parseInt(space.style.height, 10), 0);
    expect(held + rows * ROW_HEIGHT).toBeGreaterThan(1251 * 4);
  });

  it("draws the artwork from the staged theme directory, one file per icon it shows", async () => {
    const { container } = mount(40);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    const first = container.querySelector(".ph-ib-art img") as HTMLImageElement;
    expect(first.getAttribute("src")).toBe("file:///tmp/ext/symbols/icons/folder.svg");
    expect(first.getAttribute("alt")).toBe("");
  });

  it("narrows the list to what the reader types", async () => {
    const { container } = mount(40);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    search(container, "icon-12");
    expect(tiles(container)).toEqual(["icon-12"]);
  });

  it("finds an icon by the suffix it draws", async () => {
    const { container } = mount(40);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    search(container, "e7");
    expect(tiles(container)).toEqual(["icon-7"]);
    expect(container.querySelector(".ph-ib-draws")!.textContent).toBe("e7");
  });

  it("says so when nothing matches", async () => {
    const { container } = mount(40);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    search(container, "nothing-draws-this");
    expect(container.querySelectorAll(".ph-ib-icon")).toHaveLength(0);
    expect(container.querySelector(".ph-ib-note")!.textContent).toContain("nothing-draws-this");
  });

  it("offers one category at a time, counted, and All first", async () => {
    const { container } = mount(40);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    const chips = [...container.querySelectorAll(".ph-filter-label")].map((chip) => chip.textContent);
    expect(chips).toEqual(["All", "Files", "Folders", "Unused"]);
    expect(container.querySelector(".ph-filters-one")!.getAttribute("role")).toBe("radiogroup");
  });

  it("holds a category and keeps the search running inside it", async () => {
    const { container } = mount(40);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    segment(container, "Folders");
    expect(tiles(container)).toEqual(["folder"]);
    segment(container, "Unused");
    expect(tiles(container)).toEqual(["unmapped"]);
    search(container, "folder");
    expect(tiles(container)).toEqual([]);
    segment(container, "All");
    expect(tiles(container)).toEqual(["folder"]);
  });

  it("says what an icon nothing points at is", async () => {
    const { container } = mount(2);
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    search(container, "unmapped");
    expect(container.querySelector(".ph-ib-draws")!.textContent).toBe("not mapped");
  });

  it("says it could not read the theme file, and warns the author", async () => {
    const warn = vi.fn();
    const { container } = render(
      <DocumentContext.Provider value={{ baseURL: BASE, warn }}>
        <IconBrowser theme="symbols" load={() => Promise.reject(new Error("no"))} />
      </DocumentContext.Provider>,
    );
    await waitFor(() => expect(container.querySelector(".ph-ib-note")).not.toBeNull());
    expect(container.querySelector(".ph-win-body .ph-ib-note")!.textContent).toContain("symbols/icon-theme.json");
    expect(warn).toHaveBeenCalledWith('IconBrowser "symbols" could not read symbols/icon-theme.json and drew no icons');
    expect(container.querySelector(".ph-win-titlebar")).not.toBeNull();
  });

  it("reads nothing outside the extension", async () => {
    const warn = vi.fn();
    const load = vi.fn(() => Promise.resolve(themeFile(2) as unknown));
    render(
      <DocumentContext.Provider value={{ baseURL: BASE, warn }}>
        <IconBrowser theme="../../etc" load={load} />
      </DocumentContext.Provider>,
    );
    await waitFor(() => expect(warn).toHaveBeenCalled());
    expect(load).not.toHaveBeenCalled();
    expect(warn.mock.calls[0]![0]).toContain("does not name a theme directory inside the extension");
  });

  it("warns and draws nothing when the theme file names no icon", async () => {
    const warn = vi.fn();
    const { container } = render(
      <DocumentContext.Provider value={{ baseURL: BASE, warn }}>
        <IconBrowser theme="symbols" load={() => Promise.resolve({} as unknown)} />
      </DocumentContext.Provider>,
    );
    await waitFor(() => expect(warn).toHaveBeenCalled());
    expect(warn.mock.calls[0]![0]).toContain("found no icons");
    expect(container.querySelectorAll(".ph-ib-icon")).toHaveLength(0);
  });

  it("takes the window title the author gives it", async () => {
    const { container } = render(
      <DocumentContext.Provider value={{ baseURL: BASE, warn: vi.fn() }}>
        <IconBrowser theme="symbols" title="Symbols — 351 icons" height="short" load={() => Promise.resolve(themeFile(2) as unknown)} />
      </DocumentContext.Provider>,
    );
    await waitFor(() => expect(container.querySelector(".ph-ib-row")).not.toBeNull());
    expect(container.querySelector(".ph-win-title")!.textContent).toBe("Symbols — 351 icons");
    expect(container.querySelector(".ph-win-short")).not.toBeNull();
  });

  it("refuses a theme that is a path, and needs one at all", () => {
    expect(validate('<IconBrowser theme="../../etc" />\n').map((v) => v.code)).toEqual(["directory"]);
    expect(validate('<IconBrowser theme="a/b" />\n').map((v) => v.code)).toEqual(["directory"]);
    expect(validate("<IconBrowser />\n").map((v) => v.code)).toEqual(["missing-prop"]);
    expect(validate('<IconBrowser theme="symbols">text</IconBrowser>\n').map((v) => v.code)).toEqual(["placement"]);
  });
});
