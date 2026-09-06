---
title: Ayu Light
tagline: The Ayu Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, ayu]
---

Ayu Light is a light palette: the terminal sits on `#f8f9fa` and writes in `#5c6166`, a contrast ratio of 5.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#035bd6`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#f8f9fa` |
| Foreground | `foreground` | `#5c6166` |
| Cursor | `cursor-color` | `#ffaa33` |
| Cursor text | `cursor-text` | `#f8f9fa` |
| Selection background | `selection-background` | `#035bd6` |
| Selection foreground | `selection-foreground` | `#f8f9fa` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#686868` |
| 1 | Red | `#ea6c6d` | 9 | Bright red | `#f07171` |
| 2 | Green | `#6cbf43` | 10 | Bright green | `#86b300` |
| 3 | Yellow | `#eca944` | 11 | Bright yellow | `#f2ae49` |
| 4 | Blue | `#3199e1` | 12 | Bright blue | `#399ee6` |
| 5 | Magenta | `#9e75c7` | 13 | Bright magenta | `#a37acc` |
| 6 | Cyan | `#46ba94` | 14 | Bright cyan | `#4cbf99` |
| 7 | White | `#bababa` | 15 | Bright white | `#d1d1d1` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Ayu Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Ayu Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/ayu-light.conf` is a byte-for-byte copy of the
`Ayu Light` file in that collection. This extension packages it and claims no authorship
of the palette.
