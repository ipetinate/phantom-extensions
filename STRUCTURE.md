# Repository structure

Where a file goes, and why. `CLAUDE.md` carries the language policy for tooling
and the publish rule; this document carries the layout those two depend on. Read
both before adding a directory.

## `packages/` is store tooling, and nothing else

`packages/` holds what the **store** publishes and runs:

| Directory | What it is |
|---|---|
| `packages/registry/` | The index builder and the validator. `cli.js check` and `cli.js --out` |
| `packages/phantom-mdx/` | The document kit Phantom vendors into its own bundle |

Nothing else belongs here. An extension's source is **not** store tooling, even
when it is a TypeScript project with its own `package.json`. If a directory
under `packages/` would ship inside one extension's zip, or would be deleted
when one extension is deleted, it is in the wrong place.

## An extension owns its whole directory

One directory per extension, `extensions/<id>/`, and it holds everything that
extension needs — the manifest, the document, the assets it ships, **and its
own source and build**.

```
extensions/bruno/
  extension.json          the manifest
  extension.mdx           the store page
  icons/bruno.png         an asset the manifest names
  syntaxes/*.json         an asset the manifest names
  media/                  the store page's own images
  views/                  BUILT view assets, named by the manifest
  src/                    the source that builds views/ — never published
```

`themes/<id>/` is the same shape.

## `src/` is source, and it never ships

`extensions/<id>/src/` is the one directory inside an extension that the
publish pipeline **skips**. Put the whole build there: the `package.json`, the
bundler configuration, the TypeScript, the tests, and the `node_modules` that
`npm ci` writes.

The skip is not a convention that reviewers enforce. It is
`packages/registry/src/files.ts`, which `extensionFiles` uses for both the
layout check and the zip:

- a directory named `src` **at the extension's root** is skipped;
- `node_modules` and `dist` are skipped at any depth;
- everything else is walked.

So `extensions/bruno/src/App.tsx` is invisible to the publish pipeline, and
`extensions/bruno/views/http.js` is not.

## Built view assets live in `views/`

A view's `entry` and `style` are files the reader's Phantom loads, so they have
to be in the package. Build them into `extensions/<id>/views/` and name them
from the manifest:

```json
{ "viewId": "http", "entry": "views/http.js", "style": "views/http.css" }
```

They are **committed**. The registry publishes the extension as it stands on
disk, and `dist/` is ignored repository-wide, so a build output that is not
committed is a view the store ships without.

Point the bundler at `../views` from inside `src/`. See
`extensions/bruno/src/vite.config.ts`.

## What the publish pipeline includes

`checkLayout` refuses any file in an extension directory that is not one of
these, so this list is also the list of what publishes:

1. `extension.json`.
2. The document — `extension.mdx`, or `extension.md` for an older package.
3. Anything under `media/`, which is the store page's images.
4. A root `LICENSE*` or `README*`.
5. Any path the manifest names, and anything under a directory it names —
   `icons/`, `syntaxes/`, `views/`.

Everything else fails the check. A file you want in the repository but not in
the package goes under `src/`.

## Adding an extension with a build

1. Write the manifest and the document in `extensions/<id>/`.
2. Put the build in `extensions/<id>/src/`, with its own `package.json`.
3. Point its output at `../views/`, or at whatever directory the manifest names.
4. Commit the built assets.
5. Run `node packages/registry/dist/cli.js check`. A source file that leaks out
   of `src/` fails there, by name.
