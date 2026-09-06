---
title: Synthwave Everything
tagline: The Synthwave Everything terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, synthwave, everything]
---

Synthwave Everything is a dark palette: the terminal sits on `#2a2139` and writes in `#f0eff1`, a contrast ratio of 13.3:1. 12 of the 16 ANSI entries are distinct, because 3 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#181521`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Synthwave Everything" background="#2a2139" foreground="#f0eff1" cursor="#72f1b8" selection="#181521" ansi="#fefefe, #f97e72, #72f1b8, #fede5d, #6d77b3, #c792ea, #f772e0, #fefefe, #fefefe, #f88414, #72f1b8, #fff951, #36f9f6, #e1acff, #f92aad, #fefefe" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#2a2139" name="Background" />
  <Swatch color="#f0eff1" name="Foreground" />
  <Swatch color="#72f1b8" name="Cursor" />
  <Swatch color="#1a1a1a" name="Cursor text" />
  <Swatch color="#181521" name="Selection" />
  <Swatch color="#f0eff1" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#fefefe" name="0 Black" />
  <Swatch color="#f97e72" name="1 Red" />
  <Swatch color="#72f1b8" name="2 Green" />
  <Swatch color="#fede5d" name="3 Yellow" />
  <Swatch color="#6d77b3" name="4 Blue" />
  <Swatch color="#c792ea" name="5 Magenta" />
  <Swatch color="#f772e0" name="6 Cyan" />
  <Swatch color="#fefefe" name="7 White" />
  <Swatch color="#fefefe" name="8 Bright black" />
  <Swatch color="#f88414" name="9 Bright red" />
  <Swatch color="#72f1b8" name="10 Bright green" />
  <Swatch color="#fff951" name="11 Bright yellow" />
  <Swatch color="#36f9f6" name="12 Bright blue" />
  <Swatch color="#e1acff" name="13 Bright magenta" />
  <Swatch color="#f92aad" name="14 Bright cyan" />
  <Swatch color="#fefefe" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Synthwave Everything. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Synthwave Everything, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/synthwave-everything.conf` is a byte-for-byte copy of the
`Synthwave Everything` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
