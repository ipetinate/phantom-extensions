---
title: Monokai Pro Light
tagline: The Monokai Pro Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, monokai, pro]
---

Monokai Pro Light is a light palette: the terminal sits on `#faf4f2` and writes in `#29242a`, a contrast ratio of 14.0:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#bfb9ba`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#faf4f2` |
| Foreground | `foreground` | `#29242a` |
| Cursor | `cursor-color` | `#706b6e` |
| Cursor text | `cursor-text` | `#a39ea1` |
| Selection background | `selection-background` | `#bfb9ba` |
| Selection foreground | `selection-foreground` | `#29242a` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#faf4f2` | 8 | Bright black | `#a59fa0` |
| 1 | Red | `#e14775` | 9 | Bright red | `#e14775` |
| 2 | Green | `#269d69` | 10 | Bright green | `#269d69` |
| 3 | Yellow | `#cc7a0a` | 11 | Bright yellow | `#cc7a0a` |
| 4 | Blue | `#e16032` | 12 | Bright blue | `#e16032` |
| 5 | Magenta | `#7058be` | 13 | Bright magenta | `#7058be` |
| 6 | Cyan | `#1c8ca8` | 14 | Bright cyan | `#1c8ca8` |
| 7 | White | `#29242a` | 15 | Bright white | `#29242a` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Monokai Pro Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Monokai Pro Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/monokai-pro-light.conf` is a byte-for-byte copy of the
`Monokai Pro Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
