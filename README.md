# Phantom Extensions

The extension registry for [Phantom](https://github.com/ipetinate/phantom). Phantom reads one file from here, `index.json`, and installs extensions from the zips it lists. There is no server: the index and every zip are GitHub release assets of this repository.

```
https://github.com/ipetinate/phantom-extensions/releases/download/index/index.json
```

## Layout

One directory per extension, whatever it contributes. A language, its formatter, its icon and a theme that go together live in one directory and ship as one zip; the manifest says what is inside.

```
extensions/
  lua/
    extension.json      the manifest
    icons/lua.svg       assets, referenced from the manifest by relative path
schema/
  extension.schema.json
scripts/
  build_index.py        validates every manifest, zips every extension, writes index.json
```

Directory names are for humans. Identity is `id` in the manifest, and the zip is `<id>-<version>.zip`.

## Publishing an extension

1. Add `extensions/<name>/extension.json` and its assets. `id` is `<publisher>.<name>`, lowercase, using `[a-z0-9._-]`.
2. Run `python3 scripts/build_index.py --check`. Pull requests run the same command.
3. Open a pull request. On merge, the publish workflow creates a release `<id>-v<version>` with the zip, then rebuilds `index.json` and uploads it to the `index` release.
4. To ship a change, raise `version`. A version that already has a release is never rebuilt.

## The manifest

`schemaVersion` is `1`. Phantom ignores keys it does not know inside `contributes`, so a manifest written for a newer Phantom still installs the parts an older one understands.

| Key | Read by Phantom |
|---|---|
| `id`, `name`, `version`, `publisher`, `description` | 0.5.0 |
| `contributes.languages[]` — `languageId`, `name`, `extensions`, `fileNames`, `category`, `icon`, `keywords`, `lineComment`, `blockComment`, `server` | 0.5.0 |
| `contributes.languages[].syntax` — one pattern per token kind | planned, 0.16.0 |
| `contributes.formatters[]` | planned, 0.16.0 |
| `contributes.themes[]`, `contributes.iconThemes[]` | planned, 0.16.0 |

`category` is one of `script`, `compiled`, `markup`, `frontendFramework`, `styles`, `data`, `infrastructure`.

`syntax` takes the token kinds `string`, `number`, `type`, `function`, `attribute`. Each value is a regular expression, or a preset by name: `preset:number`, `preset:cStyleString`, `preset:hashComment`, `preset:capitalizedType`, `preset:callBeforeParen`. Comments come from `lineComment` and `blockComment`, keywords from `keywords`; neither takes a pattern. Patterns are combined into one expression by the highlighter, so use `(?:…)` for grouping and no backreferences.

## Trust

A manifest can name a program to run: a language server, a formatter. Phantom asks before running one that came from outside its own bundle, and the approval is keyed by the extension `id` and the digest of the manifest bytes, so an updated manifest asks again. The index carries a `sha256` for every zip and Phantom refuses a download that does not match.

`extensions/lua` is the reference extension. Copy it.
