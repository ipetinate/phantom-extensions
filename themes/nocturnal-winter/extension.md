---
title: Nocturnal Winter
tagline: The Nocturnal Winter terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, nocturnal, winter]
---

Nocturnal Winter is a dark palette: the terminal sits on `#0d0d17` and writes in `#e6e5e5`, a contrast ratio of 15.4:1. 15 of the 16 ANSI entries are distinct colours. A selection is drawn on `#adbdd0`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Nocturnal Winter" background="#0d0d17" foreground="#e6e5e5" cursor="#e6e5e5" selection="#adbdd0" ansi="#4d4d4d, #f12d52, #09cd7e, #f5f17a, #3182e0, #ff2b6d, #09c87a, #fcfcfc, #808080, #f16d86, #0ae78d, #fffc67, #6096ff, #ff78a2, #0ae78d, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#0d0d17" name="Background" />
  <Swatch color="#e6e5e5" name="Foreground" />
  <Swatch color="#e6e5e5" name="Cursor" />
  <Swatch color="#a6a6a6" name="Cursor text" />
  <Swatch color="#adbdd0" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#4d4d4d" name="0 Black" />
  <Swatch color="#f12d52" name="1 Red" />
  <Swatch color="#09cd7e" name="2 Green" />
  <Swatch color="#f5f17a" name="3 Yellow" />
  <Swatch color="#3182e0" name="4 Blue" />
  <Swatch color="#ff2b6d" name="5 Magenta" />
  <Swatch color="#09c87a" name="6 Cyan" />
  <Swatch color="#fcfcfc" name="7 White" />
  <Swatch color="#808080" name="8 Bright black" />
  <Swatch color="#f16d86" name="9 Bright red" />
  <Swatch color="#0ae78d" name="10 Bright green" />
  <Swatch color="#fffc67" name="11 Bright yellow" />
  <Swatch color="#6096ff" name="12 Bright blue" />
  <Swatch color="#ff78a2" name="13 Bright magenta" />
  <Swatch color="#0ae78d" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Nocturnal Winter. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Nocturnal Winter, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/nocturnal-winter.conf` is a byte-for-byte copy of the
`Nocturnal Winter` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
