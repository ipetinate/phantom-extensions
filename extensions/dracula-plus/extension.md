---
title: Dracula+
tagline: The Dracula+ terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, dracula]
---

Dracula+ is a dark palette: the terminal sits on `#212121` and writes in `#f8f8f2`, a contrast ratio of 15.1:1. 14 of the 16 ANSI entries are distinct, because 2 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#f8f8f2`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#212121` |
| Foreground | `foreground` | `#f8f8f2` |
| Cursor | `cursor-color` | `#eceff4` |
| Cursor text | `cursor-text` | `#282828` |
| Selection background | `selection-background` | `#f8f8f2` |
| Selection foreground | `selection-foreground` | `#545454` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#21222c` | 8 | Bright black | `#545454` |
| 1 | Red | `#ff5555` | 9 | Bright red | `#ff6e6e` |
| 2 | Green | `#50fa7b` | 10 | Bright green | `#69ff94` |
| 3 | Yellow | `#ffcb6b` | 11 | Bright yellow | `#ffcb6b` |
| 4 | Blue | `#82aaff` | 12 | Bright blue | `#d6acff` |
| 5 | Magenta | `#c792ea` | 13 | Bright magenta | `#ff92df` |
| 6 | Cyan | `#8be9fd` | 14 | Bright cyan | `#a4ffff` |
| 7 | White | `#f8f8f2` | 15 | Bright white | `#f8f8f2` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Dracula+. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Dracula+, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/dracula-plus.conf` is a byte-for-byte copy of the
`Dracula+` file in that collection. This extension packages it and claims no authorship
of the palette.
