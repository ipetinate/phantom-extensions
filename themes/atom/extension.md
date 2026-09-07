---
title: Atom
tagline: The Atom terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, atom]
---

Atom is a dark palette: the terminal sits on `#161719` and writes in `#c5c8c6`, a contrast ratio of 10.6:1. 11 of the 16 ANSI entries are distinct, because 4 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#444444`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Atom" background="#161719" foreground="#c5c8c6" cursor="#d0d0d0" selection="#444444" ansi="#000000, #fd5ff1, #87c38a, #ffd7b1, #85befd, #b9b6fc, #85befd, #e0e0e0, #4c4c4c, #fd5ff1, #94fa36, #f5ffa8, #96cbfe, #b9b6fc, #85befd, #e0e0e0" cursorText="#151515" selectionText="#c5c8c6" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Atom. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Atom, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/atom.conf` is a byte-for-byte copy of the
`Atom` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
