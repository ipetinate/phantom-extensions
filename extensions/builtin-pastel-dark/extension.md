---
title: Builtin Pastel Dark
tagline: The Builtin Pastel Dark terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, builtin, pastel]
---

Builtin Pastel Dark is a dark palette: the terminal sits on `#000000` and writes in `#bbbbbb`, a contrast ratio of 10.9:1. All 16 ANSI entries are different colours. A selection is drawn on `#363983`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Builtin Pastel Dark" background="#000000" foreground="#bbbbbb" cursor="#ffa560" selection="#363983" ansi="#4f4f4f, #ff6c60, #a8ff60, #ffffb6, #96cbfe, #ff73fd, #c6c5fe, #eeeeee, #7c7c7c, #ffb6b0, #ceffac, #ffffcc, #b5dcff, #ff9cfe, #dfdffe, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#000000" name="Background" />
  <Swatch color="#bbbbbb" name="Foreground" />
  <Swatch color="#ffa560" name="Cursor" />
  <Swatch color="#ffffff" name="Cursor text" />
  <Swatch color="#363983" name="Selection" />
  <Swatch color="#f2f2f2" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#4f4f4f" name="0 Black" />
  <Swatch color="#ff6c60" name="1 Red" />
  <Swatch color="#a8ff60" name="2 Green" />
  <Swatch color="#ffffb6" name="3 Yellow" />
  <Swatch color="#96cbfe" name="4 Blue" />
  <Swatch color="#ff73fd" name="5 Magenta" />
  <Swatch color="#c6c5fe" name="6 Cyan" />
  <Swatch color="#eeeeee" name="7 White" />
  <Swatch color="#7c7c7c" name="8 Bright black" />
  <Swatch color="#ffb6b0" name="9 Bright red" />
  <Swatch color="#ceffac" name="10 Bright green" />
  <Swatch color="#ffffcc" name="11 Bright yellow" />
  <Swatch color="#b5dcff" name="12 Bright blue" />
  <Swatch color="#ff9cfe" name="13 Bright magenta" />
  <Swatch color="#dfdffe" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Builtin Pastel Dark. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Builtin Pastel Dark, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/builtin-pastel-dark.conf` is a byte-for-byte copy of the
`Builtin Pastel Dark` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
