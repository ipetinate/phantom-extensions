---
title: Blue Berry Pie
tagline: The Blue Berry Pie terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, blue, berry, pie]
---

Blue Berry Pie is a dark palette: the terminal sits on `#1c0c28` and writes in `#babab9`, a contrast ratio of 9.5:1. 15 of the 16 ANSI entries are distinct colours. A selection is drawn on `#606060`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Blue Berry Pie" background="#1c0c28" foreground="#babab9" cursor="#fcfad6" selection="#606060" ansi="#0a4c62, #99246e, #5cb1b3, #eab9a8, #90a5bd, #9d54a7, #7e83cc, #f0e8d6, #463c5d, #c87272, #0a6c7e, #7a3188, #5f3d63, #bc94b7, #5e6071, #0a6c7e" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#1c0c28" name="Background" />
  <Swatch color="#babab9" name="Foreground" />
  <Swatch color="#fcfad6" name="Cursor" />
  <Swatch color="#000000" name="Cursor text" />
  <Swatch color="#606060" name="Selection" />
  <Swatch color="#ffffff" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#0a4c62" name="0 Black" />
  <Swatch color="#99246e" name="1 Red" />
  <Swatch color="#5cb1b3" name="2 Green" />
  <Swatch color="#eab9a8" name="3 Yellow" />
  <Swatch color="#90a5bd" name="4 Blue" />
  <Swatch color="#9d54a7" name="5 Magenta" />
  <Swatch color="#7e83cc" name="6 Cyan" />
  <Swatch color="#f0e8d6" name="7 White" />
  <Swatch color="#463c5d" name="8 Bright black" />
  <Swatch color="#c87272" name="9 Bright red" />
  <Swatch color="#0a6c7e" name="10 Bright green" />
  <Swatch color="#7a3188" name="11 Bright yellow" />
  <Swatch color="#5f3d63" name="12 Bright blue" />
  <Swatch color="#bc94b7" name="13 Bright magenta" />
  <Swatch color="#5e6071" name="14 Bright cyan" />
  <Swatch color="#0a6c7e" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Blue Berry Pie. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Blue Berry Pie, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/blue-berry-pie.conf` is a byte-for-byte copy of the
`Blue Berry Pie` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
