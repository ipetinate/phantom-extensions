---
title: Batman
tagline: The Batman terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, batman]
---

Batman is a dark palette: the terminal sits on `#1b1d1e` and writes in `#6f6f6f`, a contrast ratio of 3.4:1. All 16 ANSI entries are different colours. A selection is drawn on `#4d504c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#1b1d1e` |
| Foreground | `foreground` | `#6f6f6f` |
| Cursor | `cursor-color` | `#fcef0c` |
| Cursor text | `cursor-text` | `#000000` |
| Selection background | `selection-background` | `#4d504c` |
| Selection foreground | `selection-foreground` | `#f0e04a` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#1b1d1e` | 8 | Bright black | `#505354` |
| 1 | Red | `#e6dc44` | 9 | Bright red | `#fff78e` |
| 2 | Green | `#c8be46` | 10 | Bright green | `#fff27d` |
| 3 | Yellow | `#f4fd22` | 11 | Bright yellow | `#feed6c` |
| 4 | Blue | `#737174` | 12 | Bright blue | `#919495` |
| 5 | Magenta | `#747271` | 13 | Bright magenta | `#9a9a9d` |
| 6 | Cyan | `#62605f` | 14 | Bright cyan | `#a3a3a6` |
| 7 | White | `#c6c5bf` | 15 | Bright white | `#dadbd6` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Batman. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Batman, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/batman.conf` is a byte-for-byte copy of the
`Batman` file in that collection. This extension packages it and claims no authorship
of the palette.
