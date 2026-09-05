import type { ReactNode } from "react";
import { GlyphIcon, isGlyph } from "./glyphs.tsx";

export function Features({ columns, children }: { columns?: string; children?: ReactNode }) {
  const count = columns === "3" ? "3" : "2";
  return <div className={`ph-features ph-features-${count}`}>{children}</div>;
}

export interface FeatureProps {
  title: string;
  icon?: string;
  children?: ReactNode;
}

export function Feature({ title, icon, children }: FeatureProps) {
  return (
    <section className="ph-feature">
      {isGlyph(icon) ? <GlyphIcon name={icon} /> : null}
      <p className="ph-feature-title">{title}</p>
      <div className="ph-feature-body">{children}</div>
    </section>
  );
}
