---
title: 3024 Day
tagline: The 3024 Day terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, 3024, day]
---

3024 Day is a light palette: the terminal sits on `#f7f7f7` and writes in `#4a4543`, a contrast ratio of 8.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#a5a2a2`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#f7f7f7` |
| Foreground | `foreground` | `#4a4543` |
| Cursor | `cursor-color` | `#4a4543` |
| Cursor text | `cursor-text` | `#f7f7f7` |
| Selection background | `selection-background` | `#a5a2a2` |
| Selection foreground | `selection-foreground` | `#4a4543` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#090300` | 8 | Bright black | `#5c5855` |
| 1 | Red | `#db2d20` | 9 | Bright red | `#dbaec3` |
| 2 | Green | `#01a252` | 10 | Bright green | `#3a3432` |
| 3 | Yellow | `#caba00` | 11 | Bright yellow | `#4a4543` |
| 4 | Blue | `#01a0e4` | 12 | Bright blue | `#807d7c` |
| 5 | Magenta | `#a16a94` | 13 | Bright magenta | `#bcbbba` |
| 6 | Cyan | `#8fbece` | 14 | Bright cyan | `#cdab53` |
| 7 | White | `#a5a2a2` | 15 | Bright white | `#f7f7f7` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to 3024 Day. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | 3024 Day, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/3024-day.conf` is a byte-for-byte copy of the
`3024 Day` file in that collection. This extension packages it and claims no authorship
of the palette.
