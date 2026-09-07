/**
 * The glob dialect Phantom reads, compiled once and matched many times.
 *
 * Phantom's own matcher is in Swift, at
 * `macos/Sources/Features/Terminal/Editor/LSP/GlobPattern.swift`. The failure
 * this module exists to prevent is the two of them disagreeing: this side
 * accepts a pattern the app then ignores, and the extension ships claiming
 * files it never gets. The rules below are the same rules, and
 * `test/glob-pattern-cases.json` is the table both suites are run against.
 *
 * ## The dialect
 *
 * - `*` matches any run of scalars, including none, but never a `/`.
 * - `**` matches any run of scalars, including none, `/` included.
 * - `?` matches exactly one scalar, and never a `/`.
 * - `{a,b,c}` matches any one of the alternatives, each of which may hold
 *   `*`, `**`, `?` and literals.
 * - Every other scalar is a literal, `.` included, and the whole candidate
 *   has to match.
 *
 * Character classes are not in it, and `[` and `]` are refused rather than
 * matched literally. Braces do not nest: a `{` inside a brace list is
 * refused, because nesting buys an author nothing a second pattern does not
 * and costs both implementations a place to disagree.
 *
 * The dialect knows nothing about what the candidate is. `/` is an ordinary
 * scalar that `*` declines to cross and `**` crosses, so the same compiled
 * value serves a caller matching a whole path — `.editorconfig` section
 * headers are the caller this was written for. What makes a language's
 * `fileNamePatterns` name-only is `fileNamePattern`, which refuses a source
 * carrying a separator at all.
 *
 * Lengths count Unicode scalars, not UTF-16 code units, because that is the
 * measure Swift and TypeScript agree on without either going out of its way.
 */

export const MAX_SOURCE_LENGTH = 64;
export const MAX_BRANCHES = 16;
export const MAX_PATTERNS_PER_LANGUAGE = 32;
export const MAX_CANDIDATE_LENGTH = 255;

/**
 * `/` only. A backslash is a legal scalar in a macOS file name, so treating
 * it as a separator would stop `*` from matching a name that holds one.
 * `fileNamePattern` refuses a backslash in the *pattern* for a different
 * reason: a Windows-shaped path should not be writable either.
 */
const SEPARATOR = "/";

export type Token = { kind: "literal"; scalar: string } | { kind: "oneScalar" } | { kind: "run"; crossesSeparators: boolean };

export interface Glob {
  /** The pattern as written, after canonicalization. */
  readonly source: string;
  readonly branches: readonly (readonly Token[])[];
}

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

type Group = { kind: "token"; token: Token } | { kind: "alternatives"; list: Token[][] };

/**
 * One scan. `{` opens a list, `,` separates inside one and is a literal
 * outside one, `}` closes one, and anything unbalanced is refused rather
 * than guessed at.
 */
function parse(scalars: string[]): Group[] | null {
  const groups: Group[] = [];
  let alternatives: Token[][] | null = null;
  let current: Token[] = [];
  let index = 0;

  while (index < scalars.length) {
    const scalar = scalars[index] as string;
    if (scalar === "[" || scalar === "]") return null;
    if (scalar === "{") {
      if (alternatives !== null) return null;
      for (const token of current) groups.push({ kind: "token", token });
      current = [];
      alternatives = [];
      index += 1;
    } else if (scalar === ",") {
      if (alternatives === null) {
        current.push({ kind: "literal", scalar });
      } else {
        if (current.length === 0) return null;
        alternatives.push(current);
        current = [];
      }
      index += 1;
    } else if (scalar === "}") {
      if (alternatives === null || current.length === 0) return null;
      alternatives.push(current);
      groups.push({ kind: "alternatives", list: alternatives });
      alternatives = null;
      current = [];
      index += 1;
    } else if (scalar === "*") {
      let stars = 0;
      while (index < scalars.length && scalars[index] === "*") {
        stars += 1;
        index += 1;
      }
      current.push({ kind: "run", crossesSeparators: stars > 1 });
    } else if (scalar === "?") {
      current.push({ kind: "oneScalar" });
      index += 1;
    } else {
      current.push({ kind: "literal", scalar });
      index += 1;
    }
  }

  if (alternatives !== null) return null;
  for (const token of current) groups.push({ kind: "token", token });
  return groups;
}

