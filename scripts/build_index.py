#!/usr/bin/env python3
import argparse
import hashlib
import json
import re
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXTENSIONS = ROOT / "extensions"
ID_PATTERN = re.compile(r"^[a-z0-9][a-z0-9._-]*$")
VERSION_PATTERN = re.compile(r"^\d+\.\d+\.\d+$")
LANGUAGE_ID_PATTERN = re.compile(r"^[a-z0-9_+-]+$")
CATEGORIES = {"script", "compiled", "markup", "frontendFramework", "styles", "data", "infrastructure"}
CONTRIBUTION_KINDS = ("languages", "formatters", "themes", "iconThemes")
MAX_MANIFEST_BYTES = 512 * 1024
ZIP_EPOCH = (1980, 1, 1, 0, 0, 0)


class ManifestError(Exception):
    pass


def fail(directory, message):
    raise ManifestError(f"{directory.relative_to(ROOT)}: {message}")


def require_string(directory, obj, key, pattern=None):
    value = obj.get(key)
    if not isinstance(value, str) or not value:
        fail(directory, f"'{key}' must be a non-empty string")
    if pattern and not pattern.match(value):
        fail(directory, f"'{key}' does not match {pattern.pattern}: {value!r}")
    return value


def require_asset(directory, relative):
    if not isinstance(relative, str) or relative.startswith("/") or ".." in Path(relative).parts:
        fail(directory, f"asset path must be relative and inside the extension: {relative!r}")
    if not (directory / relative).exists():
        fail(directory, f"asset does not exist: {relative}")


def validate_language(directory, language):
    if not isinstance(language, dict):
        fail(directory, "each language must be an object")
    require_string(directory, language, "languageId", LANGUAGE_ID_PATTERN)
    require_string(directory, language, "name")
    extensions = language.get("extensions")
    if not isinstance(extensions, list) or not extensions:
        fail(directory, f"language {language.get('languageId')!r} needs at least one file extension")
    for ext in extensions:
        if not isinstance(ext, str) or not LANGUAGE_ID_PATTERN.match(ext):
            fail(directory, f"bad file extension {ext!r}")
    if "category" in language and language["category"] not in CATEGORIES:
        fail(directory, f"unknown category {language['category']!r}")
    if "icon" in language:
        require_asset(directory, language["icon"])
    block = language.get("blockComment")
    if block is not None and not (isinstance(block, dict) and block.get("open") and block.get("close")):
        fail(directory, "blockComment needs 'open' and 'close'")
    syntax = language.get("syntax")
    if syntax is not None:
        if not isinstance(syntax, dict):
            fail(directory, "syntax must be an object")
        for kind, pattern in syntax.items():
            if kind not in {"string", "number", "type", "function", "attribute"}:
                fail(directory, f"syntax has no token kind {kind!r}")
            if not isinstance(pattern, str) or not pattern:
                fail(directory, f"syntax.{kind} must be a non-empty string")
            if not pattern.startswith("preset:"):
                try:
                    re.compile(pattern)
                except re.error as error:
                    fail(directory, f"syntax.{kind} is not a valid pattern: {error}")
                if re.search(r"(?<!\\)\\[1-9]", pattern):
                    fail(directory, f"syntax.{kind} uses a backreference")
    server = language.get("server")
    if server is not None:
        if not isinstance(server, dict):
            fail(directory, "server must be an object")
        require_string(directory, server, "command")


def validate_formatter(directory, formatter):
    if not isinstance(formatter, dict):
        fail(directory, "each formatter must be an object")
    require_string(directory, formatter, "id", re.compile(r"^[a-z0-9_-]+$"))
    require_string(directory, formatter, "name")
    require_string(directory, formatter, "command")
    extensions = formatter.get("extensions")
    if not isinstance(extensions, list) or not extensions:
        fail(directory, f"formatter {formatter.get('id')!r} needs at least one file extension")


def validate_pathed(directory, kind, entry):
    if not isinstance(entry, dict):
        fail(directory, f"each entry in {kind} must be an object")
    require_string(directory, entry, "name")
    require_asset(directory, entry.get("path"))


