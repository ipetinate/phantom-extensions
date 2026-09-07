import { AGENT_RUN, BUILD_RUN, TEST_RUN, type Transcript } from "./terminalSample.ts";

export type SidebarPane = "terminals" | "files" | "git" | "worktrees" | "extensions";

export interface SessionRow {
  readonly title: string;
  readonly workspace: string;
  readonly branch: string;
  readonly kind: "agent" | "shell";
  readonly dirty?: boolean;
  readonly terminal?: Transcript;
}

export interface SessionGroup {
  readonly name: string;
  readonly details: string;
  readonly slot: number;
  readonly collapsed?: boolean;
  readonly count: number;
  readonly sessions: readonly SessionRow[];
}

export const PANES: readonly SidebarPane[] = ["terminals", "files", "git", "worktrees", "extensions"];

export const ACTIVE_PANE: SidebarPane = "terminals";

export const PANE_TITLES: Readonly<Record<SidebarPane, string>> = {
  terminals: "Terminals",
  files: "Files",
  git: "Git",
  worktrees: "Worktrees",
  extensions: "Extensions",
};

export const SESSION_GROUPS: readonly SessionGroup[] = [
  {
    name: "phantom",
    details: "~/Projects/phantom",
    slot: 4,
    count: 2,
    sessions: [
      { title: "claude — editor colours", workspace: "phantom", branch: "feat/0.17.0", kind: "agent", dirty: true, terminal: AGENT_RUN },
      { title: "zig build", workspace: "phantom", branch: "feat/0.17.0", kind: "shell", terminal: BUILD_RUN },
    ],
  },
  {
    name: "phantom-extensions",
    details: "~/Projects/phantom-extensions",
    slot: 5,
    count: 1,
    sessions: [{ title: "npm test", workspace: "extensions", branch: "main", kind: "shell", terminal: TEST_RUN }],
  },
  {
    name: "notes",
    details: "~/Documents/Cortex",
    slot: 2,
    collapsed: true,
    count: 1,
    sessions: [{ title: "nvim", workspace: "Cortex", branch: "main", kind: "shell" }],
  },
];

export interface OpenTerminal {
  readonly session: SessionRow;
  readonly terminal: Transcript;
  readonly slot: number;
}

export const OPEN_TERMINALS: readonly OpenTerminal[] = SESSION_GROUPS.filter((group) => group.collapsed !== true).flatMap((group) =>
  group.sessions.flatMap((session) => (session.terminal === undefined ? [] : [{ session, terminal: session.terminal, slot: group.slot }])),
);
