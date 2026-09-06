---
title: ENCOM
tagline: The ENCOM terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, encom]
---

ENCOM is a dark palette: the terminal sits on `#000000` and writes in `#00a595`, a contrast ratio of 6.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#00a48c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#000000` |
| Foreground | `foreground` | `#00a595` |
| Cursor | `cursor-color` | `#bbbbbb` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#00a48c` |
| Selection foreground | `selection-foreground` | `#3de1c9` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#555555` |
| 1 | Red | `#9f0000` | 9 | Bright red | `#ff0000` |
| 2 | Green | `#008b00` | 10 | Bright green | `#00ee00` |
| 3 | Yellow | `#ffd000` | 11 | Bright yellow | `#ffff00` |
| 4 | Blue | `#0081ff` | 12 | Bright blue | `#0000ff` |
| 5 | Magenta | `#bc00ca` | 13 | Bright magenta | `#ff00ff` |
| 6 | Cyan | `#008b8b` | 14 | Bright cyan | `#00cdcd` |
| 7 | White | `#bbbbbb` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to ENCOM. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | ENCOM, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/encom.conf` is a byte-for-byte copy of the
`ENCOM` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
