---
title: Material Ocean
tagline: The Material Ocean terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, material, ocean]
---

Material Ocean is a dark palette: the terminal sits on `#0f111a` and writes in `#8f93a2`, a contrast ratio of 6.2:1. 8 of the 16 ANSI entries are distinct, because 8 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#1f2233`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Material Ocean" background="#0f111a" foreground="#8f93a2" cursor="#ffcc00" selection="#1f2233" ansi="#546e7a, #ff5370, #c3e88d, #ffcb6b, #82aaff, #c792ea, #89ddff, #ffffff, #546e7a, #ff5370, #c3e88d, #ffcb6b, #82aaff, #c792ea, #89ddff, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#0f111a" name="Background" />
  <Swatch color="#8f93a2" name="Foreground" />
  <Swatch color="#ffcc00" name="Cursor" />
  <Swatch color="#0f111a" name="Cursor text" />
  <Swatch color="#1f2233" name="Selection" />
  <Swatch color="#8f93a2" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#546e7a" name="0 Black" />
  <Swatch color="#ff5370" name="1 Red" />
  <Swatch color="#c3e88d" name="2 Green" />
  <Swatch color="#ffcb6b" name="3 Yellow" />
  <Swatch color="#82aaff" name="4 Blue" />
  <Swatch color="#c792ea" name="5 Magenta" />
  <Swatch color="#89ddff" name="6 Cyan" />
  <Swatch color="#ffffff" name="7 White" />
  <Swatch color="#546e7a" name="8 Bright black" />
  <Swatch color="#ff5370" name="9 Bright red" />
  <Swatch color="#c3e88d" name="10 Bright green" />
  <Swatch color="#ffcb6b" name="11 Bright yellow" />
  <Swatch color="#82aaff" name="12 Bright blue" />
  <Swatch color="#c792ea" name="13 Bright magenta" />
  <Swatch color="#89ddff" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Material Ocean. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Material Ocean, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/material-ocean.conf` is a byte-for-byte copy of the
`Material Ocean` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
