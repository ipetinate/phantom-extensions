---
title: TokyoNight Day
tagline: The TokyoNight Day terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, tokyonight, day]
---

TokyoNight Day is a light palette: the terminal sits on `#e1e2e7` and writes in `#3760bf`, a contrast ratio of 4.5:1. 10 of the 16 ANSI entries are distinct, because 6 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#99a7df`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="TokyoNight Day" background="#e1e2e7" foreground="#3760bf" cursor="#3760bf" selection="#99a7df" ansi="#e9e9ed, #f52a65, #587539, #8c6c3e, #2e7de9, #9854f1, #007197, #6172b0, #a1a6c5, #f52a65, #587539, #8c6c3e, #2e7de9, #9854f1, #007197, #3760bf" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#e1e2e7" name="Background" />
  <Swatch color="#3760bf" name="Foreground" />
  <Swatch color="#3760bf" name="Cursor" />
  <Swatch color="#e1e2e7" name="Cursor text" />
  <Swatch color="#99a7df" name="Selection" />
  <Swatch color="#3760bf" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#e9e9ed" name="0 Black" />
  <Swatch color="#f52a65" name="1 Red" />
  <Swatch color="#587539" name="2 Green" />
  <Swatch color="#8c6c3e" name="3 Yellow" />
  <Swatch color="#2e7de9" name="4 Blue" />
  <Swatch color="#9854f1" name="5 Magenta" />
  <Swatch color="#007197" name="6 Cyan" />
  <Swatch color="#6172b0" name="7 White" />
  <Swatch color="#a1a6c5" name="8 Bright black" />
  <Swatch color="#f52a65" name="9 Bright red" />
  <Swatch color="#587539" name="10 Bright green" />
  <Swatch color="#8c6c3e" name="11 Bright yellow" />
  <Swatch color="#2e7de9" name="12 Bright blue" />
  <Swatch color="#9854f1" name="13 Bright magenta" />
  <Swatch color="#007197" name="14 Bright cyan" />
  <Swatch color="#3760bf" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to TokyoNight Day. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | TokyoNight Day, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/tokyonight-day.conf` is a byte-for-byte copy of the
`TokyoNight Day` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
