import { readFileSync, writeFileSync } from "node:fs";
import { crc32, deflateSync } from "node:zlib";

const OUT = 128;
const SUPER = 4;
const BASE = 256;
const SIZE = OUT * SUPER;
const SCALE = SIZE / BASE;
const MAX_BYTES = 24 * 1024;

const FRAME = [13, 13, 242, 242];
const FRAME_RADIUS = 17;
const BORDER = 2;
const TITLEBAR_BOTTOM = 54;
const LIGHT_X = [34, 54, 74];
const LIGHT_SLOTS = [1, 3, 2];
const LIGHT_Y = 36;
const LIGHT_RADIUS = 6;
const ACCENT = [208, 28, 223, 43];
const ACCENT_RADIUS = 4;
const CELL_X = [24, 78, 131, 185];
const CELL_Y = [64, 108, 151, 195];
const CELL_W = 47;
const CELL_H = 37;
const CELL_RADIUS = 6;

const TITLEBAR_MIX = 0.1;
const BORDER_MIX = 0.2;
const EDGE_CONTRAST = 1.25;
const SLOTS = 16;

const HEX = /^#([0-9a-f]{6})$/i;

class IconError extends Error {}

function usage() {
  return [
    "usage:",
    "  node scripts/theme-icon.mjs <theme.conf> <icon.png>",
    "",
    "Draws a theme package icon: the app window frame around a 4 by 4 grid of",
    "the sixteen ANSI colours, read from the theme file itself. The output is",
    `${OUT} pixels square, truecolour with alpha, and must stay under ${MAX_BYTES} bytes`,
    "to be inlined into index.json.",
    "",
    "The geometry was measured from themes/12-bit-rainbow/media/icon.png at 256",
    "pixels and is held here in that space, then drawn at 4x and reduced.",
    "",
    "A swatch under 1.25:1 against the background takes a hairline edge, which is",
    "the rule packages/phantom-mdx/src/components/Swatches.tsx applies to its own",
    "swatches. Without it a palette whose black or white is the background colour",
    "would leave an empty square.",
    "",
    "The 90 theme icons already in the registry were drawn at 256 pixels with an",
    "indexed palette. This writes the shape the index wants now, so it redraws one",
    "named icon and never sweeps the folder.",
    "",
  ].join("\n");
}

function channels(value) {
  const match = HEX.exec(value.trim());
  if (match === null) throw new IconError(`not a 6 digit hex colour: ${value}`);
  const digits = match[1];
  return [0, 2, 4].map((at) => Number.parseInt(digits.slice(at, at + 2), 16));
}

function mix(one, other, amount) {
  return one.map((channel, index) => Math.round(channel + (other[index] - channel) * amount));
}

function toLinear(channel) {
  const unit = channel / 255;
  return unit <= 0.04045 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
}

function luminance(colour) {
  const [red, green, blue] = colour.map(toLinear);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(one, other) {
  const first = luminance(one);
  const second = luminance(other);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function at(value) {
  return Math.round(value * SCALE);
}

function rounded(x0, y0, x1, y1, radius) {
  const left = x0;
  const top = y0;
  const right = x1 + 1;
  const bottom = y1 + 1;
  const limit = Math.max(0, Math.min(radius, (right - left) / 2, (bottom - top) / 2));
  return (px, py) => {
    if (px < left || px > right || py < top || py > bottom) return false;
    const cx = px < left + limit ? left + limit : px > right - limit ? right - limit : px;
    const cy = py < top + limit ? top + limit : py > bottom - limit ? bottom - limit : py;
    const dx = px - cx;
    const dy = py - cy;
    return dx * dx + dy * dy <= limit * limit;
  };
}

function circle(cx, cy, radius) {
  return (px, py) => {
    const dx = px - cx;
    const dy = py - cy;
    return dx * dx + dy * dy <= radius * radius;
  };
}

function paint(canvas, colour, inside, box) {
  const [x0, y0, x1, y1] = box;
  const left = Math.max(0, x0);
  const top = Math.max(0, y0);
  const right = Math.min(SIZE - 1, x1);
  const bottom = Math.min(SIZE - 1, y1);
  for (let y = top; y <= bottom; y += 1) {
    for (let x = left; x <= right; x += 1) {
      if (!inside(x + 0.5, y + 0.5)) continue;
      const offset = (y * SIZE + x) * 3;
      canvas[offset] = colour[0];
      canvas[offset + 1] = colour[1];
      canvas[offset + 2] = colour[2];
    }
  }
}

function draw(theme) {
  const ground = channels(theme.settings["background"]);
  const ink = channels(theme.settings["foreground"]);
  const cursor = channels(theme.settings["cursor-color"] ?? theme.settings["foreground"]);
  const cells = theme.palette.map(channels);
  const titlebar = mix(ground, ink, TITLEBAR_MIX);
  const border = mix(ground, ink, BORDER_MIX);
  const edged = [];

  const canvas = new Uint8Array(SIZE * SIZE * 3);
  for (let offset = 0; offset < canvas.length; offset += 3) {
    canvas[offset] = ground[0];
    canvas[offset + 1] = ground[1];
    canvas[offset + 2] = ground[2];
  }

  const frame = FRAME.map(at);
  const radius = at(FRAME_RADIUS);
  const width = at(BORDER);
  const cut = at(TITLEBAR_BOTTOM);
  const inFrame = rounded(frame[0], frame[1], frame[2], frame[3], radius);

  paint(canvas, titlebar, (px, py) => py < cut && inFrame(px, py), [frame[0], frame[1], frame[2], cut]);
  paint(canvas, border, () => true, [frame[0], cut, frame[2], cut + width - 1]);

  LIGHT_X.forEach((centre, index) => {
    const cx = at(centre);
    const cy = at(LIGHT_Y);
    const r = at(LIGHT_RADIUS);
    paint(canvas, cells[LIGHT_SLOTS[index]], circle(cx, cy, r), [cx - r, cy - r, cx + r, cy + r]);
  });

  const accent = ACCENT.map(at);
  paint(canvas, cursor, rounded(accent[0], accent[1], accent[2], accent[3], at(ACCENT_RADIUS)), accent);

  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 4; column += 1) {
      const slot = row * 4 + column;
      const colour = cells[slot];
      const x0 = at(CELL_X[column]);
      const y0 = at(CELL_Y[row]);
      const x1 = x0 + at(CELL_W);
      const y1 = y0 + at(CELL_H);
      const cellRadius = at(CELL_RADIUS);
      const outer = rounded(x0, y0, x1, y1, cellRadius);
      paint(canvas, colour, outer, [x0, y0, x1, y1]);
      if (contrast(colour, ground) >= EDGE_CONTRAST) continue;
      edged.push(slot);
      const inner = rounded(x0 + width, y0 + width, x1 - width, y1 - width, cellRadius - width);
      paint(canvas, border, (px, py) => outer(px, py) && !inner(px, py), [x0, y0, x1, y1]);
    }
  }

  const hollow = rounded(frame[0] + width, frame[1] + width, frame[2] - width, frame[3] - width, radius - width);
  paint(canvas, border, (px, py) => inFrame(px, py) && !hollow(px, py), frame);

  return { canvas, edged };
}

