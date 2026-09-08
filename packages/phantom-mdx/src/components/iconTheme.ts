export const ICON_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "files", label: "Files" },
  { id: "folders", label: "Folders" },
  { id: "languages", label: "Languages" },
  { id: "variants", label: "Variants" },
  { id: "unused", label: "Unused" },
] as const;

export type IconCategory = (typeof ICON_CATEGORIES)[number]["id"];
export type IconKind = Exclude<IconCategory, "all">;

export interface IconEntry {
  name: string;
  path: string;
  category: IconKind;
  draws: string[];
}

export interface MapCount {
  key: string;
  label: string;
  count: number;
}

export interface DefaultRow {
  key: string;
  label: string;
  icon: string;
  path: string | null;
}

export interface IconThemeData {
  icons: IconEntry[];
  counts: Readonly<Record<IconCategory, number>>;
  maps: MapCount[];
  defaults: DefaultRow[];
}

export interface CategoryOption {
  id: IconCategory;
  label: string;
  count: number;
}

export interface Range {
  first: number;
  last: number;
  before: number;
  after: number;
}

interface Slot {
  keys: string[];
  file: boolean;
  folder: boolean;
  language: boolean;
  variant: boolean;
}

export const DRAWS_SHOWN = 4;
export const THEME_FILE = "icon-theme.json";

const FILE_MAPS = ["fileNames", "fileExtensions"] as const;
const FOLDER_MAPS = ["folderNames", "folderNamesExpanded", "rootFolderNames", "rootFolderNamesExpanded"] as const;
const FILE_DEFAULTS = ["file"] as const;
const FOLDER_DEFAULTS = ["folder", "folderExpanded", "rootFolder", "rootFolderExpanded"] as const;
const VARIANT_MAPS = ["light", "highContrast"] as const;
const DIRECTORY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

const MAP_LABELS: ReadonlyArray<readonly [string, string]> = [
  ["fileExtensions", "Suffixes"],
  ["fileNames", "File names"],
  ["languageIds", "Language ids"],
  ["folderNames", "Folder names"],
  ["folderNamesExpanded", "Open folder names"],
  ["rootFolderNames", "Root folder names"],
];

