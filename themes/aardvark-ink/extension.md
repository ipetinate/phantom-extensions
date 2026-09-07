---
title: Aardvark Ink
tagline: The Aardvark Ink terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aardvark, ink]
---

Aardvark Ink is a dark palette: the terminal sits on `#0f141f` and writes in `#b4bcca`, a contrast ratio of 9.6:1. All 16 ANSI entries are different colours. A selection is drawn on `#2a3645`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Aardvark Ink" background="#0f141f" foreground="#b4bcca" cursor="#b4bcca" selection="#2a3645" ansi="#222734, #c26265, #52aa60, #ad9b49, #487fd4, #af5bd1, #269d9a, #5a6377, #3a4152, #e48383, #75cf84, #c7b461, #76a8f2, #d58bf0, #52c4c0, #dfe5ee" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#0f141f" name="Background" />
  <Swatch color="#b4bcca" name="Foreground" />
  <Swatch color="#b4bcca" name="Cursor" />
  <Swatch color="#0f141f" name="Cursor text" />
  <Swatch color="#2a3645" name="Selection" />
  <Swatch color="#dfe5ee" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#222734" name="0 Black" />
  <Swatch color="#c26265" name="1 Red" />
  <Swatch color="#52aa60" name="2 Green" />
  <Swatch color="#ad9b49" name="3 Yellow" />
  <Swatch color="#487fd4" name="4 Blue" />
  <Swatch color="#af5bd1" name="5 Magenta" />
  <Swatch color="#269d9a" name="6 Cyan" />
  <Swatch color="#5a6377" name="7 White" />
  <Swatch color="#3a4152" name="8 Bright black" />
  <Swatch color="#e48383" name="9 Bright red" />
  <Swatch color="#75cf84" name="10 Bright green" />
  <Swatch color="#c7b461" name="11 Bright yellow" />
  <Swatch color="#76a8f2" name="12 Bright blue" />
  <Swatch color="#d58bf0" name="13 Bright magenta" />
  <Swatch color="#52c4c0" name="14 Bright cyan" />
  <Swatch color="#dfe5ee" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aardvark Ink. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aardvark Ink, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aardvark-ink.conf` is a byte-for-byte copy of the
`Aardvark Ink` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
