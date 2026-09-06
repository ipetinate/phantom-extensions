---
title: Monokai Classic
tagline: The Monokai Classic terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, monokai, classic]
---

Monokai Classic is a dark palette: the terminal sits on `#272822` and writes in `#fdfff1`, a contrast ratio of 14.7:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#57584f`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#272822` |
| Foreground | `foreground` | `#fdfff1` |
| Cursor | `cursor-color` | `#c0c1b5` |
| Cursor text | `cursor-text` | `#8d8e82` |
| Selection background | `selection-background` | `#57584f` |
| Selection foreground | `selection-foreground` | `#fdfff1` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#272822` | 8 | Bright black | `#6e7066` |
| 1 | Red | `#f92672` | 9 | Bright red | `#f92672` |
| 2 | Green | `#a6e22e` | 10 | Bright green | `#a6e22e` |
| 3 | Yellow | `#e6db74` | 11 | Bright yellow | `#e6db74` |
| 4 | Blue | `#fd971f` | 12 | Bright blue | `#fd971f` |
| 5 | Magenta | `#ae81ff` | 13 | Bright magenta | `#ae81ff` |
| 6 | Cyan | `#66d9ef` | 14 | Bright cyan | `#66d9ef` |
| 7 | White | `#fdfff1` | 15 | Bright white | `#fdfff1` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Monokai Classic. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Monokai Classic, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/monokai-classic.conf` is a byte-for-byte copy of the
`Monokai Classic` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
