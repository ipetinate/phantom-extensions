import { Children, isValidElement, type ReactNode } from "react";
import { CopyButton } from "./CopyButton.tsx";

export interface CodeBlockProps {
  children?: ReactNode;
  className?: string;
}

export function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const text = Children.toArray(children).map(textOf).join("").replace(/\n$/, "");
  return (
    <div className="ph-codeblock">
      <pre className={className}>{children}</pre>
      <CopyButton text={text} />
    </div>
  );
}
