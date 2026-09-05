import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseDocument, toParseError } from "./parse.ts";
import { collectMedia, validateTree, type Violation } from "./validate.ts";

const DOCUMENT_NAME = "extension.mdx";

function usage(): number {
  process.stderr.write(
    [
      "usage:",
      "  phantom-mdx check <dir>...    validate <dir>/extension.mdx; exit 1 on any violation",
      "  phantom-mdx preview <dir>     open the document in the viewer with live reload",
      "",
    ].join("\n"),
  );
  return 2;
}

export function checkDirectory(directory: string): Violation[] {
  const file = path.join(directory, DOCUMENT_NAME);
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

function check(directories: string[]): number {
  if (directories.length === 0) return usage();
  let failed = false;
  for (const directory of directories) {
    const file = path.join(directory, DOCUMENT_NAME);
    if (!existsSync(file)) {
      process.stdout.write(`${directory}: no ${DOCUMENT_NAME}\n`);
      continue;
    }
    const violations = checkDirectory(directory);
    for (const violation of violations) {
      process.stdout.write(`${file}:${violation.line}:${violation.column} ${violation.message}\n`);
    }
    if (violations.length > 0) {
      failed = true;
    } else {
      process.stdout.write(`${file}: ok\n`);
    }
  }
  return failed ? 1 : 0;
}

async function preview(directories: string[]): Promise<number> {
  const directory = directories[0];
  if (!directory || directories.length !== 1) return usage();
  if (!existsSync(path.join(directory, DOCUMENT_NAME))) {
    process.stderr.write(`${directory}: no ${DOCUMENT_NAME}\n`);
    return 1;
  }
  const { startPreview } = await import("./preview/server.ts");
  await startPreview(path.resolve(directory));
  return -1;
}

async function main(argv: string[]): Promise<number> {
  const [command, ...rest] = argv;
  switch (command) {
    case "check":
      return check(rest);
    case "preview":
      return preview(rest);
    default:
      return usage();
  }
}

main(process.argv.slice(2)).then(
  (code) => {
    if (code > 0) process.exitCode = code;
  },
  (error: unknown) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  },
);
