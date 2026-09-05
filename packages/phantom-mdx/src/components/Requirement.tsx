import type { ReactNode } from "react";
import { Link } from "./Link.tsx";
import { CopyButton } from "./CopyButton.tsx";

export interface RequirementProps {
  command: string;
  install?: string;
  url?: string;
  children?: ReactNode;
}

export function Requirement({ command, install, url, children }: RequirementProps) {
  return (
    <section className="ph-requirement">
      <div className="ph-requirement-head">
        <code className="ph-requirement-command">{command}</code>
        {url ? (
          <Link href={url} className="ph-requirement-link">
            Documentation
          </Link>
        ) : null}
      </div>
      {install ? (
        <div className="ph-codeblock">
          <pre className="ph-requirement-install">
            <code>{install}</code>
          </pre>
          <CopyButton text={install} />
        </div>
      ) : null}
      <div className="ph-requirement-body">{children}</div>
    </section>
  );
}
