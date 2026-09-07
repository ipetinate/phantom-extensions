---
title: 3024 Night
tagline: The 3024 Night terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, 3024, night]
---

3024 Night is a dark palette: the terminal sits on `#090300` and writes in `#a5a2a2`, a contrast ratio of 8.1:1. All 16 ANSI entries are different colours. A selection is drawn on `#4a4543`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="3024 Night" background="#090300" foreground="#a5a2a2" cursor="#a5a2a2" selection="#4a4543" ansi="#090300, #db2d20, #01a252, #fded02, #01a0e4, #a16a94, #b5e4f4, #a5a2a2, #5c5855, #e8bbd0, #47413f, #4a4543, #807d7c, #d6d5d4, #cdab53, #f7f7f7" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#090300" name="Background" />
  <Swatch color="#a5a2a2" name="Foreground" />
  <Swatch color="#a5a2a2" name="Cursor" />
  <Swatch color="#090300" name="Cursor text" />
  <Swatch color="#4a4543" name="Selection" />
  <Swatch color="#a5a2a2" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#090300" name="0 Black" />
  <Swatch color="#db2d20" name="1 Red" />
  <Swatch color="#01a252" name="2 Green" />
  <Swatch color="#fded02" name="3 Yellow" />
  <Swatch color="#01a0e4" name="4 Blue" />
  <Swatch color="#a16a94" name="5 Magenta" />
  <Swatch color="#b5e4f4" name="6 Cyan" />
  <Swatch color="#a5a2a2" name="7 White" />
  <Swatch color="#5c5855" name="8 Bright black" />
  <Swatch color="#e8bbd0" name="9 Bright red" />
  <Swatch color="#47413f" name="10 Bright green" />
  <Swatch color="#4a4543" name="11 Bright yellow" />
  <Swatch color="#807d7c" name="12 Bright blue" />
  <Swatch color="#d6d5d4" name="13 Bright magenta" />
  <Swatch color="#cdab53" name="14 Bright cyan" />
  <Swatch color="#f7f7f7" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to 3024 Night. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | 3024 Night, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/3024-night.conf` is a byte-for-byte copy of the
`3024 Night` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
