---
title: Iceberg Light
tagline: The Iceberg Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, iceberg]
---

Iceberg Light is a light palette: the terminal sits on `#e8e9ec` and writes in `#33374c`, a contrast ratio of 9.7:1. All 16 ANSI entries are different colours. A selection is drawn on `#33374c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Iceberg Light" background="#e8e9ec" foreground="#33374c" cursor="#33374c" selection="#33374c" ansi="#dcdfe7, #cc517a, #668e3d, #c57339, #2d539e, #7759b4, #3f83a6, #33374c, #8389a3, #cc3768, #598030, #b6662d, #22478e, #6845ad, #327698, #262a3f" cursorText="#e8e9ec" selectionText="#e8e9ec" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Iceberg Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Iceberg Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/iceberg-light.conf` is a byte-for-byte copy of the
`Iceberg Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
