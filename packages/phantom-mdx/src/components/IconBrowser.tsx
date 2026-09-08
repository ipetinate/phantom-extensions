import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useDocumentContext } from "../context.ts";
import { Filter, Filters } from "./Filters.tsx";
import { SearchField } from "./SearchField.tsx";
import { Window, WindowToolbar } from "./Window.tsx";
import {
  columnsFor,
  drawsLine,
  iconCategories,
  iconFileURL,
  isThemeDirectory,
  loadThemeFile,
  matchIcons,
  parseIconTheme,
  themeFileURL,
  visibleRange,
  type IconCategory,
  type IconEntry,
  type IconThemeData,
} from "./iconTheme.ts";

export interface IconBrowserProps {
  theme: string;
  title?: string;
  height?: string;
  load?: (url: string) => Promise<unknown>;
}

export const TILE_WIDTH = 92;
export const ROW_HEIGHT = 76;
export const OVERSCAN = 3;

const FALLBACK_WIDTH = 560;
const FALLBACK_HEIGHT = 380;
const CAPTION = "Type a name, a file name or a suffix. The rows are drawn as you scroll.";

type State = { kind: "reading" } | { kind: "read"; data: IconThemeData } | { kind: "unreadable" };

function vars(entries: Record<string, string>): CSSProperties {
  return entries as CSSProperties;
}

function chunk(icons: readonly IconEntry[], columns: number, first: number, last: number): IconEntry[][] {
  const rows: IconEntry[][] = [];
  for (let row = first; row <= last; row += 1) {
    const start = row * columns;
    if (start >= icons.length) break;
    rows.push(icons.slice(start, start + columns) as IconEntry[]);
  }
  return rows;
}

export function IconBrowser({ theme, title, height, load }: IconBrowserProps) {
  const { baseURL, warn } = useDocumentContext();
  const [state, setState] = useState<State>({ kind: "reading" });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<IconCategory>("all");
  const [box, setBox] = useState({ width: FALLBACK_WIDTH, height: FALLBACK_HEIGHT });
  const [scrollTop, setScrollTop] = useState(0);
  const body = useRef<HTMLDivElement>(null);
  const reader = load ?? loadThemeFile;
  const file = isThemeDirectory(theme) ? themeFileURL(theme, baseURL) : null;

  useEffect(() => {
    if (file === null) {
      warn(`IconBrowser "${theme}" does not name a theme directory inside the extension and drew no icons`);
      setState({ kind: "unreadable" });
      return;
    }
    let live = true;
    setState({ kind: "reading" });
    reader(file)
      .then((value) => {
        if (!live) return;
        const data = parseIconTheme(value);
        if (data.icons.length === 0) {
          warn(`IconBrowser "${theme}" found no icons in ${theme}/icon-theme.json`);
          setState({ kind: "unreadable" });
          return;
        }
        setState({ kind: "read", data });
      })
      .catch(() => {
        if (!live) return;
        warn(`IconBrowser "${theme}" could not read ${theme}/icon-theme.json and drew no icons`);
        setState({ kind: "unreadable" });
      });
    return () => {
      live = false;
    };
  }, [file, theme]);

  useEffect(() => {
    const node = body.current;
    if (node === null) return;
    const measure = () => {
      setBox({ width: node.clientWidth || FALLBACK_WIDTH, height: node.clientHeight || FALLBACK_HEIGHT });
    };
    const follow = () => setScrollTop(node.scrollTop);
    measure();
    node.addEventListener("scroll", follow, { passive: true });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(node);
    return () => {
      node.removeEventListener("scroll", follow);
      observer?.disconnect();
    };
  }, [state.kind]);

  const data = state.kind === "read" ? state.data : null;
  const categories = useMemo(() => (data === null ? [] : iconCategories(data.counts)), [data]);
  const matched = useMemo(() => (data === null ? [] : matchIcons(data.icons, query, category)), [data, query, category]);

  const columns = columnsFor(box.width, TILE_WIDTH);
  const rows = Math.ceil(matched.length / columns);
  const range = visibleRange(rows, ROW_HEIGHT, scrollTop, box.height, OVERSCAN);
  const drawn = chunk(matched, columns, range.first, range.last);

  const toTop = () => {
    setScrollTop(0);
    if (body.current !== null) body.current.scrollTop = 0;
  };

  const pick = (next: string[]) => {
    setCategory(categories.find((entry) => entry.label === next[0])?.id ?? "all");
    toTop();
  };

  const search = (next: string) => {
    setQuery(next);
    toTop();
  };

  const selected = categories.find((entry) => entry.id === category)?.label;

  return (
    <figure className="ph-icon-browser">
      <div className="ph-ib-panel">
        <div className="ph-ib-half">
          <p className="ph-ib-half-title">The theme</p>
          <Summary theme={theme} baseURL={baseURL} data={data} />
        </div>

        <div className="ph-ib-half">
          <p className="ph-ib-half-title">The icons</p>
          <p className="ph-ib-half-subtitle">{CAPTION}</p>
          <Window title={title ?? theme} height={height ?? "tall"} flush bodyRef={body}>
            <WindowToolbar>
              <SearchField label="Search the icons" placeholder="Name, file name or suffix" value={query} onChange={search} />
              {categories.length > 1 ? (
                <Filters mode="one" label="Icon categories" value={selected === undefined ? [] : [selected]} onChange={pick}>
                  {categories.map((entry) => (
                    <Filter key={entry.id} label={entry.label} count={String(entry.count)} />
                  ))}
                </Filters>
              ) : null}
            </WindowToolbar>

            {state.kind === "reading" ? <p className="ph-ib-note">Reading {theme}/icon-theme.json…</p> : null}
            {state.kind === "unreadable" ? (
              <p className="ph-ib-note">The icons could not be listed. {theme}/icon-theme.json is not readable from this page.</p>
            ) : null}
            {data === null ? null : (
              <div className="ph-ib-list" style={vars({ "--ph-ib-row": `${ROW_HEIGHT}px`, "--ph-ib-tile": `${TILE_WIDTH}px` })}>
                {matched.length === 0 ? (
                  <p className="ph-ib-note">Nothing here is called or draws “{query.trim()}”.</p>
                ) : (
                  <>
                    <div className="ph-ib-space" style={{ height: `${range.before}px` }} />
                    {drawn.map((row, index) => (
                      <ul className="ph-ib-row" key={range.first + index}>
                        {row.map((icon) => (
                          <Tile key={icon.name} icon={icon} theme={theme} baseURL={baseURL} query={query} />
                        ))}
                      </ul>
                    ))}
                    <div className="ph-ib-space" style={{ height: `${range.after}px` }} />
                  </>
                )}
              </div>
            )}
          </Window>
          {data === null ? null : (
            <p className="ph-ib-caption">
              {matched.length} of the {data.counts.all} icons {theme}/icon-theme.json names.
            </p>
          )}
        </div>
      </div>
    </figure>
  );
}

