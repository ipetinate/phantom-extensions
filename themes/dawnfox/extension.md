---
title: Dawnfox
tagline: The Dawnfox terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, dawnfox]
---

Dawnfox is a light palette: the terminal sits on `#faf4ed` and writes in `#575279`, a contrast ratio of 6.7:1. All 16 ANSI entries are different colours. A selection is drawn on `#d0d8d8`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Dawnfox" background="#faf4ed" foreground="#575279" cursor="#575279" selection="#d0d8d8" ansi="#575279, #b4637a, #618774, #ea9d34, #286983, #907aa9, #56949f, #b2b6bd, #5f5695, #c26d85, #629f81, #eea846, #2d81a3, #9a80b9, #5ca7b4, #e6ebf3" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#faf4ed" name="Background" />
  <Swatch color="#575279" name="Foreground" />
  <Swatch color="#575279" name="Cursor" />
  <Swatch color="#faf4ed" name="Cursor text" />
  <Swatch color="#d0d8d8" name="Selection" />
  <Swatch color="#575279" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#575279" name="0 Black" />
  <Swatch color="#b4637a" name="1 Red" />
  <Swatch color="#618774" name="2 Green" />
  <Swatch color="#ea9d34" name="3 Yellow" />
  <Swatch color="#286983" name="4 Blue" />
  <Swatch color="#907aa9" name="5 Magenta" />
  <Swatch color="#56949f" name="6 Cyan" />
  <Swatch color="#b2b6bd" name="7 White" />
  <Swatch color="#5f5695" name="8 Bright black" />
  <Swatch color="#c26d85" name="9 Bright red" />
  <Swatch color="#629f81" name="10 Bright green" />
  <Swatch color="#eea846" name="11 Bright yellow" />
  <Swatch color="#2d81a3" name="12 Bright blue" />
  <Swatch color="#9a80b9" name="13 Bright magenta" />
  <Swatch color="#5ca7b4" name="14 Bright cyan" />
  <Swatch color="#e6ebf3" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Dawnfox. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Dawnfox, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/dawnfox.conf` is a byte-for-byte copy of the
`Dawnfox` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
