import { describe, expect, it } from "vitest";
import { PhantomElement } from "../src/element.ts";
import type { PhantomEmptyState } from "../src/emptyState.ts";
import type { PhantomHeader } from "../src/header.ts";
import type { PhantomSection } from "../src/section.ts";
import { mount } from "./support.ts";

function parts(element: Element): string[] {
  return Array.from(element.children)
    .filter((child) => child.hasAttribute(PhantomElement.partAttribute))
    .map((child) => child.getAttribute(PhantomElement.partAttribute) as string);
}

function partNode(element: Element, name: string): Element | null {
  return element.querySelector(`[${PhantomElement.partAttribute}="${name}"]`);
}

describe("phantom-header", () => {
  it("draws the heading before the actions the author wrote", () => {
    const header = mount(`
      <phantom-header heading="Requests">
        <phantom-button variant="icon">+</phantom-button>
      </phantom-header>
    `).querySelector("phantom-header") as PhantomHeader;

    expect(partNode(header, "heading")?.textContent).toBe("Requests");
    expect(header.firstElementChild).toBe(partNode(header, "heading"));
    expect(header.lastElementChild?.tagName.toLowerCase()).toBe("phantom-button");
  });

  it("follows the heading it is given, and drops it when it goes", () => {
    const header = mount(`<phantom-header heading="Requests"></phantom-header>`).querySelector(
      "phantom-header",
    ) as PhantomHeader;

    header.heading = "Environments";
    expect(partNode(header, "heading")?.textContent).toBe("Environments");

    header.heading = null;
    expect(partNode(header, "heading")).toBeNull();
  });
});

describe("phantom-section", () => {
  it("draws the label, and a badge only for a count worth drawing", () => {
    const section = mount(`<phantom-section label="Excludes"><input /></phantom-section>`).querySelector(
      "phantom-section",
    ) as PhantomSection;

    const label = partNode(section, "label") as HTMLElement;
    expect(label.textContent).toBe("Excludes");
    expect(label.querySelector("phantom-badge")).toBeNull();

    section.count = 2;
    expect(label.querySelector("phantom-badge")?.textContent).toBe("2");

    section.count = 0;
    expect(label.querySelector("phantom-badge")).toBeNull();
  });

  it("ignores a count that is not a number", () => {
    const section = mount(`<phantom-section label="Excludes" count="lots"></phantom-section>`).querySelector(
      "phantom-section",
    ) as PhantomSection;

    expect(section.count).toBeNull();
    expect(partNode(section, "label")?.querySelector("phantom-badge")).toBeNull();
  });

  it("keeps the label above the content the author wrote", () => {
    const section = mount(`<phantom-section label="Excludes"><input /></phantom-section>`).querySelector(
      "phantom-section",
    ) as PhantomSection;

    expect(section.firstElementChild).toBe(partNode(section, "label"));
  });
});

describe("phantom-empty-state", () => {
  it("draws the art, the heading and the description in that order, before the actions", () => {
    const empty = mount(`
      <phantom-empty-state icon="icons/bruno.png" heading="No requests" description="Open a folder with .bru files.">
        <phantom-button variant="prominent">New request</phantom-button>
      </phantom-empty-state>
    `).querySelector("phantom-empty-state") as PhantomEmptyState;

    expect(parts(empty)).toEqual(["art", "heading", "description"]);
    expect(empty.lastElementChild?.tagName.toLowerCase()).toBe("phantom-button");
    expect((partNode(empty, "art") as HTMLImageElement).getAttribute("src")).toBe("icons/bruno.png");
    expect(partNode(empty, "art")?.getAttribute("aria-hidden")).toBe("true");
    expect(partNode(empty, "heading")?.textContent).toBe("No requests");
    expect(partNode(empty, "description")?.textContent).toBe("Open a folder with .bru files.");
  });

  it("draws only what it was given", () => {
    const empty = mount(`<phantom-empty-state heading="No requests"></phantom-empty-state>`).querySelector(
      "phantom-empty-state",
    ) as PhantomEmptyState;

    expect(parts(empty)).toEqual(["heading"]);

    empty.icon = "media/icon.png";
    empty.description = "Nothing yet.";
    expect(parts(empty)).toEqual(["art", "heading", "description"]);
  });

  it("keeps the actions after the text when one arrives later", () => {
    const empty = mount(
      `<phantom-empty-state heading="No requests" description="Nothing yet."></phantom-empty-state>`,
    ).querySelector("phantom-empty-state") as PhantomEmptyState;

    const action = document.createElement("phantom-button");
    empty.append(action);
    empty.heading = "Still nothing";

    expect(parts(empty)).toEqual(["heading", "description"]);
    expect(empty.lastElementChild).toBe(action);
  });
});
