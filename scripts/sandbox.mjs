import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPOSITORY = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_DIRECTORIES = ["extensions", "themes"];
const EXTENSION_ROOTS = REGISTRY_DIRECTORIES.map((directory) => path.join(REPOSITORY, directory));
const CONFIG = path.join(homedir(), ".config");
const SANDBOX = path.join(CONFIG, "phantom-debug", "extensions");
const RELEASE = path.join(CONFIG, "phantom");
const ID_PATTERN = /^[a-z0-9][a-z0-9._-]*$/;

class SandboxError extends Error {}

function usage() {
  return [
    "usage:",
    "  node scripts/sandbox.mjs install <name>... | --all",
    "  node scripts/sandbox.mjs list",
    "  node scripts/sandbox.mjs remove <name>... | --all",
    "",
    `Extensions are copied into ${SANDBOX}, which only the debug build reads.`,
    `The release directory ${RELEASE} is never touched.`,
    "",
  ].join("\n");
}

function insideSandbox(target) {
  const resolved = path.resolve(target);
  return resolved === SANDBOX || resolved.startsWith(SANDBOX + path.sep);
}

function sandboxPath(id) {
  if (!ID_PATTERN.test(id)) throw new SandboxError(`not an extension id: ${id}`);
  if (id === "." || id === ".." || id.includes(path.sep)) throw new SandboxError(`not an extension id: ${id}`);

  const target = path.resolve(SANDBOX, id);
  if (!insideSandbox(target) || path.dirname(target) !== SANDBOX) {
    throw new SandboxError(`refusing a path outside ${SANDBOX}: ${target}`);
  }
  if (target === RELEASE || target.startsWith(RELEASE + path.sep)) {
    throw new SandboxError(`refusing a path inside the release directory: ${target}`);
  }
  return target;
}

function readManifest(directory) {
  const file = path.join(directory, "extension.json");
  if (!existsSync(file)) throw new SandboxError(`no extension.json in ${directory}`);
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    throw new SandboxError(`${file} is not valid JSON: ${error.message}`);
  }
  if (typeof parsed?.id !== "string") throw new SandboxError(`${file} has no id`);
  return parsed;
}

function isDirectoryName(name) {
  return !name.includes("/") && !name.includes("\\") && name !== "." && name !== "..";
}

function findDirectory(name) {
  if (!isDirectoryName(name)) return null;
  for (const root of EXTENSION_ROOTS) {
    const directory = path.join(root, name);
    if (existsSync(directory) && statSync(directory).isDirectory()) return directory;
  }
  return null;
}

function sourceDirectory(name) {
  if (!isDirectoryName(name)) throw new SandboxError(`not an extension directory name: ${name}`);
  const directory = findDirectory(name);
  if (directory === null) {
    throw new SandboxError(`no extension directory named ${name} under ${REGISTRY_DIRECTORIES.join("/ or ")}/`);
  }
  return directory;
}

function everyExtensionName() {
  const names = new Set();
  for (const root of EXTENSION_ROOTS) {
    for (const entry of readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (existsSync(path.join(root, entry.name, "extension.json"))) names.add(entry.name);
    }
  }
  return [...names].sort();
}

function installedEntries() {
  if (!existsSync(SANDBOX)) return [];
  return readdirSync(SANDBOX, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .map((id) => {
      const directory = path.join(SANDBOX, id);
      try {
        const manifest = readManifest(directory);
        return { id, version: manifest.version ?? "?", name: manifest.name ?? id };
      } catch {
        return { id, version: "?", name: "(no readable manifest)" };
      }
    });
}

function resolveNames(names) {
  if (names.length === 0) throw new SandboxError("name an extension, or pass --all");
  if (names.includes("--all")) {
    if (names.length > 1) throw new SandboxError("--all takes no other names");
    return everyExtensionName();
  }
  return names;
}

function install(names) {
  const chosen = resolveNames(names);
  mkdirSync(SANDBOX, { recursive: true });

  for (const name of chosen) {
    const source = sourceDirectory(name);
    const manifest = readManifest(source);
    const target = sandboxPath(manifest.id);
    const replaced = existsSync(target);
    if (replaced) rmSync(target, { recursive: true, force: true });
    cpSync(source, target, { recursive: true });
    const verb = replaced ? "replaced" : "installed";
    process.stdout.write(`${verb}  ${manifest.id} ${manifest.version ?? "?"}  from ${path.relative(REPOSITORY, source)}\n`);
  }

  process.stdout.write(`${chosen.length} extension${chosen.length === 1 ? "" : "s"} in ${SANDBOX}\n`);
  return 0;
}

function list() {
  const entries = installedEntries();
  if (entries.length === 0) {
    process.stdout.write(`nothing installed in ${SANDBOX}\n`);
    return 0;
  }
  const width = Math.max(...entries.map((entry) => entry.id.length));
  for (const entry of entries) {
    process.stdout.write(`${entry.id.padEnd(width)}  ${entry.version}  ${entry.name}\n`);
  }
  process.stdout.write(`${entries.length} extension${entries.length === 1 ? "" : "s"} in ${SANDBOX}\n`);
  return 0;
}

function remove(names) {
  if (names.length === 0) throw new SandboxError("name an extension, or pass --all");

  let identifiers;
  if (names.includes("--all")) {
    if (names.length > 1) throw new SandboxError("--all takes no other names");
    identifiers = installedEntries().map((entry) => entry.id);
  } else {
    identifiers = names.map((name) => {
      const directory = findDirectory(name);
      if (directory !== null && existsSync(path.join(directory, "extension.json"))) return readManifest(directory).id;
      return name;
    });
  }

  let removed = 0;
  for (const id of identifiers) {
    const target = sandboxPath(id);
    if (!existsSync(target)) {
      process.stdout.write(`absent    ${id}\n`);
      continue;
    }
    rmSync(target, { recursive: true, force: true });
    removed += 1;
    process.stdout.write(`removed   ${id}\n`);
  }

  process.stdout.write(`${removed} extension${removed === 1 ? "" : "s"} removed from ${SANDBOX}\n`);
  return 0;
}

function main(argv) {
  const [command, ...rest] = argv;
  switch (command) {
    case "install":
      return install(rest);
    case "list":
      if (rest.length > 0) throw new SandboxError("list takes no arguments");
      return list();
    case "remove":
      return remove(rest);
    default:
      process.stderr.write(usage());
      return 2;
  }
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
