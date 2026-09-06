---
title: Acid Lime
tagline: The Acid Lime terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, acid, lime]
---

Acid Lime is a dark palette: the terminal sits on `#080c05` and writes in `#d4efbc`, a contrast ratio of 15.8:1. 11 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#1b2a10`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#080c05` |
| Foreground | `foreground` | `#d4efbc` |
| Cursor | `cursor-color` | `#c2ff33` |
| Cursor text | `cursor-text` | `#080c05` |
| Selection background | `selection-background` | `#1b2a10` |
| Selection foreground | `selection-foreground` | `#545852` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#131d0c` | 8 | Bright black | `#4a6b36` |
| 1 | Red | `#ff3344` | 9 | Bright red | `#ff3344` |
| 2 | Green | `#97e63c` | 10 | Bright green | `#97e63c` |
| 3 | Yellow | `#eeff5c` | 11 | Bright yellow | `#dbff45` |
| 4 | Blue | `#4deca0` | 12 | Bright blue | `#4deca0` |
| 5 | Magenta | `#a6ff6b` | 13 | Bright magenta | `#a6ff6b` |
| 6 | Cyan | `#50ffb4` | 14 | Bright cyan | `#50ffb4` |
| 7 | White | `#bfe0a4` | 15 | Bright white | `#d4efbc` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Acid Lime. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Acid Lime, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/acid-lime.conf` is a byte-for-byte copy of the
`Acid Lime` file in that collection. This extension packages it and claims no authorship
of the palette.
