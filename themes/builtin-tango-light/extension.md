---
title: Builtin Tango Light
tagline: The Builtin Tango Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, builtin, tango]
---

Builtin Tango Light is a light palette: the terminal sits on `#ffffff` and writes in `#000000`, a contrast ratio of 21.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#b5d5ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Builtin Tango Light" background="#ffffff" foreground="#000000" cursor="#000000" selection="#b5d5ff" ansi="#000000, #cc0000, #4e9a06, #c4a000, #3465a4, #75507b, #06989a, #b9bdb5, #555753, #ef2929, #7dd527, #d6c329, #729fcf, #ad7fa8, #27d5d5, #eeeeec" cursorText="#ffffff" selectionText="#000000" />

The panel is painted from the file this extension installs: the blocks on the left name every
colour and the job it does in the app, and the window on the right is that same palette in place.

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Builtin Tango Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Builtin Tango Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/builtin-tango-light.conf` is a byte-for-byte copy of the
`Builtin Tango Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.3** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.2** — Published under Isac Petinate.

**1.0.1** — Credits Isac Petinate, who packaged it, rather than the app.
