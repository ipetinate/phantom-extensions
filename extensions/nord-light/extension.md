---
title: Nord Light
tagline: The Nord Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, nord]
---

Nord Light is a light palette: the terminal sits on `#e5e9f0` and writes in `#414858`, a contrast ratio of 7.5:1. 11 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#d8dee9`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#e5e9f0` |
| Foreground | `foreground` | `#414858` |
| Cursor | `cursor-color` | `#7bb3c3` |
| Cursor text | `cursor-text` | `#3b4252` |
| Selection background | `selection-background` | `#d8dee9` |
| Selection foreground | `selection-foreground` | `#4c556a` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#3b4252` | 8 | Bright black | `#4c566a` |
| 1 | Red | `#bf616a` | 9 | Bright red | `#bf616a` |
| 2 | Green | `#96b17f` | 10 | Bright green | `#96b17f` |
| 3 | Yellow | `#c5a565` | 11 | Bright yellow | `#c5a565` |
| 4 | Blue | `#81a1c1` | 12 | Bright blue | `#81a1c1` |
| 5 | Magenta | `#b48ead` | 13 | Bright magenta | `#b48ead` |
| 6 | Cyan | `#7bb3c3` | 14 | Bright cyan | `#82afae` |
| 7 | White | `#a5abb6` | 15 | Bright white | `#eceff4` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Nord Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Nord Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/nord-light.conf` is a byte-for-byte copy of the
`Nord Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
