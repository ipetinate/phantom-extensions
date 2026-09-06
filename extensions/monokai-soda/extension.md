---
title: Monokai Soda
tagline: The Monokai Soda terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, monokai, soda]
---

Monokai Soda is a dark palette: the terminal sits on `#1a1a1a` and writes in `#c4c5b5`, a contrast ratio of 9.9:1. 10 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#343434`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#1a1a1a` |
| Foreground | `foreground` | `#c4c5b5` |
| Cursor | `cursor-color` | `#f6f7ec` |
| Cursor text | `cursor-text` | `#b7b8a8` |
| Selection background | `selection-background` | `#343434` |
| Selection foreground | `selection-foreground` | `#c4c5b5` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#1a1a1a` | 8 | Bright black | `#625e4c` |
| 1 | Red | `#f4005f` | 9 | Bright red | `#f4005f` |
| 2 | Green | `#98e024` | 10 | Bright green | `#98e024` |
| 3 | Yellow | `#fa8419` | 11 | Bright yellow | `#e0d561` |
| 4 | Blue | `#9d65ff` | 12 | Bright blue | `#9d65ff` |
| 5 | Magenta | `#f4005f` | 13 | Bright magenta | `#f4005f` |
| 6 | Cyan | `#58d1eb` | 14 | Bright cyan | `#58d1eb` |
| 7 | White | `#c4c5b5` | 15 | Bright white | `#f6f6ef` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Monokai Soda. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Monokai Soda, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/monokai-soda.conf` is a byte-for-byte copy of the
`Monokai Soda` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
