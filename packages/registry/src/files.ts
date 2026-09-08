import { readdirSync, statSync } from "node:fs";
import path from "node:path";

export const SOURCE_DIRECTORY = "src";

export const UNPUBLISHED_DIRECTORIES = ["node_modules", "dist"] as const;

export function extensionFiles(directory: string): string[] {
  return collect(directory, directory);
}

function collect(root: string, directory: string): string[] {
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
    if (entry.isDirectory()) {
      if ((UNPUBLISHED_DIRECTORIES as readonly string[]).includes(entry.name)) continue;
      if (directory === root && entry.name === SOURCE_DIRECTORY) continue;
      files.push(...collect(root, child));
    } else if (entry.isFile()) files.push(child);
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
