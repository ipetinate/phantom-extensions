import { MEDIA_DIRECTORY, MEDIA_SUFFIXES } from "./schema.ts";

const FORBIDDEN_CHARACTERS = /[\\%?#\s]/;

export function mediaSuffix(path: string): string {
  const name = path.slice(path.lastIndexOf("/") + 1);
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

export function isMediaPath(path: string, suffixes: readonly string[] = MEDIA_SUFFIXES): boolean {
  if (!path.startsWith(MEDIA_DIRECTORY) || path.endsWith("/")) return false;
  if (FORBIDDEN_CHARACTERS.test(path) || path.includes("//")) return false;
  if (path.split("/").some((segment) => segment === "." || segment === "..")) return false;
  return suffixes.includes(mediaSuffix(path));
}

export function normalizeBaseURL(baseURL: string): URL | null {
  try {
    return new URL(baseURL.endsWith("/") ? baseURL : `${baseURL}/`);
  } catch {
    return null;
  }
}

export function resolveMedia(path: string, baseURL: string, suffixes: readonly string[] = MEDIA_SUFFIXES): string | null {
  if (!isMediaPath(path, suffixes)) return null;
  const base = normalizeBaseURL(baseURL);
  if (!base) return null;
  const resolved = new URL(path, base);
  if (resolved.protocol !== base.protocol || !resolved.href.startsWith(base.href)) return null;
  return resolved.href;
}

export function isAllowedLink(href: string): boolean {
  return /^https:\/\/[^/\s]+/i.test(href) || /^mailto:[^\s]+$/i.test(href);
}
