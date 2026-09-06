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
    extension.mdx       the document Phantom shows in the store (or extension.md)
    icons/lua.svg       assets, referenced from the manifest by relative path
    media/              images and videos the document uses
schema/
  extension.schema.json
packages/
  registry/             validates every manifest and document, zips every extension, writes index.json
  phantom-mdx/          the document kit: the checker, the renderer and the viewer Phantom embeds
```

A directory holds `extension.json`, the document, `LICENSE*`, `README*`, the paths the manifest references and `media/`. Any other file fails the build.

Directory names are for humans. Identity is `id` in the manifest, and the zip is `<id>-<version>.zip`.

## Publishing an extension

1. Add `extensions/<name>/extension.json` and its assets. `id` is `<publisher>.<name>`, lowercase, using `[a-z0-9._-]`.
2. Add the document: exactly one of `extension.mdx` or `extension.md` beside the manifest, with the front matter described under "The document". An extension without a document does not build.
3. Give the extension an icon: `icon` in the document's front matter, or `icon` on a language or agent in the manifest. An extension without an icon does not build. Screenshots, GIFs and videos are optional.
4. Run `node packages/registry/dist/cli.js check` and `node packages/phantom-mdx/dist/cli.js check extensions/<name>`. Each package builds its own command line with `npm ci && npm run build`. Pull requests run both.
5. Open a pull request. On merge, the publish workflow creates a release `<id>-v<version>` with the zip, then rebuilds `index.json` and uploads it to the `index` release.
6. To ship a change, raise `version`. A version that already has a release is never rebuilt. Any change under an extension directory needs a version bump, and CI refuses a build whose zip differs from the bytes already released under that version.

An index entry carries `download` for the version in this repository, and `versions`: the ten newest published versions, newest first, each with its own URL, digest and size. The builder reads the published index to find them, so a version it no longer lists drops off. `download` keeps the shape it has always had, so an older Phantom reads the index as before.

## The manifest

`schemaVersion` is `1`. Phantom ignores keys it does not know inside `contributes`, so a manifest written for a newer Phantom still installs the parts an older one understands.

| Key | Read by Phantom |
|---|---|
| `id`, `name`, `version`, `publisher`, `description` | 0.5.0 |
| `contributes.languages[]` — `languageId`, `name`, `extensions`, `fileNames`, `category`, `icon`, `keywords`, `lineComment`, `blockComment`, `server` | 0.5.0 |
| `contributes.languages[].syntax` — one pattern per token kind | planned, 0.16.0 |
| `contributes.formatters[]` | planned, 0.16.0 |
| `contributes.themes[]`, `contributes.iconThemes[]` | planned, 0.16.0 |
| `contributes.agents[]` | planned, 0.16.0 |
| `install` on a language `server`, on a formatter or on an agent | planned, 0.16.0 |
| `extension.mdx` or `extension.md`, and the `card` it produces in the index | planned, 0.16.0 |

`category` is one of `script`, `compiled`, `markup`, `frontendFramework`, `styles`, `data`, `infrastructure`.

A theme file may set colour keys only (`background`, `foreground`, `palette`, `cursor-color`, the selection and split colours and the like) and must stay under 64 KB; a manifest that names a theme setting anything else loses that theme. Formatter `args` are capped at 32 entries.

`syntax` takes the token kinds `string`, `number`, `type`, `function`, `attribute`. Each value is a regular expression, or a preset by name: `preset:number`, `preset:cStyleString`, `preset:capitalizedType`, `preset:callBeforeParen`, `preset:callBeforeParenOrGeneric`. Comments come from `lineComment` and `blockComment`, keywords from `keywords`; neither takes a pattern. Patterns are combined into one expression by the highlighter, so use `(?:…)` for grouping and no backreferences.

## Installing what an extension needs

A language server, a formatter and an agent each name a program Phantom runs but does not ship. `installHint` is one sentence for a person to read. `install` says the same thing as data, so Phantom installs and removes the program itself.

```json
"server": {
  "command": "lua-language-server",
  "install": {
    "commands": [
      { "manager": "brew", "command": "brew install lua-language-server", "uninstall": "brew uninstall lua-language-server" },
      { "manager": "npm", "command": "npm install -g lua-language-server" }
    ],
    "documentationURL": "https://luals.github.io/wiki/"
  }
}
```

The block reads the same on `contributes.languages[].server`, on `contributes.formatters[]` and on `contributes.agents[]`. `manager` is one of `brew`, `npm`, `pnpm`, `yarn`, `cargo`, `gem`, `pipx`, `go`, `dotnet`, `nix`. `command` starts with that manager's own binary and holds nothing else: no `curl`, no `|`, no `sudo`, no `;`, `&&`, `&`, `$( )`, no backticks and no redirects. `uninstall` is optional and follows the same rules. `documentationURL` is https. The build refuses a manifest that breaks one of these.

An agent written for the older format, whose `install.commands` holds plain strings, still builds: each string becomes `{ "manager": <its first word>, "command": <the string> }`.

`installHint` stays accepted, and it is what an entry without an `install` block still shows. The index lists every one of these programs in `card.tools` — one entry per language server, formatter and agent, with its `command`, its `installHint` and its `install` block — so Phantom knows what an extension needs before the download.

## Agents

An agent entry teaches Phantom a coding agent it did not ship with: what to launch (`command`), how to resume a conversation (`resume.withSession` with `{session}`, `resume.withoutSession`), how to install it (the `install` block above), its `icon` (SVG) and `brandColour` (`#RRGGBB`, or `artwork` to keep the SVG's own colours), and the two integrations Phantom drives:

