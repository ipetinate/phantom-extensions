---
title: Ayu
tagline: The Ayu terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, ayu]
---

Ayu is a dark palette: the terminal sits on `#0b0e14` and writes in `#bfbdb6`, a contrast ratio of 10.3:1. All 16 ANSI entries are different colours. A selection is drawn on `#409fff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Ayu" background="#0b0e14" foreground="#bfbdb6" cursor="#e6b450" selection="#409fff" ansi="#11151c, #ea6c73, #7fd962, #f9af4f, #53bdfa, #cda1fa, #90e1c6, #c7c7c7, #686868, #f07178, #aad94c, #ffb454, #59c2ff, #d2a6ff, #95e6cb, #ffffff" cursorText="#0b0e14" selectionText="#0b0e14" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Ayu. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Ayu, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/ayu.conf` is a byte-for-byte copy of the
`Ayu` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
