import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
export const REGISTRY_DIRECTORIES = ["extensions", "themes"] as const;
export const EXTENSION_ROOTS = REGISTRY_DIRECTORIES.map((directory) => path.join(ROOT, directory));

export function describe(directory: string): string {
  const relative = path.relative(ROOT, directory);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) return directory;
  return relative;
}
