---
title: 12-bit Rainbow
tagline: The 12-bit Rainbow terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, 12, bit, rainbow]
---

12-bit Rainbow is a dark palette: the terminal sits on `#040404` and writes in `#feffff`, a contrast ratio of 20.5:1. All 16 ANSI entries are different colours. A selection is drawn on `#606060`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#040404` |
| Foreground | `foreground` | `#feffff` |
| Cursor | `cursor-color` | `#e0d000` |
| Cursor text | `cursor-text` | `#000000` |
| Selection background | `selection-background` | `#606060` |
| Selection foreground | `selection-foreground` | `#ffffff` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#685656` |
| 1 | Red | `#a03050` | 9 | Bright red | `#c06060` |
| 2 | Green | `#40d080` | 10 | Bright green | `#90d050` |
| 3 | Yellow | `#e09040` | 11 | Bright yellow | `#e0d000` |
| 4 | Blue | `#3060b0` | 12 | Bright blue | `#00b0c0` |
| 5 | Magenta | `#603090` | 13 | Bright magenta | `#801070` |
| 6 | Cyan | `#0090c0` | 14 | Bright cyan | `#20b0c0` |
| 7 | White | `#dbded8` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to 12-bit Rainbow. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | 12-bit Rainbow, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/12-bit-rainbow.conf` is a byte-for-byte copy of the
`12-bit Rainbow` file in that collection. This extension packages it and claims no authorship
of the palette.
