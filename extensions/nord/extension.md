---
title: Nord
tagline: The Nord terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, nord]
---

Nord is a dark palette: the terminal sits on `#2e3440` and writes in `#d8dee9`, a contrast ratio of 9.2:1. 11 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#eceff4`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#2e3440` |
| Foreground | `foreground` | `#d8dee9` |
| Cursor | `cursor-color` | `#eceff4` |
| Cursor text | `cursor-text` | `#282828` |
| Selection background | `selection-background` | `#eceff4` |
| Selection foreground | `selection-foreground` | `#4c566a` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#3b4252` | 8 | Bright black | `#596377` |
| 1 | Red | `#bf616a` | 9 | Bright red | `#bf616a` |
| 2 | Green | `#a3be8c` | 10 | Bright green | `#a3be8c` |
| 3 | Yellow | `#ebcb8b` | 11 | Bright yellow | `#ebcb8b` |
| 4 | Blue | `#81a1c1` | 12 | Bright blue | `#81a1c1` |
| 5 | Magenta | `#b48ead` | 13 | Bright magenta | `#b48ead` |
| 6 | Cyan | `#88c0d0` | 14 | Bright cyan | `#8fbcbb` |
| 7 | White | `#e5e9f0` | 15 | Bright white | `#eceff4` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Nord. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Nord, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/nord.conf` is a byte-for-byte copy of the
`Nord` file in that collection. This extension packages it and claims no authorship
of the palette.
