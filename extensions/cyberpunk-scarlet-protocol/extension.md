---
title: Cyberpunk Scarlet Protocol
tagline: The Cyberpunk Scarlet Protocol terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, cyberpunk, scarlet, protocol]
---

Cyberpunk Scarlet Protocol is a dark palette: the terminal sits on `#101116` and writes in `#e41951`, a contrast ratio of 4.1:1. All 16 ANSI entries are different colours. A selection is drawn on `#c1deff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Cyberpunk Scarlet Protocol" background="#101116" foreground="#e41951" cursor="#76ff9f" selection="#c1deff" ansi="#101116, #ff0051, #01dc84, #faf945, #0271b6, #c930c7, #00c5c7, #c7c7c7, #686868, #ff6e67, #60fa68, #fffc67, #6871ff, #bd35ec, #60fdff, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#101116" name="Background" />
  <Swatch color="#e41951" name="Foreground" />
  <Swatch color="#76ff9f" name="Cursor" />
  <Swatch color="#a6a6a6" name="Cursor text" />
  <Swatch color="#c1deff" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#101116" name="0 Black" />
  <Swatch color="#ff0051" name="1 Red" />
  <Swatch color="#01dc84" name="2 Green" />
  <Swatch color="#faf945" name="3 Yellow" />
  <Swatch color="#0271b6" name="4 Blue" />
  <Swatch color="#c930c7" name="5 Magenta" />
  <Swatch color="#00c5c7" name="6 Cyan" />
  <Swatch color="#c7c7c7" name="7 White" />
  <Swatch color="#686868" name="8 Bright black" />
  <Swatch color="#ff6e67" name="9 Bright red" />
  <Swatch color="#60fa68" name="10 Bright green" />
  <Swatch color="#fffc67" name="11 Bright yellow" />
  <Swatch color="#6871ff" name="12 Bright blue" />
  <Swatch color="#bd35ec" name="13 Bright magenta" />
  <Swatch color="#60fdff" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Cyberpunk Scarlet Protocol. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Cyberpunk Scarlet Protocol, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/cyberpunk-scarlet-protocol.conf` is a byte-for-byte copy of the
`Cyberpunk Scarlet Protocol` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
