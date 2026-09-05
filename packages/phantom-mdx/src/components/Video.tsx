import { useMedia } from "../context.ts";
import { IMAGE_SUFFIXES, VIDEO_SUFFIXES } from "../schema.ts";

export interface VideoProps {
  src: string;
  poster?: string;
  caption?: string;
  loop?: string;
  muted?: string;
}

export function Video({ src, poster, caption, loop, muted }: VideoProps) {
  const resolved = useMedia(src, VIDEO_SUFFIXES, "Video");
  const posterURL = useMedia(poster, IMAGE_SUFFIXES, "Video poster");
  return (
    <figure className={`ph-video${resolved ? "" : " ph-missing"}`}>
      {resolved ? (
        <video
          src={resolved}
          poster={posterURL ?? undefined}
          controls
          playsInline
          preload="metadata"
          loop={loop === "true"}
          muted={muted === "true"}
        />
      ) : (
        <p className="ph-missing-media">{caption ?? src}</p>
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
