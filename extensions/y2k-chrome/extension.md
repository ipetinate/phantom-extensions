---
title: Y2K Chrome
tagline: The Y2K Chrome terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, y2k, chrome]
---

Y2K Chrome is a light palette: the terminal sits on `#f1f5f9` and writes in `#0f172a`, a contrast ratio of 16.3:1. All 16 ANSI entries are different colours. A selection is drawn on `#0f172a`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#f1f5f9` |
| Foreground | `foreground` | `#0f172a` |
| Cursor | `cursor-color` | `#0f172a` |
| Cursor text | `cursor-text` | `#f1f5f9` |
| Selection background | `selection-background` | `#0f172a` |
| Selection foreground | `selection-foreground` | `#f1f5f9` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#383f4f` | 8 | Bright black | `#a3b1c4` |
| 1 | Red | `#dc2626` | 9 | Bright red | `#b01e1e` |
| 2 | Green | `#15803d` | 10 | Bright green | `#116631` |
| 3 | Yellow | `#0891b2` | 11 | Bright yellow | `#077792` |
| 4 | Blue | `#f97316` | 12 | Bright blue | `#c75c12` |
| 5 | Magenta | `#7c3aed` | 13 | Bright magenta | `#632ebe` |
| 6 | Cyan | `#2563eb` | 14 | Bright cyan | `#1e4fbc` |
| 7 | White | `#475569` | 15 | Bright white | `#0f172a` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Y2K Chrome. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Y2K Chrome, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/y2k-chrome.conf` is a byte-for-byte copy of the
`Y2K Chrome` file in that collection. This extension packages it and claims no authorship
of the palette.
