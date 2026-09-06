export const MEDIA_DIRECTORY = "media";
export const IMAGE_SUFFIXES = ["gif", "jpeg", "jpg", "png", "webp"] as const;
export const VIDEO_SUFFIXES = ["mp4", "webm"] as const;
export const MEDIA_SUFFIXES = [...IMAGE_SUFFIXES, ...VIDEO_SUFFIXES, "svg"] as const;
export const ICON_SUFFIXES = ["png", "svg"] as const;
export const COVER_SUFFIXES = ["jpeg", "jpg", "png", "webp"] as const;

export function suffixOf(file: string): string {
  const name = file.slice(file.lastIndexOf("/") + 1);
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}
