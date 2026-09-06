---
title: Raycast Light
tagline: The Raycast Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, raycast]
---

Raycast Light is a light palette: the terminal sits on `#ffffff` and writes in `#000000`, a contrast ratio of 21.0:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#e5e5e5`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#ffffff` |
| Foreground | `foreground` | `#000000` |
| Cursor | `cursor-color` | `#000000` |
| Cursor text | `cursor-text` | `#404040` |
| Selection background | `selection-background` | `#e5e5e5` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#000000` |
| 1 | Red | `#b12424` | 9 | Bright red | `#b12424` |
| 2 | Green | `#006b4f` | 10 | Bright green | `#006b4f` |
| 3 | Yellow | `#f8a300` | 11 | Bright yellow | `#f8a300` |
| 4 | Blue | `#138af2` | 12 | Bright blue | `#138af2` |
| 5 | Magenta | `#9a1b6e` | 13 | Bright magenta | `#9a1b6e` |
| 6 | Cyan | `#3eb8bf` | 14 | Bright cyan | `#3eb8bf` |
| 7 | White | `#bfbfbf` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Raycast Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Raycast Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/raycast-light.conf` is a byte-for-byte copy of the
`Raycast Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
