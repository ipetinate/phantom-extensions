import json
import os
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import build_index

MINIMAL_PNG = bytes.fromhex(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489"
    "0000000d49444154789c6360000002000155c1a4b90000000049454e44ae426082"
)


def language_manifest(**overrides):
    manifest = {
        "schemaVersion": 1,
        "id": "tests.sample",
        "name": "Sample",
        "version": "1.0.0",
        "publisher": "tests",
        "contributes": {
            "languages": [
                {"languageId": "sample", "name": "Sample", "extensions": ["smp"], "icon": "icons/sample.svg"}
            ]
        },
    }
    manifest.update(overrides)
    return manifest


def agents_manifest(**overrides):
    manifest = {
        "schemaVersion": 1,
        "id": "tests.agent",
        "name": "Agent",
        "version": "1.0.0",
        "publisher": "tests",
        "contributes": {
            "agents": [{"agentId": "sample-agent", "name": "Sample Agent", "command": "sample", "icon": "icons/agent.svg"}]
        },
    }
    manifest.update(overrides)
    return manifest


FRONT_MATTER = """---
title: Sample
tagline: A sample extension for the tests.
version: 1.0.0
author:
  name: Tests
  url: https://example.com/tests
license: MIT
created: 2026-09-01
icon: media/icon.svg
cover: media/cover.png
tags: [sample, tests]
screenshots:
  - media/shot.png
---
"""

BODY = "\n## Sample\n\nSome text.\n"


class ExtensionFixture:
    def __init__(self, root, name, manifest):
        self.directory = Path(root) / name
        self.directory.mkdir(parents=True)
        for asset in build_index.referenced_paths(manifest):
            self.write(asset, "<svg xmlns='http://www.w3.org/2000/svg'/>")
        self.write_manifest(manifest)

    def write_manifest(self, manifest):
        (self.directory / "extension.json").write_text(json.dumps(manifest), encoding="utf-8")

    def write(self, relative, content):
        path = self.directory / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        if isinstance(content, bytes):
            path.write_bytes(content)
        else:
            path.write_text(content, encoding="utf-8")
        return path

    def write_sized(self, relative, size):
        path = self.directory / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("wb") as handle:
            handle.truncate(size)
        return path

    def write_document(self, front_matter=FRONT_MATTER, body=BODY, media=True):
        if media:
            self.write("media/icon.svg", "<svg xmlns='http://www.w3.org/2000/svg'/>")
            self.write("media/cover.png", MINIMAL_PNG)
            self.write("media/shot.png", MINIMAL_PNG)
        return self.write(build_index.DOCUMENT_NAME, front_matter + body)


class FixtureTestCase(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)

    def tearDown(self):
        self.temp.cleanup()

    def assertFails(self, pattern, callable_, *args):
        with self.assertRaisesRegex(build_index.ManifestError, pattern):
            callable_(*args)


