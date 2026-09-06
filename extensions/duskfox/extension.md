---
title: Duskfox
tagline: The Duskfox terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, duskfox]
---

Duskfox is a dark palette: the terminal sits on `#232136` and writes in `#e0def4`, a contrast ratio of 11.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#433c59`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#232136` |
| Foreground | `foreground` | `#e0def4` |
| Cursor | `cursor-color` | `#e0def4` |
| Cursor text | `cursor-text` | `#232136` |
| Selection background | `selection-background` | `#433c59` |
| Selection foreground | `selection-foreground` | `#e0def4` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#393552` | 8 | Bright black | `#544d8a` |
| 1 | Red | `#eb6f92` | 9 | Bright red | `#f083a2` |
| 2 | Green | `#a3be8c` | 10 | Bright green | `#b1d196` |
| 3 | Yellow | `#f6c177` | 11 | Bright yellow | `#f9cb8c` |
| 4 | Blue | `#569fba` | 12 | Bright blue | `#65b1cd` |
| 5 | Magenta | `#c4a7e7` | 13 | Bright magenta | `#ccb1ed` |
| 6 | Cyan | `#9ccfd8` | 14 | Bright cyan | `#a6dae3` |
| 7 | White | `#e0def4` | 15 | Bright white | `#e2e0f7` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Duskfox. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Duskfox, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/duskfox.conf` is a byte-for-byte copy of the
`Duskfox` file in that collection. This extension packages it and claims no authorship
of the palette.
