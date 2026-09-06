---
title: Fahrenheit
tagline: The Fahrenheit terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, fahrenheit]
---

Fahrenheit is a dark palette: the terminal sits on `#000000` and writes in `#ffffce`, a contrast ratio of 20.4:1. All 16 ANSI entries are different colours. A selection is drawn on `#4e739f`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#000000` |
| Foreground | `foreground` | `#ffffce` |
| Cursor | `cursor-color` | `#bbbbbb` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#4e739f` |
| Selection foreground | `selection-foreground` | `#ffffce` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#1d1d1d` | 8 | Bright black | `#404040` |
| 1 | Red | `#cda074` | 9 | Bright red | `#fecea0` |
| 2 | Green | `#9e744d` | 10 | Bright green | `#cc734d` |
| 3 | Yellow | `#fecf75` | 11 | Bright yellow | `#fd9f4d` |
| 4 | Blue | `#7f0e0f` | 12 | Bright blue | `#cb4a05` |
| 5 | Magenta | `#734c4d` | 13 | Bright magenta | `#4e739f` |
| 6 | Cyan | `#979797` | 14 | Bright cyan | `#fed04d` |
| 7 | White | `#ffffce` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Fahrenheit. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Fahrenheit, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/fahrenheit.conf` is a byte-for-byte copy of the
`Fahrenheit` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
