---
title: TokyoNight Day
tagline: The TokyoNight Day terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, tokyonight, day]
---

TokyoNight Day is a light palette: the terminal sits on `#e1e2e7` and writes in `#3760bf`, a contrast ratio of 4.5:1. 10 of the 16 ANSI entries are distinct, because 6 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#99a7df`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#e1e2e7` |
| Foreground | `foreground` | `#3760bf` |
| Cursor | `cursor-color` | `#3760bf` |
| Cursor text | `cursor-text` | `#e1e2e7` |
| Selection background | `selection-background` | `#99a7df` |
| Selection foreground | `selection-foreground` | `#3760bf` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#e9e9ed` | 8 | Bright black | `#a1a6c5` |
| 1 | Red | `#f52a65` | 9 | Bright red | `#f52a65` |
| 2 | Green | `#587539` | 10 | Bright green | `#587539` |
| 3 | Yellow | `#8c6c3e` | 11 | Bright yellow | `#8c6c3e` |
| 4 | Blue | `#2e7de9` | 12 | Bright blue | `#2e7de9` |
| 5 | Magenta | `#9854f1` | 13 | Bright magenta | `#9854f1` |
| 6 | Cyan | `#007197` | 14 | Bright cyan | `#007197` |
| 7 | White | `#6172b0` | 15 | Bright white | `#3760bf` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to TokyoNight Day. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | TokyoNight Day, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/tokyonight-day.conf` is a byte-for-byte copy of the
`TokyoNight Day` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
