---
title: 12-bit Rainbow
tagline: The 12-bit Rainbow terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, 12, bit, rainbow]
---

12-bit Rainbow is a dark palette: the terminal sits on `#040404` and writes in `#feffff`, a contrast ratio of 20.5:1. All 16 ANSI entries are different colours. A selection is drawn on `#606060`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="12-bit Rainbow" background="#040404" foreground="#feffff" cursor="#e0d000" selection="#606060" ansi="#000000, #a03050, #40d080, #e09040, #3060b0, #603090, #0090c0, #dbded8, #685656, #c06060, #90d050, #e0d000, #00b0c0, #801070, #20b0c0, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#040404" name="Background" />
  <Swatch color="#feffff" name="Foreground" />
  <Swatch color="#e0d000" name="Cursor" />
  <Swatch color="#000000" name="Cursor text" />
  <Swatch color="#606060" name="Selection" />
  <Swatch color="#ffffff" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#a03050" name="1 Red" />
  <Swatch color="#40d080" name="2 Green" />
  <Swatch color="#e09040" name="3 Yellow" />
  <Swatch color="#3060b0" name="4 Blue" />
  <Swatch color="#603090" name="5 Magenta" />
  <Swatch color="#0090c0" name="6 Cyan" />
  <Swatch color="#dbded8" name="7 White" />
  <Swatch color="#685656" name="8 Bright black" />
  <Swatch color="#c06060" name="9 Bright red" />
  <Swatch color="#90d050" name="10 Bright green" />
  <Swatch color="#e0d000" name="11 Bright yellow" />
  <Swatch color="#00b0c0" name="12 Bright blue" />
  <Swatch color="#801070" name="13 Bright magenta" />
  <Swatch color="#20b0c0" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to 12-bit Rainbow. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | 12-bit Rainbow, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/12-bit-rainbow.conf` is a byte-for-byte copy of the
`12-bit Rainbow` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
