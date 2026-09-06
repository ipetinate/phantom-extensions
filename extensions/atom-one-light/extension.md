---
title: Atom One Light
tagline: The Atom One Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, atom, one]
---

Atom One Light is a light palette: the terminal sits on `#f9f9f9` and writes in `#2a2c33`, a contrast ratio of 13.2:1. 9 of the 16 ANSI entries are distinct, because 6 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#ededed`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#f9f9f9` |
| Foreground | `foreground` | `#2a2c33` |
| Cursor | `cursor-color` | `#bbbbbb` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#ededed` |
| Selection foreground | `selection-foreground` | `#2a2c33` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#000000` |
| 1 | Red | `#de3e35` | 9 | Bright red | `#de3e35` |
| 2 | Green | `#3f953a` | 10 | Bright green | `#3f953a` |
| 3 | Yellow | `#d2b67c` | 11 | Bright yellow | `#d2b67c` |
| 4 | Blue | `#2f5af3` | 12 | Bright blue | `#2f5af3` |
| 5 | Magenta | `#950095` | 13 | Bright magenta | `#a00095` |
| 6 | Cyan | `#3f953a` | 14 | Bright cyan | `#3f953a` |
| 7 | White | `#bbbbbb` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Atom One Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Atom One Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/atom-one-light.conf` is a byte-for-byte copy of the
`Atom One Light` file in that collection. This extension packages it and claims no authorship
of the palette.
