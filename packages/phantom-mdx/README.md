# phantom-mdx

The document kit for Phantom extensions. Every extension ships `extension.mdx` (components allowed) or `extension.md` (plain Markdown) beside its `extension.json`; Phantom shows that page in its extension store. Both names go through the same parser, so a `.md` file follows the MDX rules below as well: `<` opens a tag and `{` opens an expression. This package holds the rules for that page, the renderer that draws it, the viewer Phantom embeds, and the tools an author runs before opening a pull request.

The document is never executed. It is parsed to a syntax tree, checked against the component list below, converted to HTML and rendered with React. Imports, exports, expressions and raw HTML are rejected before anything is drawn.

## Writing a document

```mdx
---
title: Lua
tagline: Highlighting, lua-language-server and StyLua for .lua files.
version: 1.0.1
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-05
icon: media/icon.svg
cover: media/cover.png
tags: [lua, language, formatter]
screenshots:
  - media/editor.png
---

## What you get

<Features columns="3">
  <Feature title="Highlighting" icon="brush">
    Strings, numbers and calls in colour.
  </Feature>
</Features>
```

The front matter is read by the registry builder in `packages/registry`, which puts it on the index entry as the `card`; the registry README lists every key and its limits. The body is Markdown (with GFM tables, task lists and strikethrough) plus the components below. Level 1 headings are not allowed: the title comes from the front matter.

### Components

Props take quoted strings only. A block component starts on its own line; its content goes on the lines between the tags. `Kbd` and `Badge` are inline and sit inside a paragraph.

| Component | Props | Children |
|---|---|---|
| `Callout` | `kind` note, tip, warning or danger (default note); `title` | Markdown |
| `Steps` | | `Step` only |
| `Step` | `title` required | Markdown |
| `Kbd` | | text |
| `Features` | `columns` 2 or 3 (default 2) | `Feature` only |
| `Feature` | `title` required; `icon` one of the glyphs below | Markdown |
| `Screenshot` | `src` image required; `alt` required; `caption`; `width` full, wide or narrow | none |
| `Gallery` | | `Screenshot` only |
| `Showcase` | `media` start or end (default end) | `Features`, `Screenshot`, `Video` |
| `Video` | `src` mp4 or webm required; `poster` image; `caption`; `loop` "true"; `muted` "true" | none |
| `Badge` | `label` required; `tone` neutral, accent, success or warning | none |
| `Requirement` | `command` required; `install`; `url` https | Markdown |
| `Details` | `summary` required | Markdown |
| `ThemePreview` | `background`, `foreground` and `ansi` required; `cursor`; `selection`; `title` | none |
| `Swatches` | `columns` 2 to 8 | `Swatch` only |
| `Swatch` | `color` required; `name` required | none |
| `Window` | `title` (default Phantom); `height` short, medium or tall (default medium) | Markdown, plus `WindowToolbar` |
| `WindowToolbar` | | Markdown |
| `SearchField` | `label` (default Search); `placeholder` | none |
| `Filters` | `mode` one or any (default one); `label` | `Filter` only |
| `Filter` | `label` required; `count`; `selected` "true" | none |
| `IconBrowser` | `theme` directory required; `title`; `height` short, medium or tall (default tall) | none |

`Requirement` describes a program the extension needs in prose. The manifest says the same thing as data: an `install` block on a language `server`, on a formatter or on an agent, holding one command per package manager (`brew`, `npm`, `pnpm`, `yarn`, `cargo`, `gem`, `pipx`, `go`, `dotnet`, `nix`), an optional `uninstall` beside each, and an https `documentationURL`. Phantom installs from that block; the registry README carries the rules. Keep the two in step when you write both.

`ThemePreview` draws a miniature of the Phantom window in the theme's own colours: a file explorer, a tab bar and a code area the reader clicks through, with four samples highlighted from the palette. `background`, `foreground`, `cursor` and `selection` are `#rgb` or `#rrggbb`; `ansi` is the sixteen palette entries separated by commas, in order 0 to 15. Everything else — the borders, the sidebar's ground, the inactive tab — is mixed from those. The token colours follow the editor's own mapping: keyword takes ANSI 5, string 2, comment and punctuation 8, number 3, type 6, function 4, attribute 1, and plain text 7.

`Swatches` lays a row of `Swatch` blocks out, wrapping unless `columns` fixes the count. Each swatch draws the colour, its hex and the role it fills; one that would vanish into the page gets a hairline of its own.

`Window` draws a macOS window around whatever the author puts in it: three traffic lights at the leading edge, a centred title, and a body that scrolls inside itself once the content passes the height `height` names. A `WindowToolbar` child is lifted out of that body and drawn as a band under the title bar, so it stays put while the body scrolls; without one the window has no band. Anything else the author writes is the body.

