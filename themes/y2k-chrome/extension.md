---
title: Y2K Chrome
tagline: The Y2K Chrome terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, y2k, chrome]
---

Y2K Chrome is a light palette: the terminal sits on `#f1f5f9` and writes in `#0f172a`, a contrast ratio of 16.3:1. All 16 ANSI entries are different colours. A selection is drawn on `#0f172a`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Y2K Chrome" background="#f1f5f9" foreground="#0f172a" cursor="#0f172a" selection="#0f172a" ansi="#383f4f, #dc2626, #15803d, #0891b2, #f97316, #7c3aed, #2563eb, #475569, #a3b1c4, #b01e1e, #116631, #077792, #c75c12, #632ebe, #1e4fbc, #0f172a" cursorText="#f1f5f9" selectionText="#f1f5f9" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Y2K Chrome. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Y2K Chrome, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/y2k-chrome.conf` is a byte-for-byte copy of the
`Y2K Chrome` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
