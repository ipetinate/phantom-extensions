---
title: Challenger Deep
tagline: The Challenger Deep terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, challenger, deep]
---

Challenger Deep is a dark palette: the terminal sits on `#1e1c31` and writes in `#cbe1e7`, a contrast ratio of 12.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#cbe1e7`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#1e1c31` |
| Foreground | `foreground` | `#cbe1e7` |
| Cursor | `cursor-color` | `#fbfcfc` |
| Cursor text | `cursor-text` | `#ff271d` |
| Selection background | `selection-background` | `#cbe1e7` |
| Selection foreground | `selection-foreground` | `#1e1c31` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#141228` | 8 | Bright black | `#565575` |
| 1 | Red | `#ff5458` | 9 | Bright red | `#ff8080` |
| 2 | Green | `#62d196` | 10 | Bright green | `#95ffa4` |
| 3 | Yellow | `#ffb378` | 11 | Bright yellow | `#ffe9aa` |
| 4 | Blue | `#65b2ff` | 12 | Bright blue | `#91ddff` |
| 5 | Magenta | `#906cff` | 13 | Bright magenta | `#c991e1` |
| 6 | Cyan | `#63f2f1` | 14 | Bright cyan | `#aaffe4` |
| 7 | White | `#a6b3cc` | 15 | Bright white | `#cbe3e7` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Challenger Deep. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Challenger Deep, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/challenger-deep.conf` is a byte-for-byte copy of the
`Challenger Deep` file in that collection. This extension packages it and claims no authorship
of the palette.
