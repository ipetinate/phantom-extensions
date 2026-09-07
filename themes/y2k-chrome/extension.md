---
title: Y2K Chrome
tagline: The Y2K Chrome terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, y2k, chrome]
---

Y2K Chrome is a light palette: the terminal sits on `#f1f5f9` and writes in `#0f172a`, a contrast ratio of 16.3:1. All 16 ANSI entries are different colours. A selection is drawn on `#0f172a`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Y2K Chrome" background="#f1f5f9" foreground="#0f172a" cursor="#0f172a" selection="#0f172a" ansi="#383f4f, #dc2626, #15803d, #0891b2, #f97316, #7c3aed, #2563eb, #475569, #a3b1c4, #b01e1e, #116631, #077792, #c75c12, #632ebe, #1e4fbc, #0f172a" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#f1f5f9" name="Background" />
  <Swatch color="#0f172a" name="Foreground" />
  <Swatch color="#0f172a" name="Cursor" />
  <Swatch color="#f1f5f9" name="Cursor text" />
  <Swatch color="#0f172a" name="Selection" />
  <Swatch color="#f1f5f9" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#383f4f" name="0 Black" />
  <Swatch color="#dc2626" name="1 Red" />
  <Swatch color="#15803d" name="2 Green" />
  <Swatch color="#0891b2" name="3 Yellow" />
  <Swatch color="#f97316" name="4 Blue" />
  <Swatch color="#7c3aed" name="5 Magenta" />
  <Swatch color="#2563eb" name="6 Cyan" />
  <Swatch color="#475569" name="7 White" />
  <Swatch color="#a3b1c4" name="8 Bright black" />
  <Swatch color="#b01e1e" name="9 Bright red" />
  <Swatch color="#116631" name="10 Bright green" />
  <Swatch color="#077792" name="11 Bright yellow" />
  <Swatch color="#c75c12" name="12 Bright blue" />
  <Swatch color="#632ebe" name="13 Bright magenta" />
  <Swatch color="#1e4fbc" name="14 Bright cyan" />
  <Swatch color="#0f172a" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Y2K Chrome. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Y2K Chrome, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/y2k-chrome.conf` is a byte-for-byte copy of the
`Y2K Chrome` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
