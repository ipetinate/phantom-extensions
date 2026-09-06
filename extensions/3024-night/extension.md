---
title: 3024 Night
tagline: The 3024 Night terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, 3024, night]
---

3024 Night is a dark palette: the terminal sits on `#090300` and writes in `#a5a2a2`, a contrast ratio of 8.1:1. All 16 ANSI entries are different colours. A selection is drawn on `#4a4543`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#090300` |
| Foreground | `foreground` | `#a5a2a2` |
| Cursor | `cursor-color` | `#a5a2a2` |
| Cursor text | `cursor-text` | `#090300` |
| Selection background | `selection-background` | `#4a4543` |
| Selection foreground | `selection-foreground` | `#a5a2a2` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#090300` | 8 | Bright black | `#5c5855` |
| 1 | Red | `#db2d20` | 9 | Bright red | `#e8bbd0` |
| 2 | Green | `#01a252` | 10 | Bright green | `#47413f` |
| 3 | Yellow | `#fded02` | 11 | Bright yellow | `#4a4543` |
| 4 | Blue | `#01a0e4` | 12 | Bright blue | `#807d7c` |
| 5 | Magenta | `#a16a94` | 13 | Bright magenta | `#d6d5d4` |
| 6 | Cyan | `#b5e4f4` | 14 | Bright cyan | `#cdab53` |
| 7 | White | `#a5a2a2` | 15 | Bright white | `#f7f7f7` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to 3024 Night. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | 3024 Night, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/3024-night.conf` is a byte-for-byte copy of the
`3024 Night` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
