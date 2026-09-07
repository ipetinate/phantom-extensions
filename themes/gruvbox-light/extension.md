---
title: Gruvbox Light
tagline: The Gruvbox Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, gruvbox]
---

Gruvbox Light is a light palette: the terminal sits on `#fbf1c7` and writes in `#3c3836`, a contrast ratio of 10.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#3c3836`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Gruvbox Light" background="#fbf1c7" foreground="#3c3836" cursor="#3c3836" selection="#3c3836" ansi="#fbf1c7, #cc241d, #98971a, #d79921, #458588, #b16286, #689d6a, #7c6f64, #928374, #9d0006, #79740e, #b57614, #076678, #8f3f71, #427b58, #3c3836" cursorText="#fbf1c7" selectionText="#fbf1c7" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Gruvbox Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Gruvbox Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/gruvbox-light.conf` is a byte-for-byte copy of the
`Gruvbox Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
