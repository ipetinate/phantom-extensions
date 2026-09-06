---
title: Monokai Pro
tagline: The Monokai Pro terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, monokai, pro]
---

Monokai Pro is a dark palette: the terminal sits on `#2d2a2e` and writes in `#fcfcfa`, a contrast ratio of 13.8:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#5b595c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Monokai Pro" background="#2d2a2e" foreground="#fcfcfa" cursor="#c1c0c0" selection="#5b595c" ansi="#2d2a2e, #ff6188, #a9dc76, #ffd866, #fc9867, #ab9df2, #78dce8, #fcfcfa, #727072, #ff6188, #a9dc76, #ffd866, #fc9867, #ab9df2, #78dce8, #fcfcfa" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#2d2a2e" name="Background" />
  <Swatch color="#fcfcfa" name="Foreground" />
  <Swatch color="#c1c0c0" name="Cursor" />
  <Swatch color="#8e8d8d" name="Cursor text" />
  <Swatch color="#5b595c" name="Selection" />
  <Swatch color="#fcfcfa" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#2d2a2e" name="0 Black" />
  <Swatch color="#ff6188" name="1 Red" />
  <Swatch color="#a9dc76" name="2 Green" />
  <Swatch color="#ffd866" name="3 Yellow" />
  <Swatch color="#fc9867" name="4 Blue" />
  <Swatch color="#ab9df2" name="5 Magenta" />
  <Swatch color="#78dce8" name="6 Cyan" />
  <Swatch color="#fcfcfa" name="7 White" />
  <Swatch color="#727072" name="8 Bright black" />
  <Swatch color="#ff6188" name="9 Bright red" />
  <Swatch color="#a9dc76" name="10 Bright green" />
  <Swatch color="#ffd866" name="11 Bright yellow" />
  <Swatch color="#fc9867" name="12 Bright blue" />
  <Swatch color="#ab9df2" name="13 Bright magenta" />
  <Swatch color="#78dce8" name="14 Bright cyan" />
  <Swatch color="#fcfcfa" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Monokai Pro. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Monokai Pro, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/monokai-pro.conf` is a byte-for-byte copy of the
`Monokai Pro` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
