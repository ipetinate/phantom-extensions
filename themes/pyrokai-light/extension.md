---
title: Pyrokai Light
tagline: The Pyrokai Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, pyrokai]
---

Pyrokai Light is a light palette: the terminal sits on `#faf6f5` and writes in `#242120`, a contrast ratio of 14.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#e4e0de`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Pyrokai Light" background="#faf6f5" foreground="#242120" cursor="#b65318" selection="#e4e0de" ansi="#242120, #b84963, #568413, #8e7100, #0979c4, #b44a74, #008490, #b4afad, #807c7a, #943c50, #456a13, #735a00, #0f619d, #913c5d, #006a74, #faf6f5" cursorText="#faf6f5" selectionText="#242120" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Pyrokai Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Pyrokai Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/pyrokai-light.conf` is a byte-for-byte copy of the
`Pyrokai Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
