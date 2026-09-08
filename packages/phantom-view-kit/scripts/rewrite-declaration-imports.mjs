import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const distDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");

const declarations = readdirSync(distDirectory).filter((name) => name.endsWith(".d.ts"));

for (const name of declarations) {
  const file = path.join(distDirectory, name);
  const source = readFileSync(file, "utf8");
  const rewritten = source.replace(/(from\s+")(\.[^"]*)\.ts(")/g, "$1$2.js$3");
  if (rewritten !== source) writeFileSync(file, rewritten);
}
