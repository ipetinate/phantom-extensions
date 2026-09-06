export type TokenKind = "plain" | "keyword" | "string" | "comment" | "number" | "type" | "function" | "attribute" | "punctuation";

export interface Token {
  kind: TokenKind;
  text: string;
}

export interface Grammar {
  readonly keywords: readonly string[];
  readonly lineComment: string | null;
  readonly quotes: string;
  readonly symbol: string | null;
  readonly keys: boolean;
}

export interface CodeSample {
  readonly file: string;
  readonly slot: number;
  readonly grammar: Grammar;
  readonly lines: readonly string[];
  readonly caret: number;
  readonly selected: string;
}

const IDENTIFIER_START = /[A-Za-z_$@]/;
const IDENTIFIER = /[A-Za-z0-9_$]/;
const DIGIT = /[0-9]/;
const NUMBER_BODY = /[0-9a-fA-FxXoObB._]/;
const SPACE = /\s/;

const TYPE_INTRODUCERS = ["class", "interface", "object", "enum", "struct", "trait", "module"];
const FUNCTION_INTRODUCERS = ["fun", "def", "function", "fn"];

function nextVisible(line: string, from: number): string {
  let index = from;
  while (index < line.length && line[index] === " ") index += 1;
  return line[index] ?? "";
}

function classify(word: string, previous: string, line: string, after: number, grammar: Grammar): TokenKind {
  if (grammar.keywords.includes(word)) return "keyword";
  if (TYPE_INTRODUCERS.includes(previous)) return "type";
  if (FUNCTION_INTRODUCERS.includes(previous)) return "function";
  if (nextVisible(line, after) === "(") return "function";
  if (/^[A-Z]/.test(word) && word !== word.toUpperCase()) return "type";
  return "plain";
}

export function tokenize(line: string, grammar: Grammar): Token[] {
  const tokens: Token[] = [];
  let previous = "";
  let index = 0;
  while (index < line.length) {
    const character = line[index] as string;
    if (grammar.lineComment !== null && line.startsWith(grammar.lineComment, index)) {
      tokens.push({ kind: "comment", text: line.slice(index) });
      break;
    }
    if (SPACE.test(character)) {
      const start = index;
      while (index < line.length && SPACE.test(line[index] as string)) index += 1;
      tokens.push({ kind: "plain", text: line.slice(start, index) });
      continue;
    }
    if (grammar.quotes.includes(character)) {
      const start = index;
      index += 1;
      while (index < line.length) {
        if (line[index] === "\\") {
          index += 2;
          continue;
        }
        const closing = line[index] === character;
        index += 1;
        if (closing) break;
      }
      const text = line.slice(start, index);
      tokens.push({ kind: grammar.keys && nextVisible(line, index) === ":" ? "attribute" : "string", text });
      previous = text;
      continue;
    }
    if (DIGIT.test(character)) {
      const start = index;
      while (index < line.length && NUMBER_BODY.test(line[index] as string)) index += 1;
      tokens.push({ kind: "number", text: line.slice(start, index) });
      previous = line.slice(start, index);
      continue;
    }
    if (grammar.symbol !== null && character === grammar.symbol && IDENTIFIER_START.test(line[index + 1] ?? "")) {
      const start = index;
      index += 1;
      while (index < line.length && IDENTIFIER.test(line[index] as string)) index += 1;
      tokens.push({ kind: "attribute", text: line.slice(start, index) });
      previous = line.slice(start, index);
      continue;
    }
    if (IDENTIFIER_START.test(character)) {
      const start = index;
      index += 1;
      while (index < line.length && IDENTIFIER.test(line[index] as string)) index += 1;
      const word = line.slice(start, index);
      tokens.push({ kind: classify(word, previous, line, index, grammar), text: word });
      previous = word;
      continue;
    }
    tokens.push({ kind: "punctuation", text: character });
    previous = character;
    index += 1;
  }
  return tokens;
}

const KOTLIN: Grammar = {
  keywords: [
    "package",
    "import",
    "data",
    "class",
    "object",
    "interface",
    "val",
    "var",
    "private",
    "internal",
    "override",
    "suspend",
    "fun",
    "return",
    "if",
    "else",
    "for",
    "in",
    "is",
    "null",
    "true",
    "false",
  ],
  lineComment: "//",
  quotes: '"',
  symbol: null,
  keys: false,
};

