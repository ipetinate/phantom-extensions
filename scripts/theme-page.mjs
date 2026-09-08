import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import { join } from "node:path";

const ACCEPTED_KEYS =
  "`background`, `foreground`, `palette`, `cursor-color`, `cursor-text`, " +
  "`selection-background`, `selection-foreground`, `bold-color`, " +
  "`split-divider-color`, `unfocused-split-fill`, the four `search-*` keys, " +
  "the two `window-titlebar-*` keys and the two `macos-icon-*` keys";

const CHROME_KEYS = [
  "split-divider-color",
  "unfocused-split-fill",
  "search-background",
  "search-foreground",
  "search-selected-background",
  "search-selected-foreground",
  "window-titlebar-background",
  "window-titlebar-foreground",
  "macos-icon-ghost-color",
  "macos-icon-screen-color",
];

class PageError extends Error {}

function channel(value) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = channel((n >> 16) & 0xff);
  const g = channel((n >> 8) & 0xff);
  const b = channel(n & 0xff);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function readConf(path) {
  const palette = new Array(16).fill(null);
  const keys = new Map();
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) continue;
    const at = trimmed.indexOf("=");
    if (at < 0) continue;
    const key = trimmed.slice(0, at).trim();
    const value = trimmed.slice(at + 1).trim();
    if (key === "palette") {
      const [slot, colour] = value.split("=");
      palette[Number(slot)] = colour.trim();
      continue;
    }
    keys.set(key, value);
  }
  return { palette, keys };
}

function frontmatter(text) {
  if (!text.startsWith("---\n")) throw new PageError("no frontmatter");
  const close = text.indexOf("\n---\n", 4);
  if (close < 0) throw new PageError("unterminated frontmatter");
  return { head: text.slice(4, close + 1), body: text.slice(close + 5) };
}

function sections(body) {
  const out = new Map();
  let title = "";
  let buffer = [];
  for (const line of body.split("\n")) {
    if (line.startsWith("## ")) {
      out.set(title, buffer.join("\n").trim());
      title = line.slice(3).trim();
      buffer = [];
      continue;
    }
    buffer.push(line);
  }
  out.set(title, buffer.join("\n").trim());
  return out;
}

function bump(version) {
  const parts = version.split(".").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) throw new PageError(`version ${version}`);
  return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

function steps(name, appearance) {
  const group = appearance === "light" ? "Light" : "Dark";
  return [
    "<Steps>",
    "  <Step title=\"Install the extension\">",
    `    In Phantom, open the Extensions pane in the sidebar (or Settings → Extensions) and press **Install** next to ${name}.`,
    "  </Step>",
    "  <Step title=\"Open Settings → Appearance\">",
    `    Themes from extensions are listed under **Extension Themes**, above the Dark and Light groups. The theme in use gets its own card at the top of the page.`,
    "  </Step>",
    `  <Step title="Pick ${name}">`,
    "    Press its card. The change applies to every window at once, with no restart.",
    "  </Step>",
    "  <Step title=\"Keep it, or go back\">",
    `    The ${group} group still holds every theme that ships with Phantom, so returning is one more card press. Nothing here is written over.`,
    "  </Step>",
    "</Steps>",
  ].join("\n");
}

function configuration(slug, conf, chrome) {
  const file = readFileSync(join("themes", slug, "themes", `${slug}.conf`), "utf8").trim();
  const lines = file.split("\n");
  const excerpt = lines.length > 26 ? `${lines.slice(0, 24).join("\n")}\n…` : file;
  const set = [...conf.keys.keys()];
  const chromeNote = chrome.length === 0
    ? "It sets the terminal's own colours and nothing else: the divider between splits, the search bar, the window title bar and the macOS app icon keep the colours the app gives them."
    : `It also carries ${chrome.length} of the keys that reach the rest of the app, listed under **The window colours** above.`;

  return [
    "## Configuration",
    "",
    "<Details summary=\"The theme file\">",
    "",
    `The whole extension is \`themes/${slug}.conf\`. It is a Ghostty theme file: one \`key = value\` per line, \`#\` for comments, and colour keys only. This one sets ${set.length + 16} values.`,
    "",
    "```ini",
    excerpt,
    "```",
    "",
    chromeNote,
    "",
    `Phantom accepts ${ACCEPTED_KEYS}. A file that sets anything else is dropped whole rather than partly applied, and it may not exceed 64 KB.`,
    "",
    "</Details>",
    "",
    "<Details summary=\"Making your own copy\">",
    "",
    `Settings → Extensions has a **Reveal in Finder** button. Copy \`themes/${slug}.conf\`, change what you want, and drop the file into your own themes folder, where Settings → Appearance lists it under **Custom Themes**.`,
    "",
    "An extension theme is selected by its file path rather than by its name, so a custom copy never collides with this one, and uninstalling the extension does not take your copy with it.",
    "",
    "</Details>",
  ].join("\n");
}

