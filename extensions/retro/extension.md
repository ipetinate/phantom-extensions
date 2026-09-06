---
title: Retro
tagline: The Retro terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, retro]
---

Retro is a dark palette: the terminal sits on `#000000` and writes in `#13a10e`, a contrast ratio of 6.1:1. 2 of the 16 ANSI entries are distinct colours. A selection is drawn on `#ffffff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#000000` |
| Foreground | `foreground` | `#13a10e` |
| Cursor | `cursor-color` | `#13a10e` |
| Cursor text | `cursor-text` | `#000000` |
| Selection background | `selection-background` | `#ffffff` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#13a10e` | 8 | Bright black | `#16ba10` |
| 1 | Red | `#13a10e` | 9 | Bright red | `#16ba10` |
| 2 | Green | `#13a10e` | 10 | Bright green | `#16ba10` |
| 3 | Yellow | `#13a10e` | 11 | Bright yellow | `#16ba10` |
| 4 | Blue | `#13a10e` | 12 | Bright blue | `#16ba10` |
| 5 | Magenta | `#13a10e` | 13 | Bright magenta | `#16ba10` |
| 6 | Cyan | `#13a10e` | 14 | Bright cyan | `#16ba10` |
| 7 | White | `#13a10e` | 15 | Bright white | `#16ba10` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Retro. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Retro, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/retro.conf` is a byte-for-byte copy of the
`Retro` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
