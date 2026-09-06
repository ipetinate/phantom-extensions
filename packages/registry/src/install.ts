import { fail, isRecord, type JsonObject, type JsonValue, isHttpsURL } from "./checks.ts";
import { quoted } from "./errors.ts";

export const INSTALL_MANAGERS = ["brew", "npm", "pnpm", "yarn", "cargo", "gem", "pipx", "go", "dotnet", "nix"] as const;

export type InstallManager = (typeof INSTALL_MANAGERS)[number];

const FORBIDDEN_IN_COMMAND = ["curl", "|", "sudo", ";", "&&", "&", "$(", "`", "<", ">"] as const;

export interface InstallCommand {
  manager: string;
  command: string;
  uninstall: string | null;
}

export interface Install {
  commands: InstallCommand[];
  documentationURL: string | null;
}

function isManager(value: string): value is InstallManager {
  return (INSTALL_MANAGERS as readonly string[]).includes(value);
}

function checkCommand(directory: string, what: string, kind: string, manager: string, command: string): void {
  for (const forbidden of FORBIDDEN_IN_COMMAND) {
    if (command.includes(forbidden)) fail(directory, `${what}: the ${kind} command may not use ${quoted(forbidden)}: ${quoted(command)}`);
  }
  const [binary] = command.trim().split(/\s+/);
  if (binary !== manager) fail(directory, `${what}: the ${kind} command must start with ${quoted(manager)}: ${quoted(command)}`);
}

function readCommand(directory: string, what: string, entry: JsonValue): InstallCommand {
  if (typeof entry === "string") {
    const command = entry.trim();
    if (!command) fail(directory, `${what}: an install command may not be empty`);
    const manager = command.split(/\s+/)[0] as string;
    if (!isManager(manager)) fail(directory, `${what}: unknown package manager ${quoted(manager)}; use one of ${INSTALL_MANAGERS.join(", ")}`);
    checkCommand(directory, what, "install", manager, command);
    return { manager, command, uninstall: null };
  }
  if (!isRecord(entry)) fail(directory, `${what}: each install command must be an object with 'manager' and 'command'`);
  const manager = entry["manager"];
  if (typeof manager !== "string" || !isManager(manager)) {
    fail(directory, `${what}: unknown package manager ${quoted(manager)}; use one of ${INSTALL_MANAGERS.join(", ")}`);
  }
  const command = entry["command"];
  if (typeof command !== "string" || !command.trim()) fail(directory, `${what}: an install command may not be empty`);
  checkCommand(directory, what, "install", manager, command);
  const uninstall = entry["uninstall"];
  if (uninstall !== undefined && uninstall !== null) {
    if (typeof uninstall !== "string" || !uninstall.trim()) fail(directory, `${what}: an uninstall command may not be empty`);
    checkCommand(directory, what, "uninstall", manager, uninstall);
    return { manager, command, uninstall };
  }
  return { manager, command, uninstall: null };
}

export function validateInstall(directory: string, what: string, value: JsonValue | undefined): Install | null {
  if (value === undefined || value === null) return null;
  if (!isRecord(value)) fail(directory, `${what}: 'install' must be an object`);
  const raw = (value as JsonObject)["commands"];
  if (raw !== undefined && !Array.isArray(raw)) fail(directory, `${what}: 'install.commands' must be an array`);
  const commands = (raw ?? []).map((entry) => readCommand(directory, what, entry));
  const documentation = (value as JsonObject)["documentationURL"];
  if (documentation !== undefined && documentation !== null) {
    if (typeof documentation !== "string" || !isHttpsURL(documentation)) {
      fail(directory, `${what}: 'install.documentationURL' must be an https URL`);
    }
    return { commands, documentationURL: documentation };
  }
  return { commands, documentationURL: null };
}
