---
title: Atom
tagline: The Atom terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, atom]
---

Atom is a dark palette: the terminal sits on `#161719` and writes in `#c5c8c6`, a contrast ratio of 10.6:1. 11 of the 16 ANSI entries are distinct, because 4 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#444444`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#161719` |
| Foreground | `foreground` | `#c5c8c6` |
| Cursor | `cursor-color` | `#d0d0d0` |
| Cursor text | `cursor-text` | `#151515` |
| Selection background | `selection-background` | `#444444` |
| Selection foreground | `selection-foreground` | `#c5c8c6` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#4c4c4c` |
| 1 | Red | `#fd5ff1` | 9 | Bright red | `#fd5ff1` |
| 2 | Green | `#87c38a` | 10 | Bright green | `#94fa36` |
| 3 | Yellow | `#ffd7b1` | 11 | Bright yellow | `#f5ffa8` |
| 4 | Blue | `#85befd` | 12 | Bright blue | `#96cbfe` |
| 5 | Magenta | `#b9b6fc` | 13 | Bright magenta | `#b9b6fc` |
| 6 | Cyan | `#85befd` | 14 | Bright cyan | `#85befd` |
| 7 | White | `#e0e0e0` | 15 | Bright white | `#e0e0e0` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Atom. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Atom, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/atom.conf` is a byte-for-byte copy of the
`Atom` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
