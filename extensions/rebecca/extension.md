---
title: Rebecca
tagline: The Rebecca terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, rebecca]
---

Rebecca is a dark palette: the terminal sits on `#292a44` and writes in `#e8e6ed`, a contrast ratio of 11.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#663399`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#292a44` |
| Foreground | `foreground` | `#e8e6ed` |
| Cursor | `cursor-color` | `#b89bf9` |
| Cursor text | `cursor-text` | `#292a44` |
| Selection background | `selection-background` | `#663399` |
| Selection foreground | `selection-foreground` | `#f4f2f9` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#12131e` | 8 | Bright black | `#666699` |
| 1 | Red | `#dd7755` | 9 | Bright red | `#ff92cd` |
| 2 | Green | `#04dbb5` | 10 | Bright green | `#01eac0` |
| 3 | Yellow | `#f2e7b7` | 11 | Bright yellow | `#fffca8` |
| 4 | Blue | `#7aa5ff` | 12 | Bright blue | `#69c0fa` |
| 5 | Magenta | `#bf9cf9` | 13 | Bright magenta | `#c17ff8` |
| 6 | Cyan | `#56d3c2` | 14 | Bright cyan | `#8bfde1` |
| 7 | White | `#e4e3e9` | 15 | Bright white | `#f4f2f9` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Rebecca. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Rebecca, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/rebecca.conf` is a byte-for-byte copy of the
`Rebecca` file in that collection. This extension packages it and claims no authorship
of the palette.
