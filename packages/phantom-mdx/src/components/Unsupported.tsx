import type { ReactNode } from "react";

export interface UnsupportedProps {
  name: string;
  children?: ReactNode;
}

/**
 * Stands in for a component this build of the viewer does not know.
 *
 * The registry publishes documents on its own schedule and a reader's Phantom
 * can be any age, so a document written against a newer kit will reach an
 * older viewer. Refusing the whole page for one unknown name loses everything
 * the reader could still have read; this loses only the part that is actually
 * missing, and says why.
 */
export function Unsupported({ name, children }: UnsupportedProps) {
  return (
    <div className="ph-unsupported">
      <span className="ph-unsupported-name">{`<${name}>`}</span>
      <span className="ph-unsupported-note">needs a newer Phantom to draw</span>
      {children ? <div className="ph-unsupported-body">{children}</div> : null}
    </div>
  );
}

export function unsupported(name: string) {
  const Named = ({ children }: { children?: ReactNode }) => <Unsupported name={name}>{children}</Unsupported>;
  Named.displayName = `Unsupported(${name})`;
  return Named;
}
