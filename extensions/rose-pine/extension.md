---
title: Rose Pine
tagline: The Rose Pine terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, rose, pine]
---

Rose Pine is a dark palette: the terminal sits on `#191724` and writes in `#e0def4`, a contrast ratio of 13.4:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#403d52`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#191724` |
| Foreground | `foreground` | `#e0def4` |
| Cursor | `cursor-color` | `#e0def4` |
| Cursor text | `cursor-text` | `#191724` |
| Selection background | `selection-background` | `#403d52` |
| Selection foreground | `selection-foreground` | `#e0def4` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#26233a` | 8 | Bright black | `#6e6a86` |
| 1 | Red | `#eb6f92` | 9 | Bright red | `#eb6f92` |
| 2 | Green | `#31748f` | 10 | Bright green | `#31748f` |
| 3 | Yellow | `#f6c177` | 11 | Bright yellow | `#f6c177` |
| 4 | Blue | `#9ccfd8` | 12 | Bright blue | `#9ccfd8` |
| 5 | Magenta | `#c4a7e7` | 13 | Bright magenta | `#c4a7e7` |
| 6 | Cyan | `#ebbcba` | 14 | Bright cyan | `#ebbcba` |
| 7 | White | `#e0def4` | 15 | Bright white | `#e0def4` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Rose Pine. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Rose Pine, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/rose-pine.conf` is a byte-for-byte copy of the
`Rose Pine` file in that collection. This extension packages it and claims no authorship
of the palette.
