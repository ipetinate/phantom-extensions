---
title: TokyoNight
tagline: The TokyoNight terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, tokyonight]
---

TokyoNight is a dark palette: the terminal sits on `#1a1b26` and writes in `#c0caf5`, a contrast ratio of 10.6:1. 10 of the 16 ANSI entries are distinct, because 6 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#33467c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="TokyoNight" background="#1a1b26" foreground="#c0caf5" cursor="#c0caf5" selection="#33467c" ansi="#15161e, #f7768e, #9ece6a, #e0af68, #7aa2f7, #bb9af7, #7dcfff, #a9b1d6, #414868, #f7768e, #9ece6a, #e0af68, #7aa2f7, #bb9af7, #7dcfff, #c0caf5" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#1a1b26" name="Background" />
  <Swatch color="#c0caf5" name="Foreground" />
  <Swatch color="#c0caf5" name="Cursor" />
  <Swatch color="#15161e" name="Cursor text" />
  <Swatch color="#33467c" name="Selection" />
  <Swatch color="#c0caf5" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#15161e" name="0 Black" />
  <Swatch color="#f7768e" name="1 Red" />
  <Swatch color="#9ece6a" name="2 Green" />
  <Swatch color="#e0af68" name="3 Yellow" />
  <Swatch color="#7aa2f7" name="4 Blue" />
  <Swatch color="#bb9af7" name="5 Magenta" />
  <Swatch color="#7dcfff" name="6 Cyan" />
  <Swatch color="#a9b1d6" name="7 White" />
  <Swatch color="#414868" name="8 Bright black" />
  <Swatch color="#f7768e" name="9 Bright red" />
  <Swatch color="#9ece6a" name="10 Bright green" />
  <Swatch color="#e0af68" name="11 Bright yellow" />
  <Swatch color="#7aa2f7" name="12 Bright blue" />
  <Swatch color="#bb9af7" name="13 Bright magenta" />
  <Swatch color="#7dcfff" name="14 Bright cyan" />
  <Swatch color="#c0caf5" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to TokyoNight. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | TokyoNight, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/tokyonight.conf` is a byte-for-byte copy of the
`TokyoNight` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
