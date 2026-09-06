---
title: Apple System Colors
tagline: The Apple System Colors terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, apple, system, colors]
---

Apple System Colors is a dark palette: the terminal sits on `#1e1e1e` and writes in `#ffffff`, a contrast ratio of 16.7:1. All 16 ANSI entries are different colours. A selection is drawn on `#3f638b`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#1e1e1e` |
| Foreground | `foreground` | `#ffffff` |
| Cursor | `cursor-color` | `#98989d` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#3f638b` |
| Selection foreground | `selection-foreground` | `#ffffff` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#1a1a1a` | 8 | Bright black | `#464646` |
| 1 | Red | `#cc372e` | 9 | Bright red | `#ff453a` |
| 2 | Green | `#26a439` | 10 | Bright green | `#32d74b` |
| 3 | Yellow | `#cdac08` | 11 | Bright yellow | `#ffd60a` |
| 4 | Blue | `#0869cb` | 12 | Bright blue | `#0a84ff` |
| 5 | Magenta | `#9647bf` | 13 | Bright magenta | `#bf5af2` |
| 6 | Cyan | `#479ec2` | 14 | Bright cyan | `#76d6ff` |
| 7 | White | `#98989d` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Apple System Colors. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Apple System Colors, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/apple-system-colors.conf` is a byte-for-byte copy of the
`Apple System Colors` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
