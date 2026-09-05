import type { ReactNode, TableHTMLAttributes } from "react";

export function Table({ children, ...rest }: TableHTMLAttributes<HTMLTableElement> & { children?: ReactNode }) {
  return (
    <div className="ph-table">
      <table {...rest}>{children}</table>
    </div>
  );
}
