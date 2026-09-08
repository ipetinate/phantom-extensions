import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { checkLayout } from "../src/layout.ts";
import { loadManifest, referencedPaths, type Manifest } from "../src/manifest.ts";
import {
  MAX_VIEWS,
  MAX_VIEW_BUNDLE_BYTES,
  MAX_VIEW_PATTERNS,
  MAX_VIEW_PERMISSIONS,
  VIEW_PERMISSIONS,
  VIEW_PRIORITIES,
  VIEW_SURFACES,
} from "../src/views.ts";
import { ExtensionFixture, makeRoot, removeRoot, viewEntry, viewsManifest } from "./fixture.ts";

let root: string;

beforeEach(() => {
  root = makeRoot();
});

afterEach(() => {
  removeRoot(root);
});

function fixture(view: Record<string, unknown> = {}, overrides: Record<string, unknown> = {}): ExtensionFixture {
  return new ExtensionFixture(root, "views", viewsManifest(view, overrides));
}

describe("contributes.views", () => {
  it("loads an extension that only contributes a view", () => {
    const manifest = loadManifest(fixture().directory);
    const views = manifest.contributes["views"] as { viewId: string }[];
    expect(views[0]?.viewId).toBe("http");
  });

  it("needs a viewId, a title, an icon and an entry", () => {
    const built = fixture();
    for (const key of ["viewId", "title", "icon", "entry"]) {
      const manifest = viewsManifest();
      const view = (manifest["contributes"] as { views: Record<string, unknown>[] }).views[0] as Record<string, unknown>;
      delete view[key];
      built.writeManifest(manifest);
      expect(() => loadManifest(built.directory)).toThrow(new RegExp(`'${key}'`));
    }
  });

  it("holds a viewId to the id pattern", () => {
    expect(() => loadManifest(fixture({ viewId: "HTTP Client" }).directory)).toThrow(/'viewId'/);
    expect(() => loadManifest(fixture({ viewId: "http.client" }).directory)).toThrow(/'viewId'/);
  });

  it("refuses a title longer than the switcher shows", () => {
    expect(() => loadManifest(fixture({ title: "x".repeat(65) }).directory)).toThrow(/title is longer/);
  });

  it("refuses a second view with the same id", () => {
    const manifest = viewsManifest();
    (manifest["contributes"] as { views: Record<string, unknown>[] }).views.push(viewEntry({ title: "Again" }));
    const built = new ExtensionFixture(root, "views", manifest);
    expect(() => loadManifest(built.directory)).toThrow(/declared twice/);
  });

  it("refuses more views than Phantom reads", () => {
    const manifest = viewsManifest();
    const views = (manifest["contributes"] as { views: Record<string, unknown>[] }).views;
    for (let index = 0; index <= MAX_VIEWS; index += 1) views.push(viewEntry({ viewId: `view-${index}` }));
    const built = new ExtensionFixture(root, "views", manifest);
    expect(() => loadManifest(built.directory)).toThrow(new RegExp(`more than the ${MAX_VIEWS}`));
  });

  describe("the entry", () => {
    it("refuses an entry the package does not ship", () => {
      const built = fixture();
      built.writeManifest(viewsManifest({ entry: "views/absent.js" }));
      expect(() => loadManifest(built.directory)).toThrow(/asset does not exist/);
    });

    it("refuses an entry that climbs out of the extension", () => {
      const built = fixture();
      built.writeManifest(viewsManifest({ entry: "../elsewhere/http.js" }));
      expect(() => loadManifest(built.directory)).toThrow(/must be relative and inside the extension/);
      built.writeManifest(viewsManifest({ entry: "/etc/passwd.js" }));
      expect(() => loadManifest(built.directory)).toThrow(/must be relative and inside the extension/);
    });

    it("refuses an entry that is not a script", () => {
      const built = fixture();
      built.write("views/http.json", "{}");
      built.writeManifest(viewsManifest({ entry: "views/http.json" }));
      expect(() => loadManifest(built.directory)).toThrow(/entry must be one of js, mjs/);
    });

    it("accepts an .mjs entry", () => {
      const built = fixture();
      built.write("views/http.mjs", "export default 1;");
      built.writeManifest(viewsManifest({ entry: "views/http.mjs" }));
      expect(() => loadManifest(built.directory)).not.toThrow();
    });
  });

  describe("the icon", () => {
    it("refuses an icon the package does not ship", () => {
      const built = fixture();
      built.writeManifest(viewsManifest({ icon: "views/absent.png" }));
      expect(() => loadManifest(built.directory)).toThrow(/asset does not exist/);
    });

    /**
     * The one field a third party must not be able to fill with a symbol
     * name: an SF Symbol the reader's macOS does not resolve makes SwiftUI
     * drop the row with nothing logged.
     */
    it("refuses an icon that is not a file the package ships", () => {
      const built = fixture();
      built.writeManifest(viewsManifest({ icon: "puzzlepiece" }));
      expect(() => loadManifest(built.directory)).toThrow(/asset does not exist/);

      built.write("views/http.txt", "puzzlepiece");
      built.writeManifest(viewsManifest({ icon: "views/http.txt" }));
      expect(() => loadManifest(built.directory)).toThrow(/never an SF Symbol name/);
    });

    it("accepts a PNG as well as an SVG", () => {
      const built = fixture();
      built.write("views/http.png", "png");
      built.writeManifest(viewsManifest({ icon: "views/http.png" }));
      expect(() => loadManifest(built.directory)).not.toThrow();
    });
  });

  describe("the stylesheet", () => {
    it("is optional", () => {
      expect(() => loadManifest(fixture().directory)).not.toThrow();
    });

    it("must be a stylesheet the package ships", () => {
      const built = fixture();
      built.writeManifest(viewsManifest({ style: "views/absent.css" }));
      expect(() => loadManifest(built.directory)).toThrow(/asset does not exist/);

      built.write("views/http.scss", "a{}");
      built.writeManifest(viewsManifest({ style: "views/http.scss" }));
      expect(() => loadManifest(built.directory)).toThrow(/style must be one of css/);
    });

    it("counts towards the bundle limit", () => {
      const built = fixture();
      built.writeSized("views/http.js", MAX_VIEW_BUNDLE_BYTES);
      built.write("views/http.css", ":root{}");
      built.writeManifest(viewsManifest({ style: "views/http.css" }));
      expect(() => loadManifest(built.directory)).toThrow(new RegExp(`over the ${MAX_VIEW_BUNDLE_BYTES}`));
    });
  });

  describe("placements", () => {
    it("are both when the file names none", () => {
      expect(() => loadManifest(fixture().directory)).not.toThrow();
    });

    it("must name a bar Phantom has", () => {
      expect(() => loadManifest(fixture({ placements: ["sidebar"] }).directory)).not.toThrow();
      expect(() => loadManifest(fixture({ placements: ["sidebar", "topBar"] }).directory)).not.toThrow();
      expect(() => loadManifest(fixture({ placements: ["statusBar"] }).directory)).toThrow(/unknown placement/);
      expect(() => loadManifest(fixture({ placements: [] }).directory)).toThrow(/non-empty array/);
      expect(() => loadManifest(fixture({ placements: "sidebar" }).directory)).toThrow(/non-empty array/);
      expect(() => loadManifest(fixture({ placements: ["sidebar", "sidebar"] }).directory)).toThrow(/listed twice/);
    });
  });

  describe("the surface", () => {
    it("is the sidebar when the file names none", () => {
      const manifest = loadManifest(fixture().directory);
      const views = manifest.contributes["views"] as { surface?: string }[];
      expect(views[0]?.surface).toBeUndefined();
    });

    it("accepts both surfaces and refuses a third", () => {
      for (const surface of VIEW_SURFACES) {
        expect(() => loadManifest(fixture({ surface }).directory)).not.toThrow();
      }
      expect(() => loadManifest(fixture({ surface: "statusBar" }).directory)).toThrow(/unknown surface/);
      expect(() => loadManifest(fixture({ surface: 7 }).directory)).toThrow(/unknown surface/);
    });
  });

  /**
   * An editor view's tab is the claimed file's tab, so the claim is by name
   * and the pattern may not reach outside one.
   */
  describe("filenamePatterns", () => {
    it("claim file names for an editor view", () => {
      expect(() =>
        loadManifest(fixture({ surface: "editor", filenamePatterns: ["*.bru", "*.yml"] }).directory),
      ).not.toThrow();
    });

    it("need the editor surface", () => {
      expect(() => loadManifest(fixture({ filenamePatterns: ["*.bru"] }).directory)).toThrow(
        /needs "surface": "editor"/,
      );
      expect(() =>
        loadManifest(fixture({ surface: "sidebar", filenamePatterns: ["*.bru"] }).directory),
      ).toThrow(/needs "surface": "editor"/);
    });

    it("may not reach outside the file name", () => {
      for (const pattern of ["api/*.bru", "../*.bru", "a\\b.bru"]) {
        expect(() => loadManifest(fixture({ surface: "editor", filenamePatterns: [pattern] }).directory)).toThrow(
          /may not hold a path separator/,
        );
      }
      expect(() => loadManifest(fixture({ surface: "editor", filenamePatterns: ["[0-9].bru"] }).directory)).toThrow(
        /may not hold a character class/,
      );
    });

    it("refuse an empty list, a repeat and more than Phantom reads", () => {
      expect(() => loadManifest(fixture({ surface: "editor", filenamePatterns: [] }).directory)).toThrow(
        /non-empty array/,
      );
      expect(() => loadManifest(fixture({ surface: "editor", filenamePatterns: ["*.bru", "*.BRU"] }).directory)).toThrow(
        /listed twice/,
      );
      const many = Array.from({ length: MAX_VIEW_PATTERNS + 1 }, (_, index) => `*.a${index}`);
      expect(() => loadManifest(fixture({ surface: "editor", filenamePatterns: many }).directory)).toThrow(
        new RegExp(`more than the ${MAX_VIEW_PATTERNS}`),
      );
    });
  });

  /**
   * The mirror of the filenamePatterns rule: a placement belongs to the
   * surface that has a button.
   */
  describe("placements and the editor surface", () => {
    it("refuse a placement on an editor view", () => {
      expect(() => loadManifest(fixture({ surface: "editor", placements: ["sidebar"] }).directory)).toThrow(
        /needs "surface": "sidebar"/,
      );
      expect(() =>
        loadManifest(fixture({ surface: "editor", placements: ["sidebar", "topBar"] }).directory),
      ).toThrow(/needs "surface": "sidebar"/);
    });

    it("accept a placement on a sidebar view", () => {
      expect(() => loadManifest(fixture({ surface: "sidebar", placements: ["topBar"] }).directory)).not.toThrow();
      expect(() => loadManifest(fixture({ placements: ["sidebar"] }).directory)).not.toThrow();
    });
  });

  describe("priority", () => {
    it("is an offer unless the manifest says otherwise", () => {
      const manifest = loadManifest(fixture().directory);
      const views = manifest.contributes["views"] as { priority?: string }[];
      expect(views[0]?.priority).toBeUndefined();
      expect(VIEW_PRIORITIES[0]).toBe("option");
    });

    it("accepts both and refuses a third", () => {
      for (const priority of VIEW_PRIORITIES) {
        expect(() =>
          loadManifest(fixture({ surface: "editor", filenamePatterns: ["*.bru"], priority }).directory),
        ).not.toThrow();
      }
      expect(() =>
        loadManifest(fixture({ surface: "editor", filenamePatterns: ["*.bru"], priority: "always" }).directory),
      ).toThrow(/unknown priority/);
    });

    /* Taking a file over is the point of `default`, so declaring it without
     * a pattern is a claim on nothing. */
    it("claims nothing without a pattern", () => {
      expect(() => loadManifest(fixture({ surface: "editor", priority: "default" }).directory)).toThrow(
        /claims nothing without filenamePatterns/,
      );
    });
  });

  /**
   * `views.open` opens an editor view of the same extension, so a manifest
   * that declares the method and ships no editor view has published a page
   * whose every call fails.
   */
  describe("views.open", () => {
    it("needs an editor view to open", () => {
      expect(() => loadManifest(fixture({ permissions: ["views.open"] }).directory)).toThrow(
        /no view has "surface": "editor"/,
      );
      expect(() =>
        loadManifest(fixture({ permissions: ["views.open"], surface: "editor" }).directory),
      ).not.toThrow();
    });
  });

  describe("permissions", () => {
    it("are none when the file names none", () => {
      const manifest = loadManifest(fixture().directory);
      const views = manifest.contributes["views"] as {
        permissions?: string[];
      }[];
      expect(views[0]?.permissions).toBeUndefined();
    });

    it("accept every method Phantom offers", () => {
      expect(() =>
        loadManifest(fixture({ permissions: [...VIEW_PERMISSIONS], surface: "editor" }).directory),
      ).not.toThrow();
    });

    /**
     * The two methods that change a file on disk are separate declarations,
     * so a reader can see in the list whether an extension only adds files
     * or also writes over them.
     */
    it("name the two write methods the way Phantom names them", () => {
      expect(VIEW_PERMISSIONS).toContain("workspace.create");
      expect(VIEW_PERMISSIONS).toContain("workspace.replace");
      expect(() => loadManifest(fixture({ permissions: ["workspace.create"] }).directory)).not.toThrow();
      expect(() => loadManifest(fixture({ permissions: ["workspace.replace"] }).directory)).not.toThrow();
      expect(() => loadManifest(fixture({ permissions: ["workspace.write"] }).directory)).toThrow(/unknown permission/);
      expect(() => loadManifest(fixture({ permissions: ["workspace.delete"] }).directory)).toThrow(/unknown permission/);
      expect(() => loadManifest(fixture({ permissions: ["workspace.remove"] }).directory)).toThrow(/unknown permission/);
      expect(() => loadManifest(fixture({ permissions: ["fs.write"] }).directory)).toThrow(/unknown permission/);
    });

    /**
     * Phantom drops a name it does not know, so a manifest written for a
     * later build keeps the half the running one understands. Publishing one
     * is still a typo, and the page's calls would all fail.
     */
    it("refuse a method no Phantom has", () => {
      expect(() => loadManifest(fixture({ permissions: ["process.spawn"] }).directory)).toThrow(/unknown permission/);
      expect(() => loadManifest(fixture({ permissions: ["WORKSPACE.READ"] }).directory)).toThrow(/unknown permission/);
      expect(() => loadManifest(fixture({ permissions: [7] }).directory)).toThrow(/unknown permission/);
      expect(() => loadManifest(fixture({ permissions: "http.request" }).directory)).toThrow(/must be an array/);
    });

    it("refuse the same method twice and more than Phantom reads", () => {
      expect(() => loadManifest(fixture({ permissions: ["theme.read", "theme.read"] }).directory)).toThrow(/listed twice/);
      const many = Array.from({ length: MAX_VIEW_PERMISSIONS + 1 }, () => "theme.read");
      expect(() => loadManifest(fixture({ permissions: many }).directory)).toThrow(new RegExp(`more than the ${MAX_VIEW_PERMISSIONS}`));
    });
  });

  /**
   * `checkLayout` refuses a file the manifest does not reference, so a
   * view's three paths have to be in `referencedPaths` or publishing the
   * bundle would fail on the bundle itself.
   */
  describe("the layout", () => {
    it("counts a view's files as referenced", () => {
      const manifest = viewsManifest({ style: "views/http.css" });
      const paths = referencedPaths(manifest as unknown as Manifest);
      expect([...paths].sort()).toEqual(["views/http.css", "views/http.js", "views/http.svg"]);

      const built = new ExtensionFixture(root, "views", manifest);
      expect(() => checkLayout(built.directory, loadManifest(built.directory))).not.toThrow();
    });

    it("still refuses a file no contribution names", () => {
      const built = fixture();
      built.write("views/stray.js", "export default 1;");
      expect(() => checkLayout(built.directory, loadManifest(built.directory))).toThrow(/not referenced by the manifest/);
    });
  });
});
