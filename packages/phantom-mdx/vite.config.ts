import { readFileSync } from "node:fs";
import { defineConfig } from "vite";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")) as { version: string };

export const define = { __PHANTOM_MDX_VERSION__: JSON.stringify(pkg.version) };

export default defineConfig(({ mode }) => {
  if (mode !== "cli") {
    throw new Error(`unknown build mode ${mode}; use --mode cli`);
  }
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
          inlineDynamicImports: true,
          banner: "#!/usr/bin/env node",
        },
      },
    },
  };
});
