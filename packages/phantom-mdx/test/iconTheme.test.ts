import { describe, expect, it } from "vitest";
import {
  columnsFor,
  drawsLine,
  haystack,
  iconCategories,
  iconFileURL,
  isThemeDirectory,
  matchIcons,
  parseIconTheme,
  themeFileURL,
  visibleRange,
  type IconEntry,
} from "../src/components/iconTheme.ts";

const theme = {
  iconDefinitions: {
    ts: { iconPath: "./icons/ts.svg" },
    json: { iconPath: "./icons/json.svg" },
    folder: { iconPath: "./icons/folder.svg" },
    "folder-open": { iconPath: "./icons/folder-open.svg" },
    document: { iconPath: "./icons/document.svg" },
    rego: { iconPath: "./icons/rego.svg" },
    ts_light: { iconPath: "./icons/ts_light.svg" },
    unreachable: { iconPath: "./icons/unreachable.svg" },
    nameless: {},
  },
  fileExtensions: { ts: "ts", tsx: "ts", json: "json" },
  fileNames: { "tsconfig.json": "ts" },
  languageIds: { typescript: "ts", rego: "rego" },
  folderNames: { src: "folder" },
  folderNamesExpanded: { src: "folder-open" },
  file: "document",
  folder: "folder",
  folderExpanded: "folder-open",
  light: { fileExtensions: { ts: "ts_light" } },
};

function names(icons: readonly IconEntry[]): string[] {
  return icons.map((icon) => icon.name);
}

describe("parseIconTheme", () => {
  it("lists every icon that names a file, in name order", () => {
    const { icons } = parseIconTheme(theme);
    expect(names(icons)).toEqual(["document", "folder", "folder-open", "json", "rego", "ts", "ts_light", "unreachable"]);
  });

  it("drops an icon definition with no path", () => {
    expect(names(parseIconTheme(theme).icons)).not.toContain("nameless");
  });

  it("files an icon under the kind of row it draws", () => {
    const byName = new Map(parseIconTheme(theme).icons.map((icon) => [icon.name, icon.category]));
    expect(byName.get("ts")).toBe("files");
    expect(byName.get("json")).toBe("files");
    expect(byName.get("document")).toBe("files");
    expect(byName.get("folder")).toBe("folders");
    expect(byName.get("folder-open")).toBe("folders");
    expect(byName.get("rego")).toBe("languages");
    expect(byName.get("ts_light")).toBe("variants");
    expect(byName.get("unreachable")).toBe("unused");
  });

  it("counts each kind once", () => {
    expect(parseIconTheme(theme).counts).toEqual({ all: 8, files: 3, folders: 2, languages: 1, variants: 1, unused: 1 });
  });

  it("keeps every key that points at an icon, deduplicated and sorted", () => {
    const ts = parseIconTheme(theme).icons.find((icon) => icon.name === "ts") as IconEntry;
    expect(ts.draws).toEqual(["ts", "tsconfig.json", "tsx", "typescript"]);
  });

  it("strips the leading ./ from the icon path", () => {
    const ts = parseIconTheme(theme).icons.find((icon) => icon.name === "ts") as IconEntry;
    expect(ts.path).toBe("icons/ts.svg");
  });

  it("reads nothing out of a file that is not a theme", () => {
    for (const value of [null, undefined, 7, "{}", [], {}, { iconDefinitions: [] }]) {
      expect(parseIconTheme(value)).toEqual({
        icons: [],
        counts: { all: 0, files: 0, folders: 0, languages: 0, variants: 0, unused: 0 },
        maps: [],
        defaults: [],
      });
    }
  });
});

