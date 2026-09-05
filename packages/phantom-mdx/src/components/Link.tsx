import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useDocumentContext } from "../context.ts";

export function Link({ href, children, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { onLink } = useDocumentContext();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (onLink && href) {
      event.preventDefault();
      onLink(href);
    }
  };
  return (
    <a {...rest} href={href} onClick={handleClick} target={onLink ? undefined : "_blank"} rel="noreferrer noopener">
      {children}
    </a>
  );
}
