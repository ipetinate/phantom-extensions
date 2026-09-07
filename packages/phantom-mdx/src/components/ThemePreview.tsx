import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { hexOr, paletteOr, readableOn } from "../colors.ts";
import { SAMPLES, tokenize, type CodeSample } from "./codeSamples.ts";
import { ACCENT_SLOT, ANSI_NAMES, ANSI_USES, INTERFACE_ROLES } from "./paletteRoles.ts";
import { needsEdge } from "./Swatches.tsx";
import { promptSpans, type TerminalSpan } from "./terminalSample.ts";
import { AgentGlyph, ChevronGlyph, CloseGlyph, FolderGlyph, GitGlyph, PuzzleGlyph, TerminalGlyph, WorktreeGlyph } from "./windowGlyphs.tsx";
import { ACTIVE_PANE, OPEN_TERMINALS, PANE_TITLES, PANES, SESSION_GROUPS, type OpenTerminal, type SidebarPane } from "./workspaceSample.ts";

export interface ThemePreviewProps {
  background: string;
  foreground: string;
  ansi: string;
  cursor?: string;
  cursorText?: string;
  selection?: string;
  selectionText?: string;
  title?: string;
}

interface Block {
  color: string;
  role: string;
  detail: string;
  use: string;
  derived?: boolean;
}

const FALLBACK_BACKGROUND = "#1e1e1e";
const FALLBACK_FOREGROUND = "#f0f0f0";
const DEFAULT_TITLE = "Phantom";
const SELECTION_SLOT = 8;
const CAPTION = "Press the editor tabs and the terminal tabs to see the theme applied to another language and another session.";

function vars(entries: Record<string, string>): CSSProperties {
  return entries as CSSProperties;
}

function paneGlyph(pane: SidebarPane) {
  if (pane === "terminals") return <TerminalGlyph size={13} />;
  if (pane === "files") return <FolderGlyph size={13} />;
  if (pane === "git") return <GitGlyph size={13} />;
  if (pane === "worktrees") return <WorktreeGlyph size={13} />;
  return <PuzzleGlyph size={13} />;
}

function step(key: string, index: number, length: number): number | null {
  const last = length - 1;
  if (key === "ArrowRight") return index === last ? 0 : index + 1;
  if (key === "ArrowLeft") return index === 0 ? last : index - 1;
  if (key === "Home") return 0;
  if (key === "End") return last;
  return null;
}

function lineContent(sample: CodeSample, index: number): ReactNode[] {
  const tokens = tokenize(sample.lines[index] ?? "", sample.grammar);
  if (index !== sample.caret) {
    return tokens.map((token, position) => (
      <span key={position} className={`ph-tp-t-${token.kind}`}>
        {token.text}
      </span>
    ));
  }
  const target = tokens.findIndex((token) => token.text === sample.selected);
  const parts: ReactNode[] = [];
  tokens.forEach((token, position) => {
    const selected = position === target;
    parts.push(
      <span key={position} className={selected ? `ph-tp-t-${token.kind} ph-tp-selected` : `ph-tp-t-${token.kind}`}>
        {token.text}
      </span>,
    );
    if (selected) parts.push(<span key="caret" className="ph-tp-caret" />);
  });
  if (target === -1) parts.push(<span key="caret" className="ph-tp-caret" />);
  return parts;
}

function spanRun(spans: readonly TerminalSpan[], prefix: string): ReactNode[] {
  return spans.map((span, index) => {
    const colour = span.slot === undefined ? "ph-tp-term-plain" : `ph-tp-term-s${span.slot}`;
    return (
      <span key={`${prefix}-${index}`} className={span.strong === true ? `${colour} is-strong` : colour}>
        {span.text}
      </span>
    );
  });
}

