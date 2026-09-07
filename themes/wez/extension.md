---
title: Wez
tagline: The Wez terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, wez]
---

Wez is a dark palette: the terminal sits on `#000000` and writes in `#b3b3b3`, a contrast ratio of 10.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#4d52f8`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Wez" background="#000000" foreground="#b3b3b3" cursor="#53ae71" selection="#4d52f8" ansi="#000000, #cc5555, #55cc55, #cdcd55, #5555cc, #cc55cc, #7acaca, #cccccc, #555555, #ff5555, #55ff55, #ffff55, #5555ff, #ff55ff, #55ffff, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#000000" name="Background" />
  <Swatch color="#b3b3b3" name="Foreground" />
  <Swatch color="#53ae71" name="Cursor" />
  <Swatch color="#000000" name="Cursor text" />
  <Swatch color="#4d52f8" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#cc5555" name="1 Red" />
  <Swatch color="#55cc55" name="2 Green" />
  <Swatch color="#cdcd55" name="3 Yellow" />
  <Swatch color="#5555cc" name="4 Blue" />
  <Swatch color="#cc55cc" name="5 Magenta" />
  <Swatch color="#7acaca" name="6 Cyan" />
  <Swatch color="#cccccc" name="7 White" />
  <Swatch color="#555555" name="8 Bright black" />
  <Swatch color="#ff5555" name="9 Bright red" />
  <Swatch color="#55ff55" name="10 Bright green" />
  <Swatch color="#ffff55" name="11 Bright yellow" />
  <Swatch color="#5555ff" name="12 Bright blue" />
  <Swatch color="#ff55ff" name="13 Bright magenta" />
  <Swatch color="#55ffff" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Wez. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Wez, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/wez.conf` is a byte-for-byte copy of the
`Wez` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
