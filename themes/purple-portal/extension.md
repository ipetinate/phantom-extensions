---
title: Purple Portal
tagline: The Purple Portal terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, purple, portal]
---

Purple Portal is a dark palette: the terminal sits on `#160528` and writes in `#faf5ff`, a contrast ratio of 18.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#faf5ff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Purple Portal" background="#160528" foreground="#faf5ff" cursor="#faf5ff" selection="#faf5ff" ansi="#483a57, #fb7185, #34d399, #f472b6, #facc15, #38bdf8, #580ff0, #d8b4fe, #503872, #fc8d9d, #5ddcad, #f68bc3, #fbd644, #60caf9, #793ff3, #faf5ff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#160528" name="Background" />
  <Swatch color="#faf5ff" name="Foreground" />
  <Swatch color="#faf5ff" name="Cursor" />
  <Swatch color="#160528" name="Cursor text" />
  <Swatch color="#faf5ff" name="Selection" />
  <Swatch color="#160528" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#483a57" name="0 Black" />
  <Swatch color="#fb7185" name="1 Red" />
  <Swatch color="#34d399" name="2 Green" />
  <Swatch color="#f472b6" name="3 Yellow" />
  <Swatch color="#facc15" name="4 Blue" />
  <Swatch color="#38bdf8" name="5 Magenta" />
  <Swatch color="#580ff0" name="6 Cyan" />
  <Swatch color="#d8b4fe" name="7 White" />
  <Swatch color="#503872" name="8 Bright black" />
  <Swatch color="#fc8d9d" name="9 Bright red" />
  <Swatch color="#5ddcad" name="10 Bright green" />
  <Swatch color="#f68bc3" name="11 Bright yellow" />
  <Swatch color="#fbd644" name="12 Bright blue" />
  <Swatch color="#60caf9" name="13 Bright magenta" />
  <Swatch color="#793ff3" name="14 Bright cyan" />
  <Swatch color="#faf5ff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Purple Portal. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Purple Portal, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/purple-portal.conf` is a byte-for-byte copy of the
`Purple Portal` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
