---
title: Nord Light
tagline: The Nord Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, nord]
---

Nord Light is a light palette: the terminal sits on `#e5e9f0` and writes in `#414858`, a contrast ratio of 7.5:1. 11 of the 16 ANSI entries are distinct, because 5 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#d8dee9`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Nord Light" background="#e5e9f0" foreground="#414858" cursor="#7bb3c3" selection="#d8dee9" ansi="#3b4252, #bf616a, #96b17f, #c5a565, #81a1c1, #b48ead, #7bb3c3, #a5abb6, #4c566a, #bf616a, #96b17f, #c5a565, #81a1c1, #b48ead, #82afae, #eceff4" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#e5e9f0" name="Background" />
  <Swatch color="#414858" name="Foreground" />
  <Swatch color="#7bb3c3" name="Cursor" />
  <Swatch color="#3b4252" name="Cursor text" />
  <Swatch color="#d8dee9" name="Selection" />
  <Swatch color="#4c556a" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#3b4252" name="0 Black" />
  <Swatch color="#bf616a" name="1 Red" />
  <Swatch color="#96b17f" name="2 Green" />
  <Swatch color="#c5a565" name="3 Yellow" />
  <Swatch color="#81a1c1" name="4 Blue" />
  <Swatch color="#b48ead" name="5 Magenta" />
  <Swatch color="#7bb3c3" name="6 Cyan" />
  <Swatch color="#a5abb6" name="7 White" />
  <Swatch color="#4c566a" name="8 Bright black" />
  <Swatch color="#bf616a" name="9 Bright red" />
  <Swatch color="#96b17f" name="10 Bright green" />
  <Swatch color="#c5a565" name="11 Bright yellow" />
  <Swatch color="#81a1c1" name="12 Bright blue" />
  <Swatch color="#b48ead" name="13 Bright magenta" />
  <Swatch color="#82afae" name="14 Bright cyan" />
  <Swatch color="#eceff4" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Nord Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Nord Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/nord-light.conf` is a byte-for-byte copy of the
`Nord Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
