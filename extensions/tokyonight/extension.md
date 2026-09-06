---
title: TokyoNight
tagline: The TokyoNight terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, tokyonight]
---

TokyoNight is a dark palette: the terminal sits on `#1a1b26` and writes in `#c0caf5`, a contrast ratio of 10.6:1. 10 of the 16 ANSI entries are distinct, because 6 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#33467c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#1a1b26` |
| Foreground | `foreground` | `#c0caf5` |
| Cursor | `cursor-color` | `#c0caf5` |
| Cursor text | `cursor-text` | `#15161e` |
| Selection background | `selection-background` | `#33467c` |
| Selection foreground | `selection-foreground` | `#c0caf5` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#15161e` | 8 | Bright black | `#414868` |
| 1 | Red | `#f7768e` | 9 | Bright red | `#f7768e` |
| 2 | Green | `#9ece6a` | 10 | Bright green | `#9ece6a` |
| 3 | Yellow | `#e0af68` | 11 | Bright yellow | `#e0af68` |
| 4 | Blue | `#7aa2f7` | 12 | Bright blue | `#7aa2f7` |
| 5 | Magenta | `#bb9af7` | 13 | Bright magenta | `#bb9af7` |
| 6 | Cyan | `#7dcfff` | 14 | Bright cyan | `#7dcfff` |
| 7 | White | `#a9b1d6` | 15 | Bright white | `#c0caf5` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to TokyoNight. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | TokyoNight, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/tokyonight.conf` is a byte-for-byte copy of the
`TokyoNight` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
