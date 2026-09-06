---
title: Duskfox
tagline: The Duskfox terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, duskfox]
---

Duskfox is a dark palette: the terminal sits on `#232136` and writes in `#e0def4`, a contrast ratio of 11.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#433c59`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Duskfox" background="#232136" foreground="#e0def4" cursor="#e0def4" selection="#433c59" ansi="#393552, #eb6f92, #a3be8c, #f6c177, #569fba, #c4a7e7, #9ccfd8, #e0def4, #544d8a, #f083a2, #b1d196, #f9cb8c, #65b1cd, #ccb1ed, #a6dae3, #e2e0f7" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#232136" name="Background" />
  <Swatch color="#e0def4" name="Foreground" />
  <Swatch color="#e0def4" name="Cursor" />
  <Swatch color="#232136" name="Cursor text" />
  <Swatch color="#433c59" name="Selection" />
  <Swatch color="#e0def4" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#393552" name="0 Black" />
  <Swatch color="#eb6f92" name="1 Red" />
  <Swatch color="#a3be8c" name="2 Green" />
  <Swatch color="#f6c177" name="3 Yellow" />
  <Swatch color="#569fba" name="4 Blue" />
  <Swatch color="#c4a7e7" name="5 Magenta" />
  <Swatch color="#9ccfd8" name="6 Cyan" />
  <Swatch color="#e0def4" name="7 White" />
  <Swatch color="#544d8a" name="8 Bright black" />
  <Swatch color="#f083a2" name="9 Bright red" />
  <Swatch color="#b1d196" name="10 Bright green" />
  <Swatch color="#f9cb8c" name="11 Bright yellow" />
  <Swatch color="#65b1cd" name="12 Bright blue" />
  <Swatch color="#ccb1ed" name="13 Bright magenta" />
  <Swatch color="#a6dae3" name="14 Bright cyan" />
  <Swatch color="#e2e0f7" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Duskfox. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Duskfox, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/duskfox.conf` is a byte-for-byte copy of the
`Duskfox` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