def load_manifest(directory):
    path = directory / "extension.json"
    if not path.is_file():
        fail(directory, "no extension.json")
    if path.stat().st_size > MAX_MANIFEST_BYTES:
        fail(directory, f"extension.json is larger than {MAX_MANIFEST_BYTES} bytes")
    try:
        manifest = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        fail(directory, f"extension.json is not valid JSON: {error}")
    if not isinstance(manifest, dict):
        fail(directory, "extension.json must hold an object")
    if manifest.get("schemaVersion") != 1:
        fail(directory, "schemaVersion must be 1")
    require_string(directory, manifest, "id", ID_PATTERN)
    require_string(directory, manifest, "name")
    require_string(directory, manifest, "version", VERSION_PATTERN)
    require_string(directory, manifest, "publisher")
    if "phantom" in manifest:
        require_string(directory, manifest, "phantom", VERSION_PATTERN)
    contributes = manifest.get("contributes")
    if not isinstance(contributes, dict) or not any(contributes.get(k) for k in CONTRIBUTION_KINDS):
        fail(directory, "contributes must hold at least one of " + ", ".join(CONTRIBUTION_KINDS))
    for language in contributes.get("languages", []):
        validate_language(directory, language)
    for formatter in contributes.get("formatters", []):
        validate_formatter(directory, formatter)
    for kind in ("themes", "iconThemes"):
        for entry in contributes.get(kind, []):
            validate_pathed(directory, kind, entry)
    return manifest


def collect():
    manifests = []
    seen = {}
    for directory in sorted(p for p in EXTENSIONS.iterdir() if p.is_dir()):
        manifest = load_manifest(directory)
        if manifest["id"] in seen:
            fail(directory, f"id {manifest['id']!r} is already used by {seen[manifest['id']]}")
        seen[manifest["id"]] = directory.relative_to(ROOT)
        manifests.append((directory, manifest))
    if not manifests:
        raise ManifestError("no extensions found")
    return manifests


def write_zip(directory, target):
    files = sorted(p for p in directory.rglob("*") if p.is_file() and ".DS_Store" not in p.parts)
    with zipfile.ZipFile(target, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for file in files:
            info = zipfile.ZipInfo(str(file.relative_to(directory)), date_time=ZIP_EPOCH)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, file.read_bytes())
    return target


def build(out, repo):
    out.mkdir(parents=True, exist_ok=True)
    entries = []
    releases = []
    for directory, manifest in collect():
        name = f"{manifest['id']}-{manifest['version']}"
        tag = f"{manifest['id']}-v{manifest['version']}"
        archive = write_zip(directory, out / f"{name}.zip")
        data = archive.read_bytes()
        contributes = manifest["contributes"]
        entries.append({
            "id": manifest["id"],
            "name": manifest["name"],
            "version": manifest["version"],
            "publisher": manifest["publisher"],
            "description": manifest.get("description", ""),
            "homepage": manifest.get("homepage"),
            "phantom": manifest.get("phantom"),
            "contributes": [k for k in CONTRIBUTION_KINDS if contributes.get(k)],
            "languages": [l["languageId"] for l in contributes.get("languages", [])],
            "download": {
                "url": f"https://github.com/{repo}/releases/download/{tag}/{name}.zip",
                "sha256": hashlib.sha256(data).hexdigest(),
                "bytes": len(data),
            },
        })
        releases.append((tag, str(archive), f"{manifest['name']} {manifest['version']}"))
    index = {
        "schemaVersion": 1,
        "generatedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "repository": f"https://github.com/{repo}",
        "extensions": entries,
    }
    (out / "index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (out / "releases.tsv").write_text("".join(f"{t}\t{z}\t{n}\n" for t, z, n in releases), encoding="utf-8")
    return entries


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--out", type=Path, default=ROOT / "dist")
    parser.add_argument("--repo", default="ipetinate/phantom-extensions")
    args = parser.parse_args()
    try:
        if args.check:
            manifests = collect()
            for directory, manifest in manifests:
                print(f"ok  {manifest['id']} {manifest['version']}  ({directory.relative_to(ROOT)})")
            return 0
        for entry in build(args.out, args.repo):
            print(f"{entry['id']} {entry['version']}  {entry['download']['bytes']} bytes  {entry['download']['sha256'][:12]}")
        return 0
    except ManifestError as error:
        print(f"error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
