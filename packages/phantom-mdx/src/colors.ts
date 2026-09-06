export const PALETTE_LENGTH = 16;

const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

export function isHexColor(value: string): boolean {
  return HEX_COLOR.test(value.trim());
}

export function paletteEntries(value: string): string[] {
  return value.split(",").map((entry) => entry.trim());
}

export function isPalette(value: string): boolean {
  const entries = paletteEntries(value);
  return entries.length === PALETTE_LENGTH && entries.every(isHexColor);
}

function toChannel(digits: string): number {
  return Number.parseInt(digits, 16) / 255;
}

function channels(hex: string): [number, number, number] {
  const digits = hex.trim().slice(1);
  if (digits.length === 3) {
    return [toChannel(`${digits[0]}${digits[0]}`), toChannel(`${digits[1]}${digits[1]}`), toChannel(`${digits[2]}${digits[2]}`)];
  }
  return [toChannel(digits.slice(0, 2)), toChannel(digits.slice(2, 4)), toChannel(digits.slice(4, 6))];
}

function toLinear(value: number): number {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const [red, green, blue] = channels(hex);
  return 0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);
}

export function contrast(one: string, other: string): number {
  const first = luminance(one);
  const second = luminance(other);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

export function readableOn(ground: string, first: string, second: string): string {
  return contrast(first, ground) >= contrast(second, ground) ? first : second;
}

export function hexOr(value: string | undefined, fallback: string): string {
  return value !== undefined && isHexColor(value) ? value.trim() : fallback;
}

export function paletteOr(value: string | undefined, fallback: string): string[] {
  if (value !== undefined && isPalette(value)) return paletteEntries(value);
  return Array.from({ length: PALETTE_LENGTH }, () => fallback);
}
