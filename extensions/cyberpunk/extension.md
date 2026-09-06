---
title: Cyberpunk
tagline: The Cyberpunk terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, cyberpunk]
---

Cyberpunk is a dark palette: the terminal sits on `#332a57` and writes in `#e5e5e5`, a contrast ratio of 10.4:1. 15 of the 16 ANSI entries are distinct, because 1 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#c1deff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#332a57` |
| Foreground | `foreground` | `#e5e5e5` |
| Cursor | `cursor-color` | `#21f6bc` |
| Cursor text | `cursor-text` | `#999999` |
| Selection background | `selection-background` | `#c1deff` |
| Selection foreground | `selection-foreground` | `#000000` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#000000` | 8 | Bright black | `#595959` |
| 1 | Red | `#ff7092` | 9 | Bright red | `#ff8aa4` |
| 2 | Green | `#00fbac` | 10 | Bright green | `#21f6bc` |
| 3 | Yellow | `#fffa6a` | 11 | Bright yellow | `#fff787` |
| 4 | Blue | `#00bfff` | 12 | Bright blue | `#1bccfd` |
| 5 | Magenta | `#df95ff` | 13 | Bright magenta | `#e6aefe` |
| 6 | Cyan | `#86cbfe` | 14 | Bright cyan | `#99d6fc` |
| 7 | White | `#ffffff` | 15 | Bright white | `#ffffff` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Cyberpunk. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Cyberpunk, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/cyberpunk.conf` is a byte-for-byte copy of the
`Cyberpunk` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
