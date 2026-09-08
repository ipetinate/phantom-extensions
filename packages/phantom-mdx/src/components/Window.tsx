import { Children, isValidElement, type ReactNode, type Ref } from "react";
import { WINDOW_HEIGHTS } from "../schema.ts";

export interface WindowProps {
  title?: string;
  height?: string;
  flush?: boolean;
  bodyRef?: Ref<HTMLDivElement>;
  children?: ReactNode;
}

export interface WindowToolbarProps {
  children?: ReactNode;
}

export const DEFAULT_WINDOW_TITLE = "Phantom";
const DEFAULT_HEIGHT = "medium";

export interface WindowParts {
  toolbar: ReactNode[];
  body: ReactNode[];
}

function isBlank(child: ReactNode): boolean {
  return typeof child === "string" && child.trim() === "";
}

function isToolbar(child: ReactNode): boolean {
  return isValidElement(child) && child.type === WindowToolbar;
}

export function windowParts(children: ReactNode): WindowParts {
  const toolbar: ReactNode[] = [];
  const body: ReactNode[] = [];
  for (const child of Children.toArray(children)) {
    if (isBlank(child)) continue;
    if (isToolbar(child)) toolbar.push(child);
    else body.push(child);
  }
  return { toolbar, body };
}

function heightClass(height: string | undefined): string {
  const wanted = (WINDOW_HEIGHTS as readonly string[]).includes(height ?? "") ? (height as string) : DEFAULT_HEIGHT;
  return `ph-win-${wanted}`;
}

export function WindowToolbar({ children }: WindowToolbarProps) {
  return <div className="ph-win-toolbar">{children}</div>;
}

export function Window({ title, height, flush, bodyRef, children }: WindowProps) {
  const { toolbar, body } = windowParts(children);
  const classes = ["ph-win", heightClass(height)];
  if (flush === true) classes.push("is-flush");
  return (
    <div className={classes.join(" ")}>
      <div className="ph-win-titlebar">
        <span className="ph-win-lights">
          <span className="ph-win-light ph-win-light-close" />
          <span className="ph-win-light ph-win-light-minimise" />
          <span className="ph-win-light ph-win-light-zoom" />
        </span>
        <span className="ph-win-title">{title ?? DEFAULT_WINDOW_TITLE}</span>
        <span className="ph-win-lights" aria-hidden="true" />
      </div>
      {toolbar.length > 0 ? toolbar : null}
      <div className="ph-win-body" ref={bodyRef}>
        {body}
      </div>
    </div>
  );
}
