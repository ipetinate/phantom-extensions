---
title: GitHub Light Colorblind
tagline: The GitHub Light Colorblind terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, github, colorblind]
---

GitHub Light Colorblind is a light palette: the terminal sits on `#ffffff` and writes in `#24292f`, a contrast ratio of 14.7:1. 15 of the 16 ANSI entries are distinct, because 0 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#24292f`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#ffffff` |
| Foreground | `foreground` | `#24292f` |
| Cursor | `cursor-color` | `#0969da` |
| Cursor text | `cursor-text` | `#3c9cff` |
| Selection background | `selection-background` | `#24292f` |
| Selection foreground | `selection-foreground` | `#ffffff` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#24292f` | 8 | Bright black | `#57606a` |
| 1 | Red | `#b35900` | 9 | Bright red | `#8a4600` |
| 2 | Green | `#0550ae` | 10 | Bright green | `#0969da` |
| 3 | Yellow | `#4d2d00` | 11 | Bright yellow | `#633c01` |
| 4 | Blue | `#0969da` | 12 | Bright blue | `#218bff` |
| 5 | Magenta | `#8250df` | 13 | Bright magenta | `#a475f9` |
| 6 | Cyan | `#1b7c83` | 14 | Bright cyan | `#3192aa` |
| 7 | White | `#6e7781` | 15 | Bright white | `#8c959f` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to GitHub Light Colorblind. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | GitHub Light Colorblind, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/github-light-colorblind.conf` is a byte-for-byte copy of the
`GitHub Light Colorblind` file in that collection. This extension packages it and claims no authorship
of the palette.