const DEFAULT_LABELS: ReadonlyArray<readonly [string, string]> = [
  ["file", "Any file"],
  ["folder", "Any folder"],
  ["folderExpanded", "Open folder"],
  ["rootFolder", "Workspace root"],
  ["rootFolderExpanded", "Open workspace root"],
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringEntries(value: unknown): Array<[string, string]> {
  if (!isRecord(value)) return [];
  const entries: Array<[string, string]> = [];
  for (const [key, target] of Object.entries(value)) {
    if (typeof target === "string") entries.push([key, target]);
  }
  return entries;
}

function normalizePath(iconPath: string): string {
  return iconPath.replace(/^\.\//, "");
}

function kindOf(slot: Slot): IconKind {
  if (slot.folder) return "folders";
  if (slot.file) return "files";
  if (slot.language) return "languages";
  if (slot.variant) return "variants";
  return "unused";
}

function noIcons(): IconThemeData {
  return { icons: [], counts: { all: 0, files: 0, folders: 0, languages: 0, variants: 0, unused: 0 }, maps: [], defaults: [] };
}

function mapCounts(value: Record<string, unknown>): MapCount[] {
  const counted: MapCount[] = [];
  for (const [key, label] of MAP_LABELS) {
    const entries = stringEntries(value[key]);
    if (entries.length > 0) counted.push({ key, label, count: entries.length });
  }
  return counted;
}

function defaultRows(value: Record<string, unknown>, paths: ReadonlyMap<string, string>): DefaultRow[] {
  const rows: DefaultRow[] = [];
  for (const [key, label] of DEFAULT_LABELS) {
    const icon = value[key];
    if (typeof icon !== "string" || icon === "") continue;
    rows.push({ key, label, icon, path: paths.get(icon) ?? null });
  }
  return rows;
}

export function parseIconTheme(value: unknown): IconThemeData {
  if (!isRecord(value)) return noIcons();
  const definitions = value["iconDefinitions"];
  if (!isRecord(definitions)) return noIcons();

  const slots = new Map<string, Slot>();
  for (const name of Object.keys(definitions)) {
    slots.set(name, { keys: [], file: false, folder: false, language: false, variant: false });
  }

  const mark = (target: string, key: string | null, field: keyof Omit<Slot, "keys">) => {
    const slot = slots.get(target);
    if (slot === undefined) return;
    slot[field] = true;
    if (key !== null) slot.keys.push(key);
  };

  for (const map of FILE_MAPS) {
    for (const [key, target] of stringEntries(value[map])) mark(target, key, "file");
  }
  for (const map of FOLDER_MAPS) {
    for (const [key, target] of stringEntries(value[map])) mark(target, key, "folder");
  }
  for (const [key, target] of stringEntries(value["languageIds"])) mark(target, key, "language");
  for (const key of FILE_DEFAULTS) {
    const target = value[key];
    if (typeof target === "string") mark(target, null, "file");
  }
  for (const key of FOLDER_DEFAULTS) {
    const target = value[key];
    if (typeof target === "string") mark(target, null, "folder");
  }
  for (const map of VARIANT_MAPS) {
    const nested = value[map];
    if (!isRecord(nested)) continue;
    for (const [, target] of stringEntries(nested)) mark(target, null, "variant");
    for (const inner of Object.values(nested)) {
      for (const [, target] of stringEntries(inner)) mark(target, null, "variant");
    }
  }

  const icons: IconEntry[] = [];
  const counts: Record<IconCategory, number> = { all: 0, files: 0, folders: 0, languages: 0, variants: 0, unused: 0 };
  for (const [name, definition] of Object.entries(definitions)) {
    const iconPath = isRecord(definition) ? definition["iconPath"] : undefined;
    if (typeof iconPath !== "string" || iconPath === "") continue;
    const slot = slots.get(name) as Slot;
    const category = kindOf(slot);
    icons.push({ name, path: normalizePath(iconPath), category, draws: [...new Set(slot.keys)].sort() });
    counts[category] += 1;
    counts.all += 1;
  }
  icons.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
  const paths = new Map(icons.map((icon) => [icon.name, icon.path]));
  return { icons, counts, maps: mapCounts(value), defaults: defaultRows(value, paths) };
}

export function iconCategories(counts: Readonly<Record<IconCategory, number>>): CategoryOption[] {
  return ICON_CATEGORIES.filter((entry) => counts[entry.id] > 0).map((entry) => ({
    id: entry.id,
    label: entry.label,
    count: counts[entry.id],
  }));
}

export function haystack(icon: IconEntry): string {
  return [icon.name, ...icon.draws].join(" ").toLowerCase();
}

export function matchIcons(icons: readonly IconEntry[], query: string, category: IconCategory): IconEntry[] {
  const needle = query.trim().toLowerCase();
  const wanted = category === "all" ? null : category;
  const matched: IconEntry[] = [];
  for (const icon of icons) {
    if (wanted !== null && icon.category !== wanted) continue;
    if (needle !== "" && !haystack(icon).includes(needle)) continue;
    matched.push(icon);
  }
  return matched;
}

function hitFirst(key: string, needle: string): number {
  return key.toLowerCase().includes(needle) ? 0 : 1;
}

export function drawsLine(icon: IconEntry, query: string): string {
  const needle = query.trim().toLowerCase();
  const keys = needle === "" ? icon.draws : [...icon.draws].sort((left, right) => hitFirst(left, needle) - hitFirst(right, needle));
  if (keys.length === 0) return "";
  const shown = keys.slice(0, DRAWS_SHOWN);
  const rest = keys.length - shown.length;
  return rest > 0 ? `${shown.join(" ")} +${rest}` : shown.join(" ");
}

export function visibleRange(rows: number, rowHeight: number, scrollTop: number, viewport: number, overscan: number): Range {
  if (rows <= 0 || rowHeight <= 0) return { first: 0, last: -1, before: 0, after: 0 };
  const top = Math.max(0, Math.min(scrollTop, rows * rowHeight));
  const first = Math.max(0, Math.floor(top / rowHeight) - overscan);
  const fit = Math.max(1, Math.ceil(Math.max(viewport, 0) / rowHeight));
  const last = Math.min(rows - 1, first + fit + overscan * 2);
  return { first, last, before: first * rowHeight, after: (rows - 1 - last) * rowHeight };
}

export function columnsFor(width: number, tile: number): number {
  if (tile <= 0) return 1;
  return Math.max(1, Math.floor(Math.max(width, 0) / tile));
}

export function isThemeDirectory(value: string): boolean {
  return DIRECTORY_PATTERN.test(value);
}

function resolveInside(relative: string, baseURL: string): string | null {
  const segments = relative.split("/");
  if (!isThemeDirectory(segments[0] ?? "")) return null;
  if (segments.some((segment) => segment === "" || segment === "." || segment === ".." || segment.includes("\\"))) return null;
  let base: URL;
  try {
    base = new URL(baseURL.endsWith("/") ? baseURL : `${baseURL}/`);
  } catch {
    return null;
  }
  const resolved = new URL(relative, base);
  if (resolved.protocol !== base.protocol || !resolved.href.startsWith(base.href)) return null;
  return resolved.href;
}

export function themeFileURL(directory: string, baseURL: string): string | null {
  return resolveInside(`${directory}/${THEME_FILE}`, baseURL);
}

export function iconFileURL(directory: string, iconPath: string, baseURL: string): string | null {
  return resolveInside(`${directory}/${normalizePath(iconPath)}`, baseURL);
}

export function loadThemeFile(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "text";
    request.onload = () => {
      if (request.status !== 0 && (request.status < 200 || request.status >= 300)) {
        reject(new Error(`the theme file answered ${request.status}`));
        return;
      }
      try {
        resolve(JSON.parse(request.responseText) as unknown);
      } catch {
        reject(new Error("the theme file is not JSON"));
      }
    };
    request.onerror = () => reject(new Error("the theme file could not be read"));
    request.send();
  });
}
