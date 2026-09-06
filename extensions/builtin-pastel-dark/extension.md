---
title: Builtin Pastel Dark
tagline: The Builtin Pastel Dark terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, builtin, pastel]
---

Builtin Pastel Dark is a dark palette: the terminal sits on `#000000` and writes in `#bbbbbb`, a contrast ratio of 10.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#363983`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#000000` |
| Foreground | `foreground` | `#bbbbbb` |
| Cursor | `cursor-color` | `#ffa560` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#363983` |
| Selection foreground | `selection-foreground` | `#f2f2f2` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#4f4f4f` | 8 | Bright black | `#7c7c7c` |
| 1 | Red | `#ff6c60` | 9 | Bright red | `#ffb6b0` |
| 2 | Green | `#a8ff60` | 10 | Bright green | `#ceffac` |
| 3 | Yellow | `#ffffb6` | 11 | Bright yellow | `#ffffcc` |
| 4 | Blue | `#96cbfe` | 12 | Bright blue | `#b5dcff` |
| 5 | Magenta | `#ff73fd` | 13 | Bright magenta | `#ff9cfe` |
| 6 | Cyan | `#c6c5fe` | 14 | Bright cyan | `#dfdffe` |
| 7 | White | `#eeeeee` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Builtin Pastel Dark. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Builtin Pastel Dark, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/builtin-pastel-dark.conf` is a byte-for-byte copy of the
`Builtin Pastel Dark` file in that collection. This extension packages it and claims no authorship
of the palette.
