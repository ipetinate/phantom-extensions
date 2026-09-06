---
title: GitLab Light
tagline: The GitLab Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, gitlab]
---

GitLab Light is a light palette: the terminal sits on `#fafaff` and writes in `#303030`, a contrast ratio of 12.7:1. 7 of the 16 ANSI entries are distinct, because 8 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#ad95e9`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## Terminal colours

| Role | Key | Colour |
|---|---|---|
| Background | `background` | `#fafaff` |
| Foreground | `foreground` | `#303030` |
| Cursor | `cursor-color` | `#303030` |
| Cursor text | `cursor-text` | `#565656` |
| Selection background | `selection-background` | `#ad95e9` |
| Selection foreground | `selection-foreground` | `#fafaff` |

## The ANSI 16

| # | Name | Colour | # | Name | Colour |
|---|---|---|---|---|---|
| 0 | Black | `#303030` | 8 | Bright black | `#303030` |
| 1 | Red | `#a31700` | 9 | Bright red | `#a31700` |
| 2 | Green | `#0a7f3d` | 10 | Bright green | `#0a7f3d` |
| 3 | Yellow | `#af551d` | 11 | Bright yellow | `#af551d` |
| 4 | Blue | `#006cd8` | 12 | Bright blue | `#006cd8` |
| 5 | Magenta | `#583cac` | 13 | Bright magenta | `#583cac` |
| 6 | Cyan | `#00798a` | 14 | Bright cyan | `#00798a` |
| 7 | White | `#303030` | 15 | Bright white | `#303030` |

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to GitLab Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | GitLab Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/gitlab-light.conf` is a byte-for-byte copy of the
`GitLab Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
