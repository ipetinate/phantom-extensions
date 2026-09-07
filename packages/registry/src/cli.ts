import path from "node:path";
import { build } from "./build.ts";
import { collect } from "./collect.ts";
import { ManifestError } from "./errors.ts";
import { ROOT } from "./paths.ts";
import { checkReleases, ReleaseCheckError } from "./releases.ts";
import { manifestWarnings } from "./warnings.ts";

const DEFAULT_REPO = "ipetinate/phantom-extensions";

interface BuildArguments {
  check: boolean;
  out: string;
  repo: string;
  offline: boolean;
}

function usage(): number {
  process.stderr.write(
    [
      "usage:",
      "  phantom-registry [--check] [--out <dir>] [--repo <owner/name>] [--offline]",
      "  phantom-registry check                validate every extension without writing anything",
      "  phantom-registry releases [--dist <dir>]   refuse a version published with different bytes",
      "",
    ].join("\n"),
  );
  return 2;
}

function splitArgument(argument: string): [string, string | null] {
  const at = argument.indexOf("=");
  if (!argument.startsWith("--") || at === -1) return [argument, null];
  return [argument.slice(0, at), argument.slice(at + 1)];
}

function parseBuildArguments(argv: string[]): BuildArguments | null {
  const parsed: BuildArguments = { check: false, out: path.join(ROOT, "dist"), repo: DEFAULT_REPO, offline: false };
  for (let index = 0; index < argv.length; index += 1) {
    const [flag, inline] = splitArgument(argv[index] as string);
    if (flag === "check" || flag === "--check") {
      parsed.check = true;
      continue;
    }
    if (flag === "--offline") {
      parsed.offline = true;
      continue;
    }
    if (flag !== "--out" && flag !== "--repo") return null;
    let value = inline;
    if (value === null) {
      value = argv[index + 1] ?? null;
      index += 1;
    }
    if (value === null || value === "") return null;
    if (flag === "--out") parsed.out = value;
    else parsed.repo = value;
  }
  return parsed;
}

function parseReleaseArguments(argv: string[]): string | null {
  let dist = path.join(ROOT, "dist");
  for (let index = 0; index < argv.length; index += 1) {
    const [flag, inline] = splitArgument(argv[index] as string);
    if (flag !== "--dist") return null;
    const value = inline ?? argv[index + 1] ?? null;
    if (inline === null) index += 1;
    if (value === null || value === "") return null;
    dist = value;
  }
  return dist;
}

function report(error: unknown): number {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  return 1;
}

async function main(argv: string[]): Promise<number> {
  if (argv[0] === "releases") {
    const dist = parseReleaseArguments(argv.slice(1));
    if (dist === null) return usage();
    try {
      return checkReleases(dist);
    } catch (error) {
      if (error instanceof ReleaseCheckError || error instanceof Error) return report(error);
      throw error;
    }
  }
  const parsed = parseBuildArguments(argv);
  if (parsed === null) return usage();
  try {
    if (parsed.check) {
      for (const { manifest, card } of collect()) {
        const size = (card.mediaBytes / (1024 * 1024)).toFixed(2);
        process.stdout.write(`ok  ${manifest.id} ${manifest.version}  doc:yes  media:${card.media.length} files, ${size} MiB\n`);
        for (const warning of manifestWarnings(manifest)) process.stdout.write(`warn  ${manifest.id}  ${warning}\n`);
      }
      return 0;
    }
    for (const entry of await build(parsed.out, parsed.repo, { offline: parsed.offline })) {
      const downloads = entry.downloads === undefined ? "" : `  ${entry.downloads.total} downloads`;
      process.stdout.write(`${entry.id} ${entry.version}  ${entry.download.bytes} bytes  ${entry.download.sha256.slice(0, 12)}${downloads}\n`);
    }
    return 0;
  } catch (error) {
    if (error instanceof ManifestError) return report(error);
    throw error;
  }
}

main(process.argv.slice(2)).then(
  (code) => {
    if (code > 0) process.exitCode = code;
  },
  (error: unknown) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  },
);
