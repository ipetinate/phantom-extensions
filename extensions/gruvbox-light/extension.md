---
title: Gruvbox Light
tagline: The Gruvbox Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, gruvbox]
---

Gruvbox Light is a light palette: the terminal sits on `#fbf1c7` and writes in `#3c3836`, a contrast ratio of 10.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#3c3836`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#fbf1c7` |
| Foreground | `foreground` | `#3c3836` |
| Cursor | `cursor-color` | `#3c3836` |
| Cursor text | `cursor-text` | `#fbf1c7` |
| Selection background | `selection-background` | `#3c3836` |
| Selection foreground | `selection-foreground` | `#fbf1c7` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#fbf1c7` | 8 | Bright black | `#928374` |
| 1 | Red | `#cc241d` | 9 | Bright red | `#9d0006` |
| 2 | Green | `#98971a` | 10 | Bright green | `#79740e` |
| 3 | Yellow | `#d79921` | 11 | Bright yellow | `#b57614` |
| 4 | Blue | `#458588` | 12 | Bright blue | `#076678` |
| 5 | Magenta | `#b16286` | 13 | Bright magenta | `#8f3f71` |
| 6 | Cyan | `#689d6a` | 14 | Bright cyan | `#427b58` |
| 7 | White | `#7c6f64` | 15 | Bright white | `#3c3836` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Gruvbox Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Gruvbox Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/gruvbox-light.conf` is a byte-for-byte copy of the
`Gruvbox Light` file in that collection. This extension packages it and claims no authorship
of the palette.
