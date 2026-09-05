export { Document, compile, renderTree } from "./render.tsx";
export type { DocumentProps, RenderFailure } from "./render.tsx";
export { validate, validateTree, collectMedia } from "./validate.ts";
export type { Violation, MediaReference } from "./validate.ts";
export { parseDocument, ParseError, toParseError } from "./parse.ts";
export type { ParsedDocument } from "./parse.ts";
export { isMediaPath, resolveMedia, isAllowedLink, mediaSuffix } from "./media.ts";
export {
  applyTheme,
  normalizeTheme,
  defaultTheme,
  defaultLightTheme,
  themeVariables,
  FONT_UI_VARIABLE,
  FONT_MONO_VARIABLE,
  BASE_SIZE_VARIABLE,
  SCHEME_ATTRIBUTE,
} from "./theme.ts";
export type { Theme, ThemeColors, ThemeFonts, Scheme } from "./theme.ts";
export {
  components,
  componentNames,
  GLYPHS,
  IMAGE_SUFFIXES,
  VIDEO_SUFFIXES,
  MEDIA_SUFFIXES,
  MEDIA_DIRECTORY,
  CALLOUT_KINDS,
  FEATURE_COLUMNS,
  SCREENSHOT_WIDTHS,
  BADGE_TONES,
} from "./schema.ts";
export type { ComponentSpec, PropSpec, PropKind, ChildrenRule, Glyph } from "./schema.ts";
export { componentMap } from "./components/index.ts";
export { DocumentContext, useDocumentContext } from "./context.ts";
export type { DocumentContextValue } from "./context.ts";
