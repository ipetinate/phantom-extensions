import type { CSSProperties, ReactNode } from "react";
import { contrast, hexOr } from "../colors.ts";
import { SWATCH_COLUMNS } from "../schema.ts";
import { defaultLightTheme, defaultTheme } from "../theme.ts";

export interface SwatchProps {
  color: string;
  name: string;
}

const GROUNDS = [defaultTheme.colors.bg, defaultLightTheme.colors.bg];
const EDGE_CONTRAST = 1.25;
const FALLBACK_COLOR = "#000000";

function vars(entries: Record<string, string>): CSSProperties {
  return entries as CSSProperties;
}

export function needsEdge(color: string): boolean {
  return GROUNDS.some((ground) => contrast(color, ground) < EDGE_CONTRAST);
}

export function Swatches({ columns, children }: { columns?: string; children?: ReactNode }) {
  const count = (SWATCH_COLUMNS as readonly string[]).includes(columns ?? "") ? columns : null;
  return <div className={count ? `ph-swatches ph-swatches-${count}` : "ph-swatches"}>{children}</div>;
}

export function Swatch({ color, name }: SwatchProps) {
  const value = hexOr(color, FALLBACK_COLOR);
  return (
    <div className={needsEdge(value) ? "ph-swatch has-edge" : "ph-swatch"} style={vars({ "--ph-swatch-color": value })}>
      <span className="ph-swatch-block" />
      <code className="ph-swatch-hex">{value}</code>
      <span className="ph-swatch-name">{name}</span>
    </div>
  );
}
