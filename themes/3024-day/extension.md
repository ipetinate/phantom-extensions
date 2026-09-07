---
title: 3024 Day
tagline: The 3024 Day terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, 3024, day]
---

3024 Day is a light palette: the terminal sits on `#f7f7f7` and writes in `#4a4543`, a contrast ratio of 8.8:1. All 16 ANSI entries are different colours. A selection is drawn on `#a5a2a2`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="3024 Day" background="#f7f7f7" foreground="#4a4543" cursor="#4a4543" selection="#a5a2a2" ansi="#090300, #db2d20, #01a252, #caba00, #01a0e4, #a16a94, #8fbece, #a5a2a2, #5c5855, #dbaec3, #3a3432, #4a4543, #807d7c, #bcbbba, #cdab53, #f7f7f7" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#f7f7f7" name="Background" />
  <Swatch color="#4a4543" name="Foreground" />
  <Swatch color="#4a4543" name="Cursor" />
  <Swatch color="#f7f7f7" name="Cursor text" />
  <Swatch color="#a5a2a2" name="Selection" />
  <Swatch color="#4a4543" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#090300" name="0 Black" />
  <Swatch color="#db2d20" name="1 Red" />
  <Swatch color="#01a252" name="2 Green" />
  <Swatch color="#caba00" name="3 Yellow" />
  <Swatch color="#01a0e4" name="4 Blue" />
  <Swatch color="#a16a94" name="5 Magenta" />
  <Swatch color="#8fbece" name="6 Cyan" />
  <Swatch color="#a5a2a2" name="7 White" />
  <Swatch color="#5c5855" name="8 Bright black" />
  <Swatch color="#dbaec3" name="9 Bright red" />
  <Swatch color="#3a3432" name="10 Bright green" />
  <Swatch color="#4a4543" name="11 Bright yellow" />
  <Swatch color="#807d7c" name="12 Bright blue" />
  <Swatch color="#bcbbba" name="13 Bright magenta" />
  <Swatch color="#cdab53" name="14 Bright cyan" />
  <Swatch color="#f7f7f7" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to 3024 Day. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | 3024 Day, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/3024-day.conf` is a byte-for-byte copy of the
`3024 Day` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
