---
title: Monokai Remastered
tagline: The Monokai Remastered terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, monokai, remastered]
---

Monokai Remastered is a dark palette: the terminal sits on `#0c0c0c` and writes in `#d9d9d9`, a contrast ratio of 13.9:1. 10 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#343434`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Monokai Remastered" background="#0c0c0c" foreground="#d9d9d9" cursor="#fc971f" selection="#343434" ansi="#1a1a1a, #f4005f, #98e024, #fd971f, #9d65ff, #f4005f, #58d1eb, #c4c5b5, #625e4c, #f4005f, #98e024, #e0d561, #9d65ff, #f4005f, #58d1eb, #f6f6ef" cursorText="#000000" selectionText="#ffffff" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Monokai Remastered. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Monokai Remastered, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/monokai-remastered.conf` is a byte-for-byte copy of the
`Monokai Remastered` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
