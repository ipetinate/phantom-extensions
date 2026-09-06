---
title: Aura Dark
tagline: The Aura Dark terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, aura]
---

Aura Dark is a dark palette: the terminal sits on `#15141b` and writes in `#cdccce`, a contrast ratio of 11.4:1. 8 of the 16 ANSI entries are distinct, because 3 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#cdccce`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Aura Dark" background="#15141b" foreground="#cdccce" cursor="#a277ff" selection="#cdccce" ansi="#15141b, #ff6767, #61ffca, #ffca85, #a277ff, #61ffca, #a277ff, #cdccce, #464646, #ffca85, #a277ff, #ffca85, #a277ff, #61ffca, #61ffca, #edecee" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#15141b" name="Background" />
  <Swatch color="#cdccce" name="Foreground" />
  <Swatch color="#a277ff" name="Cursor" />
  <Swatch color="#15141b" name="Cursor text" />
  <Swatch color="#cdccce" name="Selection" />
  <Swatch color="#15141b" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#15141b" name="0 Black" />
  <Swatch color="#ff6767" name="1 Red" />
  <Swatch color="#61ffca" name="2 Green" />
  <Swatch color="#ffca85" name="3 Yellow" />
  <Swatch color="#a277ff" name="4 Blue" />
  <Swatch color="#61ffca" name="5 Magenta" />
  <Swatch color="#a277ff" name="6 Cyan" />
  <Swatch color="#cdccce" name="7 White" />
  <Swatch color="#464646" name="8 Bright black" />
  <Swatch color="#ffca85" name="9 Bright red" />
  <Swatch color="#a277ff" name="10 Bright green" />
  <Swatch color="#ffca85" name="11 Bright yellow" />
  <Swatch color="#a277ff" name="12 Bright blue" />
  <Swatch color="#61ffca" name="13 Bright magenta" />
  <Swatch color="#61ffca" name="14 Bright cyan" />
  <Swatch color="#edecee" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Aura Dark. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Aura Dark, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/aura-dark.conf` is a byte-for-byte copy of the
`Aura Dark` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
