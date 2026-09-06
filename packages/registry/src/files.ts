import { readdirSync, statSync } from "node:fs";
import path from "node:path";

export function extensionFiles(directory: string): string[] {
  let entries;
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue;
    const child = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...extensionFiles(child));
    else if (entry.isFile()) files.push(child);
  }
  return files.sort();
}

export function isDirectory(target: string): boolean {
  try {
    return statSync(target).isDirectory();
  } catch {
    return false;
  }
}

export function relativePath(directory: string, file: string): string {
  return path.relative(directory, file).split(path.sep).join("/");
}
