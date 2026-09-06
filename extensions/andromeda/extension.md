---
title: Andromeda
tagline: The Andromeda terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, andromeda]
---

Andromeda is a dark palette: the terminal sits on `#262a33` and writes in `#e5e5e5`, a contrast ratio of 11.4:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#5a5c62`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#262a33` |
| Foreground | `foreground` | `#e5e5e5` |
| Cursor | `cursor-color` | `#f8f8f0` |
| Cursor text | `cursor-text` | `#b5b5a8` |
| Selection background | `selection-background` | `#5a5c62` |
| Selection foreground | `selection-foreground` | `#ece7e7` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#666666` |
| 1 | Red | `#cd3131` | 9 | Bright red | `#cd3131` |
| 2 | Green | `#05bc79` | 10 | Bright green | `#05bc79` |
| 3 | Yellow | `#e5e512` | 11 | Bright yellow | `#e5e512` |
| 4 | Blue | `#2472c8` | 12 | Bright blue | `#2472c8` |
| 5 | Magenta | `#bc3fbc` | 13 | Bright magenta | `#bc3fbc` |
| 6 | Cyan | `#0fa8cd` | 14 | Bright cyan | `#0fa8cd` |
| 7 | White | `#e5e5e5` | 15 | Bright white | `#e5e5e5` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Andromeda. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Andromeda, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/andromeda.conf` is a byte-for-byte copy of the
`Andromeda` file in that collection. This extension packages it and claims no authorship
of the palette.
