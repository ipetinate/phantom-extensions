---
title: Prettier
tagline: Opinionated formatting for the files Prettier has a parser for, in the projects that declare it.
version: 1.0.1
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [formatter, prettier, javascript, typescript, css, markdown]
---

Prettier formats a file by reprinting it from its own syntax tree, so the result
does not depend on how the source was written. This extension teaches Phantom
which files it can do that to, how to find the copy of it your project installed,
and — the part that matters most — when to leave a file alone.

## It only runs where the project asks for it

A formatter that reformats every file it recognises is a formatter that rewrites
repositories that never adopted it. This one runs only where it finds a marker:
a Prettier configuration file, a `prettier` key in `package.json` or
`package.yaml`, or a copy installed under `node_modules`. Phantom looks for one
starting beside the file and walking up, stopping at the repository root or at
your home directory.

No marker, no formatting. Open a `.js` in a repository that uses something else
and Save leaves it exactly as you typed it.

## The copy the project pinned

When the walk finds `node_modules/.bin/prettier`, that is the binary Phantom
runs, in preference to whatever `prettier` your `PATH` resolves to. A repository
pinned to Prettier 2 keeps formatting like Prettier 2 even when Prettier 3 is
installed globally, which is the difference between a clean diff and a thousand
line one.

It runs in the directory holding the marker, not the directory holding the file.
A `plugins` entry in a configuration resolves relative to that configuration, and
a package inside a monorepo that formats differently from the root gets its own
rules rather than the root's.

## What it formats

102 file suffixes, taken from Prettier's own `--support-info` rather than
guessed: JavaScript and TypeScript in every spelling they have, JSX and TSX, JSON
and JSON5, CSS, Less and SCSS, HTML and Vue, GraphQL, Markdown and MDX, YAML, and
the handful of odd ones like `.avsc` and `.code-workspace`.

Phantom sends the buffer on standard input with `--stdin-filepath`, so an unsaved
file is formatted as it stands and Prettier still infers the parser from the
name.

## Installing Prettier itself

The extension carries no binary. Install one globally if you want formatting
outside a project that pins its own:

```
npm install --global prettier
```

Phantom offers this from the extension's page, and the project's own copy is
still preferred wherever one exists.

## What the extension adds

| Area | Contribution |
| --- | --- |
| Formatter | Prettier, over 102 suffixes |
| Programs | `prettier`, from the project or from `PATH` |
| Language support | none — it formats, it does not highlight |

## License and credits

The extension is released under the MIT License.

[Prettier](https://prettier.io) is © James Long and contributors, released under
the MIT License. This extension packages nothing of Prettier's; it tells Phantom
how to call the copy you install, and claims no authorship of the formatter.

## Changelog

**1.0.1** — Published under Isac Petinate.

**1.0.0** — Initial release: the suffix table, the project markers, the local
binary and the working directory, all as manifest data.
