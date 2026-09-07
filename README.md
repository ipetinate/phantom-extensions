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
    syntaxes/           the TextMate grammars contributes.grammars[] names
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

An entry also carries `downloads`, the count GitHub keeps for the release assets: `total` over every published version of that extension, and `current` for the version this index names. The builder reads it from the public releases API, which needs no token, and sends `GH_TOKEN` when the environment has one so a run inside Actions is not held to the anonymous rate limit. A build that cannot reach the API, and an `--offline` build, write no `downloads` key at all; Phantom shows nothing rather than a zero.

## The manifest

`schemaVersion` is `1`. Phantom ignores keys it does not know inside `contributes`, so a manifest written for a newer Phantom still installs the parts an older one understands.

| Key | Read by Phantom |
|---|---|
| `id`, `name`, `version`, `publisher`, `description` | 0.5.0 |
| `contributes.languages[]` — `languageId`, `name`, `extensions`, `fileNames`, `category`, `icon`, `lineComment`, `blockComment`, `server` | 0.5.0 |
| `contributes.formatters[]` | 0.16.0 |
| `contributes.themes[]`, `contributes.iconThemes[]` | 0.16.0 |
| `contributes.agents[]` | 0.16.0 |
| `install` on a language `server`, on a formatter or on an agent | 0.16.0 |
| `extension.mdx` or `extension.md`, and the `card` it produces in the index | 0.16.0 |
| `contributes.grammars[]` and `dependencies` | 0.17.0 |
| `contributes.servers[]`, and `resolver`, `maximumJavaFeatureVersion` and `${HOME}` on any server | 0.17.0 |
| `fileNamePatterns` on a language | 0.17.0 |

`category` is one of `script`, `compiled`, `markup`, `frontendFramework`, `styles`, `data`, `infrastructure`.

`fileNamePatterns` claims a file whose name follows a shape rather than a list — `.env.*`, for the repository whose `.env.staging-eu` no enumeration was ever going to reach. A pattern is matched against the file's **name** and never its path, so it holds no `/` and no `\`. The dialect is two characters wide: `*` matches any run of characters including none, `?` matches exactly one, and every other character is a literal, `.` included. There is no `{a,b}` and no `[abc]` — write one pattern per alternative. At most 32 patterns to a language, 64 characters to a pattern.

Phantom ranks the three ways of claiming a file by how much each one commits to: a whole `fileNames` entry beats a pattern, and a pattern beats an `extensions` suffix. VS Code spells the key `filenamePatterns`; this format spells it the way it spells `fileNames`, and the registry refuses the VS Code spelling by name rather than let an extension publish claiming files Phantom never hands it.

A theme file may set colour keys only (`background`, `foreground`, `palette`, `cursor-color`, the selection and split colours and the like) and must stay under 64 KB; a manifest that names a theme setting anything else loses that theme. Formatter `args` are capped at 32 entries.

Comments come from `lineComment` and `blockComment`. Everything else about colouring comes from a grammar: the `syntax` and `keywords` keys a language used to carry are refused, and the build says so.

## Grammars

A language is coloured by a TextMate grammar, the same format VS Code, Sublime Text and GitHub read. `contributes.grammars[]` names each grammar file the extension ships:

```json
"grammars": [
  {
    "scopeName": "source.lua",
    "path": "syntaxes/lua.tmLanguage.json",
    "languageId": "lua",
    "license": "MIT",
    "grammarSource": "https://github.com/sumneko/lua.tmbundle/blob/master/Syntaxes/Lua.plist",
    "embeddedLanguages": { "source.c": "c" },
    "injectTo": ["text.html.markdown"]
  }
]
```

`scopeName`, `path`, `license` and `grammarSource` are required. `path` is a `.json` grammar inside the extension, under 4 MiB, whose own `scopeName` equals the manifest's. `languageId` names a language the same extension contributes and is what connects a file type to the grammar; a grammar that exists only to be included by others, or to be injected into them, has none. `license` is the licence the grammar file carries and `grammarSource` is the https URL it was taken from, so attribution travels with the bytes. `embeddedLanguages` maps a scope to the language id its regions are lexed as, and `injectTo` lists the scopes the grammar's rules are injected into. An extension ships at most 32 grammars.

