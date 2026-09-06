---
title: Modus Operandi Tritanopia
tagline: The Modus Operandi Tritanopia terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, modus, operandi, tritanopia]
---

Modus Operandi Tritanopia is a light palette: the terminal sits on `#ffffff` and writes in `#000000`, a contrast ratio of 21.0:1. 15 of the 16 ANSI entries are distinct, because 0 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#bdbdbd`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#ffffff` |
| Foreground | `foreground` | `#000000` |
| Cursor | `cursor-color` | `#000000` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#bdbdbd` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#595959` |
| 1 | Red | `#a60000` | 9 | Bright red | `#b21100` |
| 2 | Green | `#006800` | 10 | Bright green | `#00663f` |
| 3 | Yellow | `#695500` | 11 | Bright yellow | `#973300` |
| 4 | Blue | `#0031a9` | 12 | Bright blue | `#3548cf` |
| 5 | Magenta | `#721045` | 13 | Bright magenta | `#531ab6` |
| 6 | Cyan | `#005e8b` | 14 | Bright cyan | `#005f5f` |
| 7 | White | `#a6a6a6` | 15 | Bright white | `#595959` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Modus Operandi Tritanopia. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Modus Operandi Tritanopia, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/modus-operandi-tritanopia.conf` is a byte-for-byte copy of the
`Modus Operandi Tritanopia` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.1** — Credits Isac Petinate, who packaged it, rather than the app.
