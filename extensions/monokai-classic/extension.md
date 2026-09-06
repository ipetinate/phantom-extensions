---
title: Monokai Classic
tagline: The Monokai Classic terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, monokai, classic]
---

Monokai Classic is a dark palette: the terminal sits on `#272822` and writes in `#fdfff1`, a contrast ratio of 14.7:1. 9 of the 16 ANSI entries are distinct, because 7 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#57584f`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Monokai Classic" background="#272822" foreground="#fdfff1" cursor="#c0c1b5" selection="#57584f" ansi="#272822, #f92672, #a6e22e, #e6db74, #fd971f, #ae81ff, #66d9ef, #fdfff1, #6e7066, #f92672, #a6e22e, #e6db74, #fd971f, #ae81ff, #66d9ef, #fdfff1" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#272822" name="Background" />
  <Swatch color="#fdfff1" name="Foreground" />
  <Swatch color="#c0c1b5" name="Cursor" />
  <Swatch color="#8d8e82" name="Cursor text" />
  <Swatch color="#57584f" name="Selection" />
  <Swatch color="#fdfff1" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#272822" name="0 Black" />
  <Swatch color="#f92672" name="1 Red" />
  <Swatch color="#a6e22e" name="2 Green" />
  <Swatch color="#e6db74" name="3 Yellow" />
  <Swatch color="#fd971f" name="4 Blue" />
  <Swatch color="#ae81ff" name="5 Magenta" />
  <Swatch color="#66d9ef" name="6 Cyan" />
  <Swatch color="#fdfff1" name="7 White" />
  <Swatch color="#6e7066" name="8 Bright black" />
  <Swatch color="#f92672" name="9 Bright red" />
  <Swatch color="#a6e22e" name="10 Bright green" />
  <Swatch color="#e6db74" name="11 Bright yellow" />
  <Swatch color="#fd971f" name="12 Bright blue" />
  <Swatch color="#ae81ff" name="13 Bright magenta" />
  <Swatch color="#66d9ef" name="14 Bright cyan" />
  <Swatch color="#fdfff1" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Monokai Classic. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Monokai Classic, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/monokai-classic.conf` is a byte-for-byte copy of the
`Monokai Classic` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
