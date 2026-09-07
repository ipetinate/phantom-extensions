import type { ReactNode } from "react";

interface GlyphProps {
  className?: string;
  size?: number;
}

function Glyph({ className, size = 12, children }: GlyphProps & { children: ReactNode }) {
  return (
    <svg
      className={className === undefined ? "ph-tp-glyph" : `ph-tp-glyph ${className}`}
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function TerminalGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <rect x="1.6" y="2.6" width="12.8" height="10.8" rx="1.6" />
      <path d="M4.6 6.4 6.4 8.2 4.6 10" />
      <path d="M8.4 10.2h3" />
    </Glyph>
  );
}

export function FolderGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M1.8 3.6h4.1l1.4 1.9h6.9v7H1.8z" />
    </Glyph>
  );
}

export function GitGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <circle cx="4.4" cy="3.6" r="1.8" />
      <circle cx="4.4" cy="12.4" r="1.8" />
      <circle cx="11.6" cy="6.2" r="1.8" />
      <path d="M4.4 5.4v5.2" />
      <path d="M9.8 6.2h-1a2.4 2.4 0 0 0-2.4 2.4v1.2" />
    </Glyph>
  );
}

export function WorktreeGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M8 2.8v10.4" />
      <circle cx="3.8" cy="4.6" r="1.5" />
      <circle cx="12.2" cy="8" r="1.5" />
      <circle cx="3.8" cy="11.4" r="1.5" />
      <path d="M5.3 4.6H8M10.7 8H8M5.3 11.4H8" />
    </Glyph>
  );
}

export function PuzzleGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M6.4 2.4a1.5 1.5 0 0 1 3 0v1.2h2.6a1 1 0 0 1 1 1v2.2H11.6a1.5 1.5 0 0 0 0 3h1.4v2.2a1 1 0 0 1-1 1H9.4v-1.2a1.5 1.5 0 0 0-3 0v1.2H3.8a1 1 0 0 1-1-1v-2.6H4a1.5 1.5 0 0 0 0-3H2.8V4.6a1 1 0 0 1 1-1h2.6z" />
    </Glyph>
  );
}

export function GearGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 1.8v1.6M8 12.6v1.6M1.8 8h1.6M12.6 8h1.6M3.6 3.6l1.2 1.2M11.2 11.2l1.2 1.2M12.4 3.6l-1.2 1.2M4.8 11.2l-1.2 1.2" />
    </Glyph>
  );
}

export function ChevronGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M6.2 3.6 10.6 8l-4.4 4.4" />
    </Glyph>
  );
}

export function AgentGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M8 2.2l1.5 3.9 3.9 1.5-3.9 1.5L8 13l-1.5-3.9L2.6 7.6l3.9-1.5z" />
    </Glyph>
  );
}

export function CloseGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2" />
    </Glyph>
  );
}
