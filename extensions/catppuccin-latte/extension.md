---
title: Catppuccin Latte
tagline: The Catppuccin Latte terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, catppuccin, latte]
---

Catppuccin Latte is a light palette: the terminal sits on `#eff1f5` and writes in `#4c4f69`, a contrast ratio of 7.1:1. All 16 ANSI entries are different colours. A selection is drawn on `#dc8a78`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Catppuccin Latte" background="#eff1f5" foreground="#4c4f69" cursor="#dc8a78" selection="#dc8a78" ansi="#bcc0cc, #d20f39, #40a02b, #df8e1d, #1e66f5, #ea76cb, #179299, #5c5f77, #acb0be, #e7103f, #46b02f, #e49931, #3878f6, #ef95d7, #19a1a8, #6c6f85" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#eff1f5" name="Background" />
  <Swatch color="#4c4f69" name="Foreground" />
  <Swatch color="#dc8a78" name="Cursor" />
  <Swatch color="#eff1f5" name="Cursor text" />
  <Swatch color="#dc8a78" name="Selection" />
  <Swatch color="#eff1f5" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#bcc0cc" name="0 Black" />
  <Swatch color="#d20f39" name="1 Red" />
  <Swatch color="#40a02b" name="2 Green" />
  <Swatch color="#df8e1d" name="3 Yellow" />
  <Swatch color="#1e66f5" name="4 Blue" />
  <Swatch color="#ea76cb" name="5 Magenta" />
  <Swatch color="#179299" name="6 Cyan" />
  <Swatch color="#5c5f77" name="7 White" />
  <Swatch color="#acb0be" name="8 Bright black" />
  <Swatch color="#e7103f" name="9 Bright red" />
  <Swatch color="#46b02f" name="10 Bright green" />
  <Swatch color="#e49931" name="11 Bright yellow" />
  <Swatch color="#3878f6" name="12 Bright blue" />
  <Swatch color="#ef95d7" name="13 Bright magenta" />
  <Swatch color="#19a1a8" name="14 Bright cyan" />
  <Swatch color="#6c6f85" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Catppuccin Latte. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Catppuccin Latte, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/catppuccin-latte.conf` is a byte-for-byte copy of the
`Catppuccin Latte` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
