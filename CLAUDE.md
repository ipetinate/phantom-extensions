# Agent Development Guide

A file for [guiding coding agents](https://agents.md/) working in this registry.

## Language policy for tooling

- **Write tooling in TypeScript or JavaScript.** Everything in this repository
  that runs — the registry CLI, the MDX viewer, the generators under
  `scripts/` — is TypeScript or plain ES modules on Node 22, which is what the
  publish workflow installs.
- **If a task genuinely cannot be TypeScript or JavaScript, write it in Ruby.**
  Ruby ships with macOS and needs no toolchain of its own.
- **Never write Python. Not a script, not a helper, not a one-off.** No
  `.py` file, no `python`/`python3` invocation in a script, a workflow, a
  `package.json` script or a commit. This holds even when a Python library
  would be the shortest path, and it holds for throwaway work that is not
  committed.
- This is the repository owner's decision about the stack this project carries.
  A dependency on Python is a dependency on a runtime this project does not
  otherwise need, on every machine that builds it.

## Commands

- **Build the registry:** `npm run build` in `packages/registry`
- **Test:** `npm test` in `packages/registry` and in `packages/phantom-mdx`
- **Validate every extension:** `node packages/registry/dist/cli.js check`
- **Build the index locally:** `node packages/registry/dist/cli.js --out dist --repo ipetinate/phantom-extensions`
- **Format:** `prettier -w .`

## Publishing

`.github/workflows/publish.yml` runs on **every push to `main`** and is the only
publisher. It builds the index, creates a release per extension version and
uploads two assets: the install zip and the `-preview.zip` the store reads to
draw a page. Nothing here is published by hand — a merge to `main` is the
publish.

## Layout

- `extensions/<id>/` — one directory per extension
- `themes/<id>/` — theme packages, same shape
- `packages/registry/` — the index builder and validator
- `packages/phantom-mdx/` — the MDX viewer the app vendors into its bundle
- `schema/extension.schema.json` — the manifest contract
- `scripts/` — generators, in ES modules run by `node`

## Extension pages

Every extension and theme documents itself in `extension.mdx`. `.md` is still
accepted by `DOCUMENT_NAMES` for older packages, but a new page is `.mdx` and
uses the components the viewer provides — `ThemePreview`, `Steps`, `Details`,
`Window`, `IconBrowser` — rather than plain prose and tables alone.
