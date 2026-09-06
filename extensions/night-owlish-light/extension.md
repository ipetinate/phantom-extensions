---
title: Night Owlish Light
tagline: The Night Owlish Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.2
author:
  name: Phantom
  url: https://github.com/ipetinate/phantom
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, night, owlish]
---

Night Owlish Light is a light palette: the terminal sits on `#ffffff` and writes in `#403f53`, a contrast ratio of 10.2:1. 15 of the 16 ANSI entries are distinct colours. A selection is drawn on `#f2f2f2`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Night Owlish Light" background="#ffffff" foreground="#403f53" cursor="#403f53" selection="#f2f2f2" ansi="#011627, #d3423e, #2aa298, #daaa01, #4876d6, #403f53, #08916a, #7a8181, #7a8181, #f76e6e, #49d0c5, #dac26b, #5ca7e4, #697098, #00c990, #989fb1" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#ffffff" name="Background" />
  <Swatch color="#403f53" name="Foreground" />
  <Swatch color="#403f53" name="Cursor" />
  <Swatch color="#fbfbfb" name="Cursor text" />
  <Swatch color="#f2f2f2" name="Selection" />
  <Swatch color="#403f53" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#011627" name="0 Black" />
  <Swatch color="#d3423e" name="1 Red" />
  <Swatch color="#2aa298" name="2 Green" />
  <Swatch color="#daaa01" name="3 Yellow" />
  <Swatch color="#4876d6" name="4 Blue" />
  <Swatch color="#403f53" name="5 Magenta" />
  <Swatch color="#08916a" name="6 Cyan" />
  <Swatch color="#7a8181" name="7 White" />
  <Swatch color="#7a8181" name="8 Bright black" />
  <Swatch color="#f76e6e" name="9 Bright red" />
  <Swatch color="#49d0c5" name="10 Bright green" />
  <Swatch color="#dac26b" name="11 Bright yellow" />
  <Swatch color="#5ca7e4" name="12 Bright blue" />
  <Swatch color="#697098" name="13 Bright magenta" />
  <Swatch color="#00c990" name="14 Bright cyan" />
  <Swatch color="#989fb1" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Night Owlish Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Night Owlish Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/night-owlish-light.conf` is a byte-for-byte copy of the
`Night Owlish Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.2** — Shows the palette as swatches and the window as a preview, in place of the colour tables.
