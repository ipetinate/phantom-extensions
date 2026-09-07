---
title: Terminal Basic
tagline: The Terminal Basic terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, basic]
---

Terminal Basic is a light palette: the terminal sits on `#ffffff` and writes in `#000000`, a contrast ratio of 21.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#a4c9ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Terminal Basic" background="#ffffff" foreground="#000000" cursor="#7f7f7f" selection="#a4c9ff" ansi="#000000, #990000, #00a600, #999900, #0000b2, #b200b2, #00a6b2, #bfbfbf, #666666, #e50000, #00d900, #bfbf00, #0000ff, #e500e5, #00d8d8, #e5e5e5" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#ffffff" name="Background" />
  <Swatch color="#000000" name="Foreground" />
  <Swatch color="#7f7f7f" name="Cursor" />
  <Swatch color="#000000" name="Cursor text" />
  <Swatch color="#a4c9ff" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#990000" name="1 Red" />
  <Swatch color="#00a600" name="2 Green" />
  <Swatch color="#999900" name="3 Yellow" />
  <Swatch color="#0000b2" name="4 Blue" />
  <Swatch color="#b200b2" name="5 Magenta" />
  <Swatch color="#00a6b2" name="6 Cyan" />
  <Swatch color="#bfbfbf" name="7 White" />
  <Swatch color="#666666" name="8 Bright black" />
  <Swatch color="#e50000" name="9 Bright red" />
  <Swatch color="#00d900" name="10 Bright green" />
  <Swatch color="#bfbf00" name="11 Bright yellow" />
  <Swatch color="#0000ff" name="12 Bright blue" />
  <Swatch color="#e500e5" name="13 Bright magenta" />
  <Swatch color="#00d8d8" name="14 Bright cyan" />
  <Swatch color="#e5e5e5" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Terminal Basic. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Terminal Basic, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/terminal-basic.conf` is a byte-for-byte copy of the
`Terminal Basic` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
