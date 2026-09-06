---
title: GitLab Light
tagline: The GitLab Light terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.4
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, light, colours, terminal, gitlab]
---

GitLab Light is a light palette: the terminal sits on `#fafaff` and writes in `#303030`, a contrast ratio of 12.7:1. 7 of the 16 ANSI entries are distinct, because 8 of the 8 bright colours repeat their normal counterpart. A selection is drawn on `#ad95e9`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="GitLab Light" background="#fafaff" foreground="#303030" cursor="#303030" selection="#ad95e9" ansi="#303030, #a31700, #0a7f3d, #af551d, #006cd8, #583cac, #00798a, #303030, #303030, #a31700, #0a7f3d, #af551d, #006cd8, #583cac, #00798a, #303030" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#fafaff" name="Background" />
  <Swatch color="#303030" name="Foreground" />
  <Swatch color="#303030" name="Cursor" />
  <Swatch color="#565656" name="Cursor text" />
  <Swatch color="#ad95e9" name="Selection" />
  <Swatch color="#fafaff" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#303030" name="0 Black" />
  <Swatch color="#a31700" name="1 Red" />
  <Swatch color="#0a7f3d" name="2 Green" />
  <Swatch color="#af551d" name="3 Yellow" />
  <Swatch color="#006cd8" name="4 Blue" />
  <Swatch color="#583cac" name="5 Magenta" />
  <Swatch color="#00798a" name="6 Cyan" />
  <Swatch color="#303030" name="7 White" />
  <Swatch color="#303030" name="8 Bright black" />
  <Swatch color="#a31700" name="9 Bright red" />
  <Swatch color="#0a7f3d" name="10 Bright green" />
  <Swatch color="#af551d" name="11 Bright yellow" />
  <Swatch color="#006cd8" name="12 Bright blue" />
  <Swatch color="#583cac" name="13 Bright magenta" />
  <Swatch color="#00798a" name="14 Bright cyan" />
  <Swatch color="#303030" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to GitLab Light. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | GitLab Light, light |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/gitlab-light.conf` is a byte-for-byte copy of the
`GitLab Light` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
