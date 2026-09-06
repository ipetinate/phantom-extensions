import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fail, isHttpsURL, isRecord, requireAsset, type JsonValue } from "./checks.ts";
import { FrontMatterError, quoted } from "./errors.ts";
import { parseFrontMatter, type FrontMatter, type FrontMatterValue } from "./frontMatter.ts";
import type { Manifest } from "./manifest.ts";
import { COVER_SUFFIXES, ICON_SUFFIXES, IMAGE_SUFFIXES, MEDIA_DIRECTORY, suffixOf } from "./suffixes.ts";

export const DOCUMENT_NAMES = ["extension.mdx", "extension.md"] as const;
export const MAX_DOCUMENT_BYTES = 256 * 1024;
export const FRONT_MATTER_KEYS = new Set([
  "title",
  "tagline",
  "version",
  "author",
  "license",
  "created",
  "updated",
  "icon",
  "cover",
  "tags",
  "screenshots",
]);
export const AUTHOR_KEYS = new Set(["name", "url"]);
export const MAX_TITLE_CHARS = 80;
export const MAX_TAGLINE_CHARS = 160;
export const MAX_AUTHOR_CHARS = 80;
export const MAX_LICENSE_CHARS = 64;
export const MAX_TAGS = 8;
export const MAX_SCREENSHOTS = 8;
export const TAG_PATTERN = /^[a-z0-9][a-z0-9-]{0,23}$/;
export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const TIMESTAMP_PATTERN = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})?$/;

export interface DocumentCard {
  title: string;
  tagline: string;
  author: { name: string; url: string | null };
  license: string;
  created: string;
  updated: string;
  icon: string | null;
  cover: string | null;
  tags: string[];
  screenshots: string[];
  document: string;
  documentBytes: number;
}

export function documentName(directory: string): string {
  const present = DOCUMENT_NAMES.filter((name) => {
    try {
      return statSync(path.join(directory, name)).isFile();
    } catch {
      return false;
    }
  });
  if (present.length === 0) fail(directory, `needs a document: ${DOCUMENT_NAMES.join(" or ")}`);
  if (present.length > 1) fail(directory, `holds both ${present.join(" and ")}; keep one`);
  return present[0] as string;
}

function documentFail(directory: string, message: string): never {
  fail(directory, `${documentName(directory)}: ${message}`);
}

function characters(value: string): number {
  return Array.from(value).length;
}

function requireText(directory: string, data: Record<string, FrontMatterValue>, key: string, limit: number, required = true): string | null {
  if (!Object.hasOwn(data, key)) {
    if (required) documentFail(directory, `front matter needs ${quoted(key)}`);
    return null;
  }
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) documentFail(directory, `${quoted(key)} must be a non-empty text`);
  if (characters(value) > limit) documentFail(directory, `${quoted(key)} is longer than ${limit} characters`);
  return value;
}

function requireHttps(directory: string, key: string, value: string): string {
  if (!isHttpsURL(value)) documentFail(directory, `${quoted(key)} must be an https URL`);
  return value;
}

function requireMedia(directory: string, key: string, value: FrontMatterValue | undefined, suffixes: readonly string[]): string {
  if (typeof value !== "string" || !value.startsWith(`${MEDIA_DIRECTORY}/`)) {
    documentFail(directory, `${quoted(key)} must point under ${MEDIA_DIRECTORY}/: ${quoted(value)}`);
  }
  requireAsset(directory, value);
  if (!suffixes.includes(suffixOf(value))) {
    documentFail(directory, `${quoted(key)} must end in one of ${[...suffixes].sort().join(", ")}: ${value}`);
  }
  if (!statSync(path.join(directory, value)).isFile()) documentFail(directory, `${quoted(key)} is not a file: ${value}`);
  return value;
}

function requireList(directory: string, data: FrontMatter, key: string, limit: number): FrontMatterValue[] {
  const value = Object.hasOwn(data, key) ? data[key] : [];
  if (!Array.isArray(value)) documentFail(directory, `${quoted(key)} must be a sequence`);
  if (value.length > limit) documentFail(directory, `${quoted(key)} holds more than ${limit} entries`);
  return value;
}

export function requireDate(directory: string, key: string, value: FrontMatterValue | undefined): string {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) documentFail(directory, `${quoted(key)} must be a YYYY-MM-DD date`);
  const [year, month, day] = value.split("-").map(Number) as [number, number, number];
  const moment = new Date(Date.UTC(year, month - 1, day));
  if (moment.getUTCFullYear() !== year || moment.getUTCMonth() + 1 !== month || moment.getUTCDate() !== day) {
    documentFail(directory, `${quoted(key)} is not a valid date: ${value}`);
  }
  return value;
}

export function utcTimestamp(moment: Date): string {
  return `${moment.toISOString().slice(0, 19)}Z`;
}