class ManifestTests(FixtureTestCase):
    def test_valid_manifest_loads(self):
        fixture = ExtensionFixture(self.root, "sample", language_manifest())
        manifest = build_index.load_manifest(fixture.directory)
        self.assertEqual(manifest["id"], "tests.sample")

    def test_agents_only_manifest_loads(self):
        fixture = ExtensionFixture(self.root, "agent", agents_manifest())
        manifest = build_index.load_manifest(fixture.directory)
        self.assertEqual(manifest["contributes"]["agents"][0]["agentId"], "sample-agent")

    def test_agent_needs_command(self):
        manifest = agents_manifest()
        del manifest["contributes"]["agents"][0]["command"]
        fixture = ExtensionFixture(self.root, "agent", manifest)
        self.assertFails("'command'", build_index.load_manifest, fixture.directory)

    def test_agent_id_pattern(self):
        manifest = agents_manifest()
        manifest["contributes"]["agents"][0]["agentId"] = "Sample Agent"
        fixture = ExtensionFixture(self.root, "agent", manifest)
        self.assertFails("'agentId'", build_index.load_manifest, fixture.directory)

    def test_agent_icon_must_exist(self):
        manifest = agents_manifest()
        fixture = ExtensionFixture(self.root, "agent", manifest)
        manifest["contributes"]["agents"][0]["icon"] = "icons/missing.svg"
        fixture.write_manifest(manifest)
        self.assertFails("asset does not exist", build_index.load_manifest, fixture.directory)

    def test_empty_contributes_fails(self):
        fixture = ExtensionFixture(self.root, "empty", language_manifest(contributes={"agents": []}))
        self.assertFails("contributes must hold at least one of", build_index.load_manifest, fixture.directory)

    def test_duplicate_ids_fail(self):
        ExtensionFixture(self.root, "one", language_manifest())
        ExtensionFixture(self.root, "two", language_manifest())
        self.assertFails("already used by", build_index.collect, self.root)

    def test_collect_returns_directory_manifest_and_card(self):
        ExtensionFixture(self.root, "one", language_manifest())
        ExtensionFixture(self.root, "two", agents_manifest()).write_document()
        collected = build_index.collect(self.root)
        self.assertEqual([manifest["id"] for _, manifest, _ in collected], ["tests.sample", "tests.agent"])
        self.assertIsNone(collected[0][2])
        self.assertEqual(collected[1][2]["title"], "Sample")


class RequireAssetTests(FixtureTestCase):
    def setUp(self):
        super().setUp()
        (self.root / "icons").mkdir()
        (self.root / "icons" / "a.svg").write_text("<svg/>", encoding="utf-8")

    def test_accepts_existing_relative_path(self):
        build_index.require_asset(self.root, "icons/a.svg")

    def test_rejects_absolute_path(self):
        self.assertFails("must be relative", build_index.require_asset, self.root, "/etc/passwd")

    def test_rejects_parent_traversal(self):
        self.assertFails("must be relative", build_index.require_asset, self.root, "icons/../../a.svg")

    def test_rejects_non_string(self):
        self.assertFails("must be relative", build_index.require_asset, self.root, None)

    def test_rejects_missing_file(self):
        self.assertFails("does not exist", build_index.require_asset, self.root, "icons/b.svg")


