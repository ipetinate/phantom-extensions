import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
export const EXTENSIONS = path.join(ROOT, "extensions");

export function describe(directory: string): string {
  const relative = path.relative(ROOT, directory);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) return directory;
  return relative;
}
