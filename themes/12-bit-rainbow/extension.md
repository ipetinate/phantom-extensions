---
title: 12-bit Rainbow
tagline: The 12-bit Rainbow terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, 12, bit, rainbow]
---

12-bit Rainbow is a dark palette: the terminal sits on `#040404` and writes in `#feffff`, a contrast ratio of 20.5:1. All 16 ANSI entries are different colours. A selection is drawn on `#606060`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="12-bit Rainbow" background="#040404" foreground="#feffff" cursor="#e0d000" selection="#606060" ansi="#000000, #a03050, #40d080, #e09040, #3060b0, #603090, #0090c0, #dbded8, #685656, #c06060, #90d050, #e0d000, #00b0c0, #801070, #20b0c0, #ffffff" cursorText="#000000" selectionText="#ffffff" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to 12-bit Rainbow. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | 12-bit Rainbow, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/12-bit-rainbow.conf` is a byte-for-byte copy of the
`12-bit Rainbow` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
