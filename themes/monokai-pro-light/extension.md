---
title: Monokai Pro Light
tagline: The Monokai Pro Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, monokai, pro]
---

Monokai Pro Light is a light palette: the terminal sits on `#faf4f2` and writes in `#29242a`, a contrast ratio of 14.0:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#bfb9ba`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Monokai Pro Light" background="#faf4f2" foreground="#29242a" cursor="#706b6e" selection="#bfb9ba" ansi="#faf4f2, #e14775, #269d69, #cc7a0a, #e16032, #7058be, #1c8ca8, #29242a, #a59fa0, #e14775, #269d69, #cc7a0a, #e16032, #7058be, #1c8ca8, #29242a" cursorText="#a39ea1" selectionText="#29242a" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Monokai Pro Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Monokai Pro Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/monokai-pro-light.conf` is a byte-for-byte copy of the
`Monokai Pro Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
