---
title: Aubade
tagline: The Aubade terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, aubade]
---

Aubade is a light palette: the terminal sits on `#fbf6fb` and writes in `#3a3340`, a contrast ratio of 11.4:1. 11 of the 16 ANSI entries are distinct, because 4 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#ebe2ee`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Aubade" background="#fbf6fb" foreground="#3a3340" cursor="#ae3f84" selection="#ebe2ee" ansi="#33293f, #c0303a, #2e7d6e, #8c610c, #4a3cc0, #8a4bc0, #ae3f84, #b2b2b2, #9a8fa8, #c0303a, #2e7d6e, #ae3f84, #4a3cc0, #d8b670, #ae3f84, #3a3340" cursorText="#fbf6fb" selectionText="#aea9ae" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aubade. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aubade, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aubade.conf` is a byte-for-byte copy of the
`Aubade` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
