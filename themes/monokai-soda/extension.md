---
title: Monokai Soda
tagline: The Monokai Soda terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, monokai, soda]
---

Monokai Soda is a dark palette: the terminal sits on `#1a1a1a` and writes in `#c4c5b5`, a contrast ratio of 9.9:1. 10 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#343434`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Monokai Soda" background="#1a1a1a" foreground="#c4c5b5" cursor="#f6f7ec" selection="#343434" ansi="#1a1a1a, #f4005f, #98e024, #fa8419, #9d65ff, #f4005f, #58d1eb, #c4c5b5, #625e4c, #f4005f, #98e024, #e0d561, #9d65ff, #f4005f, #58d1eb, #f6f6ef" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#1a1a1a" name="Background" />
  <Swatch color="#c4c5b5" name="Foreground" />
  <Swatch color="#f6f7ec" name="Cursor" />
  <Swatch color="#b7b8a8" name="Cursor text" />
  <Swatch color="#343434" name="Selection" />
  <Swatch color="#c4c5b5" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#1a1a1a" name="0 Black" />
  <Swatch color="#f4005f" name="1 Red" />
  <Swatch color="#98e024" name="2 Green" />
  <Swatch color="#fa8419" name="3 Yellow" />
  <Swatch color="#9d65ff" name="4 Blue" />
  <Swatch color="#f4005f" name="5 Magenta" />
  <Swatch color="#58d1eb" name="6 Cyan" />
  <Swatch color="#c4c5b5" name="7 White" />
  <Swatch color="#625e4c" name="8 Bright black" />
  <Swatch color="#f4005f" name="9 Bright red" />
  <Swatch color="#98e024" name="10 Bright green" />
  <Swatch color="#e0d561" name="11 Bright yellow" />
  <Swatch color="#9d65ff" name="12 Bright blue" />
  <Swatch color="#f4005f" name="13 Bright magenta" />
  <Swatch color="#58d1eb" name="14 Bright cyan" />
  <Swatch color="#f6f6ef" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Monokai Soda. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Monokai Soda, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/monokai-soda.conf` is a byte-for-byte copy of the
`Monokai Soda` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
