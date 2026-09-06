---
title: Aardvark Blue
tagline: The Aardvark Blue terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aardvark, blue]
---

Aardvark Blue is a dark palette: the terminal sits on `#102040` and writes in `#dddddd`, a contrast ratio of 11.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#bfdbfe`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Aardvark Blue" background="#102040" foreground="#dddddd" cursor="#007acc" selection="#bfdbfe" ansi="#191919, #aa342e, #4b8c0f, #dbba00, #1370d3, #c43ac3, #008eb0, #bebebe, #525252, #f05b50, #95dc55, #ffe763, #60a4ec, #e26be2, #60b6cb, #f7f7f7" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#102040" name="Background" />
  <Swatch color="#dddddd" name="Foreground" />
  <Swatch color="#007acc" name="Cursor" />
  <Swatch color="#bfdbfe" name="Cursor text" />
  <Swatch color="#bfdbfe" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#191919" name="0 Black" />
  <Swatch color="#aa342e" name="1 Red" />
  <Swatch color="#4b8c0f" name="2 Green" />
  <Swatch color="#dbba00" name="3 Yellow" />
  <Swatch color="#1370d3" name="4 Blue" />
  <Swatch color="#c43ac3" name="5 Magenta" />
  <Swatch color="#008eb0" name="6 Cyan" />
  <Swatch color="#bebebe" name="7 White" />
  <Swatch color="#525252" name="8 Bright black" />
  <Swatch color="#f05b50" name="9 Bright red" />
  <Swatch color="#95dc55" name="10 Bright green" />
  <Swatch color="#ffe763" name="11 Bright yellow" />
  <Swatch color="#60a4ec" name="12 Bright blue" />
  <Swatch color="#e26be2" name="13 Bright magenta" />
  <Swatch color="#60b6cb" name="14 Bright cyan" />
  <Swatch color="#f7f7f7" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aardvark Blue. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aardvark Blue, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aardvark-blue.conf` is a byte-for-byte copy of the
`Aardvark Blue` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
