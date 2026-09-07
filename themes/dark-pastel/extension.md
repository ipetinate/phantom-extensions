---
title: Dark Pastel
tagline: The Dark Pastel terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, pastel]
---

Dark Pastel is a dark palette: the terminal sits on `#000000` and writes in `#ffffff`, a contrast ratio of 21.0:1. 10 of the 16 ANSI entries are distinct, because 6 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#b5d5ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Dark Pastel" background="#000000" foreground="#ffffff" cursor="#bbbbbb" selection="#b5d5ff" ansi="#000000, #ff5555, #55ff55, #ffff55, #5555ff, #ff55ff, #55ffff, #bbbbbb, #555555, #ff5555, #55ff55, #ffff55, #5555ff, #ff55ff, #55ffff, #ffffff" cursorText="#ffffff" selectionText="#000000" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Dark Pastel. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Dark Pastel, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/dark-pastel.conf` is a byte-for-byte copy of the
`Dark Pastel` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