`SearchField` draws a search box. On its own it takes what the reader types and clears on the button beside it, and filters nothing: it is an input, not a query. `label` names it for a screen reader and, unless `placeholder` says otherwise, prints inside it.

`Filters` draws a row of `Filter` chips in one of two shapes. `mode="one"` is the macOS segmented control: exactly one chip is held, the arrow keys move it, and the chip the author marked `selected="true"` is the one held at first — the first chip when the author marks none. `mode="any"` is multiple choice: every chip toggles on its own, the arrow keys only move focus, and none selected is a legitimate state that stands for everything. In both shapes the author owns the selection the row starts with, the row keeps it as the reader presses chips, and nothing else on the page changes: like `SearchField`, a row of chips on its own filters nothing. `count` prints a number beside the label.

`IconBrowser` lists the icons of one icon theme the extension contributes, in the halved shape `ThemePreview` uses. The left half counts what the theme holds and names its defaults; the right half is a `Window` whose toolbar holds a `SearchField` and a segmented `Filters`, and whose body scrolls the icons. `theme` is the theme's directory as `contributes.iconThemes[].path` in `extension.json` names it — a directory name, never a path — and the component reads `<theme>/icon-theme.json` from the staged extension at render, once, so a page never lists an icon by hand. Search matches the icon's name **and** every key that points at it, so `tsx` and `Dockerfile` find the icon that draws them. The categories are read back from the theme file: Folders, Files, Languages, Variants and Unused, by which of the theme's maps names the icon; a category no icon falls into is left out. Only the rows the box can hold are drawn, so a theme of 1,251 icons costs the page tens of nodes rather than thousands.

Glyphs for `Feature icon`: `bolt`, `book`, `brush`, `bug`, `check`, `code`, `gear`, `globe`, `keyboard`, `lock`, `package`, `plug`, `search`, `sparkles`, `star`, `terminal`.

### Rules the checker enforces

- No `import` or `export`, no `{expressions}`, no `prop={value}`, no raw HTML elements, no fragments.
- Only the components above, only their props, every required prop present, enum values from the list.
- Colours are `#rgb` or `#rrggbb`; `ThemePreview ansi` is exactly sixteen of them, separated by commas.
- Images are `media/….png|jpg|jpeg|webp|gif`, videos `media/….mp4|webm`; a path may not leave `media/` and the file must exist.
- `IconBrowser theme` is a single directory name, and `<theme>/icon-theme.json` must exist.
- Links use `https:` or `mailto:`. Markdown images are rejected: use `Screenshot`.
- One level 1 heading is one too many.

## Tools

```sh
npm ci
npm test
npm run build
node dist/cli.js check extensions/lua          # prints <dir>/extension.mdx:<line>:<col> <message>; exit 1 on any violation or a missing document
node dist/cli.js preview extensions/lua        # opens the document in the viewer and reloads it as you edit
```

The registry's pull request workflow runs `check` on every extension directory.

## Library

`src/index.ts` exports the pieces a host or a tool needs:

- `validate(source)` returns `Violation[]` (`code`, `message`, `line`, `column`); `validateTree`, `collectMedia` and `collectDirectories` work on a parsed tree; `parseDocument` parses and strips the front matter. `findDocument(dir)` picks the one document in a directory and `checkFile(file)` validates it, its media and its icon theme directories on disk.
- `Document` is the React component: `<Document source baseURL theme? onLink? cover? onRendered? onFailed? />`. Media resolves against `baseURL` and any path that escapes it is dropped with a warning.
- `applyTheme(root, theme)`, `normalizeTheme(payload)`, `defaultTheme`, `defaultLightTheme`. A theme is `{ scheme, colors: { bg, fg, accent, muted, border, codeBg, danger, warning, success }, fonts: { ui, mono }, baseSize }` and lands as `--ph-*` CSS variables plus `color-scheme`.
- `components` is the whitelist with its prop specs; `componentMap` the React implementations.

## Viewer

`dist/viewer/` holds `viewer.html`, `viewer.js` and `viewer.css`: a self-contained page Phantom loads from disk. It has no network references, no inline scripts and no inline styles, and it declares a Content Security Policy that only allows its own script and stylesheet, `file:` and `data:` images, `file:` media and `file:` requests. The last of those is what `IconBrowser` reads a theme file with, and `file:` is the whole of it: no host is reachable from the page.

The page exposes `window.phantomViewer`:

- `render({ source, baseURL, theme?, cover? })` shows a document.
- `setTheme(theme)` recolours the page without re-rendering the document.

When `window.webkit.messageHandlers.phantom` exists the page posts `{ type: "ready", version }` on load, `{ type: "rendered", warnings }` after a render, `{ type: "failed", message, line?, column? }` when validation or rendering fails, and `{ type: "open", href }` when a link is clicked, without navigating. Without the bridge, links open normally.
