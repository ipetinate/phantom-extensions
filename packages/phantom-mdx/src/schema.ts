export type PropKind = "text" | "image" | "video" | "url";

export interface PropSpec {
  readonly name: string;
  readonly kind: PropKind;
  readonly required?: boolean;
  readonly values?: readonly string[];
  readonly defaultValue?: string;
}

export type ChildrenRule =
  | { readonly kind: "markdown" }
  | { readonly kind: "none" }
  | { readonly kind: "text" }
  | { readonly kind: "only"; readonly names: readonly string[] };

export interface ComponentSpec {
  readonly name: string;
  readonly props: readonly PropSpec[];
  readonly children: ChildrenRule;
  readonly parent?: string;
  readonly inline?: boolean;
}

export const GLYPHS = [
  "bolt",
  "book",
  "brush",
  "bug",
  "check",
  "code",
  "gear",
  "globe",
  "keyboard",
  "lock",
  "package",
  "plug",
  "search",
  "sparkles",
  "star",
  "terminal",
] as const;

export type Glyph = (typeof GLYPHS)[number];

export const IMAGE_SUFFIXES = ["png", "jpg", "jpeg", "webp", "gif"] as const;
export const VIDEO_SUFFIXES = ["mp4", "webm"] as const;
export const MEDIA_SUFFIXES = [...IMAGE_SUFFIXES, ...VIDEO_SUFFIXES] as const;
export const MEDIA_DIRECTORY = "media/";

export const CALLOUT_KINDS = ["note", "tip", "warning", "danger"] as const;
export const FEATURE_COLUMNS = ["2", "3"] as const;
export const SCREENSHOT_WIDTHS = ["full", "wide", "narrow"] as const;
export const BADGE_TONES = ["neutral", "accent", "success", "warning"] as const;
export const SHOWCASE_MEDIA = ["start", "end"] as const;

const markdown: ChildrenRule = { kind: "markdown" };
const none: ChildrenRule = { kind: "none" };

export const components: Readonly<Record<string, ComponentSpec>> = {
  Callout: {
    name: "Callout",
    props: [
      { name: "kind", kind: "text", values: CALLOUT_KINDS, defaultValue: "note" },
      { name: "title", kind: "text" },
    ],
    children: markdown,
  },
  Steps: { name: "Steps", props: [], children: { kind: "only", names: ["Step"] } },
  Step: {
    name: "Step",
    props: [{ name: "title", kind: "text", required: true }],
    children: markdown,
    parent: "Steps",
  },
  Kbd: { name: "Kbd", props: [], children: { kind: "text" }, inline: true },
  Features: {
    name: "Features",
    props: [{ name: "columns", kind: "text", values: FEATURE_COLUMNS, defaultValue: "2" }],
    children: { kind: "only", names: ["Feature"] },
  },
  Feature: {
    name: "Feature",
    props: [
      { name: "title", kind: "text", required: true },
      { name: "icon", kind: "text", values: GLYPHS },
    ],
    children: markdown,
    parent: "Features",
  },
  Screenshot: {
    name: "Screenshot",
    props: [
      { name: "src", kind: "image", required: true },
      { name: "alt", kind: "text", required: true },
      { name: "caption", kind: "text" },
      { name: "width", kind: "text", values: SCREENSHOT_WIDTHS, defaultValue: "full" },
    ],
    children: none,
  },
  Gallery: { name: "Gallery", props: [], children: { kind: "only", names: ["Screenshot"] } },
  Showcase: {
    name: "Showcase",
    props: [{ name: "media", kind: "text", values: SHOWCASE_MEDIA, defaultValue: "end" }],
    children: { kind: "only", names: ["Features", "Screenshot", "Video"] },
  },
  Video: {
    name: "Video",
    props: [
      { name: "src", kind: "video", required: true },
      { name: "poster", kind: "image" },
      { name: "caption", kind: "text" },
      { name: "loop", kind: "text", values: ["true"] },
      { name: "muted", kind: "text", values: ["true"] },
    ],
    children: none,
  },
  Badge: {
    name: "Badge",
    props: [
      { name: "label", kind: "text", required: true },
      { name: "tone", kind: "text", values: BADGE_TONES, defaultValue: "neutral" },
    ],
    children: none,
    inline: true,
  },
  Requirement: {
    name: "Requirement",
    props: [
      { name: "command", kind: "text", required: true },
      { name: "install", kind: "text" },
      { name: "url", kind: "url" },
    ],
    children: markdown,
  },
  Details: {
    name: "Details",
    props: [{ name: "summary", kind: "text", required: true }],
    children: markdown,
  },
};

export const componentNames: readonly string[] = Object.keys(components);
