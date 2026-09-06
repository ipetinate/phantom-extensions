---
title: Ayu Light
tagline: The Ayu Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, ayu]
---

Ayu Light is a light palette: the terminal sits on `#f8f9fa` and writes in `#5c6166`, a contrast ratio of 5.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#035bd6`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Ayu Light" background="#f8f9fa" foreground="#5c6166" cursor="#ffaa33" selection="#035bd6" ansi="#000000, #ea6c6d, #6cbf43, #eca944, #3199e1, #9e75c7, #46ba94, #bababa, #686868, #f07171, #86b300, #f2ae49, #399ee6, #a37acc, #4cbf99, #d1d1d1" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#f8f9fa" name="Background" />
  <Swatch color="#5c6166" name="Foreground" />
  <Swatch color="#ffaa33" name="Cursor" />
  <Swatch color="#f8f9fa" name="Cursor text" />
  <Swatch color="#035bd6" name="Selection" />
  <Swatch color="#f8f9fa" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#ea6c6d" name="1 Red" />
  <Swatch color="#6cbf43" name="2 Green" />
  <Swatch color="#eca944" name="3 Yellow" />
  <Swatch color="#3199e1" name="4 Blue" />
  <Swatch color="#9e75c7" name="5 Magenta" />
  <Swatch color="#46ba94" name="6 Cyan" />
  <Swatch color="#bababa" name="7 White" />
  <Swatch color="#686868" name="8 Bright black" />
  <Swatch color="#f07171" name="9 Bright red" />
  <Swatch color="#86b300" name="10 Bright green" />
  <Swatch color="#f2ae49" name="11 Bright yellow" />
  <Swatch color="#399ee6" name="12 Bright blue" />
  <Swatch color="#a37acc" name="13 Bright magenta" />
  <Swatch color="#4cbf99" name="14 Bright cyan" />
  <Swatch color="#d1d1d1" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Ayu Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Ayu Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/ayu-light.conf` is a byte-for-byte copy of the
`Ayu Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
