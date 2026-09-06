import { FrontMatterError, quoted } from "./errors.ts";

export type FrontMatterValue = string | FrontMatterValue[] | { [key: string]: FrontMatterValue };
export type FrontMatter = Record<string, FrontMatterValue>;

type Block = ReadonlyArray<readonly [number, string]>;

const KEY_PATTERN = /^[A-Za-z][A-Za-z0-9_-]*$/;
const FORBIDDEN_SCALAR_START = "&*!|>%@`";
const FLOW_CHARACTERS = "{}[]";
const ESCAPES: Readonly<Record<string, string>> = { "\\": "\\", '"': '"', n: "\n", t: "\t", "/": "/" };

export function stripComment(text: string): string {
  let quote: string | null = null;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index] as string;
    if (quote !== null) {
      if (char === quote) quote = null;
    } else if (char === "'" || char === '"') {
      quote = char;
    } else if (char === "#" && (index === 0 || text[index - 1] === " " || text[index - 1] === "\t")) {
      return text.slice(0, index).trimEnd();
    }
  }
  return text.trimEnd();
}

export function splitFlowItems(line: number, text: string): string[] {
  const items: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (const char of text) {
    if (quote !== null) {
      current += char;
      if (char === quote) quote = null;
    } else if (char === "'" || char === '"') {
      quote = char;
      current += char;
    } else if (FLOW_CHARACTERS.includes(char)) {
      throw new FrontMatterError(line, "flow collections may not nest");
    } else if (char === ",") {
      items.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  if (quote !== null) throw new FrontMatterError(line, "quoted scalar is not closed");
  items.push(current);
  if (items.length === 1 && !(items[0] as string).trim()) return [];
  return items;
}

export function parseQuoted(line: number, text: string): [string, string] {
  const quote = text[0] as string;
  let result = "";
  let index = 1;
  while (index < text.length) {
    const char = text[index] as string;
    if (quote === "'" && char === "'") {
      if (text.slice(index + 1, index + 2) === "'") {
        result += "'";
        index += 2;
        continue;
      }
      return [result, text.slice(index + 1)];
    }
    if (quote === '"' && char === "\\") {
      const escaped = text.slice(index + 1, index + 2);
      const replacement = ESCAPES[escaped];
      if (replacement === undefined) throw new FrontMatterError(line, `unsupported escape \\${escaped}`);
      result += replacement;
      index += 2;
      continue;
    }
    if (quote === '"' && char === '"') return [result, text.slice(index + 1)];
    result += char;
    index += 1;
  }
  throw new FrontMatterError(line, "quoted scalar is not closed on its line");
}

export function parseScalar(line: number, raw: string): string {
  const text = raw.trim();
  if (!text) throw new FrontMatterError(line, "empty value");
  const first = text[0] as string;
  if (first === "'" || first === '"') {
    const [value, rest] = parseQuoted(line, text);
    if (rest.trim()) throw new FrontMatterError(line, `unexpected text after quoted scalar: ${quoted(rest.trim())}`);
    return value;
  }
  if (FORBIDDEN_SCALAR_START.includes(first)) {
    throw new FrontMatterError(line, `unsupported YAML: ${quoted(first)} scalars, anchors and tags are not accepted`);
  }
  if (FLOW_CHARACTERS.includes(first)) throw new FrontMatterError(line, "flow collections may not nest");
  if (text.includes(": ") || text.endsWith(":")) throw new FrontMatterError(line, "a value may not hold a mapping");
  return text;
}

function parseFlowMapping(line: number, text: string): Record<string, string> {
  const mapping: Record<string, string> = {};
  for (const item of splitFlowItems(line, text.slice(1, -1))) {
    const [key, value] = splitPair(line, item.trim());
    if (Object.hasOwn(mapping, key)) throw new FrontMatterError(line, `duplicate key ${quoted(key)}`);
    mapping[key] = parseScalar(line, value);
  }
  return mapping;
}

function parseFlowSequence(line: number, text: string): string[] {
  return splitFlowItems(line, text.slice(1, -1)).map((item) => parseScalar(line, item));
}

export function parseValue(line: number, raw: string): FrontMatterValue {
  const text = stripComment(raw.trim());
  if (text.startsWith("{")) {
    if (!text.endsWith("}")) throw new FrontMatterError(line, "flow mapping is not closed on its line");
    return parseFlowMapping(line, text);
  }
  if (text.startsWith("[")) {
    if (!text.endsWith("]")) throw new FrontMatterError(line, "flow sequence is not closed on its line");
    return parseFlowSequence(line, text);
  }
  return parseScalar(line, text);
}

export function splitPair(line: number, text: string): [string, string] {
  const at = text.indexOf(":");
  if (at === -1) throw new FrontMatterError(line, "expected 'key: value'");
  const key = text.slice(0, at).trim();
  const value = text.slice(at + 1);
  if (value && !value.startsWith(" ")) throw new FrontMatterError(line, "expected a space after ':'");
  if (!KEY_PATTERN.test(key)) throw new FrontMatterError(line, `bad key ${quoted(key)}`);
  return [key, value.trim()];
}

function indentOf(text: string): number {
  return text.length - text.replace(/^ +/, "").length;
}

function isNoise(text: string): boolean {
  const stripped = text.trim();
  return !stripped || stripped.startsWith("#");
}

function parseNested(block: Block, start: number): [FrontMatterValue | null, number] {
  let index = start;
  while (index < block.length && isNoise((block[index] as readonly [number, string])[1])) index += 1;
  if (index >= block.length) return [null, index];
  const [number, first] = block[index] as readonly [number, string];
  const indent = indentOf(first);
  if (indent > 2) throw new FrontMatterError(number, "nesting deeper than one level is not accepted");
  if (first.trimStart().startsWith("- ")) return parseBlockSequence(block, index, indent);
  if (indent === 0) return [null, index];
  return parseBlockMapping(block, index);
}

function parseBlockSequence(block: Block, start: number, indent: number): [string[], number] {
  const items: string[] = [];
  let index = start;
  while (index < block.length) {
    const [number, text] = block[index] as readonly [number, string];
    if (isNoise(text)) {
      index += 1;
      continue;
    }
    const current = indentOf(text);
    if (current < indent || (current === 0 && !text.startsWith("- "))) break;
    if (current !== indent || !text.slice(indent).startsWith("- ")) {
      throw new FrontMatterError(number, "sequence items must share one indentation and start with '- '");
    }
    const item = stripComment(text.slice(indent + 2).trim());
    if (item.startsWith("{") || item.startsWith("[")) throw new FrontMatterError(number, "sequence items must be scalars");
    if (item.includes(": ") || item.endsWith(":")) throw new FrontMatterError(number, "nesting deeper than one level is not accepted");
    items.push(parseScalar(number, item));
    index += 1;
  }
  return [items, index];
}

function parseBlockMapping(block: Block, start: number): [Record<string, FrontMatterValue>, number] {
  const mapping: Record<string, FrontMatterValue> = {};
  let index = start;
  while (index < block.length) {
    const [number, text] = block[index] as readonly [number, string];
    if (isNoise(text)) {
      index += 1;
      continue;
    }
    const current = indentOf(text);
    if (current === 0) break;
    if (current !== 2) throw new FrontMatterError(number, "nested keys must be indented by two spaces");
    if (text.slice(2).startsWith("- ")) throw new FrontMatterError(number, "a mapping may not mix keys and sequence items");
    const [key, value] = splitPair(number, text.trim());
    if (!value) throw new FrontMatterError(number, "nesting deeper than one level is not accepted");
    if (Object.hasOwn(mapping, key)) throw new FrontMatterError(number, `duplicate key ${quoted(key)}`);
    mapping[key] = parseValue(number, value);
    index += 1;
  }
  return [mapping, index];
}

export interface ParsedFrontMatter {
  data: FrontMatter;
  bodyLine: number;
}

export function parseFrontMatter(text: string, allowedKeys?: ReadonlySet<string>): ParsedFrontMatter {
  const lines = text.split("\n").map((line) => line.replace(/\r+$/, ""));
  if (lines[0] !== "---") throw new FrontMatterError(1, "the document must start with a '---' front matter block");
  let end: number | null = null;
  for (let number = 2; number <= lines.length; number += 1) {
    if (lines[number - 1] === "---") {
      end = number;
      break;
    }
  }
  if (end === null) throw new FrontMatterError(1, "the front matter block is not closed with '---'");
  const block: Array<[number, string]> = [];
  for (let number = 2; number < end; number += 1) block.push([number, lines[number - 1] as string]);
  for (const [number, line] of block) {
    if (line.includes("\t")) throw new FrontMatterError(number, "tabs are not allowed in the front matter");
  }
  const data: FrontMatter = {};
  let index = 0;
  while (index < block.length) {
    const [number, line] = block[index] as [number, string];
    if (isNoise(line)) {
      index += 1;
      continue;
    }
    if (indentOf(line) > 0) throw new FrontMatterError(number, "unexpected indentation");
    if (line.startsWith("- ")) throw new FrontMatterError(number, "the front matter must be a mapping");
    const [key, value] = splitPair(number, line);
    if (allowedKeys && !allowedKeys.has(key)) throw new FrontMatterError(number, `unknown key ${quoted(key)}`);
    if (Object.hasOwn(data, key)) throw new FrontMatterError(number, `duplicate key ${quoted(key)}`);
    if (value) {
      data[key] = parseValue(number, value);
      index += 1;
      continue;
    }
    const [nested, next] = parseNested(block, index + 1);
    index = next;
    if (nested === null) throw new FrontMatterError(number, `${quoted(key)} has no value`);
    data[key] = nested;
  }
  return { data, bodyLine: end + 1 };
}
