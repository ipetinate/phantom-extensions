import { describe, expect, it } from "vitest";
import { applyTheme, defaultLightTheme, defaultTheme, normalizeTheme } from "../src/index.ts";

describe("applyTheme", () => {
  it("writes every colour, font and size as a --ph variable", () => {
    const root = document.createElement("div");
    applyTheme(root, defaultTheme);
    expect(root.style.getPropertyValue("--ph-bg")).toBe("#282a36");
    expect(root.style.getPropertyValue("--ph-fg")).toBe("#f8f8f2");
    expect(root.style.getPropertyValue("--ph-accent")).toBe("#bd93f9");
    expect(root.style.getPropertyValue("--ph-muted")).toBe("#6272a4");
    expect(root.style.getPropertyValue("--ph-border")).toBe("#44475a");
    expect(root.style.getPropertyValue("--ph-code-bg")).toBe("#21222c");
    expect(root.style.getPropertyValue("--ph-danger")).toBe("#ff5555");
    expect(root.style.getPropertyValue("--ph-warning")).toBe("#ffb86c");
    expect(root.style.getPropertyValue("--ph-success")).toBe("#50fa7b");
    expect(root.style.getPropertyValue("--ph-font-ui")).toBe(defaultTheme.fonts.ui);
    expect(root.style.getPropertyValue("--ph-font-mono")).toBe(defaultTheme.fonts.mono);
    expect(root.style.getPropertyValue("--ph-base-size")).toBe("14px");
    expect(root.getAttribute("data-ph-scheme")).toBe("dark");
  });

  it("switches the scheme when a light theme is applied", () => {
    const root = document.createElement("div");
    applyTheme(root, defaultTheme);
    applyTheme(root, defaultLightTheme);
    expect(root.style.getPropertyValue("--ph-bg")).toBe(defaultLightTheme.colors.bg);
    expect(root.getAttribute("data-ph-scheme")).toBe("light");
  });
});

describe("normalizeTheme", () => {
  it("fills a partial host payload from the default of its scheme", () => {
    const theme = normalizeTheme({ scheme: "light", colors: { accent: "#ff0000" }, baseSize: 16 });
    expect(theme.scheme).toBe("light");
    expect(theme.colors.accent).toBe("#ff0000");
    expect(theme.colors.bg).toBe(defaultLightTheme.colors.bg);
    expect(theme.fonts).toEqual(defaultLightTheme.fonts);
    expect(theme.baseSize).toBe(16);
  });

  it("drops values that are not colours, fonts or sane sizes", () => {
    const theme = normalizeTheme({
      scheme: "dark",
      colors: { bg: "red; background: url(https://evil)", fg: "rgb(1, 2, 3)" },
      fonts: { ui: "Inter, sans-serif", mono: "x; }" },
      baseSize: 400,
    });
    expect(theme.colors.bg).toBe(defaultTheme.colors.bg);
    expect(theme.colors.fg).toBe("rgb(1, 2, 3)");
    expect(theme.fonts.ui).toBe("Inter, sans-serif");
    expect(theme.fonts.mono).toBe(defaultTheme.fonts.mono);
    expect(theme.baseSize).toBe(24);
  });

  it("treats garbage as the default theme", () => {
    expect(normalizeTheme(null)).toEqual(defaultTheme);
    expect(normalizeTheme("dark")).toEqual(defaultTheme);
  });
});
