import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import onig from "vscode-oniguruma";

const require = createRequire(import.meta.url);

await onig.loadWASM(readFileSync(require.resolve("vscode-oniguruma/release/onig.wasm")));

export function compileError(pattern: string): string | null {
  try {
    new onig.OnigScanner([pattern]).dispose();
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}