- `hooks` — where the agent reads lifecycle hooks and the map from its event names to Phantom's states (`working`, `awaiting`, `done`, `failed`, `compacting`, `denied`, `ended`, `notify`, or `""` for "a session lives here"). `kind` is `json` (a hooks object in a settings file, `entryShape` `grouped` like Claude's or `flat`), `toml` (a hooks table), or `file` (Phantom writes a plugin from your `template`, for agents that load code instead of reading a hooks file). `script.sessionKeys` says where the session id sits in the payload the agent hands each hook.
- `mcp` — where the agent lists MCP servers (`json` key or `toml` table) and the shape of one entry (`separateArguments` writes `command` and `args`; `singleArray` writes one array). `extras` adds fixed fields such as `"type": "stdio"`; it may not name `command` or `args`.

`directory` values are candidate lists: `["$CODEX_HOME", "~/.codex"]` uses the variable when it is set, otherwise the home path. Phantom writes into these files only when the user presses Install in Settings → Agents or Settings → MCP, exactly as for the agents it ships with. An `agentId` equal to a built-in agent's is ignored. Session discovery for resume is not part of the format; an extension agent resumes with `resume.withoutSession` when the tab has no recorded id.

The schema carries the full shape. `extensions/lua` has no agent; the parser's fixture describes Codex in this format and matches Phantom's own descriptor field for field.

## The document

The document beside the manifest is the page Phantom shows for the extension. Every extension has one: `extension.mdx` when it uses the kit's components, `extension.md` for plain Markdown, never both. It is at most 256 KiB and made of a front matter block followed by a body restricted to Markdown and the components the `phantom-mdx` kit knows; `packages/phantom-mdx/README.md` describes the body, and both names go through the same parser and checker. The registry builder reads the front matter into the `card` of the index entry, with `card.document` naming the file, so Phantom can list the extension without downloading anything.

The front matter is a subset of YAML that the builder parses itself: `key: value` with plain or quoted scalars, one nested mapping indented by two spaces, flow mappings `{ name: X, url: Y }`, flow sequences `[a, b]`, block sequences of `- item`, `#` comments and blank lines. Anchors, multi-line scalars, deeper nesting, tabs and unknown keys fail with a line number.

| Key | Rule |
|---|---|
| `title` | required, at most 80 characters |
| `tagline` | required, at most 160 characters |
| `version` | required, equal to `version` in `extension.json` |
| `author` | required; `name` at most 80 characters, `url` optional and https only |
| `license` | required, at most 64 characters |
| `created` | required, `YYYY-MM-DD` |
| `updated` | optional, a date or an ISO 8601 timestamp with an offset; the index carries it as UTC. When absent, the date of the last commit that touched the directory, or `created` outside git |
| `icon` | `media/….svg` or `.png`; required unless a language or agent in the manifest has an `icon` |
| `cover` | optional, `media/….png`, `.jpg`, `.jpeg` or `.webp` |
| `tags` | at most 8, each matching `[a-z0-9][a-z0-9-]{0,23}`, no duplicates |
| `screenshots` | at most 8 image paths under `media/` |

Media lives under `media/`, up to 32 files and 24 MiB in total. Images (`png`, `jpg`, `jpeg`, `webp`) may take 2 MiB each, a `gif` 5 MiB, a video (`mp4`, `webm`) 12 MiB, and an `svg` counts as an image. Any other suffix under `media/` fails the build, and so does a zip above 32 MiB. The card lists every media file with its size, so Phantom knows what a download costs before it starts.

## Trust

A manifest can name a program to run: a language server, a formatter. Phantom asks before running one that came from outside its own bundle, and the approval is keyed by the extension `id` and the digest of the manifest bytes, so an updated manifest asks again. The index carries a `sha256` for every zip and Phantom refuses a download that does not match.

`extensions/lua` is the reference extension. Copy it.
