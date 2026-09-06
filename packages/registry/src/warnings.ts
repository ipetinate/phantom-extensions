import { isRecord } from "./checks.ts";
import { quoted } from "./errors.ts";
import { entriesOf, type Manifest } from "./manifest.ts";

function colouredLanguages(manifest: Manifest): Set<string> {
  return new Set(
    entriesOf(manifest, "grammars")
      .map((grammar) => grammar["languageId"])
      .filter((languageId): languageId is string => typeof languageId === "string"),
  );
}

export function manifestWarnings(manifest: Manifest): string[] {
  const coloured = colouredLanguages(manifest);
  const warnings: string[] = [];
  for (const language of entriesOf(manifest, "languages")) {
    const languageId = language["languageId"];
    if (typeof languageId !== "string" || !isRecord(language["server"])) continue;
    if (coloured.has(languageId)) continue;
    warnings.push(
      `language ${quoted(languageId)} declares a server and ships no grammar. ` +
        "Phantom cannot tell a string from code without one, so the completion list opens inside strings and comments.",
    );
  }
  return warnings;
}
