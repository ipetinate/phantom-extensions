---
title: Builtin Tango Light
tagline: The Builtin Tango Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, builtin, tango]
---

Builtin Tango Light is a light palette: the terminal sits on `#ffffff` and writes in `#000000`, a contrast ratio of 21.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#b5d5ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#ffffff` |
| Foreground | `foreground` | `#000000` |
| Cursor | `cursor-color` | `#000000` |
| Cursor text | `cursor-text` | `#ffffff` |
| Selection background | `selection-background` | `#b5d5ff` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#555753` |
| 1 | Red | `#cc0000` | 9 | Bright red | `#ef2929` |
| 2 | Green | `#4e9a06` | 10 | Bright green | `#7dd527` |
| 3 | Yellow | `#c4a000` | 11 | Bright yellow | `#d6c329` |
| 4 | Blue | `#3465a4` | 12 | Bright blue | `#729fcf` |
| 5 | Magenta | `#75507b` | 13 | Bright magenta | `#ad7fa8` |
| 6 | Cyan | `#06989a` | 14 | Bright cyan | `#27d5d5` |
| 7 | White | `#b9bdb5` | 15 | Bright white | `#eeeeec` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Builtin Tango Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Builtin Tango Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/builtin-tango-light.conf` is a byte-for-byte copy of the
`Builtin Tango Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Published under Isac Petinate.

**1.0.1** — Credits Isac Petinate, who packaged it, rather than the app.
