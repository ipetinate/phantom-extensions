import { isRecord } from "./checks.ts";
import { quoted } from "./errors.ts";
import { entriesOf, type Manifest } from "./manifest.ts";
import { canonicalPattern, hasWildcard, patternMatches } from "./patterns.ts";

function colouredLanguages(manifest: Manifest): Set<string> {
  return new Set(
    entriesOf(manifest, "grammars")
      .map((grammar) => grammar["languageId"])
      .filter((languageId): languageId is string => typeof languageId === "string"),
  );
}

function stringsOf(language: Record<string, unknown>, key: string): string[] {
  const value = language[key];
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

/** Every whole file name the manifest claims outright, lower-cased. */
function literalNames(manifest: Manifest): string[] {
  return entriesOf(manifest, "languages").flatMap((language) => stringsOf(language, "fileNames").map((name) => name.trim().toLowerCase()));
}

/**
 * The two ways a pattern says nothing it was meant to say.
 *
 * A pattern with no wildcard is a file name written in the wrong field: it
 * works, but Phantom ranks a name above a pattern, so it quietly loses every
 * file an actual name claims. A pattern that matches a name the same manifest
 * also lists outright is that contradiction made concrete — the manifest
 * claims one file twice, at two precedences, and only the name is ever read.
 */
function patternWarnings(manifest: Manifest): string[] {
  const names = literalNames(manifest);
  const warnings: string[] = [];
  for (const language of entriesOf(manifest, "languages")) {
    const languageId = language["languageId"];
    if (typeof languageId !== "string") continue;
    for (const raw of stringsOf(language, "fileNamePatterns")) {
      const pattern = canonicalPattern(raw);
      if (pattern === null) continue;
      if (!hasWildcard(pattern)) {
        warnings.push(
          `language ${quoted(languageId)} has the file name pattern ${quoted(pattern)}, which holds no '*' or '?'. ` +
            "Phantom ranks a whole file name above a pattern, so list it under fileNames instead.",
        );
        continue;
      }
      const claimed = names.filter((name) => patternMatches(pattern, name));
      if (claimed.length === 0) continue;
      warnings.push(
        `language ${quoted(languageId)} claims ${quoted(claimed[0] as string)} twice: the pattern ${quoted(pattern)} matches a name ` +
          "this extension also lists under fileNames. Phantom reads the name and never the pattern for that file.",
      );
    }
  }
  return warnings;
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
  return [...warnings, ...patternWarnings(manifest)];
}
