import type { ReactNode } from "react";
import { useMedia } from "../context.ts";
import { IMAGE_SUFFIXES, SCREENSHOT_WIDTHS } from "../schema.ts";

export interface ScreenshotProps {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
}

export function Screenshot({ src, alt, caption, width }: ScreenshotProps) {
  const resolved = useMedia(src, IMAGE_SUFFIXES, "Screenshot");
  const size = (SCREENSHOT_WIDTHS as readonly string[]).includes(width ?? "") ? width : "full";
  return (
    <figure className={`ph-screenshot ph-width-${size}${resolved ? "" : " ph-missing"}`}>
      {resolved ? <img src={resolved} alt={alt} loading="lazy" decoding="async" /> : <p className="ph-missing-media">{alt}</p>}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Gallery({ children }: { children?: ReactNode }) {
  return <div className="ph-gallery">{children}</div>;
}
