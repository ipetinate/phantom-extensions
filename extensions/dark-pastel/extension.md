---
title: Dark Pastel
tagline: The Dark Pastel terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, pastel]
---

Dark Pastel is a dark palette: the terminal sits on `#000000` and writes in `#ffffff`, a contrast ratio of 21.0:1. 10 of the 16 ANSI entries are distinct, because 6 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#b5d5ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#000000` |
| Foreground | `foreground` | `#ffffff` |
| Cursor | `cursor-color` | `#bbbbbb` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#b5d5ff` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#555555` |
| 1 | Red | `#ff5555` | 9 | Bright red | `#ff5555` |
| 2 | Green | `#55ff55` | 10 | Bright green | `#55ff55` |
| 3 | Yellow | `#ffff55` | 11 | Bright yellow | `#ffff55` |
| 4 | Blue | `#5555ff` | 12 | Bright blue | `#5555ff` |
| 5 | Magenta | `#ff55ff` | 13 | Bright magenta | `#ff55ff` |
| 6 | Cyan | `#55ffff` | 14 | Bright cyan | `#55ffff` |
| 7 | White | `#bbbbbb` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Dark Pastel. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Dark Pastel, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/dark-pastel.conf` is a byte-for-byte copy of the
`Dark Pastel` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
