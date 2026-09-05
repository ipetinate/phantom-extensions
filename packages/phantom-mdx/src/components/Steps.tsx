import type { ReactNode } from "react";

export function Steps({ children }: { children?: ReactNode }) {
  return <ol className="ph-steps">{children}</ol>;
}

export interface StepProps {
  title: string;
  children?: ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <li className="ph-step">
      <p className="ph-step-title">{title}</p>
      <div className="ph-step-body">{children}</div>
    </li>
  );
}
