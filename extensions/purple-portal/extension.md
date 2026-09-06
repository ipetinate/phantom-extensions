---
title: Purple Portal
tagline: The Purple Portal terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, purple, portal]
---

Purple Portal is a dark palette: the terminal sits on `#160528` and writes in `#faf5ff`, a contrast ratio of 18.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#faf5ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#160528` |
| Foreground | `foreground` | `#faf5ff` |
| Cursor | `cursor-color` | `#faf5ff` |
| Cursor text | `cursor-text` | `#160528` |
| Selection background | `selection-background` | `#faf5ff` |
| Selection foreground | `selection-foreground` | `#160528` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#483a57` | 8 | Bright black | `#503872` |
| 1 | Red | `#fb7185` | 9 | Bright red | `#fc8d9d` |
| 2 | Green | `#34d399` | 10 | Bright green | `#5ddcad` |
| 3 | Yellow | `#f472b6` | 11 | Bright yellow | `#f68bc3` |
| 4 | Blue | `#facc15` | 12 | Bright blue | `#fbd644` |
| 5 | Magenta | `#38bdf8` | 13 | Bright magenta | `#60caf9` |
| 6 | Cyan | `#580ff0` | 14 | Bright cyan | `#793ff3` |
| 7 | White | `#d8b4fe` | 15 | Bright white | `#faf5ff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Purple Portal. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Purple Portal, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/purple-portal.conf` is a byte-for-byte copy of the
`Purple Portal` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
