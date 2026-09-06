---
title: Miami Heat
tagline: The Miami Heat terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, miami, heat]
---

Miami Heat is a dark palette: the terminal sits on `#120b2e` and writes in `#fce7ff`, a contrast ratio of 16.2:1. 12 of the 16 ANSI entries are distinct, because 4 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#34215c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#120b2e` |
| Foreground | `foreground` | `#fce7ff` |
| Cursor | `cursor-color` | `#ff2e97` |
| Cursor text | `cursor-text` | `#120b2e` |
| Selection background | `selection-background` | `#34215c` |
| Selection foreground | `selection-foreground` | `#5e577a` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#2a1a4a` | 8 | Bright black | `#5e5388` |
| 1 | Red | `#ff3d7f` | 9 | Bright red | `#ff2e97` |
| 2 | Green | `#2ee6b6` | 10 | Bright green | `#2ee6b6` |
| 3 | Yellow | `#ffcb52` | 11 | Bright yellow | `#ff7847` |
| 4 | Blue | `#29b6ff` | 12 | Bright blue | `#29b6ff` |
| 5 | Magenta | `#b86bff` | 13 | Bright magenta | `#b86bff` |
| 6 | Cyan | `#18e0ff` | 14 | Bright cyan | `#18e0ff` |
| 7 | White | `#e6d4ff` | 15 | Bright white | `#fce7ff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Miami Heat. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Miami Heat, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/miami-heat.conf` is a byte-for-byte copy of the
`Miami Heat` file in that collection. This extension packages it and claims no authorship
of the palette.
