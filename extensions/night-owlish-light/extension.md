---
title: Night Owlish Light
tagline: The Night Owlish Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, night, owlish]
---

Night Owlish Light is a light palette: the terminal sits on `#ffffff` and writes in `#403f53`, a contrast ratio of 10.2:1. 15 of the 16 ANSI entries are distinct colours. A selection is drawn on `#f2f2f2`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#ffffff` |
| Foreground | `foreground` | `#403f53` |
| Cursor | `cursor-color` | `#403f53` |
| Cursor text | `cursor-text` | `#fbfbfb` |
| Selection background | `selection-background` | `#f2f2f2` |
| Selection foreground | `selection-foreground` | `#403f53` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#011627` | 8 | Bright black | `#7a8181` |
| 1 | Red | `#d3423e` | 9 | Bright red | `#f76e6e` |
| 2 | Green | `#2aa298` | 10 | Bright green | `#49d0c5` |
| 3 | Yellow | `#daaa01` | 11 | Bright yellow | `#dac26b` |
| 4 | Blue | `#4876d6` | 12 | Bright blue | `#5ca7e4` |
| 5 | Magenta | `#403f53` | 13 | Bright magenta | `#697098` |
| 6 | Cyan | `#08916a` | 14 | Bright cyan | `#00c990` |
| 7 | White | `#7a8181` | 15 | Bright white | `#989fb1` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Night Owlish Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Night Owlish Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/night-owlish-light.conf` is a byte-for-byte copy of the
`Night Owlish Light` file in that collection. This extension packages it and claims no authorship
of the palette.
