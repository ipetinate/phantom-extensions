---
title: Detuned
tagline: The Detuned terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, detuned]
---

Detuned is a dark palette: the terminal sits on `#000000` and writes in `#c7c7c7`, a contrast ratio of 12.4:1. All 16 ANSI entries are different colours. A selection is drawn on `#c1deff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#000000` |
| Foreground | `foreground` | `#c7c7c7` |
| Cursor | `cursor-color` | `#c7c7c7` |
| Cursor text | `cursor-text` | `#8c8c8c` |
| Selection background | `selection-background` | `#c1deff` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#171717` | 8 | Bright black | `#686868` |
| 1 | Red | `#fe4386` | 9 | Bright red | `#fa80ac` |
| 2 | Green | `#a6e32d` | 10 | Bright green | `#bde371` |
| 3 | Yellow | `#e6da73` | 11 | Bright yellow | `#fff27f` |
| 4 | Blue | `#0094d9` | 12 | Bright blue | `#00beff` |
| 5 | Magenta | `#9b37ff` | 13 | Bright magenta | `#be9eff` |
| 6 | Cyan | `#50b7d9` | 14 | Bright cyan | `#5ed7ff` |
| 7 | White | `#c7c7c7` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Detuned. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Detuned, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/detuned.conf` is a byte-for-byte copy of the
`Detuned` file in that collection. This extension packages it and claims no authorship
of the palette.
