import { statSync } from "node:fs";
import path from "node:path";
import { fail, isRecord, requireAsset, requireString, type JsonObject, type JsonValue } from "./checks.ts";
import { quoted } from "./errors.ts";
import { ICON_SUFFIXES, suffixOf } from "./suffixes.ts";

export const VIEW_ID_PATTERN = /^[a-z0-9_+-]+$/;
export const MAX_VIEWS = 8;
export const MAX_VIEW_TITLE_CHARS = 64;
export const MAX_VIEW_PERMISSIONS = 16;

/**
 * Where a view's page is drawn.
 *
 * A `sidebar` view is a panel of the sidebar, selected by its own button in
 * the rail or the top bar, the way Files and Git are. An `editor` view is a
 * tab, and it is opened by another view of the same extension through
 * `views.open`.
 *
 * An interactive extension usually contributes both: a tree on the sidebar,
 * and the page a row of that tree opens. The sidebar when the key is
 * absent, which is where an entry written before this field existed was
 * drawn.
 */
export const VIEW_SURFACES = ["sidebar", "editor"] as const;

/**
 * What a claim on a file name is worth.
 *
 * `option` leaves the reader's text editor opening the file and offers the
 * view beside it; `default` gives the view the file. `option` when the key
 * is absent, because a claimed file is still a text file the reader may have
 * come to read as text, and taking it over is the larger claim.
 */
export const VIEW_PRIORITIES = ["option", "default"] as const;

/** How many file-name patterns one view may claim. */
export const MAX_VIEW_PATTERNS = 32;

/**
 * Which of the sidebar's two switcher bars carries a panel's button. Both
 * when the file names none.
 *
 * A `sidebar` entry only. An `editor` view is reached by opening a file it
 * claims, never by a button: a button that opened a blank editor tab would
 * be a button whose meaning depends on what the extension does next, and an
 * extension contributing both surfaces would put two marks in the rail for
 * one extension.
 */
export const VIEW_PLACEMENTS = ["sidebar", "topBar"] as const;

/**
 * The suffixes Phantom loads a view's two files as.
 *
 * The entry is loaded as an ES module and the stylesheet as a stylesheet, so
 * a path outside these lists is a file the page would ask the engine to
 * interpret as something it is not.
 */
export const VIEW_ENTRY_SUFFIXES = ["js", "mjs"] as const;
export const VIEW_STYLE_SUFFIXES = ["css"] as const;

/**
 * Every method a view may declare, and the whole of what a page can reach
 * outside its own window.
 *
 * A name not in this list is refused here rather than dropped. Phantom drops
 * it — a manifest written for a later build keeps the half the running one
 * understands — but publishing a permission no Phantom has ever had is a
 * typo, and the extension would ship a page whose calls all fail.
 */
export const VIEW_PERMISSIONS = [
  "workspace.root",
  "workspace.list",
  "workspace.read",
  "workspace.create",
  "workspace.replace",
  "workspace.choose",
  "views.open",
  "state.read",
  "state.write",
  "editor.dirty",
  "theme.read",
  "http.request",
] as const;

/**
 * How large a view's bundle may be, entry plus stylesheet.
 *
 * Phantom copies both into a directory of its own every time the bundle
 * changes, and refuses a pair over this. Checked here so the refusal is a
 * publish error rather than a reader opening a panel that says no.
 */
export const MAX_VIEW_BUNDLE_BYTES = 4 * 1024 * 1024;

function bytesOf(directory: string, relative: string): number {
  try {
    return statSync(path.join(directory, relative)).size;
  } catch {
    return 0;
  }
}

/**
 * One `contributes.views[]` entry.
 *
 * `requireAsset` is what refuses an `entry` or an `icon` that is absent from
 * the package or that climbs out of it: it is the same check every other
 * contributed path goes through, and Phantom applies its own on load through
 * `LanguageContribution.containedURL`.
 */
interface ValidatedView {
  readonly viewId: string;
  readonly surface: string;
  readonly permissions: readonly string[];
}

