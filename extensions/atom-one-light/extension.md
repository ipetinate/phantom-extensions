---
title: Atom One Light
tagline: The Atom One Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, atom, one]
---

Atom One Light is a light palette: the terminal sits on `#f9f9f9` and writes in `#2a2c33`, a contrast ratio of 13.2:1. 9 of the 16 ANSI entries are distinct, because 6 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#ededed`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Atom One Light" background="#f9f9f9" foreground="#2a2c33" cursor="#bbbbbb" selection="#ededed" ansi="#000000, #de3e35, #3f953a, #d2b67c, #2f5af3, #950095, #3f953a, #bbbbbb, #000000, #de3e35, #3f953a, #d2b67c, #2f5af3, #a00095, #3f953a, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#f9f9f9" name="Background" />
  <Swatch color="#2a2c33" name="Foreground" />
  <Swatch color="#bbbbbb" name="Cursor" />
  <Swatch color="#ffffff" name="Cursor text" />
  <Swatch color="#ededed" name="Selection" />
  <Swatch color="#2a2c33" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#de3e35" name="1 Red" />
  <Swatch color="#3f953a" name="2 Green" />
  <Swatch color="#d2b67c" name="3 Yellow" />
  <Swatch color="#2f5af3" name="4 Blue" />
  <Swatch color="#950095" name="5 Magenta" />
  <Swatch color="#3f953a" name="6 Cyan" />
  <Swatch color="#bbbbbb" name="7 White" />
  <Swatch color="#000000" name="8 Bright black" />
  <Swatch color="#de3e35" name="9 Bright red" />
  <Swatch color="#3f953a" name="10 Bright green" />
  <Swatch color="#d2b67c" name="11 Bright yellow" />
  <Swatch color="#2f5af3" name="12 Bright blue" />
  <Swatch color="#a00095" name="13 Bright magenta" />
  <Swatch color="#3f953a" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Atom One Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Atom One Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/atom-one-light.conf` is a byte-for-byte copy of the
`Atom One Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
