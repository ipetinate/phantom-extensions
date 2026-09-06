---
title: Nord
tagline: The Nord terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, nord]
---

Nord is a dark palette: the terminal sits on `#2e3440` and writes in `#d8dee9`, a contrast ratio of 9.2:1. 11 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#eceff4`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Nord" background="#2e3440" foreground="#d8dee9" cursor="#eceff4" selection="#eceff4" ansi="#3b4252, #bf616a, #a3be8c, #ebcb8b, #81a1c1, #b48ead, #88c0d0, #e5e9f0, #596377, #bf616a, #a3be8c, #ebcb8b, #81a1c1, #b48ead, #8fbcbb, #eceff4" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#2e3440" name="Background" />
  <Swatch color="#d8dee9" name="Foreground" />
  <Swatch color="#eceff4" name="Cursor" />
  <Swatch color="#282828" name="Cursor text" />
  <Swatch color="#eceff4" name="Selection" />
  <Swatch color="#4c566a" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#3b4252" name="0 Black" />
  <Swatch color="#bf616a" name="1 Red" />
  <Swatch color="#a3be8c" name="2 Green" />
  <Swatch color="#ebcb8b" name="3 Yellow" />
  <Swatch color="#81a1c1" name="4 Blue" />
  <Swatch color="#b48ead" name="5 Magenta" />
  <Swatch color="#88c0d0" name="6 Cyan" />
  <Swatch color="#e5e9f0" name="7 White" />
  <Swatch color="#596377" name="8 Bright black" />
  <Swatch color="#bf616a" name="9 Bright red" />
  <Swatch color="#a3be8c" name="10 Bright green" />
  <Swatch color="#ebcb8b" name="11 Bright yellow" />
  <Swatch color="#81a1c1" name="12 Bright blue" />
  <Swatch color="#b48ead" name="13 Bright magenta" />
  <Swatch color="#8fbcbb" name="14 Bright cyan" />
  <Swatch color="#eceff4" name="15 Bright white" />
</Swatches>

Bright red, green, yellow, blue and magenta repeat their normal counterparts.
Bright black lifts to `#596377` and bright cyan shifts to `#8fbcbb`, so those two
are the only bright entries that read differently from the first eight.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Nord. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Nord, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.1** — Declares 0.16.0, the Phantom version that loads a contributed theme.

**1.0.0** — Initial release: the Nord palette as a Phantom theme.

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/nord.conf` is a byte-for-byte copy of the
`Nord` file in that collection. This extension packages it and claims no authorship
of the palette.