function validateView(directory: string, view: JsonValue): ValidatedView {
  if (!isRecord(view)) fail(directory, "each view must be an object");
  const viewId = requireString(directory, view, "viewId", VIEW_ID_PATTERN);
  const subject = `view ${quoted(viewId)}`;

  const title = requireString(directory, view, "title");
  if (Array.from(title).length > MAX_VIEW_TITLE_CHARS) {
    fail(directory, `${subject}: title is longer than ${MAX_VIEW_TITLE_CHARS} characters`);
  }

  const entry = requireString(directory, view, "entry");
  requireAsset(directory, entry);
  if (!(VIEW_ENTRY_SUFFIXES as readonly string[]).includes(suffixOf(entry))) {
    fail(directory, `${subject}: entry must be one of ${VIEW_ENTRY_SUFFIXES.join(", ")}, not ${quoted(entry)}`);
  }

  const icon = requireString(directory, view, "icon");
  requireAsset(directory, icon);
  if (!(ICON_SUFFIXES as readonly string[]).includes(suffixOf(icon))) {
    fail(
      directory,
      `${subject}: icon must be a ${ICON_SUFFIXES.join(" or ")} file the package ships, not ${quoted(icon)}. ` +
        "A view's icon is never an SF Symbol name: a symbol the reader's macOS does not resolve makes the row vanish with nothing logged.",
    );
  }

  let bundle = bytesOf(directory, entry);
  const style = view["style"];
  if (style !== undefined) {
    if (typeof style !== "string") fail(directory, `${subject}: style must be a path to a stylesheet`);
    requireAsset(directory, style);
    if (!(VIEW_STYLE_SUFFIXES as readonly string[]).includes(suffixOf(style))) {
      fail(directory, `${subject}: style must be one of ${VIEW_STYLE_SUFFIXES.join(", ")}, not ${quoted(style)}`);
    }
    bundle += bytesOf(directory, style);
  }
  if (bundle > MAX_VIEW_BUNDLE_BYTES) {
    fail(directory, `${subject}: entry and style come to ${bundle} bytes, over the ${MAX_VIEW_BUNDLE_BYTES} Phantom stages`);
  }

  const surface = view["surface"];
  if (surface !== undefined) {
    if (typeof surface !== "string" || !(VIEW_SURFACES as readonly string[]).includes(surface)) {
      fail(directory, `${subject}: unknown surface ${quoted(surface)}; use ${VIEW_SURFACES.join(" or ")}`);
    }
  }

  const priority = view["priority"];
  if (priority !== undefined) {
    if (typeof priority !== "string" || !(VIEW_PRIORITIES as readonly string[]).includes(priority)) {
      fail(directory, `${subject}: unknown priority ${quoted(priority)}; use ${VIEW_PRIORITIES.join(" or ")}`);
    }
  }

  const patterns = view["filenamePatterns"];
  if (patterns !== undefined) {
    if (!Array.isArray(patterns) || patterns.length === 0) {
      fail(directory, `${subject}: filenamePatterns must be a non-empty array of glob patterns`);
    }
    if (patterns.length > MAX_VIEW_PATTERNS) {
      fail(directory, `${subject} claims ${patterns.length} patterns, more than the ${MAX_VIEW_PATTERNS} Phantom reads`);
    }
    /* A pattern on a sidebar panel is ignored by Phantom — a file does not
     * open into a panel — so publishing one is a mistake to catch here
     * rather than a silent no-op the author has to guess at. */
    if (surface !== "editor") {
      fail(directory, `${subject}: filenamePatterns needs "surface": "editor"; a file does not open into a sidebar panel`);
    }
    const seen = new Set<string>();
    for (const pattern of patterns) {
      if (typeof pattern !== "string" || pattern === "") {
        fail(directory, `${subject}: each filenamePattern must be a non-empty string`);
      }
      /* Phantom compiles these with GlobPattern.fileNamePattern, which
       * refuses a separator: an editor claims a name, never a location. */
      if (pattern.includes("/") || pattern.includes("\\")) {
        fail(directory, `${subject}: filenamePattern ${quoted(pattern)} may not hold a path separator`);
      }
      if (pattern.includes("[") || pattern.includes("]")) {
        fail(directory, `${subject}: filenamePattern ${quoted(pattern)} may not hold a character class`);
      }
      const lowered = pattern.toLowerCase();
      if (seen.has(lowered)) fail(directory, `${subject}: filenamePattern ${quoted(pattern)} is listed twice`);
      seen.add(lowered);
    }
  }

  if (patterns === undefined && priority === "default") {
    fail(directory, `${subject}: "priority": "default" claims nothing without filenamePatterns`);
  }

  const placements = view["placements"];
  if (placements !== undefined) {
    /* The mirror of the filenamePatterns rule above, and the shape is
     * symmetric on purpose: a placement belongs to the surface that has a
     * button, a pattern to the surface that opens a file. */
    if (surface === "editor") {
      fail(directory, `${subject}: placements needs "surface": "sidebar"; an editor view is opened by a file, not by a button`);
    }
    if (!Array.isArray(placements) || placements.length === 0) {
      fail(directory, `${subject}: placements must be a non-empty array of ${VIEW_PLACEMENTS.join(", ")}`);
    }
    const seen = new Set<string>();
    for (const placement of placements) {
      if (typeof placement !== "string" || !(VIEW_PLACEMENTS as readonly string[]).includes(placement)) {
        fail(directory, `${subject}: unknown placement ${quoted(placement)}; use ${VIEW_PLACEMENTS.join(" or ")}`);
      }
      if (seen.has(placement)) fail(directory, `${subject}: placement ${quoted(placement)} is listed twice`);
      seen.add(placement);
    }
  }

  const permissions = view["permissions"];
  if (permissions !== undefined) {
    if (!Array.isArray(permissions)) fail(directory, `${subject}: permissions must be an array of method names`);
    if (permissions.length > MAX_VIEW_PERMISSIONS) {
      fail(directory, `${subject} declares ${permissions.length} permissions, more than the ${MAX_VIEW_PERMISSIONS} Phantom reads`);
    }
    const seen = new Set<string>();
    for (const permission of permissions) {
      if (typeof permission !== "string" || !(VIEW_PERMISSIONS as readonly string[]).includes(permission)) {
        fail(directory, `${subject}: unknown permission ${quoted(permission)}; Phantom offers ${VIEW_PERMISSIONS.join(", ")}`);
      }
      if (seen.has(permission)) fail(directory, `${subject}: permission ${quoted(permission)} is listed twice`);
      seen.add(permission);
    }
  }

  return {
    viewId,
    surface: typeof surface === "string" ? surface : "sidebar",
    permissions: Array.isArray(permissions) ? permissions.filter((one): one is string => typeof one === "string") : [],
  };
}

