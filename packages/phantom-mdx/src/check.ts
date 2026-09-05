import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseDocument, toParseError } from "./parse.ts";
import { collectMedia, validateTree, type Violation } from "./validate.ts";

export const DOCUMENT_NAMES = ["extension.mdx", "extension.md"] as const;

export type DocumentLookup = { file: string } | { file: null; reason: string };

export function findDocument(directory: string): DocumentLookup {
  const present = DOCUMENT_NAMES.filter((name) => existsSync(path.join(directory, name)));
  if (present.length === 0) return { file: null, reason: `no ${DOCUMENT_NAMES.join(" or ")}` };
  if (present.length > 1) return { file: null, reason: `holds both ${present.join(" and ")}; keep one` };
  return { file: path.join(directory, present[0] as string) };
}

export function checkFile(file: string): Violation[] {
  const directory = path.dirname(file);
  const source = readFileSync(file, "utf8");
  let tree;
  try {
    tree = parseDocument(source).tree;
  } catch (error) {
    const parseError = toParseError(error);
    return [{ code: "syntax", message: parseError.message, line: parseError.line, column: parseError.column }];
  }
  const violations = validateTree(tree);
  for (const reference of collectMedia(tree)) {
    if (!existsSync(path.join(directory, reference.path))) {
      violations.push({ code: "media-missing", message: `${reference.path} does not exist`, line: reference.line, column: reference.column });
    }
  }
  return violations.sort((a, b) => a.line - b.line || a.column - b.column);
}
