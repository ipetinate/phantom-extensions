import type { ReactNode } from "react";

export function Details({ summary, children }: { summary: string; children?: ReactNode }) {
  return (
    <details className="ph-details">
      <summary>{summary}</summary>
      <div className="ph-details-body">{children}</div>
    </details>
  );
}
