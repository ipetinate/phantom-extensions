---
title: Rose Pine
tagline: The Rose Pine terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, rose, pine]
---

Rose Pine is a dark palette: the terminal sits on `#191724` and writes in `#e0def4`, a contrast ratio of 13.4:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#403d52`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Rose Pine" background="#191724" foreground="#e0def4" cursor="#e0def4" selection="#403d52" ansi="#26233a, #eb6f92, #31748f, #f6c177, #9ccfd8, #c4a7e7, #ebbcba, #e0def4, #6e6a86, #eb6f92, #31748f, #f6c177, #9ccfd8, #c4a7e7, #ebbcba, #e0def4" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#191724" name="Background" />
  <Swatch color="#e0def4" name="Foreground" />
  <Swatch color="#e0def4" name="Cursor" />
  <Swatch color="#191724" name="Cursor text" />
  <Swatch color="#403d52" name="Selection" />
  <Swatch color="#e0def4" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#26233a" name="0 Black" />
  <Swatch color="#eb6f92" name="1 Red" />
  <Swatch color="#31748f" name="2 Green" />
  <Swatch color="#f6c177" name="3 Yellow" />
  <Swatch color="#9ccfd8" name="4 Blue" />
  <Swatch color="#c4a7e7" name="5 Magenta" />
  <Swatch color="#ebbcba" name="6 Cyan" />
  <Swatch color="#e0def4" name="7 White" />
  <Swatch color="#6e6a86" name="8 Bright black" />
  <Swatch color="#eb6f92" name="9 Bright red" />
  <Swatch color="#31748f" name="10 Bright green" />
  <Swatch color="#f6c177" name="11 Bright yellow" />
  <Swatch color="#9ccfd8" name="12 Bright blue" />
  <Swatch color="#c4a7e7" name="13 Bright magenta" />
  <Swatch color="#ebbcba" name="14 Bright cyan" />
  <Swatch color="#e0def4" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Rose Pine. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Rose Pine, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/rose-pine.conf` is a byte-for-byte copy of the
`Rose Pine` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
