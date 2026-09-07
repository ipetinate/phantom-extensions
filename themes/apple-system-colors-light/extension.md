---
title: Apple System Colors Light
tagline: The Apple System Colors Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, apple, system, colors]
---

Apple System Colors Light is a light palette: the terminal sits on `#feffff` and writes in `#000000`, a contrast ratio of 21.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#abd8ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Apple System Colors Light" background="#feffff" foreground="#000000" cursor="#98989d" selection="#abd8ff" ansi="#1a1a1a, #cc372e, #26a439, #cdac08, #0869cb, #9647bf, #479ec2, #98989d, #464646, #ff453a, #32d74b, #e5bc00, #0a84ff, #bf5af2, #69c9f2, #ffffff" cursorText="#ffffff" selectionText="#000000" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Apple System Colors Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Apple System Colors Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/apple-system-colors-light.conf` is a byte-for-byte copy of the
`Apple System Colors Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
