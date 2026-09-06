---
title: Ayu
tagline: The Ayu terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, ayu]
---

Ayu is a dark palette: the terminal sits on `#0b0e14` and writes in `#bfbdb6`, a contrast ratio of 10.3:1. All 16 ANSI entries are different colours. A selection is drawn on `#409fff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Ayu" background="#0b0e14" foreground="#bfbdb6" cursor="#e6b450" selection="#409fff" ansi="#11151c, #ea6c73, #7fd962, #f9af4f, #53bdfa, #cda1fa, #90e1c6, #c7c7c7, #686868, #f07178, #aad94c, #ffb454, #59c2ff, #d2a6ff, #95e6cb, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#0b0e14" name="Background" />
  <Swatch color="#bfbdb6" name="Foreground" />
  <Swatch color="#e6b450" name="Cursor" />
  <Swatch color="#0b0e14" name="Cursor text" />
  <Swatch color="#409fff" name="Selection" />
  <Swatch color="#0b0e14" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#11151c" name="0 Black" />
  <Swatch color="#ea6c73" name="1 Red" />
  <Swatch color="#7fd962" name="2 Green" />
  <Swatch color="#f9af4f" name="3 Yellow" />
  <Swatch color="#53bdfa" name="4 Blue" />
  <Swatch color="#cda1fa" name="5 Magenta" />
  <Swatch color="#90e1c6" name="6 Cyan" />
  <Swatch color="#c7c7c7" name="7 White" />
  <Swatch color="#686868" name="8 Bright black" />
  <Swatch color="#f07178" name="9 Bright red" />
  <Swatch color="#aad94c" name="10 Bright green" />
  <Swatch color="#ffb454" name="11 Bright yellow" />
  <Swatch color="#59c2ff" name="12 Bright blue" />
  <Swatch color="#d2a6ff" name="13 Bright magenta" />
  <Swatch color="#95e6cb" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Ayu. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Ayu, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/ayu.conf` is a byte-for-byte copy of the
`Ayu` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
