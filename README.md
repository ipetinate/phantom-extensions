# Phantom Extensions

The extension registry for [Phantom](https://github.com/ipetinate/phantom). Phantom reads one file from here, `index.json`, and installs extensions from the zips it lists. There is no server: the index and every zip are GitHub release assets of this repository.

```
https://github.com/ipetinate/phantom-extensions/releases/download/index/index.json
```

## Layout

One directory per extension, whatever it contributes. A language, its formatter, its icon and a theme that go together live in one directory and ship as one zip; the manifest says what is inside.

Two top-level directories hold those extension directories. An extension whose `contributes` is nothing but `themes` goes under `themes/`; everything else — a language, a grammar, a formatter, a server, an icon theme — goes under `extensions/`. Colour themes outnumber the rest four to one, and reading either directory should tell you what the registry offers.

```
extensions/
  lua/
    extension.json      the manifest
    extension.mdx       the document Phantom shows in the store (or extension.md)
    icons/lua.svg       assets, referenced from the manifest by relative path
    syntaxes/           the TextMate grammars contributes.grammars[] names
    media/              images and videos the document uses
themes/
  dracula/              the same layout, for an extension that only contributes themes
schema/
  extension.schema.json
packages/
  registry/             validates every manifest and document, zips every extension, writes index.json
  phantom-mdx/          the document kit: the checker, the renderer and the viewer Phantom embeds
  phantom-view-kit/     the control kit a view bundles: the app's buttons, rows and fields as custom elements
```

A directory holds `extension.json`, the document, `LICENSE*`, `README*`, the paths the manifest references and `media/`. Any other file fails the build — except `src/`, which is where an extension's own source and build go and which the publish pipeline skips. See [STRUCTURE.md](STRUCTURE.md).

The two directories are one registry. The builder reads both, orders every extension by its directory name whichever one holds it, and writes one `index.json`. Which directory an extension sits in changes nothing an extension carries: no id, no version, no release tag, no asset name. Moving one from `extensions/` to `themes/` therefore needs no version bump — but its `homepage`, if it names a path in this repository, has to name the new one.

Directory names are for humans. Identity is `id` in the manifest, and the zip is `<id>-<version>.zip`.

### One extension, one subject

An extension may claim several languages, and often should: Dockerfile and Compose are both Docker, C and C++ share a toolchain and a server. What it may not be is a list. A package named `Nix, CMake and Bruno` tells a reader nothing to search for, and installing it to read a `CMakeLists.txt` also claims `.nix` and `.bru`.

The check enforces the symptom rather than the judgement. A package claiming two or more languages is refused when its `name` joins subjects with a comma or a conjunction, or when its directory name is its own language ids strung together. `Dockerfiles` and `C/C++` pass, because each is the one name the languages share.

## Publishing an extension

1. Add `extensions/<name>/extension.json` and its assets, or `themes/<name>/extension.json` when the extension contributes nothing but `themes`. `id` is `<publisher>.<name>`, lowercase, using `[a-z0-9._-]`.
2. Add the document: exactly one of `extension.mdx` or `extension.md` beside the manifest, with the front matter described under "The document". An extension without a document does not build.
3. Give the extension an icon: `icon` in the document's front matter, or `icon` on a language or agent in the manifest. An extension without an icon does not build. Screenshots, GIFs and videos are optional.
4. Run `node packages/registry/dist/cli.js check` and `node packages/phantom-mdx/dist/cli.js check <directory>`, where `<directory>` is `extensions/<name>` or `themes/<name>`. Each package builds its own command line with `npm ci && npm run build`. Pull requests run both.
5. Open a pull request. On merge, the publish workflow creates a release `<id>-v<version>` with the zip, then rebuilds `index.json` and uploads it to the `index` release.
6. To ship a change, raise `version`. A version that already has a release is never rebuilt. Any change under an extension directory needs a version bump, and CI refuses a build whose zip differs from the bytes already released under that version.

An index entry carries `download` for the version in this repository, and `versions`: the ten newest published versions, newest first, each with its own URL, digest and size. The builder reads the published index to find them, so a version it no longer lists drops off. `download` keeps the shape it has always had, so an older Phantom reads the index as before.

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
| `settings` on any server | 0.18.0 |
| `contributes.views[]`, and `surface`, `filenamePatterns` and `priority` on a view | 0.19.0 |

`category` is one of `script`, `compiled`, `markup`, `frontendFramework`, `styles`, `data`, `infrastructure`.

`fileNamePatterns` claims a file whose name follows a shape rather than a list — `.env.*`, `.env.*.local`, `*.{tf,tfvars,hcl}`. A pattern is matched against the file's **name** and never its path, so it holds no `/` and no `\`.

The dialect:

| | |
|---|---|
| `*` | any run of characters, including none, but never a `/` |
| `**` | any run of characters, including none, `/` included |
| `?` | exactly one character, and never a `/` |
| `{a,b,c}` | any one of the alternatives, each of which may hold `*`, `**` and `?` |

Every other character is a literal, `.` included, and the whole name has to match. `[abc]` is refused rather than matched literally: write `{a,b,c}`. Brace lists do not nest, and one may not expand to more than 16 alternatives. At most 32 patterns to a language, 64 characters to a pattern.

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
    "optionalIncludes": ["source.c"],
    "injectTo": ["text.html.markdown"]
  }
]
```

`scopeName`, `path`, `license` and `grammarSource` are required. `path` is a `.json` grammar inside the extension, under 4 MiB, whose own `scopeName` equals the manifest's. `languageId` names a language the same extension contributes and is what connects a file type to the grammar; a grammar that exists only to be included by others, or to be injected into them, has none. `license` is the licence the grammar file carries and `grammarSource` is the https URL it was taken from, so attribution travels with the bytes. `embeddedLanguages` maps a scope to the language id its regions are lexed as, and `injectTo` lists the scopes the grammar's rules are injected into. `optionalIncludes` is read by the dependency rule below. An extension ships at most 32 grammars.

The build compiles every `match`, `begin`, `end` and `while` pattern with Oniguruma, through `vscode-oniguruma`, which is the engine Phantom runs them with. A pattern that does not compile fails the build naming its rule, such as `repository.strings.patterns[2].begin`. A `\1` in an `end` or `while` pattern refers to what `begin` captured and is compiled with a placeholder, the way the editor does it at match time.

An `include` may name `#rule`, `$self`, `$base`, another grammar's scope, or `scope#rule`. When the scope belongs to a grammar in another extension of this registry, that extension must be listed in the manifest's top-level `dependencies`, an array of extension ids; the build refuses an include that reaches an undeclared extension and a dependency that names no extension. Two extensions may provide one scope — the editor keeps the higher-ranked grammar and both carry the same bytes — and naming either of them in `dependencies` satisfies the include. A scope no extension in the registry provides is allowed, because grammars written for other editors include languages this registry does not carry, and the editor leaves such a region uncoloured rather than failing the grammar.

