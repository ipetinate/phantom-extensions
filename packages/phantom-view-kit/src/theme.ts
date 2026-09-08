/**
 * The colours a Phantom theme carries, in the order the host sends them.
 *
 * These names are the host's, not the kit's: `theme.read` answers with this
 * vocabulary and the view Bruno ships already writes it, so the kit reads the
 * same custom properties rather than inventing a second set to translate
 * between.
 */
export const HOST_COLOURS = ["bg", "fg", "accent", "muted", "border", "codeBg", "danger", "warning", "success"] as const;

export type HostColour = (typeof HOST_COLOURS)[number];

/** Every custom property the host's theme decides. */
export const HOST_TOKENS = [
  ...HOST_COLOURS.map((colour) => `--${colour}`),
  "--font-ui",
  "--font-mono",
  "--base-size",
] as const;

/**
 * Every custom property the kit derives, and an author may override.
 *
 * The colours are mixes of the host's, so a reader's theme decides them: a
 * surface is the foreground at 8 percent over whatever is behind it, which is
 * `Color.secondary.opacity(0.08)` in the app. `--pk-on-accent` is the one
 * that cannot be a mix — it is the label on a filled accent button, and which
 * end of the scale it sits at depends on how bright the accent is, so
 * `applyTheme` measures the accent and writes it.
 */
export const KIT_TOKENS = [
  "--pk-radius",
  "--pk-radius-small",
  "--pk-row-height",
  "--pk-chip-width",
  "--pk-chip-height",
  "--pk-pad-x",
  "--pk-gap",
  "--pk-empty-art",
  "--pk-text-caption",
  "--pk-text-small",
  "--pk-text-header",
  "--pk-text-code",
  "--pk-text-hero",
  "--pk-surface",
  "--pk-stroke",
  "--pk-fill",
  "--pk-hover",
  "--pk-quiet",
  "--pk-row-hover",
  "--pk-row-active",
  "--pk-ring",
  "--pk-on-accent",
  "--pk-scroll-knob",
  "--pk-scroll-knob-content",
  "--pk-scroll-inset",
  "--pk-scroll-color",
  "--pk-loaded",
] as const;

/** The theme `theme.read` answers with. */
export interface Theme {
  readonly scheme?: string;
  readonly baseSize?: number;
  readonly fonts?: { readonly ui?: string; readonly mono?: string };
  readonly colors?: Readonly<Record<string, string>>;
}

/** The part of `window.phantom` the kit reads. Both methods are optional. */
export interface ThemeSource {
  theme?(): Theme | null;
  onTheme?(listener: (theme: Theme) => void): void;
}

const ON_ACCENT_LIGHT = "#ffffff";

const ON_ACCENT_DARK = "#101014";

/**
 * Writes a theme onto an element as custom properties.
 *
 * Through the CSSOM rather than a stylesheet the page builds, because the
 * page's policy is `style-src 'self'` with no `unsafe-inline`: a `<style>`
 * element the view writes is refused, while a property set on an element's
 * own `style` is not an inline style in the sense the policy means. It is
 * also how a view follows a theme change with no reload.
 *
 * A value of the wrong type is skipped rather than written, so a host that
 * sends one field short leaves the fallback palette in place for it.
 */
export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  const style = root.style;

  for (const colour of HOST_COLOURS) {
    const value = theme.colors?.[colour];
    if (typeof value === "string" && value !== "") style.setProperty(`--${colour}`, value);
  }

  if (typeof theme.fonts?.ui === "string" && theme.fonts.ui !== "") style.setProperty("--font-ui", theme.fonts.ui);
  if (typeof theme.fonts?.mono === "string" && theme.fonts.mono !== "") style.setProperty("--font-mono", theme.fonts.mono);
  if (typeof theme.baseSize === "number" && theme.baseSize > 0) style.setProperty("--base-size", `${theme.baseSize}px`);

  const onAccent = theme.colors?.["onAccent"];
  if (typeof onAccent === "string" && onAccent !== "") style.setProperty("--pk-on-accent", onAccent);
  else {
    const accent = theme.colors?.["accent"];
    if (typeof accent === "string") style.setProperty("--pk-on-accent", labelOn(accent));
  }

  root.dataset["scheme"] = theme.scheme === "light" ? "light" : "dark";
}

/**
 * Applies the running theme and follows every later one.
 *
 * Safe without the `theme.read` permission and safe outside Phantom: a
 * missing bridge, or a bridge without the two methods, leaves the fallback
 * palette in the stylesheet in force. Call the returned function to stop
 * following.
 */
export function bindTheme(source: ThemeSource | undefined = hostBridge(), root: HTMLElement = document.documentElement): () => void {
  let following = true;

  const current = source?.theme?.() ?? null;
  if (current) applyTheme(current, root);

  source?.onTheme?.((theme) => {
    if (following) applyTheme(theme, root);
  });

  return () => {
    following = false;
  };
}

/**
 * Which end of the scale a label on this colour sits at.
 *
 * Exported because a view drawing its own accent-filled surface needs the
 * same answer the kit's prominent button uses. Unreadable input answers with
 * the light label, the same way an unresolved accent falls back to one.
 */
export function labelOn(colour: string): string {
  const luminance = relativeLuminance(colour);
  if (luminance === null) return ON_ACCENT_LIGHT;
  return luminance > 0.45 ? ON_ACCENT_DARK : ON_ACCENT_LIGHT;
}

function hostBridge(): ThemeSource | undefined {
  return (globalThis as { phantom?: ThemeSource }).phantom;
}

function relativeLuminance(colour: string): number | null {
  const channels = parseColour(colour);
  if (!channels) return null;

  const [red, green, blue] = channels.map((channel) => {
    const scaled = channel / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function parseColour(colour: string): [number, number, number] | null {
  const value = colour.trim();

  const hex = /^#([0-9a-f]{3,8})$/i.exec(value)?.[1];
  if (hex) {
    if (hex.length === 3 || hex.length === 4) {
      const [red, green, blue] = [hex[0], hex[1], hex[2]] as [string, string, string];
      return [parseInt(red + red, 16), parseInt(green + green, 16), parseInt(blue + blue, 16)];
    }
    if (hex.length === 6 || hex.length === 8) {
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    }
    return null;
  }

  const parts = /^rgba?\(([^)]+)\)$/i.exec(value)?.[1];
  if (!parts) return null;

  const numbers = parts
    .split(/[\s,/]+/)
    .filter((part) => part !== "")
    .slice(0, 3)
    .map((part) => (part.endsWith("%") ? (Number.parseFloat(part) / 100) * 255 : Number.parseFloat(part)));

  if (numbers.length < 3 || numbers.some((number) => !Number.isFinite(number))) return null;
  return [numbers[0], numbers[1], numbers[2]] as [number, number, number];
}
