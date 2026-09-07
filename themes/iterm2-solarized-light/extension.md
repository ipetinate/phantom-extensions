---
title: iTerm2 Solarized Light
tagline: The iTerm2 Solarized Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, iterm2, solarized]
---

iTerm2 Solarized Light is a light palette: the terminal sits on `#fdf6e3` and writes in `#657b83`, a contrast ratio of 4.1:1. All 16 ANSI entries are different colours. A selection is drawn on `#eee8d5`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="iTerm2 Solarized Light" background="#fdf6e3" foreground="#657b83" cursor="#657b83" selection="#eee8d5" ansi="#073642, #dc322f, #859900, #b58900, #268bd2, #d33682, #2aa198, #bbb5a2, #002b36, #cb4b16, #586e75, #657b83, #839496, #6c71c4, #93a1a1, #fdf6e3" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#fdf6e3" name="Background" />
  <Swatch color="#657b83" name="Foreground" />
  <Swatch color="#657b83" name="Cursor" />
  <Swatch color="#eee8d5" name="Cursor text" />
  <Swatch color="#eee8d5" name="Selection" />
  <Swatch color="#586e75" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#073642" name="0 Black" />
  <Swatch color="#dc322f" name="1 Red" />
  <Swatch color="#859900" name="2 Green" />
  <Swatch color="#b58900" name="3 Yellow" />
  <Swatch color="#268bd2" name="4 Blue" />
  <Swatch color="#d33682" name="5 Magenta" />
  <Swatch color="#2aa198" name="6 Cyan" />
  <Swatch color="#bbb5a2" name="7 White" />
  <Swatch color="#002b36" name="8 Bright black" />
  <Swatch color="#cb4b16" name="9 Bright red" />
  <Swatch color="#586e75" name="10 Bright green" />
  <Swatch color="#657b83" name="11 Bright yellow" />
  <Swatch color="#839496" name="12 Bright blue" />
  <Swatch color="#6c71c4" name="13 Bright magenta" />
  <Swatch color="#93a1a1" name="14 Bright cyan" />
  <Swatch color="#fdf6e3" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to iTerm2 Solarized Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | iTerm2 Solarized Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/iterm2-solarized-light.conf` is a byte-for-byte copy of the
`iTerm2 Solarized Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