describe("the summary beside the icons", () => {
  it("counts every map that points at an icon, and leaves out the empty ones", () => {
    expect(parseIconTheme(theme).maps).toEqual([
      { key: "fileExtensions", label: "Suffixes", count: 3 },
      { key: "fileNames", label: "File names", count: 1 },
      { key: "languageIds", label: "Language ids", count: 2 },
      { key: "folderNames", label: "Folder names", count: 1 },
      { key: "folderNamesExpanded", label: "Open folder names", count: 1 },
    ]);
  });

  it("names each default the theme sets, with the artwork it draws", () => {
    expect(parseIconTheme(theme).defaults).toEqual([
      { key: "file", label: "Any file", icon: "document", path: "icons/document.svg" },
      { key: "folder", label: "Any folder", icon: "folder", path: "icons/folder.svg" },
      { key: "folderExpanded", label: "Open folder", icon: "folder-open", path: "icons/folder-open.svg" },
    ]);
  });

  it("keeps a default whose icon the theme never defined, with no artwork", () => {
    const parsed = parseIconTheme({ iconDefinitions: { a: { iconPath: "./icons/a.svg" } }, fileExtensions: { a: "a" }, file: "missing" });
    expect(parsed.defaults).toEqual([{ key: "file", label: "Any file", icon: "missing", path: null }]);
  });
});

describe("iconCategories", () => {
  it("offers All first and leaves out a kind nothing falls into", () => {
    const { counts } = parseIconTheme(theme);
    expect(iconCategories(counts).map((entry) => `${entry.label}:${entry.count}`)).toEqual([
      "All:8",
      "Files:3",
      "Folders:2",
      "Languages:1",
      "Variants:1",
      "Unused:1",
    ]);
  });

  it("offers two segments for a theme with only files and a default", () => {
    const { counts } = parseIconTheme({ iconDefinitions: { js: { iconPath: "./icons/js.svg" } }, fileExtensions: { js: "js" } });
    expect(iconCategories(counts).map((entry) => entry.id)).toEqual(["all", "files"]);
  });
});

describe("matchIcons", () => {
  const { icons } = parseIconTheme(theme);

  it("returns everything for an empty query in All", () => {
    expect(matchIcons(icons, "", "all")).toHaveLength(8);
    expect(matchIcons(icons, "   ", "all")).toHaveLength(8);
  });

  it("matches part of the icon's name, without regard to case", () => {
    expect(names(matchIcons(icons, "FOLDER", "all"))).toEqual(["folder", "folder-open"]);
  });

  it("matches a suffix and a file name the icon draws", () => {
    expect(names(matchIcons(icons, "tsx", "all"))).toEqual(["ts"]);
    expect(names(matchIcons(icons, "tsconfig.json", "all"))).toEqual(["ts"]);
  });

  it("keeps the category and the query together", () => {
    expect(names(matchIcons(icons, "", "folders"))).toEqual(["folder", "folder-open"]);
    expect(names(matchIcons(icons, "open", "folders"))).toEqual(["folder-open"]);
    expect(matchIcons(icons, "open", "files")).toEqual([]);
  });

  it("returns nothing for a query nothing holds", () => {
    expect(matchIcons(icons, "zzz", "all")).toEqual([]);
  });

  it("searches the name and every key it draws", () => {
    const ts = icons.find((icon) => icon.name === "ts") as IconEntry;
    expect(haystack(ts)).toBe("ts ts tsconfig.json tsx typescript");
  });
});

describe("drawsLine", () => {
  const { icons } = parseIconTheme(theme);
  const ts = icons.find((icon) => icon.name === "ts") as IconEntry;

  it("prints the keys an icon draws", () => {
    expect(drawsLine(ts, "")).toBe("ts tsconfig.json tsx typescript");
  });

  it("puts the key the query hit first", () => {
    expect(drawsLine(ts, "typescript").split(" ")[0]).toBe("typescript");
  });

  it("counts the keys it had no room for", () => {
    const many = { ...ts, draws: ["a", "b", "c", "d", "e", "f"] };
    expect(drawsLine(many, "")).toBe("a b c d +2");
  });

  it("says nothing for an icon no key points at", () => {
    const unused = icons.find((icon) => icon.name === "unreachable") as IconEntry;
    expect(drawsLine(unused, "")).toBe("");
  });
});

