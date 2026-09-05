import { readFileSync, renameSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf8")) as { version: string };

export const define = { __PHANTOM_MDX_VERSION__: JSON.stringify(pkg.version) };

function viewerOutput(): Plugin {
  return {
    name: "phantom-mdx-viewer-output",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html
          .replace(/\s+crossorigin(?:="[^"]*")?/g, "")
          .replace(/(src|href)="\.\/(viewer\.(?:js|css))"/g, '$1="$2"')
          .replace(/<link rel="stylesheet" href="viewer\.css"\s*\/?>/, '<link rel="stylesheet" href="viewer.css">');
      },
    },
    writeBundle(options) {
      if (!options.dir) return;
      renameSync(path.join(options.dir, "index.html"), path.join(options.dir, "viewer.html"));
    },
  };
}

export default defineConfig(({ mode }) => {
  if (mode === "cli") {
    return {
      define,
      ssr: { target: "node" },
      build: {
        ssr: "src/cli.ts",
        outDir: "dist",
        emptyOutDir: false,
        target: "node22",
        minify: false,
        rolldownOptions: {
          output: {
            entryFileNames: "cli.js",
            codeSplitting: false,
            banner: "#!/usr/bin/env node",
          },
        },
      },
    };
  }
  return {
    root: path.join(packageRoot, "src", "viewer"),
    base: "./",
    define,
    plugins: [react(), viewerOutput()],
    build: {
      outDir: path.join(packageRoot, "dist", "viewer"),
      emptyOutDir: true,
      assetsInlineLimit: 0,
      modulePreload: false,
      cssCodeSplit: false,
      chunkSizeWarningLimit: 800,
      target: "safari16",
      rolldownOptions: {
        input: path.join(packageRoot, "src", "viewer", "index.html"),
        output: {
          entryFileNames: "viewer.js",
          chunkFileNames: "viewer-[name].js",
          assetFileNames: (asset) => (asset.names.some((name) => name.endsWith(".css")) ? "viewer.css" : "[name][extname]"),
        },
      },
    },
  };
});
