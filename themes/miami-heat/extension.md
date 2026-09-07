---
title: Miami Heat
tagline: The Miami Heat terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, miami, heat]
---

Miami Heat is a dark palette: the terminal sits on `#120b2e` and writes in `#fce7ff`, a contrast ratio of 16.2:1. 12 of the 16 ANSI entries are distinct, because 4 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#34215c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Miami Heat" background="#120b2e" foreground="#fce7ff" cursor="#ff2e97" selection="#34215c" ansi="#2a1a4a, #ff3d7f, #2ee6b6, #ffcb52, #29b6ff, #b86bff, #18e0ff, #e6d4ff, #5e5388, #ff2e97, #2ee6b6, #ff7847, #29b6ff, #b86bff, #18e0ff, #fce7ff" cursorText="#120b2e" selectionText="#5e577a" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Miami Heat. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Miami Heat, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/miami-heat.conf` is a byte-for-byte copy of the
`Miami Heat` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
