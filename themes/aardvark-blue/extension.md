---
title: Aardvark Blue
tagline: The Aardvark Blue terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aardvark, blue]
---

Aardvark Blue is a dark palette: the terminal sits on `#102040` and writes in `#dddddd`, a contrast ratio of 11.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#bfdbfe`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Aardvark Blue" background="#102040" foreground="#dddddd" cursor="#007acc" selection="#bfdbfe" ansi="#191919, #aa342e, #4b8c0f, #dbba00, #1370d3, #c43ac3, #008eb0, #bebebe, #525252, #f05b50, #95dc55, #ffe763, #60a4ec, #e26be2, #60b6cb, #f7f7f7" cursorText="#bfdbfe" selectionText="#000000" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aardvark Blue. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aardvark Blue, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aardvark-blue.conf` is a byte-for-byte copy of the
`Aardvark Blue` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
