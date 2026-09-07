---
title: GitHub Dark Colorblind
tagline: The GitHub Dark Colorblind terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, github, colorblind]
---

GitHub Dark Colorblind is a dark palette: the terminal sits on `#0d1117` and writes in `#c9d1d9`, a contrast ratio of 12.3:1. 14 of the 16 ANSI entries are distinct colours. A selection is drawn on `#c9d1d9`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="GitHub Dark Colorblind" background="#0d1117" foreground="#c9d1d9" cursor="#58a6ff" selection="#c9d1d9" ansi="#484f58, #ec8e2c, #58a6ff, #d29922, #58a6ff, #bc8cff, #39c5cf, #b1bac4, #6e7681, #fdac54, #79c0ff, #e3b341, #79c0ff, #d2a8ff, #56d4dd, #ffffff" cursorText="#98e6ff" selectionText="#0d1117" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to GitHub Dark Colorblind. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | GitHub Dark Colorblind, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/github-dark-colorblind.conf` is a byte-for-byte copy of the
`GitHub Dark Colorblind` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
