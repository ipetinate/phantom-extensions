---
title: Patina Lichen
tagline: The Patina Lichen terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, patina, lichen]
---

Patina Lichen is a light palette: the terminal sits on `#cdd1c6` and writes in `#393a34`, a contrast ratio of 7.4:1. 10 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#aab0a3`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Patina Lichen" background="#cdd1c6" foreground="#393a34" cursor="#393a34" selection="#aab0a3" ansi="#393a34, #8b4646, #33644d, #7f5031, #35616d, #854b3f, #2a6361, #5a5248, #5b5b54, #8b4646, #426338, #7f5031, #35616d, #854b3f, #2a6361, #393a34" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#cdd1c6" name="Background" />
  <Swatch color="#393a34" name="Foreground" />
  <Swatch color="#393a34" name="Cursor" />
  <Swatch color="#cdd1c6" name="Cursor text" />
  <Swatch color="#aab0a3" name="Selection" />
  <Swatch color="#393a34" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#393a34" name="0 Black" />
  <Swatch color="#8b4646" name="1 Red" />
  <Swatch color="#33644d" name="2 Green" />
  <Swatch color="#7f5031" name="3 Yellow" />
  <Swatch color="#35616d" name="4 Blue" />
  <Swatch color="#854b3f" name="5 Magenta" />
  <Swatch color="#2a6361" name="6 Cyan" />
  <Swatch color="#5a5248" name="7 White" />
  <Swatch color="#5b5b54" name="8 Bright black" />
  <Swatch color="#8b4646" name="9 Bright red" />
  <Swatch color="#426338" name="10 Bright green" />
  <Swatch color="#7f5031" name="11 Bright yellow" />
  <Swatch color="#35616d" name="12 Bright blue" />
  <Swatch color="#854b3f" name="13 Bright magenta" />
  <Swatch color="#2a6361" name="14 Bright cyan" />
  <Swatch color="#393a34" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Patina Lichen. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Patina Lichen, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/patina-lichen.conf` is a byte-for-byte copy of the
`Patina Lichen` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
