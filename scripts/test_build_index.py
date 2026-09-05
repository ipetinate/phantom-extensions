import json
import tempfile
import unittest
from pathlib import Path

import build_index


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


class ExtensionFixture:
    def __init__(self, root, name, manifest, assets=("icons/sample.svg", "icons/agent.svg")):
        self.directory = Path(root) / name
        self.directory.mkdir(parents=True)
        for asset in assets:
            path = self.directory / asset
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("<svg xmlns='http://www.w3.org/2000/svg'/>", encoding="utf-8")
        self.write_manifest(manifest)

    def write_manifest(self, manifest):
        (self.directory / "extension.json").write_text(json.dumps(manifest), encoding="utf-8")


class ManifestTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)

    def tearDown(self):
        self.temp.cleanup()

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
        with self.assertRaisesRegex(build_index.ManifestError, "'command'"):
            build_index.load_manifest(fixture.directory)

    def test_agent_id_pattern(self):
        manifest = agents_manifest()
        manifest["contributes"]["agents"][0]["agentId"] = "Sample Agent"
        fixture = ExtensionFixture(self.root, "agent", manifest)
        with self.assertRaisesRegex(build_index.ManifestError, "'agentId'"):
            build_index.load_manifest(fixture.directory)

    def test_agent_icon_must_exist(self):
        manifest = agents_manifest()
        manifest["contributes"]["agents"][0]["icon"] = "icons/missing.svg"
        fixture = ExtensionFixture(self.root, "agent", manifest)
        with self.assertRaisesRegex(build_index.ManifestError, "asset does not exist"):
            build_index.load_manifest(fixture.directory)

    def test_empty_contributes_fails(self):
        fixture = ExtensionFixture(self.root, "empty", language_manifest(contributes={"agents": []}))
        with self.assertRaisesRegex(build_index.ManifestError, "contributes must hold at least one of"):
            build_index.load_manifest(fixture.directory)

    def test_duplicate_ids_fail(self):
        ExtensionFixture(self.root, "one", language_manifest())
        ExtensionFixture(self.root, "two", language_manifest())
        with self.assertRaisesRegex(build_index.ManifestError, "already used by"):
            build_index.collect(self.root)

    def test_collect_returns_every_extension(self):
        ExtensionFixture(self.root, "one", language_manifest())
        ExtensionFixture(self.root, "two", agents_manifest())
        ids = [manifest["id"] for _, manifest in build_index.collect(self.root)]
        self.assertEqual(ids, ["tests.sample", "tests.agent"])


class RequireAssetTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.directory = Path(self.temp.name)
        (self.directory / "icons").mkdir()
        (self.directory / "icons" / "a.svg").write_text("<svg/>", encoding="utf-8")

    def tearDown(self):
        self.temp.cleanup()

    def test_accepts_existing_relative_path(self):
        build_index.require_asset(self.directory, "icons/a.svg")

    def test_rejects_absolute_path(self):
        with self.assertRaisesRegex(build_index.ManifestError, "must be relative"):
            build_index.require_asset(self.directory, "/etc/passwd")

    def test_rejects_parent_traversal(self):
        with self.assertRaisesRegex(build_index.ManifestError, "must be relative"):
            build_index.require_asset(self.directory, "icons/../../a.svg")

    def test_rejects_non_string(self):
        with self.assertRaisesRegex(build_index.ManifestError, "must be relative"):
            build_index.require_asset(self.directory, None)

    def test_rejects_missing_file(self):
        with self.assertRaisesRegex(build_index.ManifestError, "does not exist"):
            build_index.require_asset(self.directory, "icons/b.svg")


if __name__ == "__main__":
    unittest.main()
