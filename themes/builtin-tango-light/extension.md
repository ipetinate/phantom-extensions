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

<ThemePreview title="Builtin Tango Light" background="#ffffff" foreground="#000000" cursor="#000000" selection="#b5d5ff" ansi="#000000, #cc0000, #4e9a06, #c4a000, #3465a4, #75507b, #06989a, #b9bdb5, #555753, #ef2929, #7dd527, #d6c329, #729fcf, #ad7fa8, #27d5d5, #eeeeec" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#ffffff" name="Background" />
  <Swatch color="#000000" name="Foreground" />
  <Swatch color="#000000" name="Cursor" />
  <Swatch color="#ffffff" name="Cursor text" />
  <Swatch color="#b5d5ff" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#cc0000" name="1 Red" />
  <Swatch color="#4e9a06" name="2 Green" />
  <Swatch color="#c4a000" name="3 Yellow" />
  <Swatch color="#3465a4" name="4 Blue" />
  <Swatch color="#75507b" name="5 Magenta" />
  <Swatch color="#06989a" name="6 Cyan" />
  <Swatch color="#b9bdb5" name="7 White" />
  <Swatch color="#555753" name="8 Bright black" />
  <Swatch color="#ef2929" name="9 Bright red" />
  <Swatch color="#7dd527" name="10 Bright green" />
  <Swatch color="#d6c329" name="11 Bright yellow" />
  <Swatch color="#729fcf" name="12 Bright blue" />
  <Swatch color="#ad7fa8" name="13 Bright magenta" />
  <Swatch color="#27d5d5" name="14 Bright cyan" />
  <Swatch color="#eeeeec" name="15 Bright white" />
</Swatches>

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
