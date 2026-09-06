---
title: Green Phosphor CRT
tagline: The Green Phosphor CRT terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, green, phosphor, crt]
---

Green Phosphor CRT is a dark palette: the terminal sits on `#0b0f0b` and writes in `#33ff33`, a contrast ratio of 14.2:1. 14 of the 16 ANSI entries are distinct colours. A selection is drawn on `#0a3a0a`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Green Phosphor CRT" background="#0b0f0b" foreground="#33ff33" cursor="#33ff33" selection="#0a3a0a" ansi="#002200, #00aa00, #33ff33, #66ff66, #00cc44, #00ff88, #66ffaa, #b6ffb6, #0a5a0a, #19cc19, #66ff66, #99ff99, #33ff77, #66ffaa, #99ffcc, #e6ffe6" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#0b0f0b" name="Background" />
  <Swatch color="#33ff33" name="Foreground" />
  <Swatch color="#33ff33" name="Cursor" />
  <Swatch color="#0b0f0b" name="Cursor text" />
  <Swatch color="#0a3a0a" name="Selection" />
  <Swatch color="#575b57" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#002200" name="0 Black" />
  <Swatch color="#00aa00" name="1 Red" />
  <Swatch color="#33ff33" name="2 Green" />
  <Swatch color="#66ff66" name="3 Yellow" />
  <Swatch color="#00cc44" name="4 Blue" />
  <Swatch color="#00ff88" name="5 Magenta" />
  <Swatch color="#66ffaa" name="6 Cyan" />
  <Swatch color="#b6ffb6" name="7 White" />
  <Swatch color="#0a5a0a" name="8 Bright black" />
  <Swatch color="#19cc19" name="9 Bright red" />
  <Swatch color="#66ff66" name="10 Bright green" />
  <Swatch color="#99ff99" name="11 Bright yellow" />
  <Swatch color="#33ff77" name="12 Bright blue" />
  <Swatch color="#66ffaa" name="13 Bright magenta" />
  <Swatch color="#99ffcc" name="14 Bright cyan" />
  <Swatch color="#e6ffe6" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Green Phosphor CRT. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Green Phosphor CRT, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/green-phosphor-crt.conf` is a byte-for-byte copy of the
`Green Phosphor CRT` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
