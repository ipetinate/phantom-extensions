---
title: Ayu Light
tagline: The Ayu Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, ayu]
---

Ayu Light is a light palette: the terminal sits on `#f8f9fa` and writes in `#5c6166`, a contrast ratio of 5.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#035bd6`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Ayu Light" background="#f8f9fa" foreground="#5c6166" cursor="#ffaa33" selection="#035bd6" ansi="#000000, #ea6c6d, #6cbf43, #eca944, #3199e1, #9e75c7, #46ba94, #bababa, #686868, #f07171, #86b300, #f2ae49, #399ee6, #a37acc, #4cbf99, #d1d1d1" cursorText="#f8f9fa" selectionText="#f8f9fa" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Ayu Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Ayu Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/ayu-light.conf` is a byte-for-byte copy of the
`Ayu Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
