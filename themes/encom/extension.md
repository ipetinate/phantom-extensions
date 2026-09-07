---
title: ENCOM
tagline: The ENCOM terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, encom]
---

ENCOM is a dark palette: the terminal sits on `#000000` and writes in `#00a595`, a contrast ratio of 6.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#00a48c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="ENCOM" background="#000000" foreground="#00a595" cursor="#bbbbbb" selection="#00a48c" ansi="#000000, #9f0000, #008b00, #ffd000, #0081ff, #bc00ca, #008b8b, #bbbbbb, #555555, #ff0000, #00ee00, #ffff00, #0000ff, #ff00ff, #00cdcd, #ffffff" cursorText="#ffffff" selectionText="#3de1c9" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to ENCOM. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | ENCOM, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/encom.conf` is a byte-for-byte copy of the
`ENCOM` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
