---
title: Ayu
tagline: The Ayu terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, ayu]
---

Ayu is a dark palette: the terminal sits on `#0b0e14` and writes in `#bfbdb6`, a contrast ratio of 10.3:1. All 16 ANSI entries are different colours. A selection is drawn on `#409fff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#0b0e14` |
| Foreground | `foreground` | `#bfbdb6` |
| Cursor | `cursor-color` | `#e6b450` |
| Cursor text | `cursor-text` | `#0b0e14` |
| Selection background | `selection-background` | `#409fff` |
| Selection foreground | `selection-foreground` | `#0b0e14` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#11151c` | 8 | Bright black | `#686868` |
| 1 | Red | `#ea6c73` | 9 | Bright red | `#f07178` |
| 2 | Green | `#7fd962` | 10 | Bright green | `#aad94c` |
| 3 | Yellow | `#f9af4f` | 11 | Bright yellow | `#ffb454` |
| 4 | Blue | `#53bdfa` | 12 | Bright blue | `#59c2ff` |
| 5 | Magenta | `#cda1fa` | 13 | Bright magenta | `#d2a6ff` |
| 6 | Cyan | `#90e1c6` | 14 | Bright cyan | `#95e6cb` |
| 7 | White | `#c7c7c7` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Ayu. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Ayu, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/ayu.conf` is a byte-for-byte copy of the
`Ayu` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
