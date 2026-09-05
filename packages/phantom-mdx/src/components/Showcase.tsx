import type { ReactNode } from "react";

export interface ShowcaseProps {
  media?: string;
  children?: ReactNode;
}

export function Showcase({ media, children }: ShowcaseProps) {
  const side = media === "start" ? "start" : "end";
  return <div className={`ph-showcase ph-showcase-${side}`}>{children}</div>;
}