function Art({ theme, path, baseURL }: { theme: string; path: string | null; baseURL: string }) {
  const source = path === null ? null : iconFileURL(theme, path, baseURL);
  return <span className="ph-ib-art">{source === null ? null : <img src={source} alt="" width={24} height={24} decoding="async" />}</span>;
}

function Summary({ theme, baseURL, data }: { theme: string; baseURL: string; data: IconThemeData | null }) {
  if (data === null) return <p className="ph-ib-summary-note">The icons {theme} ships.</p>;
  return (
    <div className="ph-ib-summary">
      <section className="ph-ib-group">
        <p className="ph-ib-group-title">Icons</p>
        <ul className="ph-ib-counts">
          <li className="ph-ib-count">
            <span className="ph-ib-count-label">Named in {theme}/icon-theme.json</span>
            <span className="ph-ib-count-value">{data.counts.all}</span>
          </li>
          {iconCategories(data.counts)
            .filter((entry) => entry.id !== "all")
            .map((entry) => (
              <li className="ph-ib-count" key={entry.id}>
                <span className="ph-ib-count-label">{entry.label}</span>
                <span className="ph-ib-count-value">{entry.count}</span>
              </li>
            ))}
        </ul>
      </section>

      {data.maps.length === 0 ? null : (
        <section className="ph-ib-group">
          <p className="ph-ib-group-title">What points at them</p>
          <ul className="ph-ib-counts">
            {data.maps.map((entry) => (
              <li className="ph-ib-count" key={entry.key}>
                <span className="ph-ib-count-label">{entry.label}</span>
                <span className="ph-ib-count-value">{entry.count}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.defaults.length === 0 ? null : (
        <section className="ph-ib-group">
          <p className="ph-ib-group-title">Defaults</p>
          <ul className="ph-ib-defaults">
            {data.defaults.map((entry) => (
              <li className="ph-ib-default" key={entry.key}>
                <Art theme={theme} path={entry.path} baseURL={baseURL} />
                <span className="ph-ib-default-text">
                  <span className="ph-ib-default-role">{entry.label}</span>
                  <code className="ph-ib-default-icon">{entry.icon}</code>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Tile({ icon, theme, baseURL, query }: { icon: IconEntry; theme: string; baseURL: string; query: string }) {
  const draws = drawsLine(icon, query);
  return (
    <li className="ph-ib-icon" title={draws === "" ? icon.name : `${icon.name} — ${draws}`}>
      <Art theme={theme} path={icon.path} baseURL={baseURL} />
      <span className="ph-ib-name">{icon.name}</span>
      <span className="ph-ib-draws">{draws === "" ? "not mapped" : draws}</span>
    </li>
  );
}
