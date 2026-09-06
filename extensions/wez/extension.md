---
title: Wez
tagline: The Wez terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, wez]
---

Wez is a dark palette: the terminal sits on `#000000` and writes in `#b3b3b3`, a contrast ratio of 10.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#4d52f8`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#000000` |
| Foreground | `foreground` | `#b3b3b3` |
| Cursor | `cursor-color` | `#53ae71` |
| Cursor text | `cursor-text` | `#000000` |
| Selection background | `selection-background` | `#4d52f8` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#555555` |
| 1 | Red | `#cc5555` | 9 | Bright red | `#ff5555` |
| 2 | Green | `#55cc55` | 10 | Bright green | `#55ff55` |
| 3 | Yellow | `#cdcd55` | 11 | Bright yellow | `#ffff55` |
| 4 | Blue | `#5555cc` | 12 | Bright blue | `#5555ff` |
| 5 | Magenta | `#cc55cc` | 13 | Bright magenta | `#ff55ff` |
| 6 | Cyan | `#7acaca` | 14 | Bright cyan | `#55ffff` |
| 7 | White | `#cccccc` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Wez. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Wez, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/wez.conf` is a byte-for-byte copy of the
`Wez` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
