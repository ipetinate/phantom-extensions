---
title: Snazzy
tagline: The Snazzy terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, snazzy]
---

Snazzy is a dark palette: the terminal sits on `#1e1f29` and writes in `#ebece6`, a contrast ratio of 13.8:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#81aec6`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Snazzy" background="#1e1f29" foreground="#ebece6" cursor="#e4e4e4" selection="#81aec6" ansi="#000000, #fc4346, #50fb7c, #f0fb8c, #49baff, #fc4cb4, #8be9fe, #ededec, #555555, #fc4346, #50fb7c, #f0fb8c, #49baff, #fc4cb4, #8be9fe, #ededec" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#1e1f29" name="Background" />
  <Swatch color="#ebece6" name="Foreground" />
  <Swatch color="#e4e4e4" name="Cursor" />
  <Swatch color="#a9a9a9" name="Cursor text" />
  <Swatch color="#81aec6" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#fc4346" name="1 Red" />
  <Swatch color="#50fb7c" name="2 Green" />
  <Swatch color="#f0fb8c" name="3 Yellow" />
  <Swatch color="#49baff" name="4 Blue" />
  <Swatch color="#fc4cb4" name="5 Magenta" />
  <Swatch color="#8be9fe" name="6 Cyan" />
  <Swatch color="#ededec" name="7 White" />
  <Swatch color="#555555" name="8 Bright black" />
  <Swatch color="#fc4346" name="9 Bright red" />
  <Swatch color="#50fb7c" name="10 Bright green" />
  <Swatch color="#f0fb8c" name="11 Bright yellow" />
  <Swatch color="#49baff" name="12 Bright blue" />
  <Swatch color="#fc4cb4" name="13 Bright magenta" />
  <Swatch color="#8be9fe" name="14 Bright cyan" />
  <Swatch color="#ededec" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Snazzy. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Snazzy, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/snazzy.conf` is a byte-for-byte copy of the
`Snazzy` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
