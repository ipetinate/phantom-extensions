---
title: SeedFlip Amethyst
tagline: The SeedFlip Amethyst terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, seedflip, amethyst]
---

SeedFlip Amethyst is a light palette: the terminal sits on `#f8f7f6` and writes in `#1a0a2e`, a contrast ratio of 17.4:1. All 16 ANSI entries are different colours. A selection is drawn on `#ffffff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="SeedFlip Amethyst" background="#f8f7f6" foreground="#1a0a2e" cursor="#635bff" selection="#ffffff" ansi="#d7d1cb, #bd0f0f, #0fbd49, #bda00f, #0f58bd, #bd0fbd, #0fbdbd, #0e0519, #b5aba0, #ee2b2b, #12d452, #d4b312, #2b7cee, #ee2bee, #05c8c8, #1a0a2e" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#f8f7f6" name="Background" />
  <Swatch color="#1a0a2e" name="Foreground" />
  <Swatch color="#635bff" name="Cursor" />
  <Swatch color="#1a0a2e" name="Cursor text" />
  <Swatch color="#ffffff" name="Selection" />
  <Swatch color="#1a0a2e" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#d7d1cb" name="0 Black" />
  <Swatch color="#bd0f0f" name="1 Red" />
  <Swatch color="#0fbd49" name="2 Green" />
  <Swatch color="#bda00f" name="3 Yellow" />
  <Swatch color="#0f58bd" name="4 Blue" />
  <Swatch color="#bd0fbd" name="5 Magenta" />
  <Swatch color="#0fbdbd" name="6 Cyan" />
  <Swatch color="#0e0519" name="7 White" />
  <Swatch color="#b5aba0" name="8 Bright black" />
  <Swatch color="#ee2b2b" name="9 Bright red" />
  <Swatch color="#12d452" name="10 Bright green" />
  <Swatch color="#d4b312" name="11 Bright yellow" />
  <Swatch color="#2b7cee" name="12 Bright blue" />
  <Swatch color="#ee2bee" name="13 Bright magenta" />
  <Swatch color="#05c8c8" name="14 Bright cyan" />
  <Swatch color="#1a0a2e" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to SeedFlip Amethyst. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | SeedFlip Amethyst, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/seedflip-amethyst.conf` is a byte-for-byte copy of the
`SeedFlip Amethyst` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
