---
title: Snazzy
tagline: The Snazzy terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, snazzy]
---

Snazzy is a dark palette: the terminal sits on `#1e1f29` and writes in `#ebece6`, a contrast ratio of 13.8:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#81aec6`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Snazzy" background="#1e1f29" foreground="#ebece6" cursor="#e4e4e4" selection="#81aec6" ansi="#000000, #fc4346, #50fb7c, #f0fb8c, #49baff, #fc4cb4, #8be9fe, #ededec, #555555, #fc4346, #50fb7c, #f0fb8c, #49baff, #fc4cb4, #8be9fe, #ededec" cursorText="#a9a9a9" selectionText="#000000" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Snazzy. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Snazzy, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/snazzy.conf` is a byte-for-byte copy of the
`Snazzy` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