describe("visibleRange", () => {
  it("draws the rows the box holds and no more", () => {
    const range = visibleRange(300, 76, 0, 380, 0);
    expect(range.first).toBe(0);
    expect(range.last).toBe(5);
    expect(range.before).toBe(0);
    expect(range.after).toBe(294 * 76);
  });

  it("moves the window as the box scrolls", () => {
    const range = visibleRange(300, 76, 76 * 20, 380, 0);
    expect(range.first).toBe(20);
    expect(range.last).toBe(25);
    expect(range.before).toBe(20 * 76);
  });

  it("keeps the overscan rows on both sides", () => {
    const range = visibleRange(300, 76, 76 * 20, 380, 3);
    expect(range.first).toBe(17);
    expect(range.last).toBe(28);
  });

  it("stops at the last row", () => {
    const range = visibleRange(10, 76, 76 * 100, 380, 3);
    expect(range.last).toBe(9);
    expect(range.after).toBe(0);
  });

  it("draws nothing when there is nothing to draw", () => {
    expect(visibleRange(0, 76, 0, 380, 3)).toEqual({ first: 0, last: -1, before: 0, after: 0 });
    expect(visibleRange(10, 0, 0, 380, 3)).toEqual({ first: 0, last: -1, before: 0, after: 0 });
  });
});

describe("columnsFor", () => {
  it("fits as many tiles as the width holds", () => {
    expect(columnsFor(560, 92)).toBe(6);
    expect(columnsFor(92, 92)).toBe(1);
  });

  it("never falls below one column", () => {
    expect(columnsFor(0, 92)).toBe(1);
    expect(columnsFor(-100, 92)).toBe(1);
    expect(columnsFor(560, 0)).toBe(1);
  });
});

describe("theme directories", () => {
  it("accepts a directory name and refuses a path", () => {
    expect(isThemeDirectory("material-icons")).toBe(true);
    expect(isThemeDirectory("icon-theme")).toBe(true);
    expect(isThemeDirectory("..")).toBe(false);
    expect(isThemeDirectory("a/b")).toBe(false);
    expect(isThemeDirectory("/etc")).toBe(false);
    expect(isThemeDirectory("")).toBe(false);
    expect(isThemeDirectory("-hidden")).toBe(false);
  });

  it("resolves the theme file inside the extension", () => {
    expect(themeFileURL("symbols", "file:///tmp/ext/")).toBe("file:///tmp/ext/symbols/icon-theme.json");
    expect(themeFileURL("symbols", "http://localhost:5173/ext")).toBe("http://localhost:5173/ext/symbols/icon-theme.json");
  });

  it("refuses a theme file outside the extension", () => {
    expect(themeFileURL("../../etc", "file:///tmp/ext/")).toBeNull();
    expect(themeFileURL("symbols", "not a url")).toBeNull();
  });

  it("resolves an icon inside the theme directory", () => {
    expect(iconFileURL("symbols", "icons/files/ts.svg", "file:///tmp/ext/")).toBe("file:///tmp/ext/symbols/icons/files/ts.svg");
    expect(iconFileURL("symbols", "./icons/ts.svg", "file:///tmp/ext/")).toBe("file:///tmp/ext/symbols/icons/ts.svg");
  });

  it("refuses an icon path that climbs out", () => {
    expect(iconFileURL("symbols", "../../../etc/passwd", "file:///tmp/ext/")).toBeNull();
    expect(iconFileURL("symbols", "/etc/passwd", "file:///tmp/ext/")).toBeNull();
    expect(iconFileURL("symbols", "icons\\ts.svg", "file:///tmp/ext/")).toBeNull();
    expect(iconFileURL("..", "icons/ts.svg", "file:///tmp/ext/")).toBeNull();
  });
});