function reduce(canvas) {
  const pixels = new Uint8Array(OUT * OUT * 4);
  const area = SUPER * SUPER;
  for (let y = 0; y < OUT; y += 1) {
    for (let x = 0; x < OUT; x += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;
      for (let dy = 0; dy < SUPER; dy += 1) {
        for (let dx = 0; dx < SUPER; dx += 1) {
          const offset = ((y * SUPER + dy) * SIZE + x * SUPER + dx) * 3;
          red += canvas[offset];
          green += canvas[offset + 1];
          blue += canvas[offset + 2];
        }
      }
      const target = (y * OUT + x) * 4;
      pixels[target] = Math.round(red / area);
      pixels[target + 1] = Math.round(green / area);
      pixels[target + 2] = Math.round(blue / area);
      pixels[target + 3] = 255;
    }
  }
  return pixels;
}

function chunk(type, data) {
  const label = Buffer.from(type, "ascii");
  const out = Buffer.alloc(data.length + 12);
  out.writeUInt32BE(data.length, 0);
  label.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(data, crc32(label)) >>> 0, data.length + 8);
  return out;
}

function scanlines(pixels) {
  const stride = OUT * 4;
  const raw = Buffer.alloc((stride + 1) * OUT);
  const none = Buffer.alloc(stride);
  const up = Buffer.alloc(stride);
  let prior = Buffer.alloc(stride);
  for (let y = 0; y < OUT; y += 1) {
    const row = Buffer.from(pixels.buffer, pixels.byteOffset + y * stride, stride);
    let noneCost = 0;
    let upCost = 0;
    for (let index = 0; index < stride; index += 1) {
      none[index] = row[index];
      up[index] = (row[index] - prior[index]) & 0xff;
      noneCost += none[index] < 128 ? none[index] : 256 - none[index];
      upCost += up[index] < 128 ? up[index] : 256 - up[index];
    }
    const chosen = upCost < noneCost ? up : none;
    raw[y * (stride + 1)] = upCost < noneCost ? 2 : 0;
    chosen.copy(raw, y * (stride + 1) + 1);
    prior = Buffer.from(row);
  }
  return raw;
}

function encode(pixels) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(OUT, 0);
  header.writeUInt32BE(OUT, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(scanlines(pixels), { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function parse(file) {
  const settings = {};
  const palette = [];
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const text = line.trim();
    if (text.startsWith("#") || !text.includes(" = ")) continue;
    const [key, value] = text.split(" = ", 2);
    if (key !== "palette") {
      settings[key] = value.trim();
      continue;
    }
    const [slot, colour] = value.split("=", 2);
    palette[Number.parseInt(slot, 10)] = colour.trim();
  }
  for (const key of ["background", "foreground"]) {
    if (settings[key] === undefined) throw new IconError(`${file} sets no ${key}`);
  }
  for (let slot = 0; slot < SLOTS; slot += 1) {
    if (palette[slot] === undefined) throw new IconError(`${file} sets no palette ${slot}`);
  }
  return { settings, palette: palette.slice(0, SLOTS) };
}

function main(argv) {
  if (argv.length !== 2) {
    process.stderr.write(usage());
    return 1;
  }
  const [source, target] = argv;
  const theme = parse(source);
  const { canvas, edged } = draw(theme);
  const png = encode(reduce(canvas));
  if (png.length > MAX_BYTES) throw new IconError(`${target} would be ${png.length} bytes, over ${MAX_BYTES}`);
  writeFileSync(target, png);
  const edges = edged.length === 0 ? "none" : edged.map((slot) => `ANSI ${slot}`).join(", ");
  process.stdout.write(`${target}  ${OUT}x${OUT} truecolour  ${png.length} bytes  hairline edge: ${edges}\n`);
  return 0;
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (error) {
  if (!(error instanceof IconError)) throw error;
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
