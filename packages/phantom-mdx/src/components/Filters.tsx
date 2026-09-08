import { Children, createContext, isValidElement, useContext, useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
import { FILTER_MODES } from "../schema.ts";

export type FilterMode = (typeof FILTER_MODES)[number];

export interface FilterOption {
  label: string;
  count?: string;
  selected: boolean;
}

export interface FiltersProps {
  mode?: string;
  label?: string;
  value?: readonly string[];
  onChange?: (next: string[]) => void;
  children?: ReactNode;
}

export interface FilterProps {
  label: string;
  count?: string;
  selected?: string;
  children?: ReactNode;
}

interface Group {
  mode: FilterMode;
  selection: ReadonlySet<string>;
  choose: (label: string) => void;
}

export const DEFAULT_FILTER_MODE: FilterMode = "one";
export const DEFAULT_FILTER_LABEL = "Filters";
const CHILD_DEPTH = 3;

const GroupContext = createContext<Group | null>(null);

function collect(children: ReactNode, depth: number, into: FilterOption[]): void {
  if (depth < 0) return;
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;
    if (child.type === Filter) {
      const props = child.props as FilterProps;
      if (typeof props.label !== "string" || props.label === "") continue;
      into.push({ label: props.label, count: props.count, selected: props.selected === "true" });
      continue;
    }
    collect((child.props as { children?: ReactNode }).children, depth - 1, into);
  }
}

export function filterOptions(children: ReactNode): FilterOption[] {
  const options: FilterOption[] = [];
  collect(children, CHILD_DEPTH, options);
  return options;
}

export function filterMode(mode: string | undefined): FilterMode {
  return (FILTER_MODES as readonly string[]).includes(mode ?? "") ? (mode as FilterMode) : DEFAULT_FILTER_MODE;
}

export function seedSelection(mode: FilterMode, options: readonly FilterOption[]): Set<string> {
  const declared = options.filter((option) => option.selected).map((option) => option.label);
  if (mode === "any") return new Set(declared);
  const first = declared[0] ?? options[0]?.label;
  return first === undefined ? new Set() : new Set([first]);
}

export function nextSelection(mode: FilterMode, current: ReadonlySet<string>, label: string): Set<string> {
  if (mode === "one") return new Set([label]);
  const next = new Set(current);
  if (next.has(label)) next.delete(label);
  else next.add(label);
  return next;
}

export function stepIndex(key: string, index: number, length: number): number | null {
  const last = length - 1;
  if (key === "ArrowRight" || key === "ArrowDown") return index === last ? 0 : index + 1;
  if (key === "ArrowLeft" || key === "ArrowUp") return index === 0 ? last : index - 1;
  if (key === "Home") return 0;
  if (key === "End") return last;
  return null;
}

function moveFocus(event: KeyboardEvent<HTMLDivElement>, mode: FilterMode): void {
  const items = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button.ph-filter")];
  const index = items.indexOf(document.activeElement as HTMLButtonElement);
  if (index === -1) return;
  const next = stepIndex(event.key, index, items.length);
  if (next === null) return;
  event.preventDefault();
  const target = items[next];
  target?.focus();
  if (mode === "one") target?.click();
}

export function Filters({ mode, label, value, onChange, children }: FiltersProps) {
  const kind = filterMode(mode);
  const options = useMemo(() => filterOptions(children), [children]);
  const [own, setOwn] = useState<ReadonlySet<string>>(() => seedSelection(kind, options));
  const selection = value === undefined ? own : new Set(value);

  const choose = (chosen: string) => {
    const next = nextSelection(kind, selection, chosen);
    if (value === undefined) setOwn(next);
    onChange?.([...next]);
  };

  return (
    <GroupContext.Provider value={{ mode: kind, selection, choose }}>
      <div
        className={`ph-filters ph-filters-${kind}`}
        role={kind === "one" ? "radiogroup" : "group"}
        aria-label={label ?? DEFAULT_FILTER_LABEL}
        onKeyDown={(event) => moveFocus(event, kind)}
      >
        {children}
      </div>
    </GroupContext.Provider>
  );
}

export function Filter({ label, count, selected }: FilterProps) {
  const group = useContext(GroupContext);
  const declared = selected === "true";
  const on = group === null ? declared : group.selection.has(label);
  const body = (
    <>
      <span className="ph-filter-label">{label}</span>
      {count === undefined ? null : <span className="ph-filter-count">{count}</span>}
    </>
  );

  if (group === null) {
    return (
      <span className={on ? "ph-filter is-on" : "ph-filter"} aria-current={on ? "true" : undefined}>
        {body}
      </span>
    );
  }

  const one = group.mode === "one";
  return (
    <button
      type="button"
      className={on ? "ph-filter is-on" : "ph-filter"}
      role={one ? "radio" : undefined}
      aria-checked={one ? on : undefined}
      aria-pressed={one ? undefined : on}
      tabIndex={one && !on ? -1 : 0}
      onClick={() => group.choose(label)}
    >
      {body}
    </button>
  );
}
