---
title: base16-icy
tagline: The base16-icy terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, base16, icy]
---

base16-icy is a dark palette: the terminal sits on `#021012` and writes in `#095b67`, a contrast ratio of 2.5:1. 11 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#041f23`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="base16-icy" background="#021012" foreground="#095b67" cursor="#16c2d9" selection="#041f23" ansi="#021012, #16c2d9, #4dd0e1, #80deea, #00bcd4, #00adc1, #26c6d6, #095b67, #1e484e, #b3ebf2, #4dd0e1, #80deea, #00bcd4, #00adc1, #26c6d6, #0c7c7c" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#021012" name="Background" />
  <Swatch color="#095b67" name="Foreground" />
  <Swatch color="#16c2d9" name="Cursor" />
  <Swatch color="#021012" name="Cursor text" />
  <Swatch color="#041f23" name="Selection" />
  <Swatch color="#425052" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#021012" name="0 Black" />
  <Swatch color="#16c2d9" name="1 Red" />
  <Swatch color="#4dd0e1" name="2 Green" />
  <Swatch color="#80deea" name="3 Yellow" />
  <Swatch color="#00bcd4" name="4 Blue" />
  <Swatch color="#00adc1" name="5 Magenta" />
  <Swatch color="#26c6d6" name="6 Cyan" />
  <Swatch color="#095b67" name="7 White" />
  <Swatch color="#1e484e" name="8 Bright black" />
  <Swatch color="#b3ebf2" name="9 Bright red" />
  <Swatch color="#4dd0e1" name="10 Bright green" />
  <Swatch color="#80deea" name="11 Bright yellow" />
  <Swatch color="#00bcd4" name="12 Bright blue" />
  <Swatch color="#00adc1" name="13 Bright magenta" />
  <Swatch color="#26c6d6" name="14 Bright cyan" />
  <Swatch color="#0c7c7c" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to base16-icy. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | base16-icy, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/base16-icy.conf` is a byte-for-byte copy of the
`base16-icy` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
