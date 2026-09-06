---
title: Dracula
tagline: The Dracula terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, dracula]
---

Dracula is a dark palette: the terminal sits on `#282a36` and writes in `#f8f8f2`, a contrast ratio of 13.4:1. All 16 ANSI entries are different colours. A selection is drawn on `#44475a`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#282a36` |
| Foreground | `foreground` | `#f8f8f2` |
| Cursor | `cursor-color` | `#f8f8f2` |
| Cursor text | `cursor-text` | `#282a36` |
| Selection background | `selection-background` | `#44475a` |
| Selection foreground | `selection-foreground` | `#ffffff` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#21222c` | 8 | Bright black | `#6272a4` |
| 1 | Red | `#ff5555` | 9 | Bright red | `#ff6e6e` |
| 2 | Green | `#50fa7b` | 10 | Bright green | `#69ff94` |
| 3 | Yellow | `#f1fa8c` | 11 | Bright yellow | `#ffffa5` |
| 4 | Blue | `#bd93f9` | 12 | Bright blue | `#d6acff` |
| 5 | Magenta | `#ff79c6` | 13 | Bright magenta | `#ff92df` |
| 6 | Cyan | `#8be9fd` | 14 | Bright cyan | `#a4ffff` |
| 7 | White | `#f8f8f2` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Dracula. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Dracula, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/dracula-official.conf` is a byte-for-byte copy of the
`Dracula` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