The build compiles every `match`, `begin`, `end` and `while` pattern with Oniguruma, through `vscode-oniguruma`, which is the engine Phantom runs them with. A pattern that does not compile fails the build naming its rule, such as `repository.strings.patterns[2].begin`. A `\1` in an `end` or `while` pattern refers to what `begin` captured and is compiled with a placeholder, the way the editor does it at match time.

An `include` may name `#rule`, `$self`, `$base`, another grammar's scope, or `scope#rule`. When the scope belongs to a grammar in another extension of this registry, that extension must be listed in the manifest's top-level `dependencies`, an array of extension ids; the build refuses an include that reaches an undeclared extension and a dependency that names no extension. Two extensions may provide one scope — the editor keeps the higher-ranked grammar and both carry the same bytes — and naming either of them in `dependencies` satisfies the include. A scope no extension in the registry provides is allowed, because grammars written for other editors include languages this registry does not carry, and the editor leaves such a region uncoloured rather than failing the grammar.

## Servers

A language names the server that serves it under `contributes.languages[].server`. A tool that serves several languages, and only in the projects that adopted it, is a server of its own:

```json
"servers": [
  {
    "id": "tailwind",
    "name": "Tailwind CSS",
    "command": "tailwindcss-language-server",
    "args": ["--stdio"],
    "languageIds": ["html", "vue", "typescriptreact", "javascriptreact", "javascript"],
    "projectMarkers": ["node_modules/tailwindcss"],
    "category": "styles",
    "installHint": "npm i -g @tailwindcss/language-server"
  }
]
```

An entry is flat: the keys of a server block sit beside the keys that make it a companion. Such a server attaches beside the server of the language being edited rather than replacing it.

`command` and `languageIds` are the two required keys. `languageIds` says which documents the server is offered for, by language id, from this extension or from any other, at most 32 of them. `projectMarkers` says when: Phantom walks up from the edited file to the workspace root and starts the server only where it finds one of them, so a project that never adopted the tool never runs it. An absent or empty list means every file of those languages. Markers are read the way a formatter's are, so a name and a `{ "file": …, "containsKey": … }` object both work, at most 32 of them.

`name` is what Settings shows and falls back to `command`. `category` is one of the values `category` takes on a language and decides how Settings groups the row; it defaults to `script`. An extension ships at most 16 servers.

`id` is kebab-case and unique inside the extension, and Phantom does not read it. A running server is keyed by its `command`: two extensions that attach one command to one language would start the same process twice for a file, and the editor keeps one of them. The build refuses two servers of one extension that name the same command, for the same reason.

`localBinary` and `workingDirectory` are formatter keys and are refused here. A server resolves its command on the login `PATH` and runs at the workspace root, so neither would decide anything.

Both homes read the same server block — `command`, `args`, `initializationOptions`, `installHint`, `documentationURL`, `install`, and the three below. `initializationOptions` is sent verbatim at `initialize`.

`maximumJavaFeatureVersion` is the newest Java feature version the server runs on, from 8 to 99. It is a ceiling, not a requirement: a server that bundles an old compiler dies on a newer JDK, so Phantom hands it an older JVM when the one on the machine is above the ceiling.

`resolver` names a capability Phantom implements, for the glue a manifest cannot carry as data. There are two, and no others:

| `kind` | What Phantom does |
|---|---|
| `typescriptSDKArgument` | Finds the project's TypeScript lib directory and appends `--tsdk=<dir>` to `args` |
| `typescriptPluginHost` | Resolves the project's `tsserver.js` and the location of `plugin`, then builds the tsserver `initializationOptions` that load that plugin for `languages` |

`plugin` and `languages` belong to `typescriptPluginHost`; the other kind takes neither.

In an argument, `${HOME}` becomes the user's home directory. Nothing else is expanded, and a manifest carrying any other `${…}` token is refused. That is how a server declares one fixed workspace directory rather than one per project:

```json
"args": ["-data", "${HOME}/.cache/jdtls-workspace"]
```

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

The block reads the same on `contributes.languages[].server`, on `contributes.servers[]`, on `contributes.formatters[]` and on `contributes.agents[]`. `manager` is one of `brew`, `npm`, `pnpm`, `yarn`, `cargo`, `gem`, `pipx`, `go`, `dotnet`, `nix`. `command` starts with that manager's own binary and holds nothing else: no `curl`, no `|`, no `sudo`, no `;`, `&&`, `&`, `$( )`, no backticks and no redirects. `uninstall` is optional and follows the same rules. `documentationURL` is https. The build refuses a manifest that breaks one of these.

