---
title: Terminal Basic
tagline: The Terminal Basic terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, basic]
---

Terminal Basic is a light palette: the terminal sits on `#ffffff` and writes in `#000000`, a contrast ratio of 21.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#a4c9ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#ffffff` |
| Foreground | `foreground` | `#000000` |
| Cursor | `cursor-color` | `#7f7f7f` |
| Cursor text | `cursor-text` | `#000000` |
| Selection background | `selection-background` | `#a4c9ff` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#666666` |
| 1 | Red | `#990000` | 9 | Bright red | `#e50000` |
| 2 | Green | `#00a600` | 10 | Bright green | `#00d900` |
| 3 | Yellow | `#999900` | 11 | Bright yellow | `#bfbf00` |
| 4 | Blue | `#0000b2` | 12 | Bright blue | `#0000ff` |
| 5 | Magenta | `#b200b2` | 13 | Bright magenta | `#e500e5` |
| 6 | Cyan | `#00a6b2` | 14 | Bright cyan | `#00d8d8` |
| 7 | White | `#bfbfbf` | 15 | Bright white | `#e5e5e5` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Terminal Basic. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Terminal Basic, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/terminal-basic.conf` is a byte-for-byte copy of the
`Terminal Basic` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
