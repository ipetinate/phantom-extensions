---
title: Porcelain
tagline: The Porcelain terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, porcelain]
---

Porcelain is a light palette: the terminal sits on `#fbfbfd` and writes in `#2a2e37`, a contrast ratio of 13.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#dce6f7`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#fbfbfd` |
| Foreground | `foreground` | `#2a2e37` |
| Cursor | `cursor-color` | `#0054d1` |
| Cursor text | `cursor-text` | `#fbfbfd` |
| Selection background | `selection-background` | `#dce6f7` |
| Selection foreground | `selection-foreground` | `#aeaeb0` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#2a2e37` | 8 | Bright black | `#828896` |
| 1 | Red | `#c60018` | 9 | Bright red | `#d60027` |
| 2 | Green | `#157424` | 10 | Bright green | `#1b842d` |
| 3 | Yellow | `#855700` | 11 | Bright yellow | `#af2700` |
| 4 | Blue | `#004cc8` | 12 | Bright blue | `#005bdb` |
| 5 | Magenta | `#761bc3` | 13 | Bright magenta | `#862ad2` |
| 6 | Cyan | `#006873` | 14 | Bright cyan | `#007f8f` |
| 7 | White | `#5a6170` | 15 | Bright white | `#1b1e25` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Porcelain. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Porcelain, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/porcelain.conf` is a byte-for-byte copy of the
`Porcelain` file in that collection. This extension packages it and claims no authorship
of the palette.