export function validateViews(directory: string, views: JsonValue[]): void {
  if (views.length > MAX_VIEWS) {
    fail(directory, `declares ${views.length} views, more than the ${MAX_VIEWS} Phantom reads`);
  }

  const seen = new Set<string>();
  const validated: ValidatedView[] = [];
  for (const view of views) {
    const one = validateView(directory, view);
    if (seen.has(one.viewId)) fail(directory, `view ${quoted(one.viewId)} is declared twice`);
    seen.add(one.viewId);
    validated.push(one);
  }

  /* `views.open` opens an editor view of the same extension, so a manifest
   * that declares the method and ships no editor view has published a page
   * whose every call fails. Caught here rather than at run time, because the
   * reader would see a button that does nothing and have no way to know
   * why. */
  const opener = validated.find((one) => one.permissions.includes("views.open"));
  if (opener !== undefined && !validated.some((one) => one.surface === "editor")) {
    fail(
      directory,
      `view ${quoted(opener.viewId)} declares views.open, but no view has "surface": "editor" for it to open`,
    );
  }
}

/** The files a view's entry references, so `checkLayout` does not refuse them. */
export function viewPaths(views: JsonObject[]): string[] {
  const paths: string[] = [];
  for (const view of views) {
    for (const key of ["entry", "icon", "style"] as const) {
      const value = view[key];
      if (typeof value === "string") paths.push(value);
    }
  }
  return paths;
}
