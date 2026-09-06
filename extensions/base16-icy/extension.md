---
title: base16-icy
tagline: The base16-icy terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, base16, icy]
---

base16-icy is a dark palette: the terminal sits on `#021012` and writes in `#095b67`, a contrast ratio of 2.5:1. 11 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#041f23`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#021012` |
| Foreground | `foreground` | `#095b67` |
| Cursor | `cursor-color` | `#16c2d9` |
| Cursor text | `cursor-text` | `#021012` |
| Selection background | `selection-background` | `#041f23` |
| Selection foreground | `selection-foreground` | `#425052` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#021012` | 8 | Bright black | `#1e484e` |
| 1 | Red | `#16c2d9` | 9 | Bright red | `#b3ebf2` |
| 2 | Green | `#4dd0e1` | 10 | Bright green | `#4dd0e1` |
| 3 | Yellow | `#80deea` | 11 | Bright yellow | `#80deea` |
| 4 | Blue | `#00bcd4` | 12 | Bright blue | `#00bcd4` |
| 5 | Magenta | `#00adc1` | 13 | Bright magenta | `#00adc1` |
| 6 | Cyan | `#26c6d6` | 14 | Bright cyan | `#26c6d6` |
| 7 | White | `#095b67` | 15 | Bright white | `#0c7c7c` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to base16-icy. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | base16-icy, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/base16-icy.conf` is a byte-for-byte copy of the
`base16-icy` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
