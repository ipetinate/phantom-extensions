import { describe, expect, it, vi } from "vitest";
import { HOST_COLOURS, applyTheme, bindTheme, labelOn, type Theme } from "../src/theme.ts";
import "./support.ts";

const full: Theme = {
  scheme: "light",
  baseSize: 12,
  fonts: { ui: "Inter", mono: "Berkeley Mono" },
  colors: {
    bg: "#ffffff",
    fg: "#111111",
    accent: "#2f6fd0",
    muted: "#666666",
    border: "#dddddd",
    codeBg: "#f4f4f4",
    danger: "#c8353f",
    warning: "#a06a12",
    success: "#2f7d4a",
  },
};

describe("applyTheme", () => {
  it("writes every colour the host sends", () => {
    applyTheme(full);

    for (const colour of HOST_COLOURS) {
      expect(document.documentElement.style.getPropertyValue(`--${colour}`)).toBe(full.colors?.[colour]);
    }
  });

  it("writes the fonts, the base size and the scheme", () => {
    applyTheme(full);

    const style = document.documentElement.style;
    expect(style.getPropertyValue("--font-ui")).toBe("Inter");
    expect(style.getPropertyValue("--font-mono")).toBe("Berkeley Mono");
    expect(style.getPropertyValue("--base-size")).toBe("12px");
    expect(document.documentElement.dataset["scheme"]).toBe("light");
  });

  it("treats a scheme that is not light as dark", () => {
    applyTheme({ scheme: "midnight" });

    expect(document.documentElement.dataset["scheme"]).toBe("dark");
  });

  it("leaves a field the host left out alone", () => {
    applyTheme({ colors: { fg: "#111111" }, baseSize: 0, fonts: { ui: "" } });

    const style = document.documentElement.style;
    expect(style.getPropertyValue("--fg")).toBe("#111111");
    expect(style.getPropertyValue("--bg")).toBe("");
    expect(style.getPropertyValue("--base-size")).toBe("");
    expect(style.getPropertyValue("--font-ui")).toBe("");
  });

  it("puts a dark label on a bright accent and a light one on a dark accent", () => {
    applyTheme({ colors: { accent: "#f5d90a" } });
    expect(document.documentElement.style.getPropertyValue("--pk-on-accent")).toBe("#101014");

    applyTheme({ colors: { accent: "rgb(20, 40, 90)" } });
    expect(document.documentElement.style.getPropertyValue("--pk-on-accent")).toBe("#ffffff");
  });

  it("prefers a label the host names itself", () => {
    applyTheme({ colors: { accent: "#f5d90a", onAccent: "#001100" } });

    expect(document.documentElement.style.getPropertyValue("--pk-on-accent")).toBe("#001100");
  });

  it("writes into the element it is given", () => {
    const panel = document.createElement("div");
    applyTheme({ colors: { fg: "#222222" } }, panel);

    expect(panel.style.getPropertyValue("--fg")).toBe("#222222");
    expect(document.documentElement.style.getPropertyValue("--fg")).toBe("");
  });
});

describe("labelOn", () => {
  it("answers with the light label for a colour it cannot read", () => {
    expect(labelOn("not a colour")).toBe("#ffffff");
    expect(labelOn("#ff")).toBe("#ffffff");
  });

  it("reads the short hex form", () => {
    expect(labelOn("#fff")).toBe("#101014");
    expect(labelOn("#000")).toBe("#ffffff");
  });
});

describe("bindTheme", () => {
  it("applies the running theme and follows the next one", () => {
    const listeners: ((theme: Theme) => void)[] = [];
    const source = {
      theme: () => full,
      onTheme: (next: (theme: Theme) => void) => {
        listeners.push(next);
      },
    };

    const stop = bindTheme(source);
    expect(document.documentElement.style.getPropertyValue("--accent")).toBe("#2f6fd0");

    const notify = (theme: Theme) => listeners.forEach((listener) => listener(theme));

    notify({ colors: { accent: "#57a5f0" } });
    expect(document.documentElement.style.getPropertyValue("--accent")).toBe("#57a5f0");

    stop();
    notify({ colors: { accent: "#000000" } });
    expect(document.documentElement.style.getPropertyValue("--accent")).toBe("#57a5f0");
  });

  it("does nothing without a bridge, and nothing with a bridge that has neither method", () => {
    expect(() => bindTheme(undefined)).not.toThrow();
    expect(() => bindTheme({})).not.toThrow();
    expect(document.documentElement.style.getPropertyValue("--accent")).toBe("");
  });

  it("reads the bridge on the global when it is given none", () => {
    const phantom = { theme: () => ({ colors: { accent: "#abcdef" } }) };
    vi.stubGlobal("phantom", phantom);

    bindTheme();
    expect(document.documentElement.style.getPropertyValue("--accent")).toBe("#abcdef");

    vi.unstubAllGlobals();
  });
});