class FrontMatterParserTests(unittest.TestCase):
    def parse(self, text, **kwargs):
        return build_index.parse_front_matter(text, **kwargs)

    def assertRejects(self, text, line, pattern, **kwargs):
        with self.assertRaisesRegex(build_index.FrontMatterError, pattern) as caught:
            self.parse(text, **kwargs)
        self.assertEqual(caught.exception.line, line)

    def test_scalars_in_every_quoting(self):
        data, start = self.parse("---\nplain: Lua is fun\nsingle: 'it''s'\ndouble: \"a \\\"b\\\"\\n\"\n---\nbody\n")
        self.assertEqual(data, {"plain": "Lua is fun", "single": "it's", "double": 'a "b"\n'})
        self.assertEqual(start, 6)

    def test_nested_mapping(self):
        data, _ = self.parse("---\nauthor:\n  name: Isac\n  url: https://example.com\n---\n")
        self.assertEqual(data, {"author": {"name": "Isac", "url": "https://example.com"}})

    def test_flow_mapping_and_sequence(self):
        data, _ = self.parse("---\nauthor: { name: Isac, url: 'https://example.com' }\ntags: [a, \"b\"]\nempty: []\n---\n")
        self.assertEqual(data, {"author": {"name": "Isac", "url": "https://example.com"}, "tags": ["a", "b"], "empty": []})

    def test_block_sequence_at_both_indents(self):
        data, _ = self.parse("---\ntags:\n  - a\n  - b\nmore:\n- c\n- d\nlast: x\n---\n")
        self.assertEqual(data, {"tags": ["a", "b"], "more": ["c", "d"], "last": "x"})

    def test_comments_and_blank_lines(self):
        data, start = self.parse("---\n# leading\n\ntitle: Lua # trailing\n\n  # indented comment\ntags: [a] # after flow\n---\n")
        self.assertEqual(data, {"title": "Lua", "tags": ["a"]})
        self.assertEqual(start, 9)

    def test_hash_inside_quotes_is_kept(self):
        data, _ = self.parse("---\ntitle: 'C# tools'\nother: C#\n---\n")
        self.assertEqual(data, {"title": "C# tools", "other": "C#"})

    def test_body_start_line(self):
        _, start = self.parse("---\ntitle: x\n---\nfirst body line\n")
        self.assertEqual(start, 4)

    def test_requires_opening_marker(self):
        self.assertRejects("title: x\n---\n", 1, "must start with")

    def test_requires_closing_marker(self):
        self.assertRejects("---\ntitle: x\n", 1, "not closed")

    def test_rejects_anchor(self):
        self.assertRejects("---\ntitle: &a Lua\n---\n", 2, "anchors")

    def test_rejects_alias(self):
        self.assertRejects("---\ntitle: *a\n---\n", 2, "anchors")

    def test_rejects_multi_line_scalar(self):
        self.assertRejects("---\ntagline: |\n  long\n---\n", 2, "anchors|scalars")
        self.assertRejects("---\ntagline: >\n  long\n---\n", 2, "anchors|scalars")

    def test_rejects_deeper_nesting(self):
        self.assertRejects("---\nauthor:\n  links:\n    home: x\n---\n", 3, "deeper than one level")
        self.assertRejects("---\nauthor:\n    name: x\n---\n", 3, "deeper than one level")

    def test_rejects_tabs(self):
        self.assertRejects("---\ntitle:\tx\n---\n", 2, "tabs")

    def test_rejects_unknown_key_with_line(self):
        self.assertRejects("---\ntitle: x\nbogus: y\n---\n", 3, "unknown key 'bogus'", allowed_keys={"title"})

    def test_rejects_duplicate_key(self):
        self.assertRejects("---\ntitle: x\ntitle: y\n---\n", 3, "duplicate key")

    def test_rejects_unclosed_quote(self):
        self.assertRejects("---\ntitle: 'x\n---\n", 2, "not closed")

    def test_rejects_missing_space_after_colon(self):
        self.assertRejects("---\ntitle:x\n---\n", 2, "space after")

    def test_rejects_key_without_value(self):
        self.assertRejects("---\ntitle:\nother: x\n---\n", 2, "has no value")

    def test_rejects_nested_flow(self):
        self.assertRejects("---\na: [1, [2]]\n---\n", 2, "may not nest")
        self.assertRejects("---\na: { b: { c: d } }\n---\n", 2, "may not nest")

    def test_rejects_mapping_inside_sequence_item(self):
        self.assertRejects("---\ntags:\n  - name: x\n---\n", 3, "deeper than one level")

    def test_rejects_top_level_sequence(self):
        self.assertRejects("---\n- a\n---\n", 2, "must be a mapping")

    def test_rejects_unexpected_indentation(self):
        self.assertRejects("---\ntitle: x\n  other: y\n---\n", 3, "unexpected indentation")

    def test_rejects_unsupported_escape(self):
        self.assertRejects('---\ntitle: "\\x41"\n---\n', 2, "unsupported escape")


