---
title: Purple Rain
tagline: The Purple Rain terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, purple, rain]
---

Purple Rain is a dark palette: the terminal sits on `#21084a` and writes in `#fffbf6`, a contrast ratio of 17.0:1. 15 of the 16 ANSI entries are distinct, because 1 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#287691`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Purple Rain" background="#21084a" foreground="#fffbf6" cursor="#ff271d" selection="#287691" ansi="#000000, #ff260e, #9be205, #ffc400, #00a2fa, #815bb5, #00deef, #ffffff, #565656, #ff4250, #b8e36e, #ffd852, #00a6ff, #ac7bf0, #74fdf3, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#21084a" name="Background" />
  <Swatch color="#fffbf6" name="Foreground" />
  <Swatch color="#ff271d" name="Cursor" />
  <Swatch color="#ff9a90" name="Cursor text" />
  <Swatch color="#287691" name="Selection" />
  <Swatch color="#ffffff" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#ff260e" name="1 Red" />
  <Swatch color="#9be205" name="2 Green" />
  <Swatch color="#ffc400" name="3 Yellow" />
  <Swatch color="#00a2fa" name="4 Blue" />
  <Swatch color="#815bb5" name="5 Magenta" />
  <Swatch color="#00deef" name="6 Cyan" />
  <Swatch color="#ffffff" name="7 White" />
  <Swatch color="#565656" name="8 Bright black" />
  <Swatch color="#ff4250" name="9 Bright red" />
  <Swatch color="#b8e36e" name="10 Bright green" />
  <Swatch color="#ffd852" name="11 Bright yellow" />
  <Swatch color="#00a6ff" name="12 Bright blue" />
  <Swatch color="#ac7bf0" name="13 Bright magenta" />
  <Swatch color="#74fdf3" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Purple Rain. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Purple Rain, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/purple-rain.conf` is a byte-for-byte copy of the
`Purple Rain` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
