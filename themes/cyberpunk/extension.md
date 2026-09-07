---
title: Cyberpunk
tagline: The Cyberpunk terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, cyberpunk]
---

Cyberpunk is a dark palette: the terminal sits on `#332a57` and writes in `#e5e5e5`, a contrast ratio of 10.4:1. 15 of the 16 ANSI entries are distinct, because 1 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#c1deff`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Cyberpunk" background="#332a57" foreground="#e5e5e5" cursor="#21f6bc" selection="#c1deff" ansi="#000000, #ff7092, #00fbac, #fffa6a, #00bfff, #df95ff, #86cbfe, #ffffff, #595959, #ff8aa4, #21f6bc, #fff787, #1bccfd, #e6aefe, #99d6fc, #ffffff" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#332a57" name="Background" />
  <Swatch color="#e5e5e5" name="Foreground" />
  <Swatch color="#21f6bc" name="Cursor" />
  <Swatch color="#999999" name="Cursor text" />
  <Swatch color="#c1deff" name="Selection" />
  <Swatch color="#000000" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#000000" name="0 Black" />
  <Swatch color="#ff7092" name="1 Red" />
  <Swatch color="#00fbac" name="2 Green" />
  <Swatch color="#fffa6a" name="3 Yellow" />
  <Swatch color="#00bfff" name="4 Blue" />
  <Swatch color="#df95ff" name="5 Magenta" />
  <Swatch color="#86cbfe" name="6 Cyan" />
  <Swatch color="#ffffff" name="7 White" />
  <Swatch color="#595959" name="8 Bright black" />
  <Swatch color="#ff8aa4" name="9 Bright red" />
  <Swatch color="#21f6bc" name="10 Bright green" />
  <Swatch color="#fff787" name="11 Bright yellow" />
  <Swatch color="#1bccfd" name="12 Bright blue" />
  <Swatch color="#e6aefe" name="13 Bright magenta" />
  <Swatch color="#99d6fc" name="14 Bright cyan" />
  <Swatch color="#ffffff" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Cyberpunk. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Cyberpunk, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/cyberpunk.conf` is a byte-for-byte copy of the
`Cyberpunk` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
