---
title: Dawnfox
tagline: The Dawnfox terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, dawnfox]
---

Dawnfox is a light palette: the terminal sits on `#faf4ed` and writes in `#575279`, a contrast ratio of 6.7:1. All 16 ANSI entries are different colours. A selection is drawn on `#d0d8d8`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#faf4ed` |
| Foreground | `foreground` | `#575279` |
| Cursor | `cursor-color` | `#575279` |
| Cursor text | `cursor-text` | `#faf4ed` |
| Selection background | `selection-background` | `#d0d8d8` |
| Selection foreground | `selection-foreground` | `#575279` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#575279` | 8 | Bright black | `#5f5695` |
| 1 | Red | `#b4637a` | 9 | Bright red | `#c26d85` |
| 2 | Green | `#618774` | 10 | Bright green | `#629f81` |
| 3 | Yellow | `#ea9d34` | 11 | Bright yellow | `#eea846` |
| 4 | Blue | `#286983` | 12 | Bright blue | `#2d81a3` |
| 5 | Magenta | `#907aa9` | 13 | Bright magenta | `#9a80b9` |
| 6 | Cyan | `#56949f` | 14 | Bright cyan | `#5ca7b4` |
| 7 | White | `#b2b6bd` | 15 | Bright white | `#e6ebf3` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Dawnfox. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Dawnfox, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/dawnfox.conf` is a byte-for-byte copy of the
`Dawnfox` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
