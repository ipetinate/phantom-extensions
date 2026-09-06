---
title: Andromeda
tagline: The Andromeda terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, andromeda]
---

Andromeda is a dark palette: the terminal sits on `#262a33` and writes in `#e5e5e5`, a contrast ratio of 11.4:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#5a5c62`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Andromeda" background="#262a33" foreground="#e5e5e5" cursor="#f8f8f0" selection="#5a5c62" ansi="#000000, #cd3131, #05bc79, #e5e512, #2472c8, #bc3fbc, #0fa8cd, #e5e5e5, #666666, #cd3131, #05bc79, #e5e512, #2472c8, #bc3fbc, #0fa8cd, #e5e5e5" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#262a33" name="Background" />
  <Swatch color="#e5e5e5" name="Foreground" />
  <Swatch color="#f8f8f0" name="Cursor" />
  <Swatch color="#b5b5a8" name="Cursor text" />
  <Swatch color="#5a5c62" name="Selection" />
  <Swatch color="#ece7e7" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#cd3131" name="1 Red" />
  <Swatch color="#05bc79" name="2 Green" />
  <Swatch color="#e5e512" name="3 Yellow" />
  <Swatch color="#2472c8" name="4 Blue" />
  <Swatch color="#bc3fbc" name="5 Magenta" />
  <Swatch color="#0fa8cd" name="6 Cyan" />
  <Swatch color="#e5e5e5" name="7 White" />
  <Swatch color="#666666" name="8 Bright black" />
  <Swatch color="#cd3131" name="9 Bright red" />
  <Swatch color="#05bc79" name="10 Bright green" />
  <Swatch color="#e5e512" name="11 Bright yellow" />
  <Swatch color="#2472c8" name="12 Bright blue" />
  <Swatch color="#bc3fbc" name="13 Bright magenta" />
  <Swatch color="#0fa8cd" name="14 Bright cyan" />
  <Swatch color="#e5e5e5" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Andromeda. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Andromeda, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/andromeda.conf` is a byte-for-byte copy of the
`Andromeda` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
