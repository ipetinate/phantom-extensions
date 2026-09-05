import path from "node:path";
import { checkFile, findDocument } from "./check.ts";

function usage(): number {
  process.stderr.write(
    [
      "usage:",
      "  phantom-mdx check <dir>...    validate <dir>/extension.mdx or extension.md; exit 1 on any violation",
      "  phantom-mdx preview <dir>     open the document in the viewer with live reload",
      "",
    ].join("\n"),
  );
  return 2;
}

function check(directories: string[]): number {
  if (directories.length === 0) return usage();
  let failed = false;
  for (const directory of directories) {
    const lookup = findDocument(directory);
    if (lookup.file === null) {
      process.stdout.write(`${directory}: ${lookup.reason}\n`);
      failed = true;
      continue;
    }
    const violations = checkFile(lookup.file);
    for (const violation of violations) {
      process.stdout.write(`${lookup.file}:${violation.line}:${violation.column} ${violation.message}\n`);
    }
    if (violations.length > 0) {
      failed = true;
    } else {
      process.stdout.write(`${lookup.file}: ok\n`);
    }
  }
  return failed ? 1 : 0;
}

async function preview(directories: string[]): Promise<number> {
  const directory = directories[0];
  if (!directory || directories.length !== 1) return usage();
  const lookup = findDocument(directory);
  if (lookup.file === null) {
    process.stderr.write(`${directory}: ${lookup.reason}\n`);
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
