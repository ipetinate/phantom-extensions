---
title: Green Phosphor CRT
tagline: The Green Phosphor CRT terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, green, phosphor, crt]
---

Green Phosphor CRT is a dark palette: the terminal sits on `#0b0f0b` and writes in `#33ff33`, a contrast ratio of 14.2:1. 14 of the 16 ANSI entries are distinct colours. A selection is drawn on `#0a3a0a`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#0b0f0b` |
| Foreground | `foreground` | `#33ff33` |
| Cursor | `cursor-color` | `#33ff33` |
| Cursor text | `cursor-text` | `#0b0f0b` |
| Selection background | `selection-background` | `#0a3a0a` |
| Selection foreground | `selection-foreground` | `#575b57` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#002200` | 8 | Bright black | `#0a5a0a` |
| 1 | Red | `#00aa00` | 9 | Bright red | `#19cc19` |
| 2 | Green | `#33ff33` | 10 | Bright green | `#66ff66` |
| 3 | Yellow | `#66ff66` | 11 | Bright yellow | `#99ff99` |
| 4 | Blue | `#00cc44` | 12 | Bright blue | `#33ff77` |
| 5 | Magenta | `#00ff88` | 13 | Bright magenta | `#66ffaa` |
| 6 | Cyan | `#66ffaa` | 14 | Bright cyan | `#99ffcc` |
| 7 | White | `#b6ffb6` | 15 | Bright white | `#e6ffe6` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Green Phosphor CRT. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Green Phosphor CRT, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/green-phosphor-crt.conf` is a byte-for-byte copy of the
`Green Phosphor CRT` file in that collection. This extension packages it and claims no authorship
of the palette.
