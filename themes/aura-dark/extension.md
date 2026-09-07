---
title: Aura Dark
tagline: The Aura Dark terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aura]
---

Aura Dark is a dark palette: the terminal sits on `#15141b` and writes in `#cdccce`, a contrast ratio of 11.4:1. 8 of the 16 ANSI entries are distinct, because 3 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#cdccce`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Aura Dark" background="#15141b" foreground="#cdccce" cursor="#a277ff" selection="#cdccce" ansi="#15141b, #ff6767, #61ffca, #ffca85, #a277ff, #61ffca, #a277ff, #cdccce, #464646, #ffca85, #a277ff, #ffca85, #a277ff, #61ffca, #61ffca, #edecee" cursorText="#15141b" selectionText="#15141b" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aura Dark. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aura Dark, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aura-dark.conf` is a byte-for-byte copy of the
`Aura Dark` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
