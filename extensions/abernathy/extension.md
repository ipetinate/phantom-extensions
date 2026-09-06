---
title: Abernathy
tagline: The Abernathy terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, abernathy]
---

Abernathy is a dark palette: the terminal sits on `#111416` and writes in `#eeeeec`, a contrast ratio of 15.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#eeeeec`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#111416` |
| Foreground | `foreground` | `#eeeeec` |
| Cursor | `cursor-color` | `#bbbbbb` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#eeeeec` |
| Selection foreground | `selection-foreground` | `#333333` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#404040` |
| 1 | Red | `#cd0000` | 9 | Bright red | `#ff0000` |
| 2 | Green | `#00cd00` | 10 | Bright green | `#00ff00` |
| 3 | Yellow | `#cdcd00` | 11 | Bright yellow | `#ffff00` |
| 4 | Blue | `#1093f5` | 12 | Bright blue | `#11b5f6` |
| 5 | Magenta | `#cd00cd` | 13 | Bright magenta | `#ff00ff` |
| 6 | Cyan | `#00cdcd` | 14 | Bright cyan | `#00ffff` |
| 7 | White | `#faebd7` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Abernathy. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Abernathy, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/abernathy.conf` is a byte-for-byte copy of the
`Abernathy` file in that collection. This extension packages it and claims no authorship
of the palette.
