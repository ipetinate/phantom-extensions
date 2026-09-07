---
title: Everforest Light Hard
tagline: The Everforest Light Hard terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, everforest, hard]
---

Everforest Light Hard is a light palette: the terminal sits on `#f2efdf` and writes in `#5c6a72`, a contrast ratio of 4.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#f0f2d4`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Everforest Light Hard" background="#f2efdf" foreground="#5c6a72" cursor="#f57d26" selection="#f0f2d4" ansi="#7a8478, #e67e80, #9ab373, #ceaf72, #7fbbb3, #d699b6, #83c092, #b2af9f, #a6b0a0, #f85552, #8da101, #dfa000, #3a94c5, #df69ba, #35a77c, #fffbef" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#f2efdf" name="Background" />
  <Swatch color="#5c6a72" name="Foreground" />
  <Swatch color="#f57d26" name="Cursor" />
  <Swatch color="#f0f2d4" name="Cursor text" />
  <Swatch color="#f0f2d4" name="Selection" />
  <Swatch color="#5c6a72" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#7a8478" name="0 Black" />
  <Swatch color="#e67e80" name="1 Red" />
  <Swatch color="#9ab373" name="2 Green" />
  <Swatch color="#ceaf72" name="3 Yellow" />
  <Swatch color="#7fbbb3" name="4 Blue" />
  <Swatch color="#d699b6" name="5 Magenta" />
  <Swatch color="#83c092" name="6 Cyan" />
  <Swatch color="#b2af9f" name="7 White" />
  <Swatch color="#a6b0a0" name="8 Bright black" />
  <Swatch color="#f85552" name="9 Bright red" />
  <Swatch color="#8da101" name="10 Bright green" />
  <Swatch color="#dfa000" name="11 Bright yellow" />
  <Swatch color="#3a94c5" name="12 Bright blue" />
  <Swatch color="#df69ba" name="13 Bright magenta" />
  <Swatch color="#35a77c" name="14 Bright cyan" />
  <Swatch color="#fffbef" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Everforest Light Hard. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Everforest Light Hard, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/everforest-light-hard.conf` is a byte-for-byte copy of the
`Everforest Light Hard` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.2** — Published under Isac Petinate.

**1.0.1** — Credits Isac Petinate, who packaged it, rather than the app.
