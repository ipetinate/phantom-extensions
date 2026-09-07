---
title: Fahrenheit
tagline: The Fahrenheit terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, fahrenheit]
---

Fahrenheit is a dark palette: the terminal sits on `#000000` and writes in `#ffffce`, a contrast ratio of 20.4:1. All 16 ANSI entries are different colours. A selection is drawn on `#4e739f`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Fahrenheit" background="#000000" foreground="#ffffce" cursor="#bbbbbb" selection="#4e739f" ansi="#1d1d1d, #cda074, #9e744d, #fecf75, #7f0e0f, #734c4d, #979797, #ffffce, #404040, #fecea0, #cc734d, #fd9f4d, #cb4a05, #4e739f, #fed04d, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#000000" name="Background" />
  <Swatch color="#ffffce" name="Foreground" />
  <Swatch color="#bbbbbb" name="Cursor" />
  <Swatch color="#ffffff" name="Cursor text" />
  <Swatch color="#4e739f" name="Selection" />
  <Swatch color="#ffffce" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#1d1d1d" name="0 Black" />
  <Swatch color="#cda074" name="1 Red" />
  <Swatch color="#9e744d" name="2 Green" />
  <Swatch color="#fecf75" name="3 Yellow" />
  <Swatch color="#7f0e0f" name="4 Blue" />
  <Swatch color="#734c4d" name="5 Magenta" />
  <Swatch color="#979797" name="6 Cyan" />
  <Swatch color="#ffffce" name="7 White" />
  <Swatch color="#404040" name="8 Bright black" />
  <Swatch color="#fecea0" name="9 Bright red" />
  <Swatch color="#cc734d" name="10 Bright green" />
  <Swatch color="#fd9f4d" name="11 Bright yellow" />
  <Swatch color="#cb4a05" name="12 Bright blue" />
  <Swatch color="#4e739f" name="13 Bright magenta" />
  <Swatch color="#fed04d" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Fahrenheit. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Fahrenheit, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/fahrenheit.conf` is a byte-for-byte copy of the
`Fahrenheit` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
