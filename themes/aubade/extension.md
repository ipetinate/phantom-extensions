---
title: Aubade
tagline: The Aubade terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, aubade]
---

Aubade is a light palette: the terminal sits on `#fbf6fb` and writes in `#3a3340`, a contrast ratio of 11.4:1. 11 of the 16 ANSI entries are distinct, because 4 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#ebe2ee`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Aubade" background="#fbf6fb" foreground="#3a3340" cursor="#ae3f84" selection="#ebe2ee" ansi="#33293f, #c0303a, #2e7d6e, #8c610c, #4a3cc0, #8a4bc0, #ae3f84, #b2b2b2, #9a8fa8, #c0303a, #2e7d6e, #ae3f84, #4a3cc0, #d8b670, #ae3f84, #3a3340" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#fbf6fb" name="Background" />
  <Swatch color="#3a3340" name="Foreground" />
  <Swatch color="#ae3f84" name="Cursor" />
  <Swatch color="#fbf6fb" name="Cursor text" />
  <Swatch color="#ebe2ee" name="Selection" />
  <Swatch color="#aea9ae" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#33293f" name="0 Black" />
  <Swatch color="#c0303a" name="1 Red" />
  <Swatch color="#2e7d6e" name="2 Green" />
  <Swatch color="#8c610c" name="3 Yellow" />
  <Swatch color="#4a3cc0" name="4 Blue" />
  <Swatch color="#8a4bc0" name="5 Magenta" />
  <Swatch color="#ae3f84" name="6 Cyan" />
  <Swatch color="#b2b2b2" name="7 White" />
  <Swatch color="#9a8fa8" name="8 Bright black" />
  <Swatch color="#c0303a" name="9 Bright red" />
  <Swatch color="#2e7d6e" name="10 Bright green" />
  <Swatch color="#ae3f84" name="11 Bright yellow" />
  <Swatch color="#4a3cc0" name="12 Bright blue" />
  <Swatch color="#d8b670" name="13 Bright magenta" />
  <Swatch color="#ae3f84" name="14 Bright cyan" />
  <Swatch color="#3a3340" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aubade. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aubade, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aubade.conf` is a byte-for-byte copy of the
`Aubade` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