class DocumentTests(FixtureTestCase):
    def setUp(self):
        super().setUp()
        self.fixture = ExtensionFixture(self.root, "sample", language_manifest())
        self.manifest = build_index.load_manifest(self.fixture.directory)

    def load(self):
        return build_index.load_document(self.fixture.directory, self.manifest)

    def with_front_matter(self, **changes):
        lines = FRONT_MATTER.splitlines()[1:-1]
        data = {}
        for line in lines:
            if line.startswith(" ") or line.startswith("-"):
                data[current] += "\n" + line
            else:
                current = line.split(":")[0]
                data[current] = line
        for key, value in changes.items():
            if value is None:
                data.pop(key, None)
            else:
                data[key] = value
        return "---\n" + "\n".join(data.values()) + "\n---\n"

    def test_no_document_gives_no_card(self):
        self.assertIsNone(self.load())

    def test_card_shape(self):
        self.fixture.write_document()
        card = self.load()
        self.assertEqual(card, {
            "title": "Sample",
            "tagline": "A sample extension for the tests.",
            "author": {"name": "Tests", "url": "https://example.com/tests"},
            "license": "MIT",
            "created": "2026-09-01",
            "updated": "2026-09-01T00:00:00Z",
            "icon": "media/icon.svg",
            "cover": "media/cover.png",
            "tags": ["sample", "tests"],
            "screenshots": ["media/shot.png"],
            "document": "extension.mdx",
            "documentBytes": len((FRONT_MATTER + BODY).encode("utf-8")),
        })

    def test_optional_fields_absent(self):
        self.fixture.write_document(self.with_front_matter(icon=None, cover=None, tags=None, screenshots=None, author="author: { name: Tests }"))
        card = self.load()
        self.assertEqual(card["author"], {"name": "Tests", "url": None})
        self.assertIsNone(card["icon"])
        self.assertIsNone(card["cover"])
        self.assertEqual(card["tags"], [])
        self.assertEqual(card["screenshots"], [])

    def test_front_matter_error_carries_line(self):
        self.fixture.write_document("---\ntitle: Sample\nbogus: 1\n---\n")
        self.assertFails(r"extension\.mdx:3: unknown key 'bogus'", self.load)

    def test_document_too_large(self):
        self.fixture.write_document(body=BODY + "x" * build_index.MAX_DOCUMENT_BYTES)
        self.assertFails("larger than", self.load)

    def test_title_required_and_bounded(self):
        self.fixture.write_document(self.with_front_matter(title=None))
        self.assertFails("front matter needs 'title'", self.load)
        self.fixture.write_document(self.with_front_matter(title="title: " + "t" * 81))
        self.assertFails("'title' is longer than 80", self.load)

    def test_tagline_bounded(self):
        self.fixture.write_document(self.with_front_matter(tagline="tagline: " + "t" * 161))
        self.assertFails("'tagline' is longer than 160", self.load)

    def test_version_must_match_manifest(self):
        self.fixture.write_document(self.with_front_matter(version="version: 2.0.0"))
        self.assertFails("'version' is 2.0.0 but extension.json says 1.0.0", self.load)

    def test_author_needs_name(self):
        self.fixture.write_document(self.with_front_matter(author="author: { url: https://example.com }"))
        self.assertFails("front matter needs 'name'", self.load)
        self.fixture.write_document(self.with_front_matter(author="author: Tests"))
        self.assertFails("'author' with a 'name'", self.load)
        self.fixture.write_document(self.with_front_matter(author="author: { name: Tests, email: x }"))
        self.assertFails("unknown keys: email", self.load)
        self.fixture.write_document(self.with_front_matter(author="author: { name: " + "n" * 81 + " }"))
        self.assertFails("'name' is longer than 80", self.load)

    def test_author_url_https_only(self):
        self.fixture.write_document(self.with_front_matter(author="author: { name: Tests, url: http://example.com }"))
        self.assertFails("'author.url' must be an https URL", self.load)

    def test_license_bounded(self):
        self.fixture.write_document(self.with_front_matter(license=None))
        self.assertFails("front matter needs 'license'", self.load)
        self.fixture.write_document(self.with_front_matter(license="license: " + "l" * 65))
        self.assertFails("'license' is longer than 64", self.load)

    def test_created_is_a_date(self):
        self.fixture.write_document(self.with_front_matter(created=None))
        self.assertFails("'created' must be a YYYY-MM-DD date", self.load)
        self.fixture.write_document(self.with_front_matter(created="created: 2026-13-01"))
        self.assertFails("'created' is not a valid date", self.load)
        self.fixture.write_document(self.with_front_matter(created="created: 2026-09-01T00:00:00Z"))
        self.assertFails("'created' must be a YYYY-MM-DD date", self.load)

    def test_updated_is_normalised_to_utc(self):
        self.fixture.write_document(self.with_front_matter(updated="updated: 2026-09-05T01:18:54-03:00"))
        self.assertEqual(self.load()["updated"], "2026-09-05T04:18:54Z")
        self.fixture.write_document(self.with_front_matter(updated="updated: 2026-09-05T04:18:54Z"))
        self.assertEqual(self.load()["updated"], "2026-09-05T04:18:54Z")
        self.fixture.write_document(self.with_front_matter(updated="updated: 2026-09-05"))
        self.assertEqual(self.load()["updated"], "2026-09-05T00:00:00Z")

    def test_updated_needs_an_offset(self):
        self.fixture.write_document(self.with_front_matter(updated="updated: 2026-09-05T04:18:54"))
        self.assertFails("needs a UTC offset", self.load)
        self.fixture.write_document(self.with_front_matter(updated="updated: yesterday"))
        self.assertFails("not an ISO 8601 timestamp", self.load)

    def test_updated_falls_back_to_created_without_git(self):
        self.fixture.write_document()
        with patch.object(build_index, "git_updated", return_value=None):
            self.assertEqual(self.load()["updated"], "2026-09-01T00:00:00Z")

    @unittest.skipUnless(shutil.which("git"), "git is not installed")
    def test_updated_comes_from_the_last_commit(self):
        self.fixture.write_document()
        env = dict(os.environ, GIT_AUTHOR_DATE="2026-09-05T01:18:54-03:00", GIT_COMMITTER_DATE="2026-09-05T01:18:54-03:00",
                   GIT_AUTHOR_NAME="t", GIT_AUTHOR_EMAIL="t@example.com", GIT_COMMITTER_NAME="t", GIT_COMMITTER_EMAIL="t@example.com")
        for command in (["git", "init", "-q"], ["git", "add", "."], ["git", "commit", "-q", "-m", "x"]):
            subprocess.run(command, cwd=self.root, env=env, check=True, capture_output=True)
        self.assertEqual(self.load()["updated"], "2026-09-05T04:18:54Z")

    def test_icon_suffix_and_location(self):
        self.fixture.write("media/icon.jpg", MINIMAL_PNG)
        self.fixture.write_document(self.with_front_matter(icon="icon: media/icon.jpg"))
        self.assertFails("'icon' must end in one of png, svg", self.load)
        self.fixture.write_document(self.with_front_matter(icon="icon: icons/sample.svg"))
        self.assertFails("'icon' must point under media/", self.load)
        self.fixture.write_document(self.with_front_matter(icon="icon: media/missing.svg"))
        self.assertFails("asset does not exist", self.load)

    def test_cover_suffix(self):
        self.fixture.write_document(self.with_front_matter(cover="cover: media/icon.svg"))
        self.assertFails("'cover' must end in one of jpeg, jpg, png, webp", self.load)

    def test_paths_may_not_escape(self):
        self.fixture.write_document(self.with_front_matter(cover="cover: media/../extension.json"))
        self.assertFails("must be relative and inside", self.load)

    def test_tags_rules(self):
        self.fixture.write_document(self.with_front_matter(tags="tags: [" + ", ".join(f"t{i}" for i in range(9)) + "]"))
        self.assertFails("'tags' holds more than 8", self.load)
        self.fixture.write_document(self.with_front_matter(tags="tags: [Lua]"))
        self.assertFails("tag does not match", self.load)
        self.fixture.write_document(self.with_front_matter(tags="tags: [" + "a" * 25 + "]"))
        self.assertFails("tag does not match", self.load)
        self.fixture.write_document(self.with_front_matter(tags="tags: [a, a]"))
        self.assertFails("holds a duplicate", self.load)
        self.fixture.write_document(self.with_front_matter(tags="tags: lua"))
        self.assertFails("'tags' must be a sequence", self.load)

    def test_screenshots_rules(self):
        for index in range(9):
            self.fixture.write(f"media/s{index}.png", MINIMAL_PNG)
        self.fixture.write_document(self.with_front_matter(screenshots="screenshots: [" + ", ".join(f"media/s{i}.png" for i in range(9)) + "]"))
        self.assertFails("'screenshots' holds more than 8", self.load)
        self.fixture.write_document(self.with_front_matter(screenshots="screenshots: [media/icon.svg]"))
        self.assertFails("'screenshots' must end in one of gif, jpeg, jpg, png, webp", self.load)
        self.fixture.write_document(self.with_front_matter(screenshots="screenshots: [icons/sample.svg]"))
        self.assertFails("'screenshots' must point under media/", self.load)


