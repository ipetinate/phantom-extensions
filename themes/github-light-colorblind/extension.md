---
title: GitHub Light Colorblind
tagline: The GitHub Light Colorblind terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.3
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, github, colorblind]
---

GitHub Light Colorblind is a light palette: the terminal sits on `#ffffff` and writes in `#24292f`, a contrast ratio of 14.7:1. 15 of the 16 ANSI entries are distinct, because 0 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#24292f`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="GitHub Light Colorblind" background="#ffffff" foreground="#24292f" cursor="#0969da" selection="#24292f" ansi="#24292f, #b35900, #0550ae, #4d2d00, #0969da, #8250df, #1b7c83, #6e7781, #57606a, #8a4600, #0969da, #633c01, #218bff, #a475f9, #3192aa, #8c959f" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#ffffff" name="Background" />
  <Swatch color="#24292f" name="Foreground" />
  <Swatch color="#0969da" name="Cursor" />
  <Swatch color="#3c9cff" name="Cursor text" />
  <Swatch color="#24292f" name="Selection" />
  <Swatch color="#ffffff" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#24292f" name="0 Black" />
  <Swatch color="#b35900" name="1 Red" />
  <Swatch color="#0550ae" name="2 Green" />
  <Swatch color="#4d2d00" name="3 Yellow" />
  <Swatch color="#0969da" name="4 Blue" />
  <Swatch color="#8250df" name="5 Magenta" />
  <Swatch color="#1b7c83" name="6 Cyan" />
  <Swatch color="#6e7781" name="7 White" />
  <Swatch color="#57606a" name="8 Bright black" />
  <Swatch color="#8a4600" name="9 Bright red" />
  <Swatch color="#0969da" name="10 Bright green" />
  <Swatch color="#633c01" name="11 Bright yellow" />
  <Swatch color="#218bff" name="12 Bright blue" />
  <Swatch color="#a475f9" name="13 Bright magenta" />
  <Swatch color="#3192aa" name="14 Bright cyan" />
  <Swatch color="#8c959f" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to GitHub Light Colorblind. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | GitHub Light Colorblind, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/github-light-colorblind.conf` is a byte-for-byte copy of the
`GitHub Light Colorblind` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.3** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.2** — Published under Isac Petinate.

**1.0.1** — Credits Isac Petinate, who packaged it, rather than the app.
