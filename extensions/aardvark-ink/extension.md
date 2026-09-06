---
title: Aardvark Ink
tagline: The Aardvark Ink terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.0
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aardvark, ink]
---

Aardvark Ink is a dark palette: the terminal sits on `#0f141f` and writes in `#b4bcca`, a contrast ratio of 9.6:1. All 16 ANSI entries are different colours. A selection is drawn on `#2a3645`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#0f141f` |
| Foreground | `foreground` | `#b4bcca` |
| Cursor | `cursor-color` | `#b4bcca` |
| Cursor text | `cursor-text` | `#0f141f` |
| Selection background | `selection-background` | `#2a3645` |
| Selection foreground | `selection-foreground` | `#dfe5ee` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#222734` | 8 | Bright black | `#3a4152` |
| 1 | Red | `#c26265` | 9 | Bright red | `#e48383` |
| 2 | Green | `#52aa60` | 10 | Bright green | `#75cf84` |
| 3 | Yellow | `#ad9b49` | 11 | Bright yellow | `#c7b461` |
| 4 | Blue | `#487fd4` | 12 | Bright blue | `#76a8f2` |
| 5 | Magenta | `#af5bd1` | 13 | Bright magenta | `#d58bf0` |
| 6 | Cyan | `#269d9a` | 14 | Bright cyan | `#52c4c0` |
| 7 | White | `#5a6377` | 15 | Bright white | `#dfe5ee` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aardvark Ink. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aardvark Ink, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aardvark-ink.conf` is a byte-for-byte copy of the
`Aardvark Ink` file in that collection. This extension packages it and claims no authorship
of the palette.