/**
 * The product of the alternative counts, refused before anything is built
 * when it would pass the cap, so `{a,b}` twelve times over never allocates
 * the 4096 branches it asks for.
 */
function expand(groups: Group[]): Token[][] | null {
  let count = 1;
  for (const group of groups) {
    if (group.kind !== "alternatives") continue;
    count *= group.list.length;
    if (count > MAX_BRANCHES) return null;
  }

  let branches: Token[][] = [[]];
  for (const group of groups) {
    if (group.kind === "token") {
      for (const branch of branches) branch.push(group.token);
      continue;
    }
    const grown: Token[][] = [];
    for (const branch of branches) {
      for (const alternative of group.list) grown.push([...branch, ...alternative]);
    }
    branches = grown;
  }
  return branches.length === 0 ? null : branches;
}

/** The dialect, with no opinion about what the candidate is. */
export function compileGlob(source: string): Glob | null {
  const scalars = [...source];
  if (scalars.length === 0 || scalars.length > MAX_SOURCE_LENGTH) return null;
  const groups = parse(scalars);
  if (groups === null) return null;
  const branches = expand(groups);
  if (branches === null) return null;
  return { source, branches };
}

/**
 * The pattern a manifest's `fileNamePatterns` may hold: canonical the way
 * `fileNames` is canonical, and carrying no separator, so it can only ever
 * decide about the name it is handed.
 */
export function fileNamePattern(candidate: string): Glob | null {
  const text = candidate.replace(TRIMMED, "").toLowerCase();
  if (text === "." || text === "..") return null;
  if (text.includes("/") || text.includes("\\")) return null;
  for (const scalar of text) {
    if (isUnsafeScalar(scalar.codePointAt(0) as number)) return null;
  }
  return compileGlob(text);
}

/** Whether a compiled pattern is a plain literal name in the wrong field. */
export function isLiteral(glob: Glob): boolean {
  return glob.branches.length === 1 && (glob.branches[0] as readonly Token[]).every((token) => token.kind === "literal");
}

/**
 * Marks a position live, and every position a run can reach without
 * consuming anything — a run matches an empty span, so the position after it
 * is reachable the moment the position before it is.
 */
function close(live: boolean[], position: number, branch: readonly Token[]): void {
  live[position] = true;
  while (position < branch.length && (branch[position] as Token).kind === "run") {
    position += 1;
    live[position] = true;
  }
}

/**
 * The branch simulated as a state machine, where a state is a position
 * between two tokens and every reachable state is advanced together.
 *
 * A backtracking matcher would explore the run positions instead, which is
 * what makes `*a*a*a*a*b` against a long run of `a` hang, and what makes
 * `{a,b}` nested with `*` explode. Here the positions are all live at once
 * and the cost cannot rise above `candidate x tokens`.
 */
function matchesBranch(branch: readonly Token[], scalars: string[]): boolean {
  let live: boolean[] = new Array(branch.length + 1).fill(false);
  close(live, 0, branch);
  let next: boolean[] = new Array(branch.length + 1).fill(false);

  for (const scalar of scalars) {
    next.fill(false);
    let advanced = false;
    for (let position = 0; position < branch.length; position += 1) {
      if (!live[position]) continue;
      const token = branch[position] as Token;
      if (token.kind === "literal") {
        if (token.scalar !== scalar) continue;
        close(next, position + 1, branch);
      } else if (token.kind === "oneScalar") {
        if (scalar === SEPARATOR) continue;
        close(next, position + 1, branch);
      } else {
        if (!token.crossesSeparators && scalar === SEPARATOR) continue;
        close(next, position, branch);
      }
      advanced = true;
    }
    if (!advanced) return false;
    [live, next] = [next, live];
  }

  return live[branch.length] === true;
}

export function globMatches(glob: Glob, candidate: string): boolean {
  const scalars = [...candidate];
  if (scalars.length > MAX_CANDIDATE_LENGTH) return false;
  return glob.branches.some((branch) => matchesBranch(branch, scalars));
}
