---
title: Acid Lime
tagline: The Acid Lime terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, acid, lime]
---

Acid Lime is a dark palette: the terminal sits on `#080c05` and writes in `#d4efbc`, a contrast ratio of 15.8:1. 11 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#1b2a10`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Acid Lime" background="#080c05" foreground="#d4efbc" cursor="#c2ff33" selection="#1b2a10" ansi="#131d0c, #ff3344, #97e63c, #eeff5c, #4deca0, #a6ff6b, #50ffb4, #bfe0a4, #4a6b36, #ff3344, #97e63c, #dbff45, #4deca0, #a6ff6b, #50ffb4, #d4efbc" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#080c05" name="Background" />
  <Swatch color="#d4efbc" name="Foreground" />
  <Swatch color="#c2ff33" name="Cursor" />
  <Swatch color="#080c05" name="Cursor text" />
  <Swatch color="#1b2a10" name="Selection" />
  <Swatch color="#545852" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#131d0c" name="0 Black" />
  <Swatch color="#ff3344" name="1 Red" />
  <Swatch color="#97e63c" name="2 Green" />
  <Swatch color="#eeff5c" name="3 Yellow" />
  <Swatch color="#4deca0" name="4 Blue" />
  <Swatch color="#a6ff6b" name="5 Magenta" />
  <Swatch color="#50ffb4" name="6 Cyan" />
  <Swatch color="#bfe0a4" name="7 White" />
  <Swatch color="#4a6b36" name="8 Bright black" />
  <Swatch color="#ff3344" name="9 Bright red" />
  <Swatch color="#97e63c" name="10 Bright green" />
  <Swatch color="#dbff45" name="11 Bright yellow" />
  <Swatch color="#4deca0" name="12 Bright blue" />
  <Swatch color="#a6ff6b" name="13 Bright magenta" />
  <Swatch color="#50ffb4" name="14 Bright cyan" />
  <Swatch color="#d4efbc" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Acid Lime. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Acid Lime, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/acid-lime.conf` is a byte-for-byte copy of the
`Acid Lime` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
