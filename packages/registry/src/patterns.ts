/**
 * The glob dialect of `contributes.languages[].fileNamePatterns`.
 *
 * Phantom reads a published manifest with its own matcher, in Swift
 * (`macos/Sources/Features/Terminal/Editor/LSP/FileNamePattern.swift`). The
 * failure this module exists to prevent is the two of them disagreeing: this
 * side accepts a pattern the app then ignores, and the extension ships
 * claiming files it never gets. The rules below are the same rules, and
 * `test/file-name-pattern-cases.json` is the table both suites are run
 * against.
 *
 * The dialect is two characters wide. `*` matches any run of scalars,
 * including none; `?` matches exactly one; every other scalar is a literal,
 * `.` included; the whole name has to match. Character classes and
 * alternation are not in it, and the four characters that spell them are
 * refused rather than treated as literals. Both are shorthand — `{a,b}` is
 * two patterns and `[abc]` is three — so nothing becomes inexpressible, only
 * longer, and every construct left out is one fewer place for the two
 * implementations to drift.
 *
 * Lengths count Unicode scalars, not UTF-16 code units, because that is the
 * measure Swift and TypeScript agree on without either going out of its way.
 */

export const MAX_PATTERN_LENGTH = 64;
export const MAX_PATTERNS = 32;
export const MAX_NAME_LENGTH = 255;

/** The two path separators, and the four characters of a dialect this is not. */
const FORBIDDEN = new Set(["/", "\\", "[", "]", "{", "}"]);

/**
 * `CharacterSet.whitespaces`: Unicode general category Zs, plus tab. Spelled
 * out rather than left to `String.prototype.trim`, which also eats newlines
 * and the byte order mark — scalars Swift keeps and then refuses, so trimming
 * them here would accept a pattern the app drops.
 */
const WHITESPACE = "\\t\\u0020\\u00a0\\u1680\\u2000-\\u200a\\u202f\\u205f\\u3000";
const TRIMMED = new RegExp(`^[${WHITESPACE}]+|[${WHITESPACE}]+$`, "gu");

/**
 * The scalars `UntrustedURL.isUnsafeDisplayScalar` refuses: controls,
 * directional overrides, and the invisible formatting characters that let a
 * manifest decide what a Settings row appears to say about it.
 */
function isUnsafeScalar(code: number): boolean {
  if (code <= 0x1f || (code >= 0x7f && code <= 0x9f)) return true;
  if (code === 0x061c || (code >= 0x200b && code <= 0x200f)) return true;
  if (code >= 0x202a && code <= 0x202e) return true;
  if (code >= 0x2066 && code <= 0x2069) return true;
  if (code >= 0x2028 && code <= 0x2029) return true;
  return code === 0x2060 || code === 0xfeff;
}

/** A pattern in the form Phantom stores it, or null when Phantom drops it. */
export function canonicalPattern(candidate: string): string | null {
  const text = candidate.replace(TRIMMED, "").toLowerCase();
  const scalars = [...text];
  if (scalars.length === 0 || scalars.length > MAX_PATTERN_LENGTH) return null;
  if (text === "." || text === "..") return null;
  for (const scalar of scalars) {
    if (FORBIDDEN.has(scalar)) return null;
    if (isUnsafeScalar(scalar.codePointAt(0) as number)) return null;
  }
  return text;
}

/** Whether a pattern carries a wildcard, which is the only reason to be one. */
export function hasWildcard(pattern: string): boolean {
  return pattern.includes("*") || pattern.includes("?");
}

/**
 * Whether a canonical pattern claims a lower-cased file name.
 *
 * The single `*` backtrack point is remembered rather than explored, so the
 * cost is bounded by `pattern x name` scalar comparisons and the matcher
 * cannot be made to hang by a crafted pattern.
 */
export function patternMatches(pattern: string, name: string): boolean {
  const patternScalars = [...pattern];
  const nameScalars = [...name];
  if (nameScalars.length > MAX_NAME_LENGTH) return false;

  let patternIndex = 0;
  let nameIndex = 0;
  let lastStar = -1;
  let resumeAt = 0;

  while (nameIndex < nameScalars.length) {
    const current = patternScalars[patternIndex];
    if (patternIndex < patternScalars.length && (current === "?" || current === nameScalars[nameIndex])) {
      patternIndex += 1;
      nameIndex += 1;
    } else if (patternIndex < patternScalars.length && current === "*") {
      lastStar = patternIndex;
      resumeAt = nameIndex;
      patternIndex += 1;
    } else if (lastStar >= 0) {
      patternIndex = lastStar + 1;
      resumeAt += 1;
      nameIndex = resumeAt;
    } else {
      return false;
    }
  }

  while (patternIndex < patternScalars.length && patternScalars[patternIndex] === "*") patternIndex += 1;
  return patternIndex === patternScalars.length;
}
