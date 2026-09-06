---
title: Material Ocean
tagline: The Material Ocean terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, material, ocean]
---

Material Ocean is a dark palette: the terminal sits on `#0f111a` and writes in `#8f93a2`, a contrast ratio of 6.2:1. 8 of the 16 ANSI entries are distinct, because 8 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#1f2233`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#0f111a` |
| Foreground | `foreground` | `#8f93a2` |
| Cursor | `cursor-color` | `#ffcc00` |
| Cursor text | `cursor-text` | `#0f111a` |
| Selection background | `selection-background` | `#1f2233` |
| Selection foreground | `selection-foreground` | `#8f93a2` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#546e7a` | 8 | Bright black | `#546e7a` |
| 1 | Red | `#ff5370` | 9 | Bright red | `#ff5370` |
| 2 | Green | `#c3e88d` | 10 | Bright green | `#c3e88d` |
| 3 | Yellow | `#ffcb6b` | 11 | Bright yellow | `#ffcb6b` |
| 4 | Blue | `#82aaff` | 12 | Bright blue | `#82aaff` |
| 5 | Magenta | `#c792ea` | 13 | Bright magenta | `#c792ea` |
| 6 | Cyan | `#89ddff` | 14 | Bright cyan | `#89ddff` |
| 7 | White | `#ffffff` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Material Ocean. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Material Ocean, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/material-ocean.conf` is a byte-for-byte copy of the
`Material Ocean` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
