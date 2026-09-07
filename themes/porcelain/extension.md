---
title: Porcelain
tagline: The Porcelain terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, porcelain]
---

Porcelain is a light palette: the terminal sits on `#fbfbfd` and writes in `#2a2e37`, a contrast ratio of 13.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#dce6f7`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Porcelain" background="#fbfbfd" foreground="#2a2e37" cursor="#0054d1" selection="#dce6f7" ansi="#2a2e37, #c60018, #157424, #855700, #004cc8, #761bc3, #006873, #5a6170, #828896, #d60027, #1b842d, #af2700, #005bdb, #862ad2, #007f8f, #1b1e25" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#fbfbfd" name="Background" />
  <Swatch color="#2a2e37" name="Foreground" />
  <Swatch color="#0054d1" name="Cursor" />
  <Swatch color="#fbfbfd" name="Cursor text" />
  <Swatch color="#dce6f7" name="Selection" />
  <Swatch color="#aeaeb0" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#2a2e37" name="0 Black" />
  <Swatch color="#c60018" name="1 Red" />
  <Swatch color="#157424" name="2 Green" />
  <Swatch color="#855700" name="3 Yellow" />
  <Swatch color="#004cc8" name="4 Blue" />
  <Swatch color="#761bc3" name="5 Magenta" />
  <Swatch color="#006873" name="6 Cyan" />
  <Swatch color="#5a6170" name="7 White" />
  <Swatch color="#828896" name="8 Bright black" />
  <Swatch color="#d60027" name="9 Bright red" />
  <Swatch color="#1b842d" name="10 Bright green" />
  <Swatch color="#af2700" name="11 Bright yellow" />
  <Swatch color="#005bdb" name="12 Bright blue" />
  <Swatch color="#862ad2" name="13 Bright magenta" />
  <Swatch color="#007f8f" name="14 Bright cyan" />
  <Swatch color="#1b1e25" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Porcelain. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Porcelain, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/porcelain.conf` is a byte-for-byte copy of the
`Porcelain` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
