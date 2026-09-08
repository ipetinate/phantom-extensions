import { describe, expect, it, vi } from "vitest";
import { ELEMENTS, TAG_NAMES, defineAll, warnIfUnstyled } from "../src/index.ts";
import "./support.ts";

describe("defineAll", () => {
  it("defines every element in the kit", () => {
    for (const tag of TAG_NAMES) {
      expect(customElements.get(tag)).toBeDefined();
    }
  });

  it("names one element per tag, and no tag twice", () => {
    expect(TAG_NAMES).toHaveLength(ELEMENTS.length);
    expect(new Set(TAG_NAMES).size).toBe(TAG_NAMES.length);
  });

  it("names every tag the way a custom element has to be named", () => {
    for (const tag of TAG_NAMES) {
      expect(tag).toMatch(/^phantom-[a-z-]+$/);
    }
  });

  it("leaves a tag another copy of the kit already defined alone", () => {
    expect(() => defineAll({ checkStylesheet: false })).not.toThrow();
  });

  it("defines into the registry it is given", () => {
    const defined: string[] = [];
    const registry = {
      get: () => undefined,
      define: (tag: string) => defined.push(tag),
    } as unknown as CustomElementRegistry;

    defineAll({ registry, checkStylesheet: false });

    expect(defined).toEqual([...TAG_NAMES]);
  });
});

describe("warnIfUnstyled", () => {
  it("says so once when the stylesheet is missing", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(warnIfUnstyled()).toBe(false);
    expect(warnIfUnstyled()).toBe(false);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toContain("kit.css");

    warn.mockRestore();
  });

  it("says nothing when the marker the stylesheet sets is there", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const root = document.createElement("div");
    root.style.setProperty("--pk-loaded", "1");
    document.body.append(root);

    expect(warnIfUnstyled(root)).toBe(true);
    expect(warn).not.toHaveBeenCalled();

    root.remove();
    warn.mockRestore();
  });
});
