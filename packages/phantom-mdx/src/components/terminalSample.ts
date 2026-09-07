export interface TerminalSpan {
  readonly text: string;
  readonly slot?: number;
  readonly strong?: boolean;
}

export type TerminalLine =
  | { readonly kind: "command"; readonly spans: readonly TerminalSpan[] }
  | { readonly kind: "output"; readonly spans: readonly TerminalSpan[] };

export interface Transcript {
  readonly tab: string;
  readonly lines: readonly TerminalLine[];
  readonly typed: readonly TerminalSpan[];
  readonly under: string;
  readonly suggestion?: string;
}

export const PROMPT_MARK = "❯";

export const DIRECTORY_SLOT = 4;
export const BRANCH_SLOT = 5;
export const MARK_SLOT = 2;

const OK_SLOT = 2;
const WARN_SLOT = 3;
const FAIL_SLOT = 1;
const NOTE_SLOT = 6;
const DIM_SLOT = 8;
const AGENT_SLOT = 5;

export function promptSpans(place: { readonly workspace: string; readonly branch: string }): readonly TerminalSpan[] {
  return [
    { text: place.workspace, slot: DIRECTORY_SLOT, strong: true },
    { text: " " },
    { text: place.branch, slot: BRANCH_SLOT },
    { text: " " },
    { text: PROMPT_MARK, slot: MARK_SLOT },
    { text: " " },
  ];
}

export const AGENT_RUN: Transcript = {
  tab: "claude",
  typed: [],
  under: " ",
  lines: [
    { kind: "command", spans: [{ text: "claude" }] },
    {
      kind: "output",
      spans: [
        { text: "● ", slot: AGENT_SLOT },
        { text: "Read " },
        { text: "GrammarHighlighter.swift", slot: NOTE_SLOT },
        { text: " (412 lines)", slot: DIM_SLOT },
      ],
    },
    {
      kind: "output",
      spans: [
        { text: "● ", slot: AGENT_SLOT },
        { text: "Edit " },
        { text: "LineTokenizationCache.swift", slot: NOTE_SLOT },
      ],
    },
    {
      kind: "output",
      spans: [
        { text: "  " },
        { text: "+18", slot: OK_SLOT },
        { text: " " },
        { text: "-4", slot: FAIL_SLOT },
        { text: "  cache a line by revision", slot: DIM_SLOT },
      ],
    },
    { kind: "output", spans: [{ text: "  " }, { text: "✓", slot: OK_SLOT }, { text: " swiftlint clean" }] },
  ],
};

export const BUILD_RUN: Transcript = {
  tab: "zig build",
  typed: [{ text: "zig build " }],
  under: "t",
  suggestion: "est -Dtest-filter=grammar",
  lines: [
    { kind: "command", spans: [{ text: "zig build -Demit-macos-app=false" }] },
    {
      kind: "output",
      spans: [
        { text: "info", slot: NOTE_SLOT },
        { text: ": build summary: 3/3 steps succeeded" },
      ],
    },
    {
      kind: "output",
      spans: [
        { text: "warning", slot: WARN_SLOT },
        { text: ": unused capture 'slot'" },
      ],
    },
    { kind: "output", spans: [{ text: "  src/font/Collection.zig:214:9", slot: DIM_SLOT }] },
    {
      kind: "output",
      spans: [
        { text: "✓", slot: OK_SLOT },
        { text: " 0 errors, 1 warning in " },
        { text: "4.2s", slot: DIM_SLOT },
      ],
    },
  ],
};

export const TEST_RUN: Transcript = {
  tab: "npm test",
  typed: [],
  under: " ",
  lines: [
    { kind: "command", spans: [{ text: "npm test" }] },
    {
      kind: "output",
      spans: [
        { text: " ✓ ", slot: OK_SLOT },
        { text: "test/themePreview.test.tsx", slot: NOTE_SLOT },
        { text: " (44 tests) 214ms", slot: DIM_SLOT },
      ],
    },
    {
      kind: "output",
      spans: [
        { text: " ✓ ", slot: OK_SLOT },
        { text: "test/render.test.tsx", slot: NOTE_SLOT },
        { text: " (18 tests) 96ms", slot: DIM_SLOT },
      ],
    },
    {
      kind: "output",
      spans: [
        { text: " Test Files  " },
        { text: "9 passed", slot: OK_SLOT },
        { text: " (9)", slot: DIM_SLOT },
      ],
    },
    {
      kind: "output",
      spans: [
        { text: "      Tests  " },
        { text: "126 passed", slot: OK_SLOT },
        { text: " | " },
        { text: "1 skipped", slot: WARN_SLOT },
        { text: " (127)", slot: DIM_SLOT },
      ],
    },
  ],
};
