export type Scheme = "dark" | "light";

export interface ThemeColors {
  bg: string;
  fg: string;
  accent: string;
  muted: string;
  border: string;
  codeBg: string;
  danger: string;
  warning: string;
  success: string;
}

export interface ThemeFonts {
  ui: string;
  mono: string;
}

export interface Theme {
  scheme: Scheme;
  colors: ThemeColors;
  fonts: ThemeFonts;
  baseSize: number;
}

export const SYSTEM_UI_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';
export const SYSTEM_MONO_FONT = 'ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace';

export const defaultTheme: Theme = {
  scheme: "dark",
  colors: {
    bg: "#282a36",
    fg: "#f8f8f2",
    accent: "#bd93f9",
    muted: "#6272a4",
    border: "#44475a",
    codeBg: "#21222c",
    danger: "#ff5555",
    warning: "#ffb86c",
    success: "#50fa7b",
  },
  fonts: { ui: SYSTEM_UI_FONT, mono: SYSTEM_MONO_FONT },
  baseSize: 14,
};

export const defaultLightTheme: Theme = {
  scheme: "light",
  colors: {
    bg: "#fbfbfd",
    fg: "#1d1d1f",
    accent: "#6f42c1",
    muted: "#6e6e73",
    border: "#d9d9de",
    codeBg: "#f0f0f4",
    danger: "#c62828",
    warning: "#b26a00",
    success: "#2e7d32",
  },
  fonts: { ui: SYSTEM_UI_FONT, mono: SYSTEM_MONO_FONT },
  baseSize: 14,
};

export const themeVariables: Readonly<Record<keyof ThemeColors, string>> = {
  bg: "--ph-bg",
  fg: "--ph-fg",
  accent: "--ph-accent",
  muted: "--ph-muted",
  border: "--ph-border",
  codeBg: "--ph-code-bg",
  danger: "--ph-danger",
  warning: "--ph-warning",
  success: "--ph-success",
};

export const FONT_UI_VARIABLE = "--ph-font-ui";
export const FONT_MONO_VARIABLE = "--ph-font-mono";
export const BASE_SIZE_VARIABLE = "--ph-base-size";
export const SCHEME_ATTRIBUTE = "data-ph-scheme";

const COLOR_PATTERN = /^(#[0-9a-f]{3,8}|(rgb|rgba|hsl|hsla|color|color-mix)\([^;{}<>]*\)|[a-z]+)$/i;
const FONT_PATTERN = /^[\w\s,'"-]+$/;
const MIN_BASE_SIZE = 10;
const MAX_BASE_SIZE = 24;

function pickColor(value: unknown, fallback: string): string {
  return typeof value === "string" && COLOR_PATTERN.test(value.trim()) ? value.trim() : fallback;
}

function pickFont(value: unknown, fallback: string): string {
  return typeof value === "string" && FONT_PATTERN.test(value) && value.trim() !== "" ? value.trim() : fallback;
}

function pickBaseSize(value: unknown, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(MAX_BASE_SIZE, Math.max(MIN_BASE_SIZE, Math.round(value)));
}

export function normalizeTheme(payload: unknown, base?: Theme): Theme {
  const source = (payload ?? {}) as Partial<Record<keyof Theme, unknown>>;
  const scheme = source.scheme === "light" ? "light" : source.scheme === "dark" ? "dark" : base?.scheme ?? defaultTheme.scheme;
  const fallback = base ?? (scheme === "light" ? defaultLightTheme : defaultTheme);
  const colors = (source.colors ?? {}) as Partial<Record<keyof ThemeColors, unknown>>;
  const fonts = (source.fonts ?? {}) as Partial<Record<keyof ThemeFonts, unknown>>;
  return {
    scheme,
    colors: {
      bg: pickColor(colors.bg, fallback.colors.bg),
      fg: pickColor(colors.fg, fallback.colors.fg),
      accent: pickColor(colors.accent, fallback.colors.accent),
      muted: pickColor(colors.muted, fallback.colors.muted),
      border: pickColor(colors.border, fallback.colors.border),
      codeBg: pickColor(colors.codeBg, fallback.colors.codeBg),
      danger: pickColor(colors.danger, fallback.colors.danger),
      warning: pickColor(colors.warning, fallback.colors.warning),
      success: pickColor(colors.success, fallback.colors.success),
    },
    fonts: {
      ui: pickFont(fonts.ui, fallback.fonts.ui),
      mono: pickFont(fonts.mono, fallback.fonts.mono),
    },
    baseSize: pickBaseSize(source.baseSize, fallback.baseSize),
  };
}

export function applyTheme(root: HTMLElement, theme: Theme): void {
  for (const key of Object.keys(themeVariables) as Array<keyof ThemeColors>) {
    root.style.setProperty(themeVariables[key], theme.colors[key]);
  }
  root.style.setProperty(FONT_UI_VARIABLE, theme.fonts.ui);
  root.style.setProperty(FONT_MONO_VARIABLE, theme.fonts.mono);
  root.style.setProperty(BASE_SIZE_VARIABLE, `${theme.baseSize}px`);
  root.style.setProperty("color-scheme", theme.scheme);
  root.setAttribute(SCHEME_ATTRIBUTE, theme.scheme);
}
