---
title: Rose Pine Dawn
tagline: The Rose Pine Dawn terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, rose, pine, dawn]
---

Rose Pine Dawn is a light palette: the terminal sits on `#faf4ed` and writes in `#575279`, a contrast ratio of 6.7:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#dfdad9`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Rose Pine Dawn" background="#faf4ed" foreground="#575279" cursor="#575279" selection="#dfdad9" ansi="#f2e9e1, #b4637a, #286983, #ea9d34, #56949f, #907aa9, #d7827e, #575279, #9893a5, #b4637a, #286983, #ea9d34, #56949f, #907aa9, #d7827e, #575279" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#faf4ed" name="Background" />
  <Swatch color="#575279" name="Foreground" />
  <Swatch color="#575279" name="Cursor" />
  <Swatch color="#faf4ed" name="Cursor text" />
  <Swatch color="#dfdad9" name="Selection" />
  <Swatch color="#575279" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#f2e9e1" name="0 Black" />
  <Swatch color="#b4637a" name="1 Red" />
  <Swatch color="#286983" name="2 Green" />
  <Swatch color="#ea9d34" name="3 Yellow" />
  <Swatch color="#56949f" name="4 Blue" />
  <Swatch color="#907aa9" name="5 Magenta" />
  <Swatch color="#d7827e" name="6 Cyan" />
  <Swatch color="#575279" name="7 White" />
  <Swatch color="#9893a5" name="8 Bright black" />
  <Swatch color="#b4637a" name="9 Bright red" />
  <Swatch color="#286983" name="10 Bright green" />
  <Swatch color="#ea9d34" name="11 Bright yellow" />
  <Swatch color="#56949f" name="12 Bright blue" />
  <Swatch color="#907aa9" name="13 Bright magenta" />
  <Swatch color="#d7827e" name="14 Bright cyan" />
  <Swatch color="#575279" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Rose Pine Dawn. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Rose Pine Dawn, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/rose-pine-dawn.conf` is a byte-for-byte copy of the
`Rose Pine Dawn` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.3** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.2** — Published under Isac Petinate.

**1.0.1** — Credits Isac Petinate, who packaged it, rather than the app.
