---
title: Kanagawa Lotus
tagline: The Kanagawa Lotus terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, kanagawa, lotus]
---

Kanagawa Lotus is a light palette: the terminal sits on `#f2ecbc` and writes in `#545464`, a contrast ratio of 6.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#545464`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#f2ecbc` |
| Foreground | `foreground` | `#545464` |
| Cursor | `cursor-color` | `#43436c` |
| Cursor text | `cursor-text` | `#f2ecbc` |
| Selection background | `selection-background` | `#545464` |
| Selection foreground | `selection-foreground` | `#f2ecbc` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#1f1f28` | 8 | Bright black | `#8a8980` |
| 1 | Red | `#c84053` | 9 | Bright red | `#d7474b` |
| 2 | Green | `#6f894e` | 10 | Bright green | `#6e915f` |
| 3 | Yellow | `#77713f` | 11 | Bright yellow | `#836f4a` |
| 4 | Blue | `#4d699b` | 12 | Bright blue | `#6693bf` |
| 5 | Magenta | `#b35b79` | 13 | Bright magenta | `#624c83` |
| 6 | Cyan | `#597b75` | 14 | Bright cyan | `#5e857a` |
| 7 | White | `#545464` | 15 | Bright white | `#43436c` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Kanagawa Lotus. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Kanagawa Lotus, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/kanagawa-lotus.conf` is a byte-for-byte copy of the
`Kanagawa Lotus` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
