---
title: Tango Half Adapted
tagline: The Tango Half Adapted terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, tango, half, adapted]
---

Tango Half Adapted is a light palette: the terminal sits on `#ffffff` and writes in `#000000`, a contrast ratio of 21.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#c1deff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Tango Half Adapted" background="#ffffff" foreground="#000000" cursor="#000000" selection="#c1deff" ansi="#000000, #ff0000, #4cc300, #e2c000, #008ef6, #a96cb3, #00bdc3, #babfb5, #797d76, #ff0013, #70dc00, #d9c600, #76bfff, #d898d1, #00d0d4, #f4f4f2" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#ffffff" name="Background" />
  <Swatch color="#000000" name="Foreground" />
  <Swatch color="#000000" name="Cursor" />
  <Swatch color="#ffffff" name="Cursor text" />
  <Swatch color="#c1deff" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#ff0000" name="1 Red" />
  <Swatch color="#4cc300" name="2 Green" />
  <Swatch color="#e2c000" name="3 Yellow" />
  <Swatch color="#008ef6" name="4 Blue" />
  <Swatch color="#a96cb3" name="5 Magenta" />
  <Swatch color="#00bdc3" name="6 Cyan" />
  <Swatch color="#babfb5" name="7 White" />
  <Swatch color="#797d76" name="8 Bright black" />
  <Swatch color="#ff0013" name="9 Bright red" />
  <Swatch color="#70dc00" name="10 Bright green" />
  <Swatch color="#d9c600" name="11 Bright yellow" />
  <Swatch color="#76bfff" name="12 Bright blue" />
  <Swatch color="#d898d1" name="13 Bright magenta" />
  <Swatch color="#00d0d4" name="14 Bright cyan" />
  <Swatch color="#f4f4f2" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Tango Half Adapted. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Tango Half Adapted, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/tango-half-adapted.conf` is a byte-for-byte copy of the
`Tango Half Adapted` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
