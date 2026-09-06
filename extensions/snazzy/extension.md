---
title: Snazzy
tagline: The Snazzy terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, snazzy]
---

Snazzy is a dark palette: the terminal sits on `#1e1f29` and writes in `#ebece6`, a contrast ratio of 13.8:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#81aec6`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#1e1f29` |
| Foreground | `foreground` | `#ebece6` |
| Cursor | `cursor-color` | `#e4e4e4` |
| Cursor text | `cursor-text` | `#a9a9a9` |
| Selection background | `selection-background` | `#81aec6` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#555555` |
| 1 | Red | `#fc4346` | 9 | Bright red | `#fc4346` |
| 2 | Green | `#50fb7c` | 10 | Bright green | `#50fb7c` |
| 3 | Yellow | `#f0fb8c` | 11 | Bright yellow | `#f0fb8c` |
| 4 | Blue | `#49baff` | 12 | Bright blue | `#49baff` |
| 5 | Magenta | `#fc4cb4` | 13 | Bright magenta | `#fc4cb4` |
| 6 | Cyan | `#8be9fe` | 14 | Bright cyan | `#8be9fe` |
| 7 | White | `#ededec` | 15 | Bright white | `#ededec` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Snazzy. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Snazzy, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/snazzy.conf` is a byte-for-byte copy of the
`Snazzy` file in that collection. This extension packages it and claims no authorship
of the palette.
