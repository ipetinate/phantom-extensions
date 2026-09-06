---
title: Blue Matrix
tagline: The Blue Matrix terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, blue, matrix]
---

Blue Matrix is a dark palette: the terminal sits on `#101116` and writes in `#00a2ff`, a contrast ratio of 6.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#c1deff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#101116` |
| Foreground | `foreground` | `#00a2ff` |
| Cursor | `cursor-color` | `#76ff9f` |
| Cursor text | `cursor-text` | `#a6a6a6` |
| Selection background | `selection-background` | `#c1deff` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#101116` | 8 | Bright black | `#686868` |
| 1 | Red | `#ff5680` | 9 | Bright red | `#ff6e67` |
| 2 | Green | `#00ff9c` | 10 | Bright green | `#5ffa68` |
| 3 | Yellow | `#fffc58` | 11 | Bright yellow | `#fffc67` |
| 4 | Blue | `#00b0ff` | 12 | Bright blue | `#6871ff` |
| 5 | Magenta | `#d57bff` | 13 | Bright magenta | `#d682ec` |
| 6 | Cyan | `#76c1ff` | 14 | Bright cyan | `#60fdff` |
| 7 | White | `#c7c7c7` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Blue Matrix. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Blue Matrix, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/blue-matrix.conf` is a byte-for-byte copy of the
`Blue Matrix` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