Some includes are not worth a dependency. A grammar reaches a foreign scope for two different reasons, and the difference decides whether the include has to be declared. The `<script lang="ts">` block in a Vue file **must** be TypeScript, so `phantom.vue` depends on the extension providing `source.ts`. A fenced code block in Markdown names whatever language the author typed, and the grammar knows fifty-nine of them; none is promised, and a fence whose language is absent keeps its own colour and leaves the body plain. Declaring all fifty-nine would make installing Markdown install most of the registry.

The two cannot be told apart from the grammar. Markdown's fence and Vue's script tag are the same shape — a `begin`/`while` rule carrying its own scope name, with the foreign include as its only child pattern — and `embeddedLanguages` does not separate them either, because Vue declares `source.ts` in it. So the manifest says which: `optionalIncludes` on a grammar entry lists the scopes that grammar includes and does not need, and the dependency rule skips them. Every entry has to be a scope the grammar actually includes, so a scope that leaves the grammar cannot leave an excuse behind. Everything not listed stays exactly as strict as before. At most 128 entries.

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

Both homes read the same server block — `command`, `args`, `initializationOptions`, `settings`, `installHint`, `documentationURL`, `install`, and the three below. `initializationOptions` is sent verbatim at `initialize`.

`settings` is for the server that never reads `initializationOptions` and pulls its configuration instead. Phantom resolves the section a `workspace/configuration` item names as a path through this object, one dotted step at a time: `eslint` answers with `settings.eslint`, `eslint.codeAction` with `settings.eslint.codeAction`, and a path the object does not reach is answered `null` — which is what every section is answered without the key. An item that names no section, or names the empty one, is answered with the whole object.

```json
"settings": {
  "validate": "on",
  "format": false,
  "nodePath": null,
  "codeAction": { "showDocumentation": { "enable": true } }
}
```

