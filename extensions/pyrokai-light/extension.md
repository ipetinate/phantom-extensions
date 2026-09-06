---
title: Pyrokai Light
tagline: The Pyrokai Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, pyrokai]
---

Pyrokai Light is a light palette: the terminal sits on `#faf6f5` and writes in `#242120`, a contrast ratio of 14.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#e4e0de`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#faf6f5` |
| Foreground | `foreground` | `#242120` |
| Cursor | `cursor-color` | `#b65318` |
| Cursor text | `cursor-text` | `#faf6f5` |
| Selection background | `selection-background` | `#e4e0de` |
| Selection foreground | `selection-foreground` | `#242120` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#242120` | 8 | Bright black | `#807c7a` |
| 1 | Red | `#b84963` | 9 | Bright red | `#943c50` |
| 2 | Green | `#568413` | 10 | Bright green | `#456a13` |
| 3 | Yellow | `#8e7100` | 11 | Bright yellow | `#735a00` |
| 4 | Blue | `#0979c4` | 12 | Bright blue | `#0f619d` |
| 5 | Magenta | `#b44a74` | 13 | Bright magenta | `#913c5d` |
| 6 | Cyan | `#008490` | 14 | Bright cyan | `#006a74` |
| 7 | White | `#b4afad` | 15 | Bright white | `#faf6f5` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Pyrokai Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Pyrokai Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/pyrokai-light.conf` is a byte-for-byte copy of the
`Pyrokai Light` file in that collection. This extension packages it and claims no authorship
of the palette.
