import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Document } from "../src/render.tsx";
import { validate } from "../src/validate.ts";
import { tokenize } from "../src/components/codeSamples.ts";

const ANSI = [
  "#3b4252",
  "#bf616a",
  "#a3be8c",
  "#ebcb8b",
  "#81a1c1",
  "#b48ead",
  "#88c0d0",
  "#e5e9f0",
  "#596377",
  "#bf616a",
  "#a3be8c",
  "#ebcb8b",
  "#81a1c1",
  "#b48ead",
  "#8fbcbb",
  "#eceff4",
].join(", ");

function source(extra = ""): string {
  return `<ThemePreview title="Nord" background="#2e3440" foreground="#d8dee9" cursor="#eceff4" selection="#eceff4" ansi="${ANSI}"${extra} />\n`;
}

function draw(extra = "") {
  const view = render(<Document source={source(extra)} baseURL="file:///tmp/x/" />);
  expect(view.container.querySelector(".ph-failure")).toBeNull();
  return view;
}

describe("ThemePreview", () => {
  it("accepts the palette a theme conf carries", () => {
    expect(validate(source())).toEqual([]);
  });

  it("paints the window from the props and the palette", () => {
    const { container } = draw();
    const root = container.querySelector<HTMLElement>(".ph-theme-preview")!;
    expect(root.style.getPropertyValue("--ph-tp-bg")).toBe("#2e3440");
    expect(root.style.getPropertyValue("--ph-tp-fg")).toBe("#d8dee9");
    expect(root.style.getPropertyValue("--ph-tp-accent")).toBe("#eceff4");
    expect(root.style.getPropertyValue("--ph-tp-ansi-5")).toBe("#b48ead");
    expect(root.style.getPropertyValue("--ph-tp-ansi-15")).toBe("#eceff4");
    expect(container.querySelector(".ph-tp-title")!.textContent).toBe("Nord");
  });

  it("reads the selection text off whichever of the two colours contrasts with it", () => {
    const { container } = draw();
    const root = container.querySelector<HTMLElement>(".ph-theme-preview")!;
    expect(root.style.getPropertyValue("--ph-tp-selection-fg")).toBe("#2e3440");
  });

  it("lists the workspace beside the editor and marks the open file", () => {
    const { container } = draw();
    const rows = [...container.querySelectorAll(".ph-tp-row")].map((row) => row.textContent);
    expect(rows).toEqual(["phantom", "src", "Main.kt", "index.ts", "app.rb", "package.json"]);
    expect(container.querySelector(".ph-tp-row.is-open")!.textContent).toBe("Main.kt");
  });

  it("opens the first sample with its tab selected", () => {
    const { container } = draw();
    const tabs = [...container.querySelectorAll<HTMLButtonElement>(".ph-tp-tab")];
    expect(tabs.map((tab) => tab.textContent)).toEqual(["Main.kt", "index.ts", "app.rb", "package.json"]);
    expect(tabs.map((tab) => tab.getAttribute("aria-selected"))).toEqual(["true", "false", "false", "false"]);
    expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1]);
    expect(container.querySelector(".ph-tp-code")!.textContent).toContain("package com.phantom.sample");
  });

  it("switches the sample when a tab is pressed", () => {
    const { container } = draw();
    const tabs = [...container.querySelectorAll<HTMLButtonElement>(".ph-tp-tab")];
    fireEvent.click(tabs[2]!);
    const code = container.querySelector(".ph-tp-code")!;
    expect(code.textContent).toContain("attr_reader :id, :version");
    expect(code.textContent).not.toContain("package com.phantom.sample");
    expect(tabs[2]!.getAttribute("aria-selected")).toBe("true");
    expect(tabs[0]!.getAttribute("aria-selected")).toBe("false");
    expect(container.querySelector(".ph-tp-row.is-open")!.textContent).toBe("app.rb");
  });

  it("moves between tabs with the arrow keys and wraps at both ends", () => {
    const { container } = draw();
    const tabs = [...container.querySelectorAll<HTMLButtonElement>(".ph-tp-tab")];
    fireEvent.keyDown(tabs[0]!, { key: "ArrowRight" });
    expect(tabs[1]!.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(tabs[1]);
    fireEvent.keyDown(tabs[1]!, { key: "ArrowLeft" });
    fireEvent.keyDown(tabs[0]!, { key: "ArrowLeft" });
    expect(tabs[3]!.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(tabs[3]!, { key: "Home" });
    expect(tabs[0]!.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(tabs[0]!, { key: "End" });
    expect(tabs[3]!.getAttribute("aria-selected")).toBe("true");
  });

  it("ties the panel to the tab that opened it", () => {
    const { container } = draw();
    const panel = container.querySelector(".ph-tp-code")!;
    const tab = container.querySelector(".ph-tp-tab")!;
    expect(panel.getAttribute("role")).toBe("tabpanel");
    expect(panel.getAttribute("aria-labelledby")).toBe(tab.id);
    expect(tab.getAttribute("aria-controls")).toBe(panel.id);
  });

  it("colours the code by token kind", () => {
    const { container } = draw();
    const kinds = new Set([...container.querySelectorAll(".ph-tp-lines span")].map((span) => span.className.split(" ")[0]));
    expect(kinds).toContain("ph-tp-t-keyword");
    expect(kinds).toContain("ph-tp-t-string");
    expect(kinds).toContain("ph-tp-t-comment");
    expect(kinds).toContain("ph-tp-t-number");
    expect(kinds).toContain("ph-tp-t-type");
    expect(kinds).toContain("ph-tp-t-function");
  });

  it("puts one selection and one caret on the line the caret sits on", () => {
    const { container } = draw();
    expect(container.querySelectorAll(".ph-tp-selected").length).toBe(1);
    expect(container.querySelectorAll(".ph-tp-caret").length).toBe(1);
    expect(container.querySelector(".ph-tp-selected")!.textContent).toBe("limit");
    expect(container.querySelectorAll(".ph-tp-line.is-current").length).toBe(1);
  });

  it("falls back to Phantom when no title is given", () => {
    const { container } = render(
      <Document source={`<ThemePreview background="#2e3440" foreground="#d8dee9" ansi="${ANSI}" />\n`} baseURL="file:///tmp/x/" />,
    );
    expect(container.querySelector(".ph-failure")).toBeNull();
    expect(container.querySelector(".ph-tp-title")!.textContent).toBe("Phantom");
  });

  it("refuses a palette that is not sixteen hex colours", () => {
    const short = validate(`<ThemePreview background="#2e3440" foreground="#d8dee9" ansi="#3b4252, #bf616a" />\n`);
    expect(short.map((violation) => violation.code)).toEqual(["palette"]);
    expect(short[0]!.message).toContain("must list 16 hex colours");
    expect(short[0]!.message).toContain("got 2");

    const stray = validate(`<ThemePreview background="#2e3440" foreground="#d8dee9" ansi="${ANSI.replace("#88c0d0", "teal")}" />\n`);
    expect(stray.map((violation) => violation.code)).toEqual(["palette"]);
    expect(stray[0]!.message).toContain('entry 6 is "teal"');
  });

  it("refuses a colour that is not hex and a prop it does not know", () => {
    const colour = validate(`<ThemePreview background="rebeccapurple" foreground="#d8dee9" ansi="${ANSI}" />\n`);
    expect(colour.map((violation) => violation.code)).toEqual(["color"]);
    expect(colour[0]!.message).toContain("must be a hex colour such as #2e3440");

    const unknown = validate(source(' bold="#ffffff"'));
    expect(unknown.map((violation) => violation.code)).toEqual(["unknown-prop"]);
    expect(unknown[0]!.message).toContain("has no prop bold");
  });

  it("needs the background, the foreground and the palette", () => {
    expect(validate("<ThemePreview />\n").map((violation) => violation.message)).toEqual([
      "<ThemePreview> needs background",
      "<ThemePreview> needs foreground",
      "<ThemePreview> needs ansi",
    ]);
  });
});

describe("tokenize", () => {
  const kotlin = { keywords: ["class", "fun", "val"], lineComment: "//", quotes: '"', symbol: null, keys: false };

  it("names keywords, types, calls, numbers and strings", () => {
    const tokens = tokenize('val name = Session(12, "x")', kotlin).filter((token) => token.text.trim() !== "");
    expect(tokens).toEqual([
      { kind: "keyword", text: "val" },
      { kind: "plain", text: "name" },
      { kind: "punctuation", text: "=" },
      { kind: "function", text: "Session" },
      { kind: "punctuation", text: "(" },
      { kind: "number", text: "12" },
      { kind: "punctuation", text: "," },
      { kind: "string", text: '"x"' },
      { kind: "punctuation", text: ")" },
    ]);
  });

  it("takes the rest of the line for a comment", () => {
    expect(tokenize("val x = 1 // and the rest", kotlin).at(-1)).toEqual({ kind: "comment", text: "// and the rest" });
  });

  it("reads the name after class as a type", () => {
    expect(tokenize("class Workspace(", kotlin)[2]).toEqual({ kind: "type", text: "Workspace" });
  });

  it("reads a json key apart from a json string", () => {
    const json = { keywords: ["true"], lineComment: null, quotes: '"', symbol: null, keys: true };
    const tokens = tokenize('  "path": "themes/theme.conf",', json).filter((token) => token.text.trim() !== "");
    expect(tokens[0]).toEqual({ kind: "attribute", text: '"path"' });
    expect(tokens[2]).toEqual({ kind: "string", text: '"themes/theme.conf"' });
  });
});
