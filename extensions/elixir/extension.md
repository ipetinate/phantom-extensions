---
title: Elixir
tagline: Elixir, EEx and HEEx for Phantom — highlighting from a grammar, diagnostics and completion from ElixirLS.
version: 1.1.0
author:
  name: Isac Petinate
  url: https://github.com/ipetinate
license: MIT
created: 2026-09-06
icon: media/icon.png
tags: [elixir, phoenix, eex, heex, language, lsp]
---

Elixir support for the Phantom editor. The extension teaches Phantom three
languages it has never heard of — Elixir itself, EEx templates and the HEEx
templates Phoenix LiveView renders — and connects **ElixirLS** for diagnostics,
hover, completion, navigation and formatting. The server is optional:
highlighting works the moment the extension is installed.

## Nothing in Phantom knows Elixir

This extension is the proof of the format. Phantom ships no lexer for Elixir,
no keyword list, no file type table and no server entry; every one of those
comes from this directory. The colours are the work of a TextMate grammar the
extension carries, compiled by the same Oniguruma engine the editor runs, and
the `.ex`, `.exs`, `.eex`, `.leex` and `.heex` file types exist only because the
manifest declares them. A language that Phantom's authors never wrote a line
for is coloured as well as the ones they did.

## What you get

**Highlighting.** Modules, functions and macros, atoms and keyword lists,
sigils with their modifiers, `@moduledoc` and `@doc` heredocs, string
interpolation, pipes, guards, pattern matches and the operators, from the
grammar ElixirLS itself ships for Visual Studio Code. EEx templates colour the
`<%= %>` and `<% %>` tags and hand the Elixir inside them to the Elixir
grammar; HEEx templates do the same and hand the HTML around them to the HTML
extension.

**Language intelligence.** With ElixirLS installed: diagnostics from the
compiler and from Dialyzer, hover documentation, completion for modules,
functions and struct fields, go to definition, find references, rename, code
actions and `mix format` on save. The server compiles the project once and
keeps the build warm.

**Comment toggling.** `#` in Elixir, `<%# %>` in EEx and `<%!-- --%>` in HEEx,
so one command comments a line in any of the three.

## Requirements

Phantom does not bundle the tools. Install the one you want; the extension
detects it on your `PATH`.

**`elixir-ls`** — the language server. Homebrew's formula installs Elixir with
it.

```
brew install elixir-ls
```

Without it the highlighter still works. The server reads `.elixir_ls/` in the
project for its build; add that directory to `.gitignore`.

## Getting started

1. In Phantom, open the Extensions pane in the sidebar (or Settings →
   Extensions) and press **Install** next to Elixir.
2. Run the Homebrew command above. Phantom picks the server up without a
   restart.
3. Open a `.ex`, `.exs`, `.eex` or `.heex` file. It is coloured at once. The
   first time a project needs `elixir-ls`, Phantom asks before starting it and
   remembers your answer for that extension.
4. Formatting: press ⌘ ⇧ F, or turn on Format on Save under Settings →
   Editor. The extension contributes `mix format` directly, run in the
   directory that holds `mix.exs`, so it works whether or not the server has
   finished loading the project. A file that does not parse is not formatted:
   the Elixir formatter refuses text it cannot read, and says nothing.

## What the extension adds

| Area | Contribution |
| --- | --- |
| File types | `.ex`, `.exs`, `mix.lock` as Elixir; `.eex`, `.leex` as Embedded Elixir; `.heex` as HEEx |
| Language server | `elixir-ls` (stdio), for all three languages |
| Formatter | `mix format`, contributed directly and through the language server |
| Editor | TextMate grammars `source.elixir`, `text.elixir` and `text.html.elixir` (vscode-elixir-ls), with the HTML of a HEEx template handed to the HTML extension; `#`, `<%# %>` and `<%!-- --%>` comment markers |
| Icon | A droplet, drawn for this extension, in the sidebar and tabs |

## Configuration

ElixirLS reads its settings from the client, and Phantom sends none, so the
server runs with its defaults: Dialyzer on, `mix format` on save, the `test`
environment for compilation. A project can pin the Elixir and Erlang versions
the server uses with an `.tool-versions` file, which ElixirLS reads through asdf
or mise when either is installed.

The formatter is configured by the project's `.formatter.exs`, exactly as
`mix format` on the command line would be:

```elixir
[
  inputs: ["{mix,.formatter}.exs", "{config,lib,test}/**/*.{ex,exs}"],
  line_length: 98,
  import_deps: [:ecto, :phoenix],
  plugins: [Phoenix.LiveView.HTMLFormatter]
]
```

## Troubleshooting

**The editor says elixir-ls is not installed.** The bar above the file shows
the install command. After installing with Homebrew, press **Check Again**; the
server must be on the `PATH` of your login shell.

**The first diagnostics take a while.** ElixirLS compiles the project before it
answers, and Dialyzer builds its PLT on the first run. Both are cached under
`.elixir_ls/`, and the second start is fast.

**A `.heex` file is coloured but has no completion.** The server is started per
project. A template outside any repository is opened without a workspace, which
keeps the server from scanning your home folder; highlighting still works,
cross-file features do not.

**Permissions.** The server runs as your user, with access to your files and
network, the same as if you started it from the terminal. Phantom asks before it
runs a program from an extension for the first time, and asks again if the
extension's manifest or the program's path changes. You can review or change
the answer under Settings → Extensions.

## Changelog

**1.1.0** — A contributed `mix format` formatter, so formatting no longer
depends on the language server having loaded the project. It runs in the
directory holding `mix.exs` and reads that project's `.formatter.exs`.

**1.0.0** — Initial release: three language definitions, the ElixirLS grammars
for Elixir, EEx and HEEx, and `elixir-ls` wiring with install and uninstall
commands. Needs Phantom 0.17.0.

## License and credits

The extension is released under the MIT License. The grammars are the ones
[vscode-elixir-ls](https://github.com/elixir-lsp/vscode-elixir-ls) carries,
© the ElixirLS contributors (MIT). [ElixirLS](https://github.com/elixir-lsp/elixir-ls)
is © the ElixirLS contributors (Apache-2.0). Elixir is © Plataformatec and the
Elixir team; this extension is not affiliated with the Elixir project, and its
icon is a plain droplet, not the project's mark.
