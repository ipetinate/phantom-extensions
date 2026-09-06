---
title: Synthwave Everything
tagline: The Synthwave Everything terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, synthwave, everything]
---

Synthwave Everything is a dark palette: the terminal sits on `#2a2139` and writes in `#f0eff1`, a contrast ratio of 13.3:1. 12 of the 16 ANSI entries are distinct, because 3 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#181521`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#2a2139` |
| Foreground | `foreground` | `#f0eff1` |
| Cursor | `cursor-color` | `#72f1b8` |
| Cursor text | `cursor-text` | `#1a1a1a` |
| Selection background | `selection-background` | `#181521` |
| Selection foreground | `selection-foreground` | `#f0eff1` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#fefefe` | 8 | Bright black | `#fefefe` |
| 1 | Red | `#f97e72` | 9 | Bright red | `#f88414` |
| 2 | Green | `#72f1b8` | 10 | Bright green | `#72f1b8` |
| 3 | Yellow | `#fede5d` | 11 | Bright yellow | `#fff951` |
| 4 | Blue | `#6d77b3` | 12 | Bright blue | `#36f9f6` |
| 5 | Magenta | `#c792ea` | 13 | Bright magenta | `#e1acff` |
| 6 | Cyan | `#f772e0` | 14 | Bright cyan | `#f92aad` |
| 7 | White | `#fefefe` | 15 | Bright white | `#fefefe` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Synthwave Everything. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Synthwave Everything, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/synthwave-everything.conf` is a byte-for-byte copy of the
`Synthwave Everything` file in that collection. This extension packages it and claims no authorship
of the palette.
