---
title: Retro
tagline: The Retro terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, retro]
---

Retro is a dark palette: the terminal sits on `#000000` and writes in `#13a10e`, a contrast ratio of 6.1:1. 2 of the 16 ANSI entries are distinct colours. A selection is drawn on `#ffffff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Retro" background="#000000" foreground="#13a10e" cursor="#13a10e" selection="#ffffff" ansi="#13a10e, #13a10e, #13a10e, #13a10e, #13a10e, #13a10e, #13a10e, #13a10e, #16ba10, #16ba10, #16ba10, #16ba10, #16ba10, #16ba10, #16ba10, #16ba10" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#000000" name="Background" />
  <Swatch color="#13a10e" name="Foreground" />
  <Swatch color="#13a10e" name="Cursor" />
  <Swatch color="#000000" name="Cursor text" />
  <Swatch color="#ffffff" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#13a10e" name="0 Black" />
  <Swatch color="#13a10e" name="1 Red" />
  <Swatch color="#13a10e" name="2 Green" />
  <Swatch color="#13a10e" name="3 Yellow" />
  <Swatch color="#13a10e" name="4 Blue" />
  <Swatch color="#13a10e" name="5 Magenta" />
  <Swatch color="#13a10e" name="6 Cyan" />
  <Swatch color="#13a10e" name="7 White" />
  <Swatch color="#16ba10" name="8 Bright black" />
  <Swatch color="#16ba10" name="9 Bright red" />
  <Swatch color="#16ba10" name="10 Bright green" />
  <Swatch color="#16ba10" name="11 Bright yellow" />
  <Swatch color="#16ba10" name="12 Bright blue" />
  <Swatch color="#16ba10" name="13 Bright magenta" />
  <Swatch color="#16ba10" name="14 Bright cyan" />
  <Swatch color="#16ba10" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Retro. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Retro, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/retro.conf` is a byte-for-byte copy of the
`Retro` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
