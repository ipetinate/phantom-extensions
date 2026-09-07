---
title: Aardvark Ink
tagline: The Aardvark Ink terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aardvark, ink]
---

Aardvark Ink is a dark palette: the terminal sits on `#0f141f` and writes in `#b4bcca`, a contrast ratio of 9.6:1. All 16 ANSI entries are different colours. A selection is drawn on `#2a3645`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Aardvark Ink" background="#0f141f" foreground="#b4bcca" cursor="#b4bcca" selection="#2a3645" ansi="#222734, #c26265, #52aa60, #ad9b49, #487fd4, #af5bd1, #269d9a, #5a6377, #3a4152, #e48383, #75cf84, #c7b461, #76a8f2, #d58bf0, #52c4c0, #dfe5ee" cursorText="#0f141f" selectionText="#dfe5ee" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aardvark Ink. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aardvark Ink, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aardvark-ink.conf` is a byte-for-byte copy of the
`Aardvark Ink` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
