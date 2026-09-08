import { useId, useRef, useState, type ChangeEvent } from "react";

export interface SearchFieldProps {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const DEFAULT_SEARCH_LABEL = "Search";

export function SearchField({ placeholder, label, value, onChange }: SearchFieldProps) {
  const [own, setOwn] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const controlled = value !== undefined;
  const text = controlled ? value : own;
  const name = label ?? DEFAULT_SEARCH_LABEL;

  const set = (next: string) => {
    if (!controlled) setOwn(next);
    onChange?.(next);
  };

  const type = (event: ChangeEvent<HTMLInputElement>) => set(event.target.value);

  const clear = () => {
    set("");
    input.current?.focus();
  };

  return (
    <div className="ph-search">
      <svg className="ph-search-glyph" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
        <path
          d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        ref={input}
        id={id}
        type="search"
        className="ph-search-input"
        aria-label={name}
        placeholder={placeholder ?? name}
        autoComplete="off"
        spellCheck={false}
        value={text}
        onChange={type}
      />
      <button type="button" className="ph-search-clear" aria-label={`Clear ${name.toLowerCase()}`} onClick={clear} hidden={text === ""}>
        <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true" focusable="false">
          <path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
