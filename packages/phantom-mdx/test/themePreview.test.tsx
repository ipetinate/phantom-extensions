import { readFileSync } from "node:fs";
import path from "node:path";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Document } from "../src/render.tsx";
import { validate } from "../src/validate.ts";
import { tokenize } from "../src/components/codeSamples.ts";
import { ANSI_NAMES, ANSI_USES, SYNTAX_SLOTS, TERMINAL_ONLY, type SyntaxKind } from "../src/components/paletteRoles.ts";
import { OPEN_TERMINALS, SESSION_GROUPS } from "../src/components/workspaceSample.ts";

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

function texts(container: Element, selector: string): (string | null)[] {
  return [...container.querySelectorAll(selector)].map((node) => node.textContent);
}

const stylesheet = readFileSync(path.join(import.meta.dirname, "../src/styles/document.css"), "utf8");

describe("ThemePreview", () => {
  it("accepts the palette a theme conf carries", () => {
    expect(validate(source())).toEqual([]);
  });

  it("accepts the cursor text and the selection text a conf may also carry", () => {
    expect(validate(source(' cursorText="#2e3440" selectionText="#2e3440"'))).toEqual([]);
  });

  it("puts the colours beside the preview, one heading over each half", () => {
    const { container } = draw();
    const figure = container.querySelector(".ph-theme-preview")!;
    expect(figure.tagName).toBe("FIGURE");
    expect([...figure.children].map((child) => child.className)).toEqual(["ph-tp-panel"]);
    const panel = figure.querySelector(".ph-tp-panel")!;
    expect([...panel.children].map((child) => child.className)).toEqual(["ph-tp-half", "ph-tp-half"]);
    const halves = [...panel.children];
    expect([...halves[0]!.children].map((child) => child.className)).toEqual(["ph-tp-half-title", "ph-tp-roles"]);
    expect([...halves[1]!.children].map((child) => child.className)).toEqual([
      "ph-tp-half-title",
      "ph-tp-half-subtitle",
      "ph-tp-window",
    ]);
    expect(halves[0]!.querySelector(".ph-tp-half-title")!.textContent).toBe("Colours");
    expect(halves[1]!.querySelector(".ph-tp-half-title")!.textContent).toBe("Preview");
  });

  it("gives the two halves the same width", () => {
    const columns = /\.ph-tp-panel \{[^}]*grid-template-columns: ([^;]+);/.exec(stylesheet)?.[1];
    expect(columns).toBe("minmax(0, 1fr) minmax(0, 1fr)");
  });

  it("stacks the two halves, colours first, on a narrow page", () => {
    const narrow = /@media \(max-width: 52em\) \{\s*\.ph-tp-panel \{\s*grid-template-columns: minmax\(0, 1fr\);/.test(stylesheet);
    expect(narrow, "the panel must fall to one column under 52em").toBe(true);
  });

  it("invites the reader to press the tabs and the terminal, under the preview heading", () => {
    const { container } = draw();
    const subtitle = container.querySelector(".ph-tp-half-subtitle")!;
    expect(subtitle.textContent).toBe(
      "Press the editor tabs and the terminal tabs to see the theme applied to another language and another session.",
    );
    expect(texts(container, '[role="tablist"]').length).toBe(2);
  });

  it("paints the window from the props and the palette", () => {
    const { container } = draw();
    const root = container.querySelector<HTMLElement>(".ph-theme-preview")!;
    expect(root.style.getPropertyValue("--ph-tp-bg")).toBe("#2e3440");
    expect(root.style.getPropertyValue("--ph-tp-fg")).toBe("#d8dee9");
    expect(root.style.getPropertyValue("--ph-tp-cursor")).toBe("#eceff4");
    expect(root.style.getPropertyValue("--ph-tp-ansi-5")).toBe("#b48ead");
    expect(root.style.getPropertyValue("--ph-tp-ansi-15")).toBe("#eceff4");
    expect(container.querySelector(".ph-tp-title")!.textContent).toBe("Nord");
  });

  it("takes the interface accent from ANSI 4, the way the app does, not from the cursor", () => {
    const { container } = draw();
    const root = container.querySelector<HTMLElement>(".ph-theme-preview")!;
    expect(root.style.getPropertyValue("--ph-tp-accent")).toBe("#81a1c1");
  });

  it("reads the selection text off whichever of the two colours contrasts with it", () => {
    const { container } = draw();
    const root = container.querySelector<HTMLElement>(".ph-theme-preview")!;
    expect(root.style.getPropertyValue("--ph-tp-selection-fg")).toBe("#2e3440");
  });

  it("draws the cursor cell in the background until a conf says otherwise", () => {
    const plain = draw().container.querySelector<HTMLElement>(".ph-theme-preview")!;
    expect(plain.style.getPropertyValue("--ph-tp-cursor-fg")).toBe("#2e3440");

    const given = draw(' cursorText="#a3be8c" selectionText="#bf616a"').container.querySelector<HTMLElement>(".ph-theme-preview")!;
    expect(given.style.getPropertyValue("--ph-tp-cursor-fg")).toBe("#a3be8c");
    expect(given.style.getPropertyValue("--ph-tp-selection-fg")).toBe("#bf616a");
  });

  it("marks a colour the theme never declared as derived, and only that one", () => {
    const { container } = render(
      <Document source={`<ThemePreview background="#2e3440" foreground="#d8dee9" selection="#eceff4" ansi="${ANSI}" />\n`} baseURL="file:///tmp/x/" />,
    );
    expect(container.querySelector(".ph-failure")).toBeNull();
    const blocks = [...container.querySelectorAll(".ph-tp-role-group")[0]!.querySelectorAll(".ph-tp-block")];
    expect(blocks.map((block) => block.querySelector(".ph-tp-block-derived") !== null)).toEqual([false, false, true, true, false, true]);
    expect(blocks[2]!.querySelector(".ph-tp-block-hex")!.textContent).toBe("#d8dee9");
    expect(blocks[3]!.querySelector(".ph-tp-block-hex")!.textContent).toBe("#2e3440");
  });

  it("marks nothing as derived once the document gives every key", () => {
    const { container } = draw(' cursorText="#2e3440" selectionText="#2e3440"');
    expect(container.querySelector(".ph-tp-block-derived")).toBeNull();
  });

  it("names every interface colour, its conf key and where it lands", () => {
    const { container } = draw();
    const group = container.querySelectorAll(".ph-tp-role-group")[0]!;
    expect(group.querySelector(".ph-tp-role-title")!.textContent).toBe("Interface");
    expect(texts(group, ".ph-tp-block-role")).toEqual([
      "Backgroundbackground",
      "Foregroundforeground",
      "Cursorcursor-color",
      "Cursor textcursor-text",
      "Selectionselection-background",
      "Selection textselection-foreground",
    ]);
    expect(texts(group, ".ph-tp-block-hex")).toEqual(["#2e3440", "#d8dee9", "#eceff4", "#2e3440", "#eceff4", "#2e3440"]);
    expect(group.querySelector(".ph-tp-block-use")!.textContent).toBe("window, sidebar, editor ground");
  });

  it("lists the sixteen ANSI entries as a set, each with its slot, its name and its use", () => {
    const { container } = draw();
    const group = container.querySelectorAll(".ph-tp-role-group")[1]!;
    expect(group.querySelector(".ph-tp-role-title")!.textContent).toBe("ANSI 0 to 15");
    const blocks = [...group.querySelectorAll<HTMLElement>(".ph-tp-block")];
    expect(blocks.length).toBe(16);
    expect(blocks[5]!.querySelector(".ph-tp-block-role")!.textContent).toBe("ANSI 5Magenta");
    expect(blocks[5]!.querySelector(".ph-tp-block-hex")!.textContent).toBe("#b48ead");
    expect(blocks[5]!.querySelector(".ph-tp-block-use")!.textContent).toBe("keywords");
    expect(blocks[8]!.querySelector(".ph-tp-block-use")!.textContent).toBe("comments, punctuation, line numbers");
    expect(blocks[15]!.querySelector(".ph-tp-block-use")!.textContent).toBe(TERMINAL_ONLY);
    expect(blocks[15]!.style.getPropertyValue("--ph-tp-block")).toBe("#eceff4");
  });

  it("edges only a block that would vanish into the page it is read on", () => {
    const { container } = draw();
    const edged = [...container.querySelectorAll(".ph-tp-block")]
      .filter((block) => block.classList.contains("has-edge"))
      .map((block) => block.querySelector(".ph-tp-block-hex")!.textContent);
    expect(edged).toContain("#2e3440");
    expect(edged).not.toContain("#bf616a");
  });

  it("stands the five panes SidebarPane declares down the far left, and nothing else", () => {
    const { container } = draw();
    const panes = [...container.querySelectorAll(".ph-tp-pane")].map((pane) => pane.getAttribute("title"));
    expect(panes).toEqual(["Terminals", "Files", "Git", "Worktrees", "Extensions"]);
    expect(container.querySelector(".ph-tp-pane.is-active")!.getAttribute("title")).toBe("Terminals");
  });

  it("closes the window on the body, because the app draws no status bar", () => {
    const { container } = draw();
    const window = container.querySelector(".ph-tp-window")!;
    expect([...window.children].map((child) => child.className)).toEqual(["ph-tp-titlebar", "ph-tp-body"]);
  });

  it("groups the terminal sessions in the sidebar, with a count and a subtitle", () => {
    const { container } = draw();
    expect(texts(container, ".ph-tp-group-name")).toEqual(["phantom", "phantom-extensions", "notes"]);
    expect(texts(container, ".ph-tp-group-details")).toEqual([
      "~/Projects/phantom",
      "~/Projects/phantom-extensions",
      "~/Documents/Cortex",
    ]);
    expect(texts(container, ".ph-tp-count")).toEqual(["2", "1", "1"]);
  });

  it("colours each group from the palette", () => {
    const { container } = draw();
    const groups = [...container.querySelectorAll<HTMLElement>(".ph-tp-group")];
    expect(groups.map((group) => group.style.getPropertyValue("--ph-tp-group"))).toEqual(["#81a1c1", "#b48ead", "#a3be8c"]);
  });

  it("draws no rows under a collapsed group", () => {
    const { container } = draw();
    const collapsed = container.querySelector(".ph-tp-group.is-collapsed")!;
    expect(collapsed.querySelector(".ph-tp-session")).toBeNull();
    expect(collapsed.querySelector(".ph-tp-chevron.is-open")).toBeNull();
    expect(container.querySelectorAll(".ph-tp-session").length).toBe(3);
  });

  it("gives a session row a title, the workspace and the branch, and marks the open one", () => {
    const { container } = draw();
    const row = container.querySelector(".ph-tp-session.is-selected")!;
    expect(container.querySelectorAll(".ph-tp-session.is-selected").length).toBe(1);
    expect(row.querySelector(".ph-tp-session-title")!.textContent).toBe("claude — editor colours");
    expect(texts(row, ".ph-tp-chip")).toEqual(["phantom", "feat/0.17.0"]);
    expect(row.querySelector(".ph-tp-chip-dot")).not.toBeNull();
    expect(row.querySelector(".ph-tp-session-rail")).not.toBeNull();
  });

  it("opens the first sample with its tab selected", () => {
    const { container } = draw();
    const tabs = [...container.querySelectorAll<HTMLButtonElement>(".ph-tp-tab")];
    expect(tabs.map((tab) => tab.textContent)).toEqual(["Main.kt", "index.ts", "app.rb", "package.json"]);
    expect(tabs.map((tab) => tab.getAttribute("aria-selected"))).toEqual(["true", "false", "false", "false"]);
    expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1]);
    expect(tabs[0]!.style.getPropertyValue("--ph-tp-dot")).toBe("#b48ead");
    expect(container.querySelector(".ph-tp-code")!.textContent).toContain("package com.phantom.sample");
  });

  it("gives every tab a close control, and the unsaved one a dot instead", () => {
    const { container } = draw();
    const tabs = [...container.querySelectorAll(".ph-tp-tab")];
    expect(tabs.map((tab) => tab.querySelector(".ph-tp-tab-close") !== null)).toEqual([true, false, true, true]);
    expect(tabs[1]!.querySelector(".ph-tp-tab-dirty")).not.toBeNull();
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

  it("stands a terminal under the editor, inside the same window", () => {
    const { container } = draw();
    const main = container.querySelector(".ph-tp-main")!;
    expect([...main.children].map((child) => child.className)).toEqual(["ph-tp-editor", "ph-tp-terminal"]);
    expect(container.querySelector(".ph-tp-terminal .ph-tp-term-body")).not.toBeNull();
  });

  it("names one terminal tab per open session, with an icon and no close control", () => {
    const { container } = draw();
    const tabs = [...container.querySelectorAll<HTMLButtonElement>(".ph-tp-term-tab")];
    expect(tabs.map((tab) => tab.textContent)).toEqual(["claude", "zig build", "npm test"]);
    expect(tabs.map((tab) => tab.getAttribute("aria-selected"))).toEqual(["true", "false", "false"]);
    expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
    expect(tabs.every((tab) => tab.querySelector(".ph-tp-glyph") !== null)).toBe(true);
    expect(container.querySelector(".ph-tp-term-tab .ph-tp-tab-close")).toBeNull();
  });

  it("opens the shell on a prompt, a command and its output", () => {
    const { container } = draw();
    const body = container.querySelector(".ph-tp-term-body")!;
    expect(body.textContent).toContain("phantom feat/0.17.0 ❯ claude");
    expect(body.textContent).toContain("GrammarHighlighter.swift");
    expect(body.querySelectorAll(".ph-tp-term-line").length).toBe(6);
  });

  it("paints the terminal output from several of the ANSI sixteen", () => {
    const { container } = draw();
    const body = container.querySelector(".ph-tp-term-body")!;
    const slots = new Set(
      [...body.querySelectorAll("span")].flatMap((span) => {
        const slot = /^ph-tp-term-s(\d+)$/.exec(span.className.split(" ")[0] ?? "");
        return slot === null ? [] : [Number(slot[1])];
      }),
    );
    expect(slots.size).toBeGreaterThanOrEqual(5);
    expect(slots).toContain(2);
    expect(slots).toContain(4);
    expect(slots).toContain(5);
    expect(slots).toContain(6);
    expect(slots).toContain(8);
  });

  it("closes the transcript with a block cursor in the cursor colour", () => {
    const { container } = draw();
    const live = container.querySelector(".ph-tp-term-live")!;
    expect(live.querySelector(".ph-tp-term-cursor")).not.toBeNull();
    expect(container.querySelectorAll(".ph-tp-term-cursor").length).toBe(1);
    expect(stylesheet).toMatch(/\.ph-tp-term-cursor \{[^}]*background: var\(--ph-tp-cursor\);/);
    expect(stylesheet).toMatch(/\.ph-tp-term-cursor \{[^}]*color: var\(--ph-tp-cursor-fg\);/);
  });

  it("switches the terminal when its own tab is pressed", () => {
    const { container } = draw();
    const tabs = [...container.querySelectorAll<HTMLButtonElement>(".ph-tp-term-tab")];
    fireEvent.click(tabs[1]!);
    const body = container.querySelector(".ph-tp-term-body")!;
    expect(body.textContent).toContain("zig build -Demit-macos-app=false");
    expect(body.textContent).not.toContain("GrammarHighlighter.swift");
    expect(tabs[1]!.getAttribute("aria-selected")).toBe("true");
    expect(tabs[0]!.getAttribute("aria-selected")).toBe("false");
  });

  it("shows the cursor over the character it covers, and the rest of the suggestion dimmed", () => {
    const { container } = draw();
    fireEvent.click(container.querySelectorAll<HTMLButtonElement>(".ph-tp-term-tab")[1]!);
    const live = container.querySelector(".ph-tp-term-live")!;
    expect(live.textContent).toBe("phantom feat/0.17.0 ❯ zig build test -Dtest-filter=grammar");
    expect(live.querySelector(".ph-tp-term-cursor")!.textContent).toBe("t");
  });

  it("moves between terminal tabs with the arrow keys and wraps at both ends", () => {
    const { container } = draw();
    const tabs = [...container.querySelectorAll<HTMLButtonElement>(".ph-tp-term-tab")];
    fireEvent.keyDown(tabs[0]!, { key: "ArrowLeft" });
    expect(tabs[2]!.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(tabs[2]);
    fireEvent.keyDown(tabs[2]!, { key: "ArrowRight" });
    expect(tabs[0]!.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(tabs[0]!, { key: "End" });
    expect(tabs[2]!.getAttribute("aria-selected")).toBe("true");
  });

  it("ties the terminal panel to the tab that opened it", () => {
    const { container } = draw();
    const body = container.querySelector(".ph-tp-term-body")!;
    const tab = container.querySelector(".ph-tp-term-tab")!;
    expect(body.getAttribute("role")).toBe("tabpanel");
    expect(body.getAttribute("aria-labelledby")).toBe(tab.id);
    expect(tab.getAttribute("aria-controls")).toBe(body.id);
  });

  it("switches the terminal from the sidebar too, the way the app does", () => {
    const { container } = draw();
    const rows = [...container.querySelectorAll<HTMLButtonElement>(".ph-tp-session")];
    expect(rows.every((row) => row.tagName === "BUTTON")).toBe(true);
    fireEvent.click(rows[2]!);
    expect(container.querySelector(".ph-tp-term-body")!.textContent).toContain("npm test");
    expect(rows[2]!.classList.contains("is-selected")).toBe(true);
    expect(rows[0]!.classList.contains("is-selected")).toBe(false);
    expect(container.querySelectorAll<HTMLButtonElement>(".ph-tp-term-tab")[2]!.getAttribute("aria-selected")).toBe("true");
  });

  it("leaves the editor alone when the terminal changes, and the terminal alone when the editor does", () => {
    const { container } = draw();
    fireEvent.click(container.querySelectorAll<HTMLButtonElement>(".ph-tp-term-tab")[1]!);
    expect(container.querySelector(".ph-tp-code")!.textContent).toContain("package com.phantom.sample");
    fireEvent.click(container.querySelectorAll<HTMLButtonElement>(".ph-tp-tab")[2]!);
    expect(container.querySelector(".ph-tp-term-body")!.textContent).toContain("zig build -Demit-macos-app=false");
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

describe("the sample workspace", () => {
  it("opens only terminals the sidebar lists under a group that is not collapsed", () => {
    const listed = SESSION_GROUPS.filter((group) => group.collapsed !== true).flatMap((group) => group.sessions);
    expect(OPEN_TERMINALS.length).toBe(3);
    for (const entry of OPEN_TERMINALS) expect(listed).toContain(entry.session);
    expect(OPEN_TERMINALS.map((entry) => entry.session.title)).toEqual(listed.map((session) => session.title));
  });

  it("gives every group the count of the sessions it holds", () => {
    for (const group of SESSION_GROUPS) expect(group.count, group.name).toBe(group.sessions.length);
  });
});

describe("the palette a syntax role borrows", () => {
  const css = stylesheet;

  it("draws every token kind from the slot EditorTheme gives it", () => {
    for (const [kind, slot] of Object.entries(SYNTAX_SLOTS) as [SyntaxKind, number][]) {
      const rule = new RegExp(`\\.ph-tp-t-${kind} \\{\\s*color: var\\(--ph-tp-ansi-${slot}\\);`);
      expect(css, `.ph-tp-t-${kind} must take ANSI ${slot}`).toMatch(rule);
    }
  });

  it("names a use for every slot a syntax role borrows, and claims none for the rest", () => {
    const borrowed = new Set(Object.values(SYNTAX_SLOTS));
    ANSI_USES.forEach((use, slot) => {
      expect(use.length, `ANSI ${slot} needs a use`).toBeGreaterThan(0);
      if (!borrowed.has(slot) && slot !== 7) expect(use, `ANSI ${slot} borrows nothing`).toBe(TERMINAL_ONLY);
      else expect(use, `ANSI ${slot} is used`).not.toBe(TERMINAL_ONLY);
    });
    expect(ANSI_NAMES.length).toBe(16);
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
