import type { TokenKind } from "./codeSamples.ts";

export type SyntaxKind = Exclude<TokenKind, "plain">;

export const SYNTAX_SLOTS: Readonly<Record<SyntaxKind, number>> = {
  keyword: 5,
  string: 2,
  comment: 8,
  number: 3,
  type: 6,
  function: 4,
  attribute: 1,
  punctuation: 8,
};

export const PLAIN_SLOT = 7;
export const ACCENT_SLOT = 4;
export const LINE_NUMBER_SLOT = 8;

export const ANSI_NAMES: readonly string[] = [
  "Black",
  "Red",
  "Green",
  "Yellow",
  "Blue",
  "Magenta",
  "Cyan",
  "White",
  "Bright black",
  "Bright red",
  "Bright green",
  "Bright yellow",
  "Bright blue",
  "Bright magenta",
  "Bright cyan",
  "Bright white",
];

export const TERMINAL_ONLY = "terminal only";

export const ANSI_USES: readonly string[] = [
  TERMINAL_ONLY,
  "attributes",
  "strings",
  "numbers",
  "calls, interface accent",
  "keywords",
  "types",
  "code text",
  "comments, punctuation, line numbers",
  TERMINAL_ONLY,
  TERMINAL_ONLY,
  TERMINAL_ONLY,
  TERMINAL_ONLY,
  TERMINAL_ONLY,
  TERMINAL_ONLY,
  TERMINAL_ONLY,
];

export interface RoleEntry {
  readonly role: string;
  readonly key: string;
  readonly use: string;
}

export const INTERFACE_ROLES: readonly RoleEntry[] = [
  { role: "Background", key: "background", use: "window, sidebar, editor ground" },
  { role: "Foreground", key: "foreground", use: "terminal text, titles" },
  { role: "Cursor", key: "cursor-color", use: "editor caret" },
  { role: "Cursor text", key: "cursor-text", use: "the cell under the caret" },
  { role: "Selection", key: "selection-background", use: "selected text ground" },
  { role: "Selection text", key: "selection-foreground", use: "selected text" },
];
