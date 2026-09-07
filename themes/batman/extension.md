---
title: Batman
tagline: The Batman terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, batman]
---

Batman is a dark palette: the terminal sits on `#1b1d1e` and writes in `#6f6f6f`, a contrast ratio of 3.4:1. All 16 ANSI entries are different colours. A selection is drawn on `#4d504c`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Batman" background="#1b1d1e" foreground="#6f6f6f" cursor="#fcef0c" selection="#4d504c" ansi="#1b1d1e, #e6dc44, #c8be46, #f4fd22, #737174, #747271, #62605f, #c6c5bf, #505354, #fff78e, #fff27d, #feed6c, #919495, #9a9a9d, #a3a3a6, #dadbd6" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#1b1d1e" name="Background" />
  <Swatch color="#6f6f6f" name="Foreground" />
  <Swatch color="#fcef0c" name="Cursor" />
  <Swatch color="#000000" name="Cursor text" />
  <Swatch color="#4d504c" name="Selection" />
  <Swatch color="#f0e04a" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#1b1d1e" name="0 Black" />
  <Swatch color="#e6dc44" name="1 Red" />
  <Swatch color="#c8be46" name="2 Green" />
  <Swatch color="#f4fd22" name="3 Yellow" />
  <Swatch color="#737174" name="4 Blue" />
  <Swatch color="#747271" name="5 Magenta" />
  <Swatch color="#62605f" name="6 Cyan" />
  <Swatch color="#c6c5bf" name="7 White" />
  <Swatch color="#505354" name="8 Bright black" />
  <Swatch color="#fff78e" name="9 Bright red" />
  <Swatch color="#fff27d" name="10 Bright green" />
  <Swatch color="#feed6c" name="11 Bright yellow" />
  <Swatch color="#919495" name="12 Bright blue" />
  <Swatch color="#9a9a9d" name="13 Bright magenta" />
  <Swatch color="#a3a3a6" name="14 Bright cyan" />
  <Swatch color="#dadbd6" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Batman. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Batman, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/batman.conf` is a byte-for-byte copy of the
`Batman` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
