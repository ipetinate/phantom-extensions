---
title: Patina Lichen
tagline: The Patina Lichen terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, patina, lichen]
---

Patina Lichen is a light palette: the terminal sits on `#cdd1c6` and writes in `#393a34`, a contrast ratio of 7.4:1. 10 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#aab0a3`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#cdd1c6` |
| Foreground | `foreground` | `#393a34` |
| Cursor | `cursor-color` | `#393a34` |
| Cursor text | `cursor-text` | `#cdd1c6` |
| Selection background | `selection-background` | `#aab0a3` |
| Selection foreground | `selection-foreground` | `#393a34` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#393a34` | 8 | Bright black | `#5b5b54` |
| 1 | Red | `#8b4646` | 9 | Bright red | `#8b4646` |
| 2 | Green | `#33644d` | 10 | Bright green | `#426338` |
| 3 | Yellow | `#7f5031` | 11 | Bright yellow | `#7f5031` |
| 4 | Blue | `#35616d` | 12 | Bright blue | `#35616d` |
| 5 | Magenta | `#854b3f` | 13 | Bright magenta | `#854b3f` |
| 6 | Cyan | `#2a6361` | 14 | Bright cyan | `#2a6361` |
| 7 | White | `#5a5248` | 15 | Bright white | `#393a34` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Patina Lichen. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Patina Lichen, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/patina-lichen.conf` is a byte-for-byte copy of the
`Patina Lichen` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
