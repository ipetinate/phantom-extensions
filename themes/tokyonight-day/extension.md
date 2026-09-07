---
title: TokyoNight Day
tagline: The TokyoNight Day terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, tokyonight, day]
---

TokyoNight Day is a light palette: the terminal sits on `#e1e2e7` and writes in `#3760bf`, a contrast ratio of 4.5:1. 10 of the 16 ANSI entries are distinct, because 6 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#99a7df`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="TokyoNight Day" background="#e1e2e7" foreground="#3760bf" cursor="#3760bf" selection="#99a7df" ansi="#e9e9ed, #f52a65, #587539, #8c6c3e, #2e7de9, #9854f1, #007197, #6172b0, #a1a6c5, #f52a65, #587539, #8c6c3e, #2e7de9, #9854f1, #007197, #3760bf" cursorText="#e1e2e7" selectionText="#3760bf" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to TokyoNight Day. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | TokyoNight Day, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/tokyonight-day.conf` is a byte-for-byte copy of the
`TokyoNight Day` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
