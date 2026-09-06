---
title: Miami Heat
tagline: The Miami Heat terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, miami, heat]
---

Miami Heat is a dark palette: the terminal sits on `#120b2e` and writes in `#fce7ff`, a contrast ratio of 16.2:1. 12 of the 16 ANSI entries are distinct, because 4 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#34215c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Miami Heat" background="#120b2e" foreground="#fce7ff" cursor="#ff2e97" selection="#34215c" ansi="#2a1a4a, #ff3d7f, #2ee6b6, #ffcb52, #29b6ff, #b86bff, #18e0ff, #e6d4ff, #5e5388, #ff2e97, #2ee6b6, #ff7847, #29b6ff, #b86bff, #18e0ff, #fce7ff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#120b2e" name="Background" />
  <Swatch color="#fce7ff" name="Foreground" />
  <Swatch color="#ff2e97" name="Cursor" />
  <Swatch color="#120b2e" name="Cursor text" />
  <Swatch color="#34215c" name="Selection" />
  <Swatch color="#5e577a" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#2a1a4a" name="0 Black" />
  <Swatch color="#ff3d7f" name="1 Red" />
  <Swatch color="#2ee6b6" name="2 Green" />
  <Swatch color="#ffcb52" name="3 Yellow" />
  <Swatch color="#29b6ff" name="4 Blue" />
  <Swatch color="#b86bff" name="5 Magenta" />
  <Swatch color="#18e0ff" name="6 Cyan" />
  <Swatch color="#e6d4ff" name="7 White" />
  <Swatch color="#5e5388" name="8 Bright black" />
  <Swatch color="#ff2e97" name="9 Bright red" />
  <Swatch color="#2ee6b6" name="10 Bright green" />
  <Swatch color="#ff7847" name="11 Bright yellow" />
  <Swatch color="#29b6ff" name="12 Bright blue" />
  <Swatch color="#b86bff" name="13 Bright magenta" />
  <Swatch color="#18e0ff" name="14 Bright cyan" />
  <Swatch color="#fce7ff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Miami Heat. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Miami Heat, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/miami-heat.conf` is a byte-for-byte copy of the
`Miami Heat` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
