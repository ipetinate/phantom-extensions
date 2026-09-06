---
title: Grape
tagline: The Grape terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, grape]
---

Grape is a dark palette: the terminal sits on `#171423` and writes in `#9f9fa1`, a contrast ratio of 6.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#493d70`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#171423` |
| Foreground | `foreground` | `#9f9fa1` |
| Cursor | `cursor-color` | `#a288f7` |
| Cursor text | `cursor-text` | `#171422` |
| Selection background | `selection-background` | `#493d70` |
| Selection foreground | `selection-foreground` | `#171422` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#2d283f` | 8 | Bright black | `#59516a` |
| 1 | Red | `#ed2261` | 9 | Bright red | `#f0729a` |
| 2 | Green | `#1fa91b` | 10 | Bright green | `#53aa5e` |
| 3 | Yellow | `#8ddc20` | 11 | Bright yellow | `#b2dc87` |
| 4 | Blue | `#487df4` | 12 | Bright blue | `#a9bcec` |
| 5 | Magenta | `#8d35c9` | 13 | Bright magenta | `#ad81c2` |
| 6 | Cyan | `#3bdeed` | 14 | Bright cyan | `#9de3eb` |
| 7 | White | `#9e9ea0` | 15 | Bright white | `#a288f7` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Grape. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Grape, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/grape.conf` is a byte-for-byte copy of the
`Grape` file in that collection. This extension packages it and claims no authorship
of the palette.
