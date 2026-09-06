---
title: Detuned
tagline: The Detuned terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, detuned]
---

Detuned is a dark palette: the terminal sits on `#000000` and writes in `#c7c7c7`, a contrast ratio of 12.4:1. All 16 ANSI entries are different colours. A selection is drawn on `#c1deff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Detuned" background="#000000" foreground="#c7c7c7" cursor="#c7c7c7" selection="#c1deff" ansi="#171717, #fe4386, #a6e32d, #e6da73, #0094d9, #9b37ff, #50b7d9, #c7c7c7, #686868, #fa80ac, #bde371, #fff27f, #00beff, #be9eff, #5ed7ff, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#000000" name="Background" />
  <Swatch color="#c7c7c7" name="Foreground" />
  <Swatch color="#c7c7c7" name="Cursor" />
  <Swatch color="#8c8c8c" name="Cursor text" />
  <Swatch color="#c1deff" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#171717" name="0 Black" />
  <Swatch color="#fe4386" name="1 Red" />
  <Swatch color="#a6e32d" name="2 Green" />
  <Swatch color="#e6da73" name="3 Yellow" />
  <Swatch color="#0094d9" name="4 Blue" />
  <Swatch color="#9b37ff" name="5 Magenta" />
  <Swatch color="#50b7d9" name="6 Cyan" />
  <Swatch color="#c7c7c7" name="7 White" />
  <Swatch color="#686868" name="8 Bright black" />
  <Swatch color="#fa80ac" name="9 Bright red" />
  <Swatch color="#bde371" name="10 Bright green" />
  <Swatch color="#fff27f" name="11 Bright yellow" />
  <Swatch color="#00beff" name="12 Bright blue" />
  <Swatch color="#be9eff" name="13 Bright magenta" />
  <Swatch color="#5ed7ff" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Detuned. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Detuned, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/detuned.conf` is a byte-for-byte copy of the
`Detuned` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
