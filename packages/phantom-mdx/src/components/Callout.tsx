import type { ReactNode } from "react";
import { CALLOUT_KINDS } from "../schema.ts";

type CalloutKind = (typeof CALLOUT_KINDS)[number];

const LABELS: Readonly<Record<CalloutKind, string>> = { note: "Note", tip: "Tip", warning: "Warning", danger: "Danger" };

function kindOf(value: string | undefined): CalloutKind {
  return (CALLOUT_KINDS as readonly string[]).includes(value ?? "") ? (value as CalloutKind) : "note";
}

export interface CalloutProps {
  kind?: string;
  title?: string;
  children?: ReactNode;
}

export function Callout({ kind, title, children }: CalloutProps) {
  const resolved = kindOf(kind);
  return (
    <aside className={`ph-callout ph-callout-${resolved}`} role="note">
      <p className="ph-callout-title">{title ?? LABELS[resolved]}</p>
      <div className="ph-callout-body">{children}</div>
    </aside>
  );
}