class MediaTests(FixtureTestCase):
    def setUp(self):
        super().setUp()
        self.fixture = ExtensionFixture(self.root, "sample", language_manifest())

    def check(self):
        return build_index.check_media(self.fixture.directory)

    def test_lists_media_with_sizes(self):
        self.fixture.write("media/b.png", MINIMAL_PNG)
        self.fixture.write("media/nested/a.webp", b"x")
        entries, total = self.check()
        self.assertEqual(entries, [{"path": "media/b.png", "bytes": len(MINIMAL_PNG)}, {"path": "media/nested/a.webp", "bytes": 1}])
        self.assertEqual(total, len(MINIMAL_PNG) + 1)

    def test_no_media_directory(self):
        self.assertEqual(self.check(), ([], 0))

    def test_rejects_other_suffixes(self):
        self.fixture.write("media/notes.txt", "x")
        self.assertFails("media/ may only hold", self.check)
        (self.fixture.directory / "media/notes.txt").unlink()
        self.fixture.write("media/clip.mov", b"x")
        self.assertFails("media/ may only hold", self.check)

    def test_size_limits_per_kind(self):
        self.fixture.write_sized("media/big.png", build_index.MAX_IMAGE_BYTES + 1)
        self.assertFails("media/big.png is larger than", self.check)
        (self.fixture.directory / "media/big.png").unlink()
        self.fixture.write_sized("media/big.gif", build_index.MAX_GIF_BYTES + 1)
        self.assertFails("media/big.gif is larger than", self.check)
        (self.fixture.directory / "media/big.gif").unlink()
        self.fixture.write_sized("media/big.mp4", build_index.MAX_VIDEO_BYTES + 1)
        self.assertFails("media/big.mp4 is larger than", self.check)
        (self.fixture.directory / "media/big.mp4").unlink()
        self.fixture.write_sized("media/big.svg", build_index.MAX_IMAGE_BYTES + 1)
        self.assertFails("media/big.svg is larger than", self.check)

    def test_accepts_files_at_the_limit(self):
        self.fixture.write_sized("media/ok.gif", build_index.MAX_GIF_BYTES)
        self.fixture.write_sized("media/ok.webm", build_index.MAX_VIDEO_BYTES)
        self.check()

    def test_total_limit(self):
        for index in range(3):
            self.fixture.write_sized(f"media/v{index}.mp4", 8 * 1024 * 1024)
        self.fixture.write_sized("media/extra.png", 1)
        self.assertFails("larger than .* in total", self.check)

    def test_file_count_limit(self):
        for index in range(build_index.MAX_MEDIA_FILES + 1):
            self.fixture.write(f"media/f{index}.png", b"x")
        self.assertFails("more than 32 files", self.check)

    def test_ds_store_is_ignored(self):
        self.fixture.write("media/.DS_Store", b"x")
        self.assertEqual(self.check(), ([], 0))


