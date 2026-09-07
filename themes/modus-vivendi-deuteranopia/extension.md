---
title: Modus Vivendi Deuteranopia
tagline: The Modus Vivendi Deuteranopia terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, modus, vivendi, deuteranopia]
---

Modus Vivendi Deuteranopia is a dark palette: the terminal sits on `#000000` and writes in `#ffffff`, a contrast ratio of 21.0:1. All 16 ANSI entries are different colours. A selection is drawn on `#5a5a5a`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Modus Vivendi Deuteranopia" background="#000000" foreground="#ffffff" cursor="#ffffff" selection="#5a5a5a" ansi="#000000, #ff5f59, #44bc44, #cabf00, #2fafff, #feacd0, #00d3d0, #a6a6a6, #595959, #ff7f9f, #00c06f, #ffa00f, #79a8ff, #b6a0ff, #6ae4b9, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#000000" name="Background" />
  <Swatch color="#ffffff" name="Foreground" />
  <Swatch color="#ffffff" name="Cursor" />
  <Swatch color="#000000" name="Cursor text" />
  <Swatch color="#5a5a5a" name="Selection" />
  <Swatch color="#ffffff" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#ff5f59" name="1 Red" />
  <Swatch color="#44bc44" name="2 Green" />
  <Swatch color="#cabf00" name="3 Yellow" />
  <Swatch color="#2fafff" name="4 Blue" />
  <Swatch color="#feacd0" name="5 Magenta" />
  <Swatch color="#00d3d0" name="6 Cyan" />
  <Swatch color="#a6a6a6" name="7 White" />
  <Swatch color="#595959" name="8 Bright black" />
  <Swatch color="#ff7f9f" name="9 Bright red" />
  <Swatch color="#00c06f" name="10 Bright green" />
  <Swatch color="#ffa00f" name="11 Bright yellow" />
  <Swatch color="#79a8ff" name="12 Bright blue" />
  <Swatch color="#b6a0ff" name="13 Bright magenta" />
  <Swatch color="#6ae4b9" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Modus Vivendi Deuteranopia. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Modus Vivendi Deuteranopia, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/modus-vivendi-deuteranopia.conf` is a byte-for-byte copy of the
`Modus Vivendi Deuteranopia` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
