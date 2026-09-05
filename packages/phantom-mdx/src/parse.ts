import type { Root, RootContent } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";

export interface Position {
  line: number;
  column: number;
}

export class ParseError extends Error {
  readonly line: number;
  readonly column: number;

  constructor(message: string, position: Position) {
    super(message);
    this.name = "ParseError";
    this.line = position.line;
    this.column = position.column;
  }
}

export interface ParsedDocument {
  tree: Root;
  frontmatter: string | null;
}

const processor = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]).use(remarkMdx).use(remarkGfm);

interface PlacedError {
  message?: unknown;
  reason?: unknown;
  line?: unknown;
  column?: unknown;
  place?: { line?: unknown; column?: unknown; start?: { line?: unknown; column?: unknown } } | null;
}

function positionOf(error: PlacedError): Position {
  const place = error.place ?? undefined;
  const start = place && "start" in place && place.start ? place.start : place;
  const line = typeof error.line === "number" ? error.line : typeof start?.line === "number" ? start.line : 1;
  const column = typeof error.column === "number" ? error.column : typeof start?.column === "number" ? start.column : 1;
  return { line, column };
}

export function toParseError(error: unknown): ParseError {
  if (error instanceof ParseError) return error;
  const placed = (error ?? {}) as PlacedError;
  const reason = typeof placed.reason === "string" ? placed.reason : typeof placed.message === "string" ? placed.message : String(error);
  return new ParseError(reason, positionOf(placed));
}

export function parseDocument(source: string): ParsedDocument {
  let tree: Root;
  try {
    tree = processor.parse(source);
  } catch (error) {
    throw toParseError(error);
  }
  let frontmatter: string | null = null;
  const children: RootContent[] = [];
  for (const child of tree.children) {
    if (child.type === "yaml" && frontmatter === null && children.length === 0) {
      frontmatter = child.value;
      continue;
    }
    children.push(child);
  }
  return { tree: { ...tree, children }, frontmatter };
}
