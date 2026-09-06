import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { hexOr, paletteOr, readableOn } from "../colors.ts";
import { EXPLORER_ROWS, SAMPLES, tokenize, type CodeSample } from "./codeSamples.ts";

export interface ThemePreviewProps {
  background: string;
  foreground: string;
  ansi: string;
  cursor?: string;
  selection?: string;
  title?: string;
}

const FALLBACK_BACKGROUND = "#1e1e1e";
const FALLBACK_FOREGROUND = "#f0f0f0";

function vars(entries: Record<string, string>): CSSProperties {
  return entries as CSSProperties;
}

function FolderGlyph() {
  return (
    <svg className="ph-tp-folder" viewBox="0 0 16 16" width="11" height="11" aria-hidden="true" focusable="false">
      <path d="M1.8 3.6h4.1l1.4 1.9h6.9v7H1.8z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
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

export function ThemePreview({ background, foreground, ansi, cursor, selection, title }: ThemePreviewProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();

  const ground = hexOr(background, FALLBACK_BACKGROUND);
  const ink = hexOr(foreground, FALLBACK_FOREGROUND);
  const palette = paletteOr(ansi, ink);
  const accent = hexOr(cursor, ink);
  const selected = hexOr(selection, palette[8] as string);
  const sample = SAMPLES[active] as CodeSample;

  const style = vars({
    "--ph-tp-bg": ground,
    "--ph-tp-fg": ink,
    "--ph-tp-accent": accent,
    "--ph-tp-selection": selected,
    "--ph-tp-selection-fg": readableOn(selected, ground, ink),
    ...Object.fromEntries(palette.map((color, slot) => [`--ph-tp-ansi-${slot}`, color])),
  });

  const move = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = SAMPLES.length - 1;
    let next = active;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="ph-theme-preview" style={style}>
      <div className="ph-tp-titlebar">
        <span className="ph-tp-lights">
          <span className="ph-tp-light ph-tp-light-close" />
          <span className="ph-tp-light ph-tp-light-minimise" />
          <span className="ph-tp-light ph-tp-light-zoom" />
        </span>
        <span className="ph-tp-title">{title ?? "Phantom"}</span>
        <span className="ph-tp-lights" aria-hidden="true" />
      </div>
      <div className="ph-tp-body">
        <div className="ph-tp-explorer">
          {EXPLORER_ROWS.map((row) => (
            <div
              key={row.name}
              className={row.file === sample.file ? "ph-tp-row is-open" : "ph-tp-row"}
              style={vars({
                "--ph-tp-depth": String(row.depth),
                "--ph-tp-dot": row.slot < 0 ? "transparent" : (palette[row.slot] as string),
              })}
            >
              {row.file === null ? <FolderGlyph /> : <span className="ph-tp-dot" />}
              {row.name}
            </div>
          ))}
        </div>
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
                  tabs.current[index] = node;
                }}
                onClick={() => setActive(index)}
                onKeyDown={move}
              >
                <span className="ph-tp-dot" />
                {entry.file}
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
      </div>
    </div>
  );
}
