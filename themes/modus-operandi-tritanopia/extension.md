---
title: Modus Operandi Tritanopia
tagline: The Modus Operandi Tritanopia terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, modus, operandi, tritanopia]
---

Modus Operandi Tritanopia is a light palette: the terminal sits on `#ffffff` and writes in `#000000`, a contrast ratio of 21.0:1. 15 of the 16 ANSI entries are distinct, because 0 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#bdbdbd`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Modus Operandi Tritanopia" background="#ffffff" foreground="#000000" cursor="#000000" selection="#bdbdbd" ansi="#000000, #a60000, #006800, #695500, #0031a9, #721045, #005e8b, #a6a6a6, #595959, #b21100, #00663f, #973300, #3548cf, #531ab6, #005f5f, #595959" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#ffffff" name="Background" />
  <Swatch color="#000000" name="Foreground" />
  <Swatch color="#000000" name="Cursor" />
  <Swatch color="#ffffff" name="Cursor text" />
  <Swatch color="#bdbdbd" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#a60000" name="1 Red" />
  <Swatch color="#006800" name="2 Green" />
  <Swatch color="#695500" name="3 Yellow" />
  <Swatch color="#0031a9" name="4 Blue" />
  <Swatch color="#721045" name="5 Magenta" />
  <Swatch color="#005e8b" name="6 Cyan" />
  <Swatch color="#a6a6a6" name="7 White" />
  <Swatch color="#595959" name="8 Bright black" />
  <Swatch color="#b21100" name="9 Bright red" />
  <Swatch color="#00663f" name="10 Bright green" />
  <Swatch color="#973300" name="11 Bright yellow" />
  <Swatch color="#3548cf" name="12 Bright blue" />
  <Swatch color="#531ab6" name="13 Bright magenta" />
  <Swatch color="#005f5f" name="14 Bright cyan" />
  <Swatch color="#595959" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Modus Operandi Tritanopia. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Modus Operandi Tritanopia, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/modus-operandi-tritanopia.conf` is a byte-for-byte copy of the
`Modus Operandi Tritanopia` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.3** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.2** — Published under Isac Petinate.

**1.0.1** — Credits Isac Petinate, who packaged it, rather than the app.