function BlockList({ title, blocks }: { title: string; blocks: readonly Block[] }) {
  return (
    <section className="ph-tp-role-group">
      <p className="ph-tp-role-title">{title}</p>
      <ul className="ph-tp-blocks">
        {blocks.map((block) => (
          <li
            key={block.role}
            className={needsEdge(block.color) ? "ph-tp-block has-edge" : "ph-tp-block"}
            style={vars({ "--ph-tp-block": block.color })}
          >
            <span className="ph-tp-block-chip" />
            <span className="ph-tp-block-text">
              <span className="ph-tp-block-role">
                {block.role}
                <span className="ph-tp-block-detail">{block.detail}</span>
              </span>
              <span className="ph-tp-block-value">
                <code className="ph-tp-block-hex">{block.color}</code>
                {block.derived === true ? <span className="ph-tp-block-derived">derived</span> : null}
              </span>
              <span className="ph-tp-block-use">{block.use}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Transcript({ open, id }: { open: OpenTerminal; id: string }) {
  const prompt = promptSpans(open.session);
  return (
    <>
      {open.terminal.lines.map((line, index) => (
        <div key={index} className="ph-tp-term-line">
          {line.kind === "command" ? spanRun(prompt, `p${index}`) : null}
          {spanRun(line.spans, `l${index}`)}
        </div>
      ))}
      <div className="ph-tp-term-line ph-tp-term-live">
        {spanRun(prompt, `${id}-live`)}
        {spanRun(open.terminal.typed, `${id}-typed`)}
        <span className="ph-tp-term-cursor">{open.terminal.under}</span>
        {open.terminal.suggestion === undefined ? null : <span className="ph-tp-term-s8">{open.terminal.suggestion}</span>}
      </div>
    </>
  );
}

export function ThemePreview({ background, foreground, ansi, cursor, cursorText, selection, selectionText, title }: ThemePreviewProps) {
  const [active, setActive] = useState(0);
  const [shell, setShell] = useState(0);
  const fileTabs = useRef<Array<HTMLButtonElement | null>>([]);
  const shellTabs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();

  const ground = hexOr(background, FALLBACK_BACKGROUND);
  const ink = hexOr(foreground, FALLBACK_FOREGROUND);
  const palette = paletteOr(ansi, ink);
  const caret = hexOr(cursor, ink);
  const caretText = hexOr(cursorText, ground);
  const selected = hexOr(selection, palette[SELECTION_SLOT] as string);
  const selectedText = hexOr(selectionText, readableOn(selected, ground, ink));
  const accent = palette[ACCENT_SLOT] as string;
  const sample = SAMPLES[active] as CodeSample;
  const open = OPEN_TERMINALS[shell] as OpenTerminal;
  const workspace = title ?? DEFAULT_TITLE;

  const style = vars({
    "--ph-tp-bg": ground,
    "--ph-tp-fg": ink,
    "--ph-tp-accent": accent,
    "--ph-tp-cursor": caret,
    "--ph-tp-cursor-fg": caretText,
    "--ph-tp-selection": selected,
    "--ph-tp-selection-fg": selectedText,
    ...Object.fromEntries(palette.map((color, slot) => [`--ph-tp-ansi-${slot}`, color])),
  });

  const interfaceColors = [ground, ink, caret, caretText, selected, selectedText];
  const interfaceGiven = [true, true, cursor !== undefined, cursorText !== undefined, selection !== undefined, selectionText !== undefined];
  const interfaceBlocks: Block[] = INTERFACE_ROLES.map((entry, index) => ({
    color: interfaceColors[index] as string,
    role: entry.role,
    detail: entry.key,
    use: entry.use,
    derived: !interfaceGiven[index],
  }));
  const ansiBlocks: Block[] = palette.map((color, slot) => ({
    color,
    role: `ANSI ${slot}`,
    detail: ANSI_NAMES[slot] as string,
    use: ANSI_USES[slot] as string,
  }));

  const moveFile = (event: KeyboardEvent<HTMLButtonElement>) => {
    const next = step(event.key, active, SAMPLES.length);
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    fileTabs.current[next]?.focus();
  };

  const moveShell = (event: KeyboardEvent<HTMLButtonElement>) => {
    const next = step(event.key, shell, OPEN_TERMINALS.length);
    if (next === null) return;
    event.preventDefault();
    setShell(next);
    shellTabs.current[next]?.focus();
  };

  return (
    <figure className="ph-theme-preview" style={style}>
      <div className="ph-tp-panel">
        <div className="ph-tp-half">
          <p className="ph-tp-half-title">Colours</p>
          <div className="ph-tp-roles">
            <BlockList title="Interface" blocks={interfaceBlocks} />
            <BlockList title="ANSI 0 to 15" blocks={ansiBlocks} />
          </div>
        </div>

        <div className="ph-tp-half">
          <p className="ph-tp-half-title">Preview</p>
          <p className="ph-tp-half-subtitle">{CAPTION}</p>
          <div className="ph-tp-window">
          <div className="ph-tp-titlebar">
            <span className="ph-tp-lights">
              <span className="ph-tp-light ph-tp-light-close" />
              <span className="ph-tp-light ph-tp-light-minimise" />
              <span className="ph-tp-light ph-tp-light-zoom" />
            </span>
            <span className="ph-tp-title">{workspace}</span>
            <span className="ph-tp-lights" aria-hidden="true" />
          </div>

          <div className="ph-tp-body">
            <div className="ph-tp-activity">
              {PANES.map((pane) => (
                <span key={pane} className={pane === ACTIVE_PANE ? "ph-tp-pane is-active" : "ph-tp-pane"} title={PANE_TITLES[pane]}>
                  {paneGlyph(pane)}
                </span>
              ))}
            </div>

            <div className="ph-tp-sidebar">
              {SESSION_GROUPS.map((group) => (
                <section
                  key={group.name}
                  className={group.collapsed === true ? "ph-tp-group is-collapsed" : "ph-tp-group"}
                  style={vars({ "--ph-tp-group": palette[group.slot] as string })}
                >
                  <div className="ph-tp-group-head">
                    <ChevronGlyph className={group.collapsed === true ? "ph-tp-chevron" : "ph-tp-chevron is-open"} size={9} />
                    <FolderGlyph className="ph-tp-group-icon" size={11} />
                    <span className="ph-tp-group-text">
                      <span className="ph-tp-group-name">{group.name}</span>
                      <span className="ph-tp-group-details">{group.details}</span>
                    </span>
                    <span className="ph-tp-count">{group.count}</span>
                  </div>
                  {group.collapsed === true ? null : (
                    <div className="ph-tp-sessions">
                      {group.sessions.map((session) => {
                        const index = OPEN_TERMINALS.findIndex((entry) => entry.session === session);
                        const current = index === shell;
                        return (
                          <button
                            key={session.title}
                            type="button"
                            className={current ? "ph-tp-session is-selected" : "ph-tp-session"}
                            aria-current={current ? "true" : undefined}
                            aria-controls={`${id}-term`}
                            onClick={() => setShell(index)}
                          >
                            <span className="ph-tp-session-rail" />
                            {session.kind === "agent" ? <AgentGlyph size={12} /> : <TerminalGlyph size={12} />}
                            <span className="ph-tp-session-text">
                              <span className="ph-tp-session-title">{session.title}</span>
                              <span className="ph-tp-chips">
                                <span className="ph-tp-chip">{session.workspace}</span>
                                <span className="ph-tp-chip">
                                  <GitGlyph size={8} />
                                  {session.branch}
                                  {session.dirty === true ? <span className="ph-tp-chip-dot" /> : null}
                                </span>
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="ph-tp-main">
              <div className="ph-tp-editor">
                <div className="ph-tp-tabs" role="tablist" aria-label="Files in the preview">
                  {SAMPLES.map((entry, index) => (
                    <button
                      key={entry.file}
                      type="button"
                      role="tab"
                      id={`${id}-tab-${index}`}
                      className="ph-tp-tab"
                      aria-selected={index === active}
                      aria-controls={`${id}-code`}
                      tabIndex={index === active ? 0 : -1}
                      style={vars({ "--ph-tp-dot": palette[entry.slot] as string })}
                      ref={(node) => {
                        fileTabs.current[index] = node;
                      }}
                      onClick={() => setActive(index)}
                      onKeyDown={moveFile}
                    >
                      <span className="ph-tp-dot" />
                      {entry.file}
                      {entry.dirty === true ? <span className="ph-tp-tab-dirty" /> : <CloseGlyph className="ph-tp-tab-close" size={9} />}
                    </button>
                  ))}
                </div>

                <div className="ph-tp-code" id={`${id}-code`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
                  <div className="ph-tp-gutter" aria-hidden="true">
                    {sample.lines.map((_line, index) => (
                      <div key={index} className={index === sample.caret ? "ph-tp-number is-current" : "ph-tp-number"}>
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <div className="ph-tp-lines">
                    {sample.lines.map((_line, index) => (
                      <div key={index} className={index === sample.caret ? "ph-tp-line is-current" : "ph-tp-line"}>
                        {lineContent(sample, index)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ph-tp-terminal">
                <div className="ph-tp-term-tabs" role="tablist" aria-label="Terminals in the preview">
                  {OPEN_TERMINALS.map((entry, index) => (
                    <button
                      key={entry.session.title}
                      type="button"
                      role="tab"
                      id={`${id}-shell-${index}`}
                      className="ph-tp-term-tab"
                      aria-selected={index === shell}
                      aria-controls={`${id}-term`}
                      tabIndex={index === shell ? 0 : -1}
                      ref={(node) => {
                        shellTabs.current[index] = node;
                      }}
                      onClick={() => setShell(index)}
                      onKeyDown={moveShell}
                    >
                      {entry.session.kind === "agent" ? <AgentGlyph size={10} /> : <TerminalGlyph size={10} />}
                      {entry.terminal.tab}
                    </button>
                  ))}
                </div>

                <div className="ph-tp-term-body" id={`${id}-term`} role="tabpanel" aria-labelledby={`${id}-shell-${shell}`}>
                  <Transcript open={open} id={id} />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