class LayoutTests(FixtureTestCase):
    def setUp(self):
        super().setUp()
        self.fixture = ExtensionFixture(self.root, "sample", language_manifest())
        self.manifest = build_index.load_manifest(self.fixture.directory)

    def check(self):
        build_index.check_layout(self.fixture.directory, self.manifest)

    def test_allows_the_known_files(self):
        self.fixture.write("LICENSE", "x")
        self.fixture.write("LICENSE.txt", "x")
        self.fixture.write("README.md", "x")
        self.fixture.write(build_index.DOCUMENT_NAME, "x")
        self.fixture.write("media/a.png", b"x")
        self.check()

    def test_rejects_a_stray_file(self):
        self.fixture.write("notes.md", "x")
        self.assertFails("notes.md is not referenced by the manifest", self.check)

    def test_rejects_a_readme_in_a_subdirectory(self):
        self.fixture.write("docs/README.md", "x")
        self.assertFails("docs/README.md is not referenced", self.check)

    def test_allows_files_under_a_referenced_directory(self):
        manifest = language_manifest()
        manifest["contributes"]["iconThemes"] = [{"name": "Icons", "path": "icons-theme"}]
        fixture = ExtensionFixture(self.root, "themed", manifest)
        (fixture.directory / "icons-theme").unlink()
        fixture.write("icons-theme/icon-theme.json", "{}")
        fixture.write("icons-theme/svg/a.svg", "<svg/>")
        build_index.check_layout(fixture.directory, build_index.load_manifest(fixture.directory))

    def test_allows_agent_icon_and_hook_template(self):
        manifest = agents_manifest()
        manifest["contributes"]["agents"][0]["hooks"] = {
            "kind": "file", "directory": "~/.agent", "fileName": "plugin.lua", "template": "hooks/plugin.lua"
        }
        fixture = ExtensionFixture(self.root, "agent", manifest)
        build_index.check_layout(fixture.directory, build_index.load_manifest(fixture.directory))


