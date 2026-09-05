import type { Glyph } from "../schema.ts";

const PATHS: Readonly<Record<Glyph, string>> = {
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
  book: "M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z",
  brush: "M9.06 11.9 18 3l3 3-8.9 8.94M5 21c2.5 0 4-1.5 4-4a2.5 2.5 0 0 0-5 0c0 2-1 3-2 3 1 .7 2 1 3 1z",
  bug: "M8 2l1.5 2M16 2l-1.5 2M12 20a6 6 0 0 1-6-6v-2a6 6 0 0 1 12 0v2a6 6 0 0 1-6 6zM12 20v-9M6 13H3M21 13h-3M4.5 8l2 1.5M19.5 8l-2 1.5M4.5 18l2-1.5M19.5 18l-2-1.5",
  check: "M4 12.5 9.5 18 20 6",
  code: "m8 6-6 6 6 6M16 6l6 6-6 6",
  gear: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z",
  keyboard: "M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8",
  lock: "M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM8 11V7a4 4 0 0 1 8 0v4",
  package: "m12 2 9 4.5v11L12 22l-9-4.5v-11zM3 6.5l9 4.5 9-4.5M12 11v11",
  plug: "M12 22v-5M9 8V2M15 8V2M5 8h14v5a7 7 0 0 1-14 0z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  sparkles: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8zM5 2l.6 1.6L7 4l-1.4.6L5 6l-.6-1.4L3 4l1.4-.4z",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
  terminal: "m4 17 6-5-6-5M12 19h8",
};

export function GlyphIcon({ name }: { name: Glyph }) {
  return (
    <svg className="ph-glyph" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function isGlyph(value: string | undefined): value is Glyph {
  return value !== undefined && Object.prototype.hasOwnProperty.call(PATHS, value);
}
