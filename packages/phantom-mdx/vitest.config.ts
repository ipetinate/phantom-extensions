import { defineConfig } from "vitest/config";
import { define } from "./vite.config.ts";

export default defineConfig({
  define,
  test: {
    environment: "jsdom",
    include: ["test/**/*.test.ts", "test/**/*.test.tsx"],
    setupFiles: ["test/setup.ts"],
  },
});
