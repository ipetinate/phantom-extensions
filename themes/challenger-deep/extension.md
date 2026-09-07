---
title: Challenger Deep
tagline: The Challenger Deep terminal palette, packaged on its own so it can be installed without the rest.
version: 1.0.5
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [theme, dark, colours, terminal, challenger, deep]
---

Challenger Deep is a dark palette: the terminal sits on `#1e1c31` and writes in `#cbe1e7`, a contrast ratio of 12.2:1. All 16 ANSI entries are different colours. A selection is drawn on `#cbe1e7`.

The extension holds one file of colour settings and nothing else. It installs no
program, starts no process and asks for no approval. Install it, pick it in
Settings, and that is all it does.

## The theme

<ThemePreview title="Challenger Deep" background="#1e1c31" foreground="#cbe1e7" cursor="#fbfcfc" selection="#cbe1e7" ansi="#141228, #ff5458, #62d196, #ffb378, #65b2ff, #906cff, #63f2f1, #a6b3cc, #565575, #ff8080, #95ffa4, #ffe9aa, #91ddff, #c991e1, #aaffe4, #cbe3e7" />

The window above is painted from the file this extension installs. Press a tab to
read another language: the editor takes its keyword, string, comment, number,
type and call colours from the ANSI sixteen, so the preview shows what the
palette does to code rather than describing it.

## Terminal colours

<Swatches columns="6">
  <Swatch color="#1e1c31" name="Background" />
  <Swatch color="#cbe1e7" name="Foreground" />
  <Swatch color="#fbfcfc" name="Cursor" />
  <Swatch color="#ff271d" name="Cursor text" />
  <Swatch color="#cbe1e7" name="Selection" />
  <Swatch color="#1e1c31" name="Selection text" />
</Swatches>

## The ANSI 16

<Swatches columns="8">
  <Swatch color="#141228" name="0 Black" />
  <Swatch color="#ff5458" name="1 Red" />
  <Swatch color="#62d196" name="2 Green" />
  <Swatch color="#ffb378" name="3 Yellow" />
  <Swatch color="#65b2ff" name="4 Blue" />
  <Swatch color="#906cff" name="5 Magenta" />
  <Swatch color="#63f2f1" name="6 Cyan" />
  <Swatch color="#a6b3cc" name="7 White" />
  <Swatch color="#565575" name="8 Bright black" />
  <Swatch color="#ff8080" name="9 Bright red" />
  <Swatch color="#95ffa4" name="10 Bright green" />
  <Swatch color="#ffe9aa" name="11 Bright yellow" />
  <Swatch color="#91ddff" name="12 Bright blue" />
  <Swatch color="#c991e1" name="13 Bright magenta" />
  <Swatch color="#aaffe4" name="14 Bright cyan" />
  <Swatch color="#cbe3e7" name="15 Bright white" />
</Swatches>

## Installing

Open the Extensions pane in the sidebar, or Settings, then Extensions, and press
**Install** next to Challenger Deep. The theme is then listed in Settings, then Appearance,
under **Extension Themes**. Press its card to apply it to every window at once.

## What the extension adds

| Area | Contribution |
|---|---|
| Theme | Challenger Deep, dark |
| Terminal | 16 ANSI colours, background and foreground |
| Programs | none |

## License and credits

The extension is released under the MIT License.

The palette comes from the [Ghostty theme collection](https://github.com/ghostty-org/ghostty),
which aggregates [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes),
released under the MIT License. `themes/challenger-deep.conf` is a byte-for-byte copy of the
`Challenger Deep` file in that collection. This extension packages it and claims no authorship
of the palette.

## Changelog

**1.0.5** — Moved into the registry's `themes/` folder, so the link back to the source points at the new path.

**1.0.4** — Shows the palette as swatches and the window as a preview, in place of the colour tables.

**1.0.3** — Published under Isac Petinate.

**1.0.2** — Credits Isac Petinate, who packaged it, rather than the app.