That is the shape `vscode-eslint-language-server` needs, and it is the reason the key exists. The server asks once per document, with `section` set to the empty string, and expects its own namespace back with no prefix — so it cannot be configured through `initializationOptions`, and answering the pull with `null` made it fail the request rather than lint quietly. A key is one step of a path and holds no `.`, since a request for `a.b` is resolved as `a` then `b` and would never reach a key spelled `a.b`. At most 32 keys. The object itself must be an object, the rule `initializationOptions` already follows; the values below it are whatever the server reads.

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

## Views

An extension can contribute interactive pages Phantom draws inside itself. There are **two surfaces**, and an interactive extension usually contributes one of each:

- a **`sidebar`** view is a panel of the sidebar, selected by its own button in the rail or the top bar, the way Files and Git are;
- an **`editor`** view **claims file names**, and its tab is the claimed file's own tab.

Bruno is the shape to copy: the collection tree on the sidebar, and an editor for `*.bru` that a row of that tree opens. `contributes.views[]` declares one entry per view:

```json
[
  {
    "viewId": "collection",
    "title": "Bruno",
    "icon": "icons/bruno.png",
    "entry": "views/collection.js",
    "style": "views/collection.css",
    "surface": "sidebar",
    "placements": ["sidebar", "topBar"],
    "permissions": ["workspace.root", "workspace.list", "workspace.read", "workspace.create", "workspace.choose", "views.open", "theme.read"]
  },
  {
    "viewId": "http",
    "title": "Request",
    "icon": "icons/bruno.png",
    "entry": "views/http.js",
    "style": "views/http.css",
    "surface": "editor",
    "filenamePatterns": ["*.bru"],
    "priority": "option",
    "permissions": ["workspace.root", "workspace.read", "workspace.replace", "theme.read", "http.request"]
  }
]
```

Note what the `editor` entry does **not** have: a `placements`. It has no button, and the validator refuses one on it. An editor view is reached by opening a file it claims; a button that opened a blank editor tab would put a second mark in the rail for the same extension.

`viewId` is unique within the manifest, lowercase, using `[a-z0-9_+-]`; Phantom keys the view on `<id>/<viewId>`. `title` names the tab and its button, at most 64 characters.

`entry` is a bundled ES module and `style` an optional stylesheet, both shipped in the package. **One file each.** Phantom serves the page under `default-src 'none'` with no `http` or `https` source at any directive, so a second chunk, a CDN import or a webfont does not load — write the view in whatever you like and bundle it to those two files, with everything inlined. The pair is at most 4 MiB. Any framework is fine: `packages/bruno-view/` is React and TypeScript.

`icon` is a **PNG or SVG the package ships**, never an SF Symbol name. A symbol the reader's macOS does not resolve makes SwiftUI drop the whole row out of a list with nothing logged, so the one field a third party must not fill with a name is this one.

`surface` says where the page is drawn: `sidebar` or `editor`. The sidebar when the key is absent, which is where an entry written before this field existed was drawn.

`filenamePatterns` is what an `editor` view claims, as globs over the **name** only — no path separator, in the dialect `contributes.languages[].fileNamePatterns` uses. A claimed file draws in that view wherever it is opened from, and **the tab is the file's own tab**: re-opening it, closing it and getting it back after a restart are what Phantom already does for a file, so a contributed editor needs none of its own. It also means the sidebar tree, the file explorer and the quick opener all reach the same tab.

`priority` says what the claim is worth. `option` — the default — leaves the reader's text editor opening the file and offers the view beside it, as **Open with Extension Editor** on the tab; **Open as Text** switches back. `default` gives the view the file. `option` is the default deliberately: a claimed file is still a text file the reader may have come to read as text, and a third party should not decide that for them.

`placements` says which of the sidebar's two switcher bars carries a **panel's** button: `sidebar` is the icon column along the sidebar's edge, `topBar` the tab row at its top, and the reader chooses which of the two their switcher is. Both when the key is absent, because a panel with no button has no way in.

A `sidebar` entry only. `placements` on an `editor` entry is refused at publish, the mirror of `filenamePatterns` on a `sidebar` entry being refused — a placement belongs to the surface that has a button, a pattern to the surface that opens a file.

### Opening a tab from a view

`views.open` is how a sidebar view hands work to an editor view:

