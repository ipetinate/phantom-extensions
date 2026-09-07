---
title: GitHub Light Colorblind
tagline: The GitHub Light Colorblind terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, github, colorblind]
---

GitHub Light Colorblind is a light palette: the terminal sits on `#ffffff` and writes in `#24292f`, a contrast ratio of 14.7:1. 15 of the 16 ANSI entries are distinct, because 0 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#24292f`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="GitHub Light Colorblind" background="#ffffff" foreground="#24292f" cursor="#0969da" selection="#24292f" ansi="#24292f, #b35900, #0550ae, #4d2d00, #0969da, #8250df, #1b7c83, #6e7781, #57606a, #8a4600, #0969da, #633c01, #218bff, #a475f9, #3192aa, #8c959f" cursorText="#3c9cff" selectionText="#ffffff" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to GitHub Light Colorblind. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | GitHub Light Colorblind, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/github-light-colorblind.conf` is a byte-for-byte copy of the
`GitHub Light Colorblind` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.3** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.2** — Published under Isac Petinate.

**1.0.1** — Credits Isac Petinate, who packaged it, rather than the app.
