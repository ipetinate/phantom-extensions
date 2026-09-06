---
title: Grape
tagline: The Grape terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, grape]
---

Grape is a dark palette: the terminal sits on `#171423` and writes in `#9f9fa1`, a contrast ratio of 6.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#493d70`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Grape" background="#171423" foreground="#9f9fa1" cursor="#a288f7" selection="#493d70" ansi="#2d283f, #ed2261, #1fa91b, #8ddc20, #487df4, #8d35c9, #3bdeed, #9e9ea0, #59516a, #f0729a, #53aa5e, #b2dc87, #a9bcec, #ad81c2, #9de3eb, #a288f7" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#171423" name="Background" />
  <Swatch color="#9f9fa1" name="Foreground" />
  <Swatch color="#a288f7" name="Cursor" />
  <Swatch color="#171422" name="Cursor text" />
  <Swatch color="#493d70" name="Selection" />
  <Swatch color="#171422" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#2d283f" name="0 Black" />
  <Swatch color="#ed2261" name="1 Red" />
  <Swatch color="#1fa91b" name="2 Green" />
  <Swatch color="#8ddc20" name="3 Yellow" />
  <Swatch color="#487df4" name="4 Blue" />
  <Swatch color="#8d35c9" name="5 Magenta" />
  <Swatch color="#3bdeed" name="6 Cyan" />
  <Swatch color="#9e9ea0" name="7 White" />
  <Swatch color="#59516a" name="8 Bright black" />
  <Swatch color="#f0729a" name="9 Bright red" />
  <Swatch color="#53aa5e" name="10 Bright green" />
  <Swatch color="#b2dc87" name="11 Bright yellow" />
  <Swatch color="#a9bcec" name="12 Bright blue" />
  <Swatch color="#ad81c2" name="13 Bright magenta" />
  <Swatch color="#9de3eb" name="14 Bright cyan" />
  <Swatch color="#a288f7" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Grape. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Grape, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/grape.conf` is a byte-for-byte copy of the
`Grape` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
