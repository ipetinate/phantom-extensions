---
title: SeedFlip Amethyst
tagline: The SeedFlip Amethyst terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.1
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, seedflip, amethyst]
---

SeedFlip Amethyst is a light palette: the terminal sits on `#f8f7f6` and writes in `#1a0a2e`, a contrast ratio of 17.4:1. All 16 ANSI entries are different colours. A selection is drawn on `#ffffff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#f8f7f6` |
| Foreground | `foreground` | `#1a0a2e` |
| Cursor | `cursor-color` | `#635bff` |
| Cursor text | `cursor-text` | `#1a0a2e` |
| Selection background | `selection-background` | `#ffffff` |
| Selection foreground | `selection-foreground` | `#1a0a2e` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#d7d1cb` | 8 | Bright black | `#b5aba0` |
| 1 | Red | `#bd0f0f` | 9 | Bright red | `#ee2b2b` |
| 2 | Green | `#0fbd49` | 10 | Bright green | `#12d452` |
| 3 | Yellow | `#bda00f` | 11 | Bright yellow | `#d4b312` |
| 4 | Blue | `#0f58bd` | 12 | Bright blue | `#2b7cee` |
| 5 | Magenta | `#bd0fbd` | 13 | Bright magenta | `#ee2bee` |
| 6 | Cyan | `#0fbdbd` | 14 | Bright cyan | `#05c8c8` |
| 7 | White | `#0e0519` | 15 | Bright white | `#1a0a2e` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to SeedFlip Amethyst. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | SeedFlip Amethyst, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/seedflip-amethyst.conf` is a byte-for-byte copy of the
`SeedFlip Amethyst` file in that collection. This extension packages it and claims no authorship
of the palette.
