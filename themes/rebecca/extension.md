---
title: Rebecca
tagline: The Rebecca terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, rebecca]
---

Rebecca is a dark palette: the terminal sits on `#292a44` and writes in `#e8e6ed`, a contrast ratio of 11.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#663399`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Rebecca" background="#292a44" foreground="#e8e6ed" cursor="#b89bf9" selection="#663399" ansi="#12131e, #dd7755, #04dbb5, #f2e7b7, #7aa5ff, #bf9cf9, #56d3c2, #e4e3e9, #666699, #ff92cd, #01eac0, #fffca8, #69c0fa, #c17ff8, #8bfde1, #f4f2f9" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#292a44" name="Background" />
  <Swatch color="#e8e6ed" name="Foreground" />
  <Swatch color="#b89bf9" name="Cursor" />
  <Swatch color="#292a44" name="Cursor text" />
  <Swatch color="#663399" name="Selection" />
  <Swatch color="#f4f2f9" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#12131e" name="0 Black" />
  <Swatch color="#dd7755" name="1 Red" />
  <Swatch color="#04dbb5" name="2 Green" />
  <Swatch color="#f2e7b7" name="3 Yellow" />
  <Swatch color="#7aa5ff" name="4 Blue" />
  <Swatch color="#bf9cf9" name="5 Magenta" />
  <Swatch color="#56d3c2" name="6 Cyan" />
  <Swatch color="#e4e3e9" name="7 White" />
  <Swatch color="#666699" name="8 Bright black" />
  <Swatch color="#ff92cd" name="9 Bright red" />
  <Swatch color="#01eac0" name="10 Bright green" />
  <Swatch color="#fffca8" name="11 Bright yellow" />
  <Swatch color="#69c0fa" name="12 Bright blue" />
  <Swatch color="#c17ff8" name="13 Bright magenta" />
  <Swatch color="#8bfde1" name="14 Bright cyan" />
  <Swatch color="#f4f2f9" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Rebecca. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Rebecca, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/rebecca.conf` is a byte-for-byte copy of the
`Rebecca` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
