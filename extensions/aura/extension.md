---
title: Aura
tagline: The Aura terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aura]
---

Aura is a dark palette: the terminal sits on `#15141b` and writes in `#edecee`, a contrast ratio of 15.5:1. 7 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#a277ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#15141b` |
| Foreground | `foreground` | `#edecee` |
| Cursor | `cursor-color` | `#a277ff` |
| Cursor text | `cursor-text` | `#edecee` |
| Selection background | `selection-background` | `#a277ff` |
| Selection foreground | `selection-foreground` | `#edecee` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#110f18` | 8 | Bright black | `#4d4d4d` |
| 1 | Red | `#ff6767` | 9 | Bright red | `#ffca85` |
| 2 | Green | `#61ffca` | 10 | Bright green | `#a277ff` |
| 3 | Yellow | `#ffca85` | 11 | Bright yellow | `#ffca85` |
| 4 | Blue | `#a277ff` | 12 | Bright blue | `#a277ff` |
| 5 | Magenta | `#a277ff` | 13 | Bright magenta | `#a277ff` |
| 6 | Cyan | `#61ffca` | 14 | Bright cyan | `#61ffca` |
| 7 | White | `#edecee` | 15 | Bright white | `#edecee` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aura. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aura, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aura.conf` is a byte-for-byte copy of the
`Aura` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