```js
await window.phantom.open({ viewId: "http", title: "List users", path: "api/users.bru" });
await window.phantom.open({ viewId: "http", title: "New request" });
```

`viewId` is the id as **this** manifest spells it. It can only ever name a view of this extension: Phantom builds the target from the extension the calling page belongs to, so there is no spelling that reaches another extension's view. A `viewId` this manifest does not declare on the editor surface rejects with the code `unknown-view`.

`path` is required, and it is a file. It goes through the same check `read` makes — relative, no `..`, containment proved twice — so a page can only open a file it could already have read, and the app then opens it the way any other gesture opens a file. The tab is that file's tab, so re-opening it, closing it, ⌘W and session restore are the app's existing file handling, and the label is the file's own name. The opened page reads `window.phantom.file()` to learn which file it is drawing.

**There is no way to open a view on something that is not a file.** A page with a document to create writes it first — `workspace.create` — and then opens it. That is one path rather than two, and it is the path that gives a new document a real file the tree can list, git can see and a restart can restore.

`title` is the tab's label, at most 64 characters, falling back to the target view's own `title`. A claimed file's tab keeps the file's name — the view changes who draws the pane, not what the file is called.

### Asking for a folder

A view's filesystem methods are bounded to the folder of the terminal the window is following, and for an editor view drawing a file, to that file's own repository. When there is neither, `workspace.choose` asks the reader for one in the system dialog, and the folder they pick becomes this view's workspace:

```js
const { workspace } = await window.phantom.choose();
```

Pass `{ kind: "file" }` for a file instead; the file's **folder** becomes the workspace, and the file comes back beside it so the page can open it.

The reader picks it in a panel the page cannot draw, cannot pre-fill and cannot read, and everything after that is unchanged — the folder is the scope's base and every path is still proved to be inside it twice. Closing the dialog rejects with the code `cancelled`, which is an answer rather than a failure. One dialog at a time.

**Phantom remembers the folder**, one answer per extension per workspace, so the reader is asked once. It is stored beside the view's own `state` under a key beginning with `$`, which `state.write` refuses — a page able to write it would be a page able to move its own scope. A remembered folder that is gone is not used and not forgotten: an unmounted volume is mounted again tomorrow, so the view falls back to the terminal's folder and the reader can point at it again.

### Remembering, and unsaved work

`state.read` and `state.write` keep one JSON object per extension per workspace, at most 8 KiB, in Phantom's own storage. It is for an answer — a path, an id, a choice — not a cache; a view with more to keep wants a file, and has `workspace.create`.

`editor.dirty` puts **the editor's own unsaved mark** on a contributed tab, so a page reports its state rather than drawing a dot of its own. ⌘S on such a tab reaches the page through `window.phantom.onSave(handler)`. It is one way: Phantom cannot save for the page, so a page that does not answer leaves the tab marked unsaved and the reader can press again. Nothing times out, and nothing is written on the page's behalf.

### What a view may do

The page reaches nothing by itself: no filesystem, no process, no socket. It asks Phantom, through `window.phantom`, and Phantom refuses every method the manifest did not name in `permissions`.

| Method | What it does |
|---|---|
| `workspace.root` | Names the workspace folder and the extension's own directory |
| `workspace.list` | Lists one folder inside either, up to four levels deep |
| `workspace.read` | Reads one UTF-8 file inside either, up to 2 MiB |
| `workspace.create` | Adds one file inside either, up to 256 KiB. Refuses a path that exists |
| `workspace.replace` | Writes over one file in the workspace, up to 256 KiB. Refuses a path that does not exist |
| `workspace.choose` | Asks the reader for a folder or a file; that folder becomes this view's workspace, and Phantom remembers it |
| `state.read` | One JSON object this view remembered, per workspace |
| `state.write` | Replaces that object, at most 8 KiB |
| `editor.dirty` | Puts the editor's own unsaved mark on this tab |
| `views.open` | Opens an editor view of the **same** extension on a file it could already read |
| `theme.read` | The colours and fonts Phantom is drawing with |
| `http.request` | One HTTP request, performed by the app |

The filesystem methods are bounded to two folders — the workspace of the terminal the pane is following, and the extension's own directory — and a path that climbs out of either with a `../`, or through a symlink planted inside one, is refused rather than followed.

### Writing

Adding a file and writing over one are **two methods and two declarations**, because they are not the same request. An extension that only ever adds files declares `workspace.create` and can never overwrite the reader's work; one that saves an edited file declares `workspace.replace`, and the reader sees which in the `permissions` list.

