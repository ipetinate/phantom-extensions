---
title: Aardvark Blue
tagline: The Aardvark Blue terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aardvark, blue]
---

Aardvark Blue is a dark palette: the terminal sits on `#102040` and writes in `#dddddd`, a contrast ratio of 11.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#bfdbfe`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#102040` |
| Foreground | `foreground` | `#dddddd` |
| Cursor | `cursor-color` | `#007acc` |
| Cursor text | `cursor-text` | `#bfdbfe` |
| Selection background | `selection-background` | `#bfdbfe` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#191919` | 8 | Bright black | `#525252` |
| 1 | Red | `#aa342e` | 9 | Bright red | `#f05b50` |
| 2 | Green | `#4b8c0f` | 10 | Bright green | `#95dc55` |
| 3 | Yellow | `#dbba00` | 11 | Bright yellow | `#ffe763` |
| 4 | Blue | `#1370d3` | 12 | Bright blue | `#60a4ec` |
| 5 | Magenta | `#c43ac3` | 13 | Bright magenta | `#e26be2` |
| 6 | Cyan | `#008eb0` | 14 | Bright cyan | `#60b6cb` |
| 7 | White | `#bebebe` | 15 | Bright white | `#f7f7f7` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aardvark Blue. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aardvark Blue, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aardvark-blue.conf` is a byte-for-byte copy of the
`Aardvark Blue` file in that collection. This extension packages it and claims no authorship
of the palette.
