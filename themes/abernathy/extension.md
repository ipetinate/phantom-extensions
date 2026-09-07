---
title: Abernathy
tagline: The Abernathy terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, abernathy]
---

Abernathy is a dark palette: the terminal sits on `#111416` and writes in `#eeeeec`, a contrast ratio of 15.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#eeeeec`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Abernathy" background="#111416" foreground="#eeeeec" cursor="#bbbbbb" selection="#eeeeec" ansi="#000000, #cd0000, #00cd00, #cdcd00, #1093f5, #cd00cd, #00cdcd, #faebd7, #404040, #ff0000, #00ff00, #ffff00, #11b5f6, #ff00ff, #00ffff, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#111416" name="Background" />
  <Swatch color="#eeeeec" name="Foreground" />
  <Swatch color="#bbbbbb" name="Cursor" />
  <Swatch color="#ffffff" name="Cursor text" />
  <Swatch color="#eeeeec" name="Selection" />
  <Swatch color="#333333" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#cd0000" name="1 Red" />
  <Swatch color="#00cd00" name="2 Green" />
  <Swatch color="#cdcd00" name="3 Yellow" />
  <Swatch color="#1093f5" name="4 Blue" />
  <Swatch color="#cd00cd" name="5 Magenta" />
  <Swatch color="#00cdcd" name="6 Cyan" />
  <Swatch color="#faebd7" name="7 White" />
  <Swatch color="#404040" name="8 Bright black" />
  <Swatch color="#ff0000" name="9 Bright red" />
  <Swatch color="#00ff00" name="10 Bright green" />
  <Swatch color="#ffff00" name="11 Bright yellow" />
  <Swatch color="#11b5f6" name="12 Bright blue" />
  <Swatch color="#ff00ff" name="13 Bright magenta" />
  <Swatch color="#00ffff" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Abernathy. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Abernathy, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/abernathy.conf` is a byte-for-byte copy of the
`Abernathy` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
