---
title: Adwaita
tagline: The Adwaita terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, adwaita]
---

Adwaita is a light palette: the terminal sits on `#ffffff` and writes in `#1d1d20`, a contrast ratio of 16.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#1d1d20`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Adwaita" background="#ffffff" foreground="#1d1d20" cursor="#1d1d20" selection="#1d1d20" ansi="#1d1d20, #c01c28, #26a269, #a2734c, #12488b, #a347ba, #2aa1b3, #c2c2c2, #5d5d5d, #f66151, #33d17a, #e9ad0c, #2a7bde, #c061cb, #33c7de, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#ffffff" name="Background" />
  <Swatch color="#1d1d20" name="Foreground" />
  <Swatch color="#1d1d20" name="Cursor" />
  <Swatch color="#ffffff" name="Cursor text" />
  <Swatch color="#1d1d20" name="Selection" />
  <Swatch color="#ffffff" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#1d1d20" name="0 Black" />
  <Swatch color="#c01c28" name="1 Red" />
  <Swatch color="#26a269" name="2 Green" />
  <Swatch color="#a2734c" name="3 Yellow" />
  <Swatch color="#12488b" name="4 Blue" />
  <Swatch color="#a347ba" name="5 Magenta" />
  <Swatch color="#2aa1b3" name="6 Cyan" />
  <Swatch color="#c2c2c2" name="7 White" />
  <Swatch color="#5d5d5d" name="8 Bright black" />
  <Swatch color="#f66151" name="9 Bright red" />
  <Swatch color="#33d17a" name="10 Bright green" />
  <Swatch color="#e9ad0c" name="11 Bright yellow" />
  <Swatch color="#2a7bde" name="12 Bright blue" />
  <Swatch color="#c061cb" name="13 Bright magenta" />
  <Swatch color="#33c7de" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Adwaita. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Adwaita, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/adwaita.conf` is a byte-for-byte copy of the
`Adwaita` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