export function normaliseUpdated(directory: string, value: FrontMatterValue): string {
  if (typeof value !== "string") documentFail(directory, "'updated' must be a date or an ISO 8601 timestamp");
  if (DATE_PATTERN.test(value)) {
    requireDate(directory, "updated", value);
    return `${value}T00:00:00Z`;
  }
  const match = TIMESTAMP_PATTERN.exec(value);
  if (!match) documentFail(directory, `'updated' is not an ISO 8601 timestamp: ${value}`);
  if (!match[7]) documentFail(directory, "'updated' needs a UTC offset or Z");
  const moment = new Date(value.replace(" ", "T"));
  if (Number.isNaN(moment.getTime())) documentFail(directory, `'updated' is not an ISO 8601 timestamp: ${value}`);
  return utcTimestamp(moment);
}

export function gitUpdated(directory: string): string | null {
  let stamp: string;
  try {
    stamp = execFileSync("git", ["log", "-1", "--format=%cI", "--", "."], {
      cwd: directory,
      encoding: "utf8",
      timeout: 30_000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
  if (!stamp) return null;
  const moment = new Date(stamp);
  if (Number.isNaN(moment.getTime())) return null;
  return utcTimestamp(moment);
}

export function validateFrontMatter(directory: string, manifest: Manifest, data: FrontMatter): Omit<DocumentCard, "document" | "documentBytes"> {
  const title = requireText(directory, data, "title", MAX_TITLE_CHARS) as string;
  const tagline = requireText(directory, data, "tagline", MAX_TAGLINE_CHARS) as string;
  const version = requireText(directory, data, "version", 32) as string;
  if (version !== manifest.version) {
    documentFail(directory, `'version' is ${version} but extension.json says ${manifest.version}`);
  }
  const author = data["author"];
  if (!isRecord(author as JsonValue)) documentFail(directory, "front matter needs 'author' with a 'name'");
  const authorData = author as Record<string, FrontMatterValue>;
  const unknown = Object.keys(authorData).filter((key) => !AUTHOR_KEYS.has(key));
  if (unknown.length > 0) documentFail(directory, `'author' has unknown keys: ${unknown.sort().join(", ")}`);
  const authorName = requireText(directory, authorData, "name", MAX_AUTHOR_CHARS) as string;
  const authorURL = requireText(directory, authorData, "url", 2048, false);
  if (authorURL !== null) requireHttps(directory, "author.url", authorURL);
  const license = requireText(directory, data, "license", MAX_LICENSE_CHARS) as string;
  const created = requireDate(directory, "created", data["created"]);
  const updated = Object.hasOwn(data, "updated")
    ? normaliseUpdated(directory, data["updated"] as FrontMatterValue)
    : (gitUpdated(directory) ?? `${created}T00:00:00Z`);
  const icon = Object.hasOwn(data, "icon") ? requireMedia(directory, "icon", data["icon"], ICON_SUFFIXES) : null;
  const cover = Object.hasOwn(data, "cover") ? requireMedia(directory, "cover", data["cover"], COVER_SUFFIXES) : null;
  const tags = requireList(directory, data, "tags", MAX_TAGS);
  for (const tag of tags) {
    if (typeof tag !== "string" || !TAG_PATTERN.test(tag)) documentFail(directory, `tag does not match ${TAG_PATTERN.source}: ${quoted(tag)}`);
  }
  if (new Set(tags as string[]).size !== tags.length) documentFail(directory, "'tags' holds a duplicate");
  const screenshots = requireList(directory, data, "screenshots", MAX_SCREENSHOTS);
  for (const shot of screenshots) requireMedia(directory, "screenshots", shot, IMAGE_SUFFIXES);
  return {
    title,
    tagline,
    author: { name: authorName, url: authorURL },
    license,
    created,
    updated,
    icon,
    cover,
    tags: tags as string[],
    screenshots: screenshots as string[],
  };
}

export function loadDocument(directory: string, manifest: Manifest): DocumentCard {
  const name = documentName(directory);
  const file = path.join(directory, name);
  const size = statSync(file).size;
  if (size > MAX_DOCUMENT_BYTES) documentFail(directory, `larger than ${MAX_DOCUMENT_BYTES} bytes`);
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(readFileSync(file));
  } catch (error) {
    documentFail(directory, `not UTF-8: ${error instanceof Error ? error.message : String(error)}`);
  }
  let data: FrontMatter;
  try {
    data = parseFrontMatter(text, FRONT_MATTER_KEYS).data;
  } catch (error) {
    if (!(error instanceof FrontMatterError)) throw error;
    fail(directory, `${name}:${error.line}: ${error.detail}`);
  }
  return { ...validateFrontMatter(directory, manifest, data), document: name, documentBytes: size };
}
