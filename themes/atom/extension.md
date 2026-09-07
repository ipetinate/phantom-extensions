---
title: Atom
tagline: The Atom terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, atom]
---

Atom is a dark palette: the terminal sits on `#161719` and writes in `#c5c8c6`, a contrast ratio of 10.6:1. 11 of the 16 ANSI entries are distinct, because 4 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#444444`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Atom" background="#161719" foreground="#c5c8c6" cursor="#d0d0d0" selection="#444444" ansi="#000000, #fd5ff1, #87c38a, #ffd7b1, #85befd, #b9b6fc, #85befd, #e0e0e0, #4c4c4c, #fd5ff1, #94fa36, #f5ffa8, #96cbfe, #b9b6fc, #85befd, #e0e0e0" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#161719" name="Background" />
  <Swatch color="#c5c8c6" name="Foreground" />
  <Swatch color="#d0d0d0" name="Cursor" />
  <Swatch color="#151515" name="Cursor text" />
  <Swatch color="#444444" name="Selection" />
  <Swatch color="#c5c8c6" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#fd5ff1" name="1 Red" />
  <Swatch color="#87c38a" name="2 Green" />
  <Swatch color="#ffd7b1" name="3 Yellow" />
  <Swatch color="#85befd" name="4 Blue" />
  <Swatch color="#b9b6fc" name="5 Magenta" />
  <Swatch color="#85befd" name="6 Cyan" />
  <Swatch color="#e0e0e0" name="7 White" />
  <Swatch color="#4c4c4c" name="8 Bright black" />
  <Swatch color="#fd5ff1" name="9 Bright red" />
  <Swatch color="#94fa36" name="10 Bright green" />
  <Swatch color="#f5ffa8" name="11 Bright yellow" />
  <Swatch color="#96cbfe" name="12 Bright blue" />
  <Swatch color="#b9b6fc" name="13 Bright magenta" />
  <Swatch color="#85befd" name="14 Bright cyan" />
  <Swatch color="#e0e0e0" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Atom. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Atom, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/atom.conf` is a byte-for-byte copy of the
`Atom` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
