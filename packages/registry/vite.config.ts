import { defineConfig } from "vite";

export default defineConfig({
  ssr: { target: "node" },
  build: {
    ssr: "src/cli.ts",
    outDir: "dist",
    emptyOutDir: true,
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
});