They are disjoint, not nested. `create` refuses a path that exists; `replace` refuses one that does not. So a typo in a path cannot turn a save into a stray new file, and a new file cannot land on top of an existing one.

What both refuse:

- **No folder is ever created, at any depth.** The folder the file goes in has to be there already.
- **No part of the path may begin with a dot**, on top of the rules every path follows: no absolute path, no `~`, no `\`, no `..`. That is what keeps a page from writing `.git/hooks/pre-commit`, `.github/workflows/run.yml` or `.envrc` — files another program runs without being asked twice. A blanket refusal rather than a list of dangerous names, because that set is not closed.
- **At most 256 KiB of UTF-8 text**, and the target has to be a regular file rather than a folder.

What each refuses on its own:

- `create` rejects an existing path with the code `exists`, and the file on disk is untouched. Checked before the write for the message, and again by the write itself, so there is no window between the two.
- `replace` rejects a missing path with the code `absent`. It writes atomically, so a failure halfway leaves the file as it was rather than truncated.
- **`replace` does not reach the extension's own directory at all.** The `extension.json` in there is what tells Phantom which methods the page may call, and `ExtensionStore.refresh()` reads it again without a restart — a page able to write over it could grant itself every method there is. `create` still works there, because every file Phantom reads from a package is already present and `create` refuses to touch what exists.

**There is no method that deletes a file, empties one or renames one.** Not omitted for now — not offered.

`http.request` is what makes an HTTP client possible without loosening the policy, and it is the one to read carefully. It sends `http` and `https` only; it carries no cookie, no keychain entry and no client certificate; it follows **no redirect**, so a 3xx comes back as a 3xx with its `Location`; and it refuses the link-local metadata endpoints, a `.internal` name and every reserved range outright, for every extension, always. Loopback and the private ranges are refused too until the reader switches them on under Settings → Extensions, which is what a request to an API on their own machine needs.

A call resolves with the method's answer and rejects with an `Error` carrying a `code`: `not-permitted` names a method the manifest did not declare, `refused-url` a URL the app will not request, `out-of-scope` a path outside those two folders, `exists` a path `workspace.create` will not write over, `absent` a path `workspace.replace` has nothing to write over, `not-this-file` a file that is not the one the tab was opened on, `unknown-view` a view this extension does not declare, and `cancelled` a folder dialog the reader closed.

An editor view is told which file it is drawing through `window.phantom.file()`, which answers `{ root, path }` — relative to the scope's root, never absolute — or `null` in a sidebar panel. `window.phantom.onFile(listener)` follows it, because a tab can be re-pointed at another file while the page is running.

**A view drawing a file may replace only that file.** `workspace.replace` from such a page is pinned to the file the app opened it on, and a different path is refused with `not-this-file`. So an editor's write capability is not "a file this extension may write" but "the file this tab is". `workspace.create` is not pinned, because it cannot write over anything: pinning it would stop a page saving a new document beside the one it is showing without closing any hole. A sidebar panel and a synthetic tab have no file to be pinned to and keep whatever their manifest asked for.

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
node scripts/sandbox.mjs install dracula          # a theme, named the same way
node scripts/sandbox.mjs install --all            # copy every extension in, from both directories
node scripts/sandbox.mjs list                     # what is installed, with versions
node scripts/sandbox.mjs remove typescript        # take one out
node scripts/sandbox.mjs remove --all             # empty the directory
```

The directory is `~/.config/phantom-debug/extensions/`, one subdirectory per extension named by the manifest's `id`. That is where a debug build of Phantom looks: the release build reads `~/.config/phantom/extensions/`, which this script never writes to, never reads and never deletes. Installing over an extension that is already there replaces it whole.

`install` and `remove` take **directory names** — `typescript`, not `phantom.typescript` — and derive the id from `extension.json`. `remove` also accepts an id, for something installed from a directory this checkout no longer has. A name is looked up under `extensions/` and then under `themes/`, so it never says which of the two holds the extension. A name that is a directory under neither, or an id that is not one path segment, is refused rather than resolved.

Phantom rereads the directory when it starts, so restart the debug build after an install. An extension installed this way is a user-scope contribution, which sits below the compiled-in registry: a language Phantom already ships is listed as shadowed until you promote it in Settings → Language Servers.
