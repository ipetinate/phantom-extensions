import { copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));

function assets(): Plugin {
  return {
    name: "phantom-view-kit-assets",
    writeBundle(options) {
      if (!options.dir) return;
      for (const asset of ["kit.css", "react.d.ts"]) {
        copyFileSync(path.join(packageRoot, "src", asset), path.join(options.dir, asset));
      }
    },
  };
}

export default defineConfig({
  plugins: [assets()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "safari16",
    minify: false,
    lib: {
      entry: path.join(packageRoot, "src", "index.ts"),
      formats: ["es"],
      fileName: () => "index.js",
    },
  },
});
