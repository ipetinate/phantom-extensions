---
title: Aura Dark
tagline: The Aura Dark terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aura]
---

Aura Dark is a dark palette: the terminal sits on `#15141b` and writes in `#cdccce`, a contrast ratio of 11.4:1. 8 of the 16 ANSI entries are distinct, because 3 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#cdccce`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#15141b` |
| Foreground | `foreground` | `#cdccce` |
| Cursor | `cursor-color` | `#a277ff` |
| Cursor text | `cursor-text` | `#15141b` |
| Selection background | `selection-background` | `#cdccce` |
| Selection foreground | `selection-foreground` | `#15141b` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#15141b` | 8 | Bright black | `#464646` |
| 1 | Red | `#ff6767` | 9 | Bright red | `#ffca85` |
| 2 | Green | `#61ffca` | 10 | Bright green | `#a277ff` |
| 3 | Yellow | `#ffca85` | 11 | Bright yellow | `#ffca85` |
| 4 | Blue | `#a277ff` | 12 | Bright blue | `#a277ff` |
| 5 | Magenta | `#61ffca` | 13 | Bright magenta | `#61ffca` |
| 6 | Cyan | `#a277ff` | 14 | Bright cyan | `#61ffca` |
| 7 | White | `#cdccce` | 15 | Bright white | `#edecee` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aura Dark. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aura Dark, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aura-dark.conf` is a byte-for-byte copy of the
`Aura Dark` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
