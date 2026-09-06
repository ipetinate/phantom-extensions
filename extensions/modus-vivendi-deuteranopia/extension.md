---
title: Modus Vivendi Deuteranopia
tagline: The Modus Vivendi Deuteranopia terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, modus, vivendi, deuteranopia]
---

Modus Vivendi Deuteranopia is a dark palette: the terminal sits on `#000000` and writes in `#ffffff`, a contrast ratio of 21.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#5a5a5a`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#000000` |
| Foreground | `foreground` | `#ffffff` |
| Cursor | `cursor-color` | `#ffffff` |
| Cursor text | `cursor-text` | `#000000` |
| Selection background | `selection-background` | `#5a5a5a` |
| Selection foreground | `selection-foreground` | `#ffffff` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#595959` |
| 1 | Red | `#ff5f59` | 9 | Bright red | `#ff7f9f` |
| 2 | Green | `#44bc44` | 10 | Bright green | `#00c06f` |
| 3 | Yellow | `#cabf00` | 11 | Bright yellow | `#ffa00f` |
| 4 | Blue | `#2fafff` | 12 | Bright blue | `#79a8ff` |
| 5 | Magenta | `#feacd0` | 13 | Bright magenta | `#b6a0ff` |
| 6 | Cyan | `#00d3d0` | 14 | Bright cyan | `#6ae4b9` |
| 7 | White | `#a6a6a6` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Modus Vivendi Deuteranopia. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Modus Vivendi Deuteranopia, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/modus-vivendi-deuteranopia.conf` is a byte-for-byte copy of the
`Modus Vivendi Deuteranopia` file in that collection. This extension packages it and claims no authorship
of the palette.
