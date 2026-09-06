---
title: Monokai Pro
tagline: The Monokai Pro terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, monokai, pro]
---

Monokai Pro is a dark palette: the terminal sits on `#2d2a2e` and writes in `#fcfcfa`, a contrast ratio of 13.8:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#5b595c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#2d2a2e` |
| Foreground | `foreground` | `#fcfcfa` |
| Cursor | `cursor-color` | `#c1c0c0` |
| Cursor text | `cursor-text` | `#8e8d8d` |
| Selection background | `selection-background` | `#5b595c` |
| Selection foreground | `selection-foreground` | `#fcfcfa` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#2d2a2e` | 8 | Bright black | `#727072` |
| 1 | Red | `#ff6188` | 9 | Bright red | `#ff6188` |
| 2 | Green | `#a9dc76` | 10 | Bright green | `#a9dc76` |
| 3 | Yellow | `#ffd866` | 11 | Bright yellow | `#ffd866` |
| 4 | Blue | `#fc9867` | 12 | Bright blue | `#fc9867` |
| 5 | Magenta | `#ab9df2` | 13 | Bright magenta | `#ab9df2` |
| 6 | Cyan | `#78dce8` | 14 | Bright cyan | `#78dce8` |
| 7 | White | `#fcfcfa` | 15 | Bright white | `#fcfcfa` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Monokai Pro. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Monokai Pro, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/monokai-pro.conf` is a byte-for-byte copy of the
`Monokai Pro` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
