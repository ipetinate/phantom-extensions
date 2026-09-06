---
title: Tango Half Adapted
tagline: The Tango Half Adapted terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, tango, half, adapted]
---

Tango Half Adapted is a light palette: the terminal sits on `#ffffff` and writes in `#000000`, a contrast ratio of 21.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#c1deff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#ffffff` |
| Foreground | `foreground` | `#000000` |
| Cursor | `cursor-color` | `#000000` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#c1deff` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#797d76` |
| 1 | Red | `#ff0000` | 9 | Bright red | `#ff0013` |
| 2 | Green | `#4cc300` | 10 | Bright green | `#70dc00` |
| 3 | Yellow | `#e2c000` | 11 | Bright yellow | `#d9c600` |
| 4 | Blue | `#008ef6` | 12 | Bright blue | `#76bfff` |
| 5 | Magenta | `#a96cb3` | 13 | Bright magenta | `#d898d1` |
| 6 | Cyan | `#00bdc3` | 14 | Bright cyan | `#00d0d4` |
| 7 | White | `#babfb5` | 15 | Bright white | `#f4f4f2` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Tango Half Adapted. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Tango Half Adapted, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/tango-half-adapted.conf` is a byte-for-byte copy of the
`Tango Half Adapted` file in that collection. This extension packages it and claims no authorship
of the palette.
