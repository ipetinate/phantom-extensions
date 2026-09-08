export { Document, compile, renderTree } from "./render.tsx";
export type { DocumentProps, RenderFailure } from "./render.tsx";
export { validate, validateTree, collectMedia, collectDirectories } from "./validate.ts";
export { checkFile, findDocument, DOCUMENT_NAMES } from "./check.ts";
export type { DocumentLookup } from "./check.ts";
export type { Violation, MediaReference, DirectoryReference } from "./validate.ts";
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
  SHOWCASE_MEDIA,
  SWATCH_COLUMNS,
  WINDOW_HEIGHTS,
  FILTER_MODES,
  THEME_FILE_NAME,
} from "./schema.ts";
export type { ComponentSpec, PropSpec, PropKind, ChildrenRule, Glyph } from "./schema.ts";
export { isHexColor, isPalette, paletteEntries, luminance, contrast, PALETTE_LENGTH } from "./colors.ts";
export { componentMap } from "./components/index.ts";
export { Window, WindowToolbar, windowParts } from "./components/Window.tsx";
export type { WindowProps, WindowToolbarProps } from "./components/Window.tsx";
export { SearchField } from "./components/SearchField.tsx";
export type { SearchFieldProps } from "./components/SearchField.tsx";
export { Filters, Filter, filterOptions, filterMode, seedSelection, nextSelection, stepIndex } from "./components/Filters.tsx";
export type { FiltersProps, FilterProps, FilterOption, FilterMode } from "./components/Filters.tsx";
export { IconBrowser } from "./components/IconBrowser.tsx";
export type { IconBrowserProps } from "./components/IconBrowser.tsx";
export {
  parseIconTheme,
  iconCategories,
  matchIcons,
  drawsLine,
  visibleRange,
  columnsFor,
  haystack,
  isThemeDirectory,
  themeFileURL,
  iconFileURL,
  loadThemeFile,
  ICON_CATEGORIES,
  THEME_FILE,
} from "./components/iconTheme.ts";
export type { IconEntry, IconThemeData, IconCategory, IconKind, CategoryOption, Range } from "./components/iconTheme.ts";
export { DocumentContext, useDocumentContext } from "./context.ts";
export type { DocumentContextValue } from "./context.ts";
