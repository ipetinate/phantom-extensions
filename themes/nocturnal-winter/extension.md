---
title: Nocturnal Winter
tagline: The Nocturnal Winter terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, nocturnal, winter]
---

Nocturnal Winter is a dark palette: the terminal sits on `#0d0d17` and writes in `#e6e5e5`, a contrast ratio of 15.4:1. 15 of the 16 ANSI entries are distinct colours. A selection is drawn on `#adbdd0`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Nocturnal Winter" background="#0d0d17" foreground="#e6e5e5" cursor="#e6e5e5" selection="#adbdd0" ansi="#4d4d4d, #f12d52, #09cd7e, #f5f17a, #3182e0, #ff2b6d, #09c87a, #fcfcfc, #808080, #f16d86, #0ae78d, #fffc67, #6096ff, #ff78a2, #0ae78d, #ffffff" cursorText="#a6a6a6" selectionText="#000000" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Nocturnal Winter. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Nocturnal Winter, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/nocturnal-winter.conf` is a byte-for-byte copy of the
`Nocturnal Winter` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