class BuildTests(FixtureTestCase):
    def test_index_entry_carries_the_card(self):
        fixture = ExtensionFixture(self.root / "extensions", "sample", language_manifest())
        fixture.write_document()
        with patch.object(build_index, "EXTENSIONS", self.root / "extensions"):
            entries = build_index.build(self.root / "dist", "tests/registry")
        card = entries[0]["card"]
        self.assertEqual(card["media"], [
            {"path": "media/cover.png", "bytes": len(MINIMAL_PNG)},
            {"path": "media/icon.svg", "bytes": len("<svg xmlns='http://www.w3.org/2000/svg'/>")},
            {"path": "media/shot.png", "bytes": len(MINIMAL_PNG)},
        ])
        self.assertEqual(card["mediaBytes"], sum(item["bytes"] for item in card["media"]))
        self.assertEqual(card["document"], "extension.mdx")
        index = json.loads((self.root / "dist" / "index.json").read_text(encoding="utf-8"))
        self.assertEqual(index["extensions"][0]["card"]["title"], "Sample")

    def test_index_entry_without_document_has_no_card(self):
        ExtensionFixture(self.root / "extensions", "sample", language_manifest())
        with patch.object(build_index, "EXTENSIONS", self.root / "extensions"):
            entries = build_index.build(self.root / "dist", "tests/registry")
        self.assertNotIn("card", entries[0])

    def test_zip_size_limit(self):
        ExtensionFixture(self.root / "extensions", "sample", language_manifest())
        with patch.object(build_index, "EXTENSIONS", self.root / "extensions"), patch.object(build_index, "MAX_ZIP_BYTES", 16):
            self.assertFails("the zip is larger than 16 bytes", build_index.build, self.root / "dist", "tests/registry")


if __name__ == "__main__":
    unittest.main()