An agent written for the older format, whose `install.commands` holds plain strings, still builds: each string becomes `{ "manager": <its first word>, "command": <the string> }`.

`installHint` stays accepted, and it is what an entry without an `install` block still shows. The index lists every one of these programs in `card.tools` — one entry per server, formatter and agent, with its `command`, its `installHint` and its `install` block — so Phantom knows what an extension needs before the download.

## Agents

An agent entry teaches Phantom a coding agent it did not ship with: what to launch (`command`), how to resume a conversation (`resume.withSession` with `{session}`, `resume.withoutSession`), how to install it (the `install` block above), its `icon` (SVG) and `brandColour` (`#RRGGBB`, or `artwork` to keep the SVG's own colours), and the two integrations Phantom drives:

- `hooks` — where the agent reads lifecycle hooks and the map from its event names to Phantom's states (`working`, `awaiting`, `done`, `failed`, `compacting`, `denied`, `ended`, `notify`, or `""` for "a session lives here"). `kind` is `json` (a hooks object in a settings file, `entryShape` `grouped` like Claude's or `flat`), `toml` (a hooks table), or `file` (Phantom writes a plugin from your `template`, for agents that load code instead of reading a hooks file). `script.sessionKeys` says where the session id sits in the payload the agent hands each hook.
- `mcp` — where the agent lists MCP servers (`json` key or `toml` table) and the shape of one entry (`separateArguments` writes `command` and `args`; `singleArray` writes one array). `extras` adds fixed fields such as `"type": "stdio"`; it may not name `command` or `args`.

`directory` values are candidate lists: `["$CODEX_HOME", "~/.codex"]` uses the variable when it is set, otherwise the home path. Phantom writes into these files only when the user presses Install in Settings → Agents or Settings → MCP, exactly as for the agents it ships with. An `agentId` equal to a built-in agent's is ignored. Session discovery for resume is not part of the format; an extension agent resumes with `resume.withoutSession` when the tab has no recorded id.

The schema carries the full shape. `extensions/lua` has no agent; the parser's fixture describes Codex in this format and matches Phantom's own descriptor field for field.

## The document

The document beside the manifest is the page Phantom shows for the extension. Every extension has one: `extension.mdx` when it uses the kit's components, `extension.md` for plain Markdown, never both. It is at most 256 KiB and made of a front matter block followed by a body restricted to Markdown and the components the `phantom-mdx` kit knows; `packages/phantom-mdx/README.md` describes the body, and both names go through the same parser and checker. The index entry also carries `categories`, the sorted set of `category` values the manifest's languages declare, so the store can group a listing without reading a manifest. The registry builder reads the front matter into the `card` of the index entry, with `card.document` naming the file, so Phantom can list the extension without downloading anything. The builder also inlines the icon into `card.iconData` as a `data:` URI, taking `icon` from the front matter or, when that is absent, the first `icon` a language or agent contributes. An icon over 16 KiB is left out and `card.iconData` is `null`, so the store draws its placeholder until the extension is downloaded.

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

## Sandbox

`scripts/sandbox.mjs` installs an extension from this checkout into the debug build's own directory, so a change can be seen in Phantom without publishing a release. It needs nothing but Node.

```sh
node scripts/sandbox.mjs install typescript vue   # copy those two in
node scripts/sandbox.mjs install --all            # copy every extension in
node scripts/sandbox.mjs list                     # what is installed, with versions
node scripts/sandbox.mjs remove typescript        # take one out
node scripts/sandbox.mjs remove --all             # empty the directory
```

The directory is `~/.config/phantom-debug/extensions/`, one subdirectory per extension named by the manifest's `id`. That is where a debug build of Phantom looks: the release build reads `~/.config/phantom/extensions/`, which this script never writes to, never reads and never deletes. Installing over an extension that is already there replaces it whole.

`install` and `remove` take **directory names** — `typescript`, not `phantom.typescript` — and derive the id from `extension.json`. `remove` also accepts an id, for something installed from a directory this checkout no longer has. A name that is not a directory under `extensions/`, or an id that is not one path segment, is refused rather than resolved.

Phantom rereads the directory when it starts, so restart the debug build after an install. An extension installed this way is a user-scope contribution, which sits below the compiled-in registry: a language Phantom already ships is listed as shadowed until you promote it in Settings → Language Servers.