function troubleshooting(name, conf, duplicates, blackContrast, chrome) {
  const parts = [
    "## Troubleshooting",
    "",
    "<Details summary=\"The theme is not in the list\">",
    "",
    "Phantom drops a contributed theme whose file sets a key that is not a colour, whose file is larger than 64 KB, or whose name is already taken by a bundled or custom theme. Settings → Extensions lists what the manifest contributed, which is where a dropped theme shows up as missing.",
    "",
    "</Details>",
  ];

  if (chrome.length === 0) {
    parts.push(
      "",
      "<Details summary=\"The title bar and the app icon did not change\">",
      "",
      `${name} is a terminal palette. It sets the sixteen ANSI colours, the background and the foreground, and it stops there, so the window chrome and the macOS icon keep the colours the app gives them and follow the window's own appearance.`,
      "",
      "</Details>",
    );
  }

  if (duplicates > 0) {
    parts.push(
      "",
      "<Details summary=\"A bright colour looks the same as its normal one\">",
      "",
      `${duplicates} of the eight bright entries repeat their normal counterpart, which is what the palette specifies. A program that prints in bright red to stand out against red is drawing the same colour twice here, and the theme does not correct it, because a correction would stop this theme matching the palette it packages.`,
      "",
      "</Details>",
    );
  }

  if (blackContrast !== null && blackContrast < 2) {
    parts.push(
      "",
      "<Details summary=\"Text printed in ANSI black is hard to read\">",
      "",
      `ANSI Black is \`${conf.palette[0]}\`, which sits ${blackContrast.toFixed(2)}:1 against the background. That is the palette's own value. A program that prints in ANSI 0 on the default background is close to invisible here, and the theme keeps the value rather than inventing a different one.`,
      "",
      "</Details>",
    );
  }

  return parts.join("\n");
}

function build(slug) {
  const directory = join("themes", slug);
  const markdown = join(directory, "extension.md");
  if (!existsSync(markdown)) return null;

  const manifestPath = join(directory, "extension.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const contributed = manifest.contributes?.themes?.[0];
  if (!contributed) throw new PageError("no contributed theme");

  const conf = readConf(join(directory, contributed.path));
  const background = conf.keys.get("background");
  const chrome = CHROME_KEYS.filter((key) => conf.keys.has(key));
  const duplicates = conf.palette
    .slice(8)
    .filter((colour, at) => colour !== null && colour === conf.palette[at]).length;
  const blackContrast =
    background && conf.palette[0] ? contrast(background, conf.palette[0]) : null;

  const { head, body } = frontmatter(readFileSync(markdown, "utf8"));
  const parsed = sections(body);
  const intro = parsed.get("");
  const theme = parsed.get("The theme");
  const adds = parsed.get("What the extension adds");
  const credits = parsed.get("License and credits");
  const changelog = parsed.get("Changelog");
  if (!intro || !theme || !adds || !credits || !changelog) throw new PageError("unexpected sections");

  const version = bump(manifest.version);
  const name = manifest.name;

  const page = [
    "---",
    head.replace(/^version: .*$/m, `version: ${version}`).trimEnd(),
    "---",
    "",
    intro,
    "",
    "## The theme",
    "",
    theme,
    "",
    "## Getting started",
    "",
    steps(name, contributed.appearance),
    "",
    "## What the extension adds",
    "",
    adds,
    "",
    configuration(slug, conf, chrome),
    "",
    troubleshooting(name, conf, duplicates, blackContrast, chrome),
    "",
    "## Changelog",
    "",
    `**${version}** — Documents itself in MDX, with the install walked through in steps and the theme file, a custom copy and the palette's own quirks each behind a disclosure.`,
    "",
    changelog,
    "",
    "## License and credits",
    "",
    credits,
    "",
  ].join("\n");

  writeFileSync(join(directory, "extension.mdx"), page);
  unlinkSync(markdown);
  manifest.version = version;
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return { slug, version, duplicates, blackContrast, chrome: chrome.length };
}

const only = process.argv.slice(2);
const slugs = only.length > 0 ? only : readdirSync("themes");
let built = 0;
const failures = [];
for (const slug of slugs) {
  try {
    if (build(slug) !== null) built += 1;
  } catch (error) {
    failures.push(`${slug}: ${error.message}`);
  }
}
console.log(`built ${built}`);
if (failures.length > 0) {
  console.log(failures.join("\n"));
  process.exitCode = 1;
}
