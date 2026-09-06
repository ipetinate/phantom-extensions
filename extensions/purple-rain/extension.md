---
title: Purple Rain
tagline: The Purple Rain terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, purple, rain]
---

Purple Rain is a dark palette: the terminal sits on `#21084a` and writes in `#fffbf6`, a contrast ratio of 17.0:1. 15 of the 16 ANSI entries are distinct, because 1 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#287691`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#21084a` |
| Foreground | `foreground` | `#fffbf6` |
| Cursor | `cursor-color` | `#ff271d` |
| Cursor text | `cursor-text` | `#ff9a90` |
| Selection background | `selection-background` | `#287691` |
| Selection foreground | `selection-foreground` | `#ffffff` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#565656` |
| 1 | Red | `#ff260e` | 9 | Bright red | `#ff4250` |
| 2 | Green | `#9be205` | 10 | Bright green | `#b8e36e` |
| 3 | Yellow | `#ffc400` | 11 | Bright yellow | `#ffd852` |
| 4 | Blue | `#00a2fa` | 12 | Bright blue | `#00a6ff` |
| 5 | Magenta | `#815bb5` | 13 | Bright magenta | `#ac7bf0` |
| 6 | Cyan | `#00deef` | 14 | Bright cyan | `#74fdf3` |
| 7 | White | `#ffffff` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Purple Rain. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Purple Rain, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/purple-rain.conf` is a byte-for-byte copy of the
`Purple Rain` file in that collection. This extension packages it and claims no authorship
of the palette.
