---
title: Purple Portal
tagline: The Purple Portal terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, purple, portal]
---

Purple Portal is a dark palette: the terminal sits on `#160528` and writes in `#faf5ff`, a contrast ratio of 18.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#faf5ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Purple Portal" background="#160528" foreground="#faf5ff" cursor="#faf5ff" selection="#faf5ff" ansi="#483a57, #fb7185, #34d399, #f472b6, #facc15, #38bdf8, #580ff0, #d8b4fe, #503872, #fc8d9d, #5ddcad, #f68bc3, #fbd644, #60caf9, #793ff3, #faf5ff" cursorText="#160528" selectionText="#160528" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Purple Portal. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Purple Portal, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/purple-portal.conf` is a byte-for-byte copy of the
`Purple Portal` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
