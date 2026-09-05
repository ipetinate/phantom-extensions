import { useEffect, useRef, useState } from "react";
import { useDocumentContext } from "../context.ts";

export interface CopyButtonProps {
  text: string;
  label?: string;
}

const COPIED_MS = 1600;

function ClipboardGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="5" y="4" width="8" height="10" rx="1.5" />
      <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H10" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const { onCopy } = useDocumentContext();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = () => {
    onCopy?.(text);
    navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <button
      type="button"
      className={copied ? "ph-copy is-copied" : "ph-copy"}
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
    >
      {copied ? <CheckGlyph /> : <ClipboardGlyph />}
      <span className="ph-copy-label">{copied ? "Copied" : label}</span>
    </button>
  );
}
