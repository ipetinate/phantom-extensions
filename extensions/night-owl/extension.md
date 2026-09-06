---
title: Night Owl
tagline: The Night Owl terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, night, owl]
---

Night Owl is a dark palette: the terminal sits on `#011627` and writes in `#d6deeb`, a contrast ratio of 13.5:1. 11 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#5f7e97`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#011627` |
| Foreground | `foreground` | `#d6deeb` |
| Cursor | `cursor-color` | `#7e57c2` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#5f7e97` |
| Selection foreground | `selection-foreground` | `#dfe5ee` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#011627` | 8 | Bright black | `#575656` |
| 1 | Red | `#ef5350` | 9 | Bright red | `#ef5350` |
| 2 | Green | `#22da6e` | 10 | Bright green | `#22da6e` |
| 3 | Yellow | `#addb67` | 11 | Bright yellow | `#ffeb95` |
| 4 | Blue | `#82aaff` | 12 | Bright blue | `#82aaff` |
| 5 | Magenta | `#c792ea` | 13 | Bright magenta | `#c792ea` |
| 6 | Cyan | `#21c7a8` | 14 | Bright cyan | `#7fdbca` |
| 7 | White | `#ffffff` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Night Owl. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Night Owl, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/night-owl.conf` is a byte-for-byte copy of the
`Night Owl` file in that collection. This extension packages it and claims no authorship
of the palette.