const TYPESCRIPT: Grammar = {
  keywords: [
    "import",
    "export",
    "from",
    "const",
    "let",
    "interface",
    "type",
    "function",
    "return",
    "string",
    "number",
    "boolean",
    "void",
    "async",
    "await",
    "new",
    "null",
    "true",
    "false",
  ],
  lineComment: "//",
  quotes: '"\'`',
  symbol: null,
  keys: false,
};

const RUBY: Grammar = {
  keywords: ["require", "module", "class", "def", "end", "do", "if", "unless", "else", "return", "self", "nil", "true", "false"],
  lineComment: "#",
  quotes: '"\'',
  symbol: ":",
  keys: false,
};

const JSON_GRAMMAR: Grammar = {
  keywords: ["true", "false", "null"],
  lineComment: null,
  quotes: '"',
  symbol: null,
  keys: true,
};

export const SAMPLES: readonly CodeSample[] = [
  {
    file: "Main.kt",
    slot: 5,
    grammar: KOTLIN,
    caret: 13,
    selected: "limit",
    lines: [
      "package com.phantom.sample",
      "",
      "import kotlinx.coroutines.delay",
      "",
      "data class Session(val id: String, val title: String)",
      "",
      "class Workspace(private val root: String) {",
      "    private val sessions = mutableListOf<Session>()",
      '    private val label = root.ifEmpty { "untitled" }',
      "",
      "    // Restores the tabs the window had open.",
      "    suspend fun restore(limit: Int = 12): List<Session> {",
      "        delay(120)",
      "        return sessions.take(limit)",
      "    }",
      "}",
    ],
  },
  {
    file: "index.ts",
    slot: 4,
    grammar: TYPESCRIPT,
    caret: 12,
    selected: "MAX_COLORS",
    lines: [
      'import { defineExtension } from "phantom";',
      "",
      "interface Palette {",
      "  name: string;",
      "  colors: string[];",
      "}",
      "",
      "const MAX_COLORS = 16;",
      "",
      "// Reads a Ghostty theme file into a palette.",
      "export function readPalette(source: string): Palette {",
      '  const colors = source.split("\\n").filter(Boolean);',
      '  return { name: "Preview", colors: colors.slice(0, MAX_COLORS) };',
      "}",
    ],
  },
  {
    file: "app.rb",
    slot: 1,
    grammar: RUBY,
    caret: 12,
    selected: "@version",
    lines: [
      'require "json"',
      "",
      "# One extension, as the registry lists it.",
      "class Extension",
      "  attr_reader :id, :version",
      "",
      "  def initialize(id, version)",
      "    @id = id",
      "    @version = version",
      "  end",
      "",
      "  def to_json(*)",
      "    { id: @id, version: @version }.to_json",
      "  end",
      "end",
    ],
  },
  {
    file: "package.json",
    slot: 3,
    grammar: JSON_GRAMMAR,
    caret: 10,
    selected: '"themes/theme.conf"',
    lines: [
      "{",
      '  "schemaVersion": 1,',
      '  "id": "publisher.theme-name",',
      '  "name": "Theme",',
      '  "version": "1.0.0",',
      '  "phantom": "0.16.0",',
      '  "contributes": {',
      '    "themes": [',
      "      {",
      '        "name": "Theme",',
      '        "path": "themes/theme.conf",',
      '        "appearance": "dark"',
      "      }",
      "    ]",
      "  }",
      "}",
    ],
  },
];

export const EXPLORER_ROWS: readonly { readonly name: string; readonly depth: number; readonly file: string | null; readonly slot: number }[] = [
  { name: "phantom", depth: 0, file: null, slot: -1 },
  { name: "src", depth: 1, file: null, slot: -1 },
  { name: "Main.kt", depth: 2, file: "Main.kt", slot: 5 },
  { name: "index.ts", depth: 2, file: "index.ts", slot: 4 },
  { name: "app.rb", depth: 2, file: "app.rb", slot: 1 },
  { name: "package.json", depth: 1, file: "package.json", slot: 3 },
];
