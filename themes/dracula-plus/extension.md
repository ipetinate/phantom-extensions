---
title: Dracula+
tagline: The Dracula+ terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, dracula]
---

Dracula+ is a dark palette: the terminal sits on `#212121` and writes in `#f8f8f2`, a contrast ratio of 15.1:1. 14 of the 16 ANSI entries are distinct, because 2 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#f8f8f2`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Dracula+" background="#212121" foreground="#f8f8f2" cursor="#eceff4" selection="#f8f8f2" ansi="#21222c, #ff5555, #50fa7b, #ffcb6b, #82aaff, #c792ea, #8be9fd, #f8f8f2, #545454, #ff6e6e, #69ff94, #ffcb6b, #d6acff, #ff92df, #a4ffff, #f8f8f2" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#212121" name="Background" />
  <Swatch color="#f8f8f2" name="Foreground" />
  <Swatch color="#eceff4" name="Cursor" />
  <Swatch color="#282828" name="Cursor text" />
  <Swatch color="#f8f8f2" name="Selection" />
  <Swatch color="#545454" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#21222c" name="0 Black" />
  <Swatch color="#ff5555" name="1 Red" />
  <Swatch color="#50fa7b" name="2 Green" />
  <Swatch color="#ffcb6b" name="3 Yellow" />
  <Swatch color="#82aaff" name="4 Blue" />
  <Swatch color="#c792ea" name="5 Magenta" />
  <Swatch color="#8be9fd" name="6 Cyan" />
  <Swatch color="#f8f8f2" name="7 White" />
  <Swatch color="#545454" name="8 Bright black" />
  <Swatch color="#ff6e6e" name="9 Bright red" />
  <Swatch color="#69ff94" name="10 Bright green" />
  <Swatch color="#ffcb6b" name="11 Bright yellow" />
  <Swatch color="#d6acff" name="12 Bright blue" />
  <Swatch color="#ff92df" name="13 Bright magenta" />
  <Swatch color="#a4ffff" name="14 Bright cyan" />
  <Swatch color="#f8f8f2" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Dracula+. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Dracula+, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/dracula-plus.conf` is a byte-for-byte copy of the
`Dracula+` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
