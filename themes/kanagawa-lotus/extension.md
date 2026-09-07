---
title: Kanagawa Lotus
tagline: The Kanagawa Lotus terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, kanagawa, lotus]
---

Kanagawa Lotus is a light palette: the terminal sits on `#f2ecbc` and writes in `#545464`, a contrast ratio of 6.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#545464`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Kanagawa Lotus" background="#f2ecbc" foreground="#545464" cursor="#43436c" selection="#545464" ansi="#1f1f28, #c84053, #6f894e, #77713f, #4d699b, #b35b79, #597b75, #545464, #8a8980, #d7474b, #6e915f, #836f4a, #6693bf, #624c83, #5e857a, #43436c" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#f2ecbc" name="Background" />
  <Swatch color="#545464" name="Foreground" />
  <Swatch color="#43436c" name="Cursor" />
  <Swatch color="#f2ecbc" name="Cursor text" />
  <Swatch color="#545464" name="Selection" />
  <Swatch color="#f2ecbc" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#1f1f28" name="0 Black" />
  <Swatch color="#c84053" name="1 Red" />
  <Swatch color="#6f894e" name="2 Green" />
  <Swatch color="#77713f" name="3 Yellow" />
  <Swatch color="#4d699b" name="4 Blue" />
  <Swatch color="#b35b79" name="5 Magenta" />
  <Swatch color="#597b75" name="6 Cyan" />
  <Swatch color="#545464" name="7 White" />
  <Swatch color="#8a8980" name="8 Bright black" />
  <Swatch color="#d7474b" name="9 Bright red" />
  <Swatch color="#6e915f" name="10 Bright green" />
  <Swatch color="#836f4a" name="11 Bright yellow" />
  <Swatch color="#6693bf" name="12 Bright blue" />
  <Swatch color="#624c83" name="13 Bright magenta" />
  <Swatch color="#5e857a" name="14 Bright cyan" />
  <Swatch color="#43436c" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Kanagawa Lotus. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Kanagawa Lotus, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/kanagawa-lotus.conf` is a byte-for-byte copy of the
`Kanagawa Lotus` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
