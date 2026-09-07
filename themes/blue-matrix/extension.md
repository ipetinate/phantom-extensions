---
title: Blue Matrix
tagline: The Blue Matrix terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, blue, matrix]
---

Blue Matrix is a dark palette: the terminal sits on `#101116` and writes in `#00a2ff`, a contrast ratio of 6.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#c1deff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Blue Matrix" background="#101116" foreground="#00a2ff" cursor="#76ff9f" selection="#c1deff" ansi="#101116, #ff5680, #00ff9c, #fffc58, #00b0ff, #d57bff, #76c1ff, #c7c7c7, #686868, #ff6e67, #5ffa68, #fffc67, #6871ff, #d682ec, #60fdff, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#101116" name="Background" />
  <Swatch color="#00a2ff" name="Foreground" />
  <Swatch color="#76ff9f" name="Cursor" />
  <Swatch color="#a6a6a6" name="Cursor text" />
  <Swatch color="#c1deff" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#101116" name="0 Black" />
  <Swatch color="#ff5680" name="1 Red" />
  <Swatch color="#00ff9c" name="2 Green" />
  <Swatch color="#fffc58" name="3 Yellow" />
  <Swatch color="#00b0ff" name="4 Blue" />
  <Swatch color="#d57bff" name="5 Magenta" />
  <Swatch color="#76c1ff" name="6 Cyan" />
  <Swatch color="#c7c7c7" name="7 White" />
  <Swatch color="#686868" name="8 Bright black" />
  <Swatch color="#ff6e67" name="9 Bright red" />
  <Swatch color="#5ffa68" name="10 Bright green" />
  <Swatch color="#fffc67" name="11 Bright yellow" />
  <Swatch color="#6871ff" name="12 Bright blue" />
  <Swatch color="#d682ec" name="13 Bright magenta" />
  <Swatch color="#60fdff" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Blue Matrix. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Blue Matrix, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/blue-matrix.conf` is a byte-for-byte copy of the
`Blue Matrix` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
