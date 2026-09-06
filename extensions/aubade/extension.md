---
title: Aubade
tagline: The Aubade terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, aubade]
---

Aubade is a light palette: the terminal sits on `#fbf6fb` and writes in `#3a3340`, a contrast ratio of 11.4:1. 11 of the 16 ANSI entries are distinct, because 4 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#ebe2ee`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#fbf6fb` |
| Foreground | `foreground` | `#3a3340` |
| Cursor | `cursor-color` | `#ae3f84` |
| Cursor text | `cursor-text` | `#fbf6fb` |
| Selection background | `selection-background` | `#ebe2ee` |
| Selection foreground | `selection-foreground` | `#aea9ae` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#33293f` | 8 | Bright black | `#9a8fa8` |
| 1 | Red | `#c0303a` | 9 | Bright red | `#c0303a` |
| 2 | Green | `#2e7d6e` | 10 | Bright green | `#2e7d6e` |
| 3 | Yellow | `#8c610c` | 11 | Bright yellow | `#ae3f84` |
| 4 | Blue | `#4a3cc0` | 12 | Bright blue | `#4a3cc0` |
| 5 | Magenta | `#8a4bc0` | 13 | Bright magenta | `#d8b670` |
| 6 | Cyan | `#ae3f84` | 14 | Bright cyan | `#ae3f84` |
| 7 | White | `#b2b2b2` | 15 | Bright white | `#3a3340` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aubade. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aubade, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aubade.conf` is a byte-for-byte copy of the
`Aubade` file in that collection. This extension packages it and claims no authorship
of the palette.
