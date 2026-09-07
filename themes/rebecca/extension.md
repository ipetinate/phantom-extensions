---
title: Rebecca
tagline: The Rebecca terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, rebecca]
---

Rebecca is a dark palette: the terminal sits on `#292a44` and writes in `#e8e6ed`, a contrast ratio of 11.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#663399`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Rebecca" background="#292a44" foreground="#e8e6ed" cursor="#b89bf9" selection="#663399" ansi="#12131e, #dd7755, #04dbb5, #f2e7b7, #7aa5ff, #bf9cf9, #56d3c2, #e4e3e9, #666699, #ff92cd, #01eac0, #fffca8, #69c0fa, #c17ff8, #8bfde1, #f4f2f9" cursorText="#292a44" selectionText="#f4f2f9" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Rebecca. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Rebecca, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/rebecca.conf` is a byte-for-byte copy of the
`Rebecca` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
