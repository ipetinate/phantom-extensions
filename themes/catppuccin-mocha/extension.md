---
title: Catppuccin Mocha
tagline: The Catppuccin Mocha terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, catppuccin, mocha]
---

Catppuccin Mocha is a dark palette: the terminal sits on `#1e1e2e` and writes in `#cdd6f4`, a contrast ratio of 11.3:1. All 16 ANSI entries are different colours. A selection is drawn on `#f5e0dc`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Catppuccin Mocha" background="#1e1e2e" foreground="#cdd6f4" cursor="#f5e0dc" selection="#f5e0dc" ansi="#45475a, #f38ba8, #a6e3a1, #f9e2af, #89b4fa, #f5c2e7, #94e2d5, #bac2de, #585b70, #f7aec2, #c2ecbf, #fcd682, #aeccfc, #f398da, #b1eae1, #a6adc8" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#1e1e2e" name="Background" />
  <Swatch color="#cdd6f4" name="Foreground" />
  <Swatch color="#f5e0dc" name="Cursor" />
  <Swatch color="#1e1e2e" name="Cursor text" />
  <Swatch color="#f5e0dc" name="Selection" />
  <Swatch color="#1e1e2e" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#45475a" name="0 Black" />
  <Swatch color="#f38ba8" name="1 Red" />
  <Swatch color="#a6e3a1" name="2 Green" />
  <Swatch color="#f9e2af" name="3 Yellow" />
  <Swatch color="#89b4fa" name="4 Blue" />
  <Swatch color="#f5c2e7" name="5 Magenta" />
  <Swatch color="#94e2d5" name="6 Cyan" />
  <Swatch color="#bac2de" name="7 White" />
  <Swatch color="#585b70" name="8 Bright black" />
  <Swatch color="#f7aec2" name="9 Bright red" />
  <Swatch color="#c2ecbf" name="10 Bright green" />
  <Swatch color="#fcd682" name="11 Bright yellow" />
  <Swatch color="#aeccfc" name="12 Bright blue" />
  <Swatch color="#f398da" name="13 Bright magenta" />
  <Swatch color="#b1eae1" name="14 Bright cyan" />
  <Swatch color="#a6adc8" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Catppuccin Mocha. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Catppuccin Mocha, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/catppuccin-mocha.conf` is a byte-for-byte copy of the
`Catppuccin Mocha` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
