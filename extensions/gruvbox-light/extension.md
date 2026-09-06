---
title: Gruvbox Light
tagline: The Gruvbox Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, gruvbox]
---

Gruvbox Light is a light palette: the terminal sits on `#fbf1c7` and writes in `#3c3836`, a contrast ratio of 10.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#3c3836`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Gruvbox Light" background="#fbf1c7" foreground="#3c3836" cursor="#3c3836" selection="#3c3836" ansi="#fbf1c7, #cc241d, #98971a, #d79921, #458588, #b16286, #689d6a, #7c6f64, #928374, #9d0006, #79740e, #b57614, #076678, #8f3f71, #427b58, #3c3836" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#fbf1c7" name="Background" />
  <Swatch color="#3c3836" name="Foreground" />
  <Swatch color="#3c3836" name="Cursor" />
  <Swatch color="#fbf1c7" name="Cursor text" />
  <Swatch color="#3c3836" name="Selection" />
  <Swatch color="#fbf1c7" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#fbf1c7" name="0 Black" />
  <Swatch color="#cc241d" name="1 Red" />
  <Swatch color="#98971a" name="2 Green" />
  <Swatch color="#d79921" name="3 Yellow" />
  <Swatch color="#458588" name="4 Blue" />
  <Swatch color="#b16286" name="5 Magenta" />
  <Swatch color="#689d6a" name="6 Cyan" />
  <Swatch color="#7c6f64" name="7 White" />
  <Swatch color="#928374" name="8 Bright black" />
  <Swatch color="#9d0006" name="9 Bright red" />
  <Swatch color="#79740e" name="10 Bright green" />
  <Swatch color="#b57614" name="11 Bright yellow" />
  <Swatch color="#076678" name="12 Bright blue" />
  <Swatch color="#8f3f71" name="13 Bright magenta" />
  <Swatch color="#427b58" name="14 Bright cyan" />
  <Swatch color="#3c3836" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Gruvbox Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Gruvbox Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/gruvbox-light.conf` is a byte-for-byte copy of the
`Gruvbox Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
