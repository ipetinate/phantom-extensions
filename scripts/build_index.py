#!/usr/bin/env python3
import argparse
import hashlib
import json
import re
import subprocess
import sys
import zipfile
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
EXTENSIONS = ROOT / "extensions"
ID_PATTERN = re.compile(r"^[a-z0-9][a-z0-9._-]*$")
VERSION_PATTERN = re.compile(r"^\d+\.\d+\.\d+$")
LANGUAGE_ID_PATTERN = re.compile(r"^[a-z0-9_+-]+$")
AGENT_ID_PATTERN = re.compile(r"^[a-z0-9_+-]+$")
CATEGORIES = {"script", "compiled", "markup", "frontendFramework", "styles", "data", "infrastructure"}
CONTRIBUTION_KINDS = ("languages", "formatters", "themes", "iconThemes", "agents")
MAX_MANIFEST_BYTES = 512 * 1024
MAX_DOCUMENT_BYTES = 256 * 1024
MAX_IMAGE_BYTES = 2 * 1024 * 1024
MAX_GIF_BYTES = 5 * 1024 * 1024
MAX_VIDEO_BYTES = 12 * 1024 * 1024
MAX_MEDIA_BYTES = 24 * 1024 * 1024
MAX_MEDIA_FILES = 32
MAX_ZIP_BYTES = 32 * 1024 * 1024
DOCUMENT_NAME = "extension.mdx"
MEDIA_DIRECTORY = "media"
IMAGE_SUFFIXES = {"png", "jpg", "jpeg", "webp", "gif"}
VIDEO_SUFFIXES = {"mp4", "webm"}
ICON_SUFFIXES = {"svg", "png"}
COVER_SUFFIXES = {"png", "jpg", "jpeg", "webp"}
MEDIA_SUFFIXES = IMAGE_SUFFIXES | VIDEO_SUFFIXES | {"svg"}
FRONT_MATTER_KEYS = {"title", "tagline", "version", "author", "license", "created", "updated", "icon", "cover", "tags", "screenshots"}
AUTHOR_KEYS = {"name", "url"}
MAX_TITLE_CHARS = 80
MAX_TAGLINE_CHARS = 160
MAX_AUTHOR_CHARS = 80
MAX_LICENSE_CHARS = 64
MAX_TAGS = 8
MAX_SCREENSHOTS = 8
TAG_PATTERN = re.compile(r"^[a-z0-9][a-z0-9-]{0,23}$")
DATE_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}$")
FRONT_MATTER_KEY_PATTERN = re.compile(r"^[A-Za-z][A-Za-z0-9_-]*$")
PLAIN_SCALAR_FORBIDDEN_START = set("&*!|>%@`")
ZIP_EPOCH = (1980, 1, 1, 0, 0, 0)


class ManifestError(Exception):
    pass


class FrontMatterError(Exception):
    def __init__(self, line, message):
        super().__init__(f"line {line}: {message}")
        self.line = line
        self.message = message


def describe(directory):
    try:
        return str(directory.relative_to(ROOT))
    except ValueError:
        return str(directory)


def fail(directory, message):
    raise ManifestError(f"{describe(directory)}: {message}")


def require_string(directory, obj, key, pattern=None):
    value = obj.get(key)
    if not isinstance(value, str) or not value:
        fail(directory, f"'{key}' must be a non-empty string")
    if pattern and not pattern.match(value):
        fail(directory, f"'{key}' does not match {pattern.pattern}: {value!r}")
    return value


def require_asset(directory, relative):
    if not isinstance(relative, str) or not relative or relative.startswith("/") or ".." in Path(relative).parts:
        fail(directory, f"asset path must be relative and inside the extension: {relative!r}")
    if not (directory / relative).exists():
        fail(directory, f"asset does not exist: {relative}")


def strip_comment(text):
    quote = None
    for index, char in enumerate(text):
        if quote:
            if char == quote:
                quote = None
        elif char in "'\"":
            quote = char
        elif char == "#" and (index == 0 or text[index - 1] in " \t"):
            return text[:index].rstrip()
    return text.rstrip()


def split_flow_items(line, text):
    items = []
    current = []
    quote = None
    for char in text:
        if quote:
            current.append(char)
            if char == quote:
                quote = None
        elif char in "'\"":
            quote = char
            current.append(char)
        elif char in "{}[]":
            raise FrontMatterError(line, "flow collections may not nest")
        elif char == ",":
            items.append("".join(current))
            current = []
        else:
            current.append(char)
    if quote:
        raise FrontMatterError(line, "quoted scalar is not closed")
    items.append("".join(current))
    if len(items) == 1 and not items[0].strip():
        return []
    return items


def parse_quoted(line, text):
    quote = text[0]
    result = []
    index = 1
    while index < len(text):
        char = text[index]
        if quote == "'" and char == "'":
            if text[index + 1:index + 2] == "'":
                result.append("'")
                index += 2
                continue
            return "".join(result), text[index + 1:]
        if quote == '"' and char == "\\":
            escaped = text[index + 1:index + 2]
            replacements = {"\\": "\\", '"': '"', "n": "\n", "t": "\t", "/": "/"}
            if escaped not in replacements:
                raise FrontMatterError(line, f"unsupported escape \\{escaped}")
            result.append(replacements[escaped])
            index += 2
            continue
        if quote == '"' and char == '"':
            return "".join(result), text[index + 1:]
        result.append(char)
        index += 1
    raise FrontMatterError(line, "quoted scalar is not closed on its line")


def parse_scalar(line, text):
    text = text.strip()
    if not text:
        raise FrontMatterError(line, "empty value")
    if text[0] in "'\"":
        value, rest = parse_quoted(line, text)
        if rest.strip():
            raise FrontMatterError(line, f"unexpected text after quoted scalar: {rest.strip()!r}")
        return value
    if text[0] in PLAIN_SCALAR_FORBIDDEN_START:
        raise FrontMatterError(line, f"unsupported YAML: {text[0]!r} scalars, anchors and tags are not accepted")
    if text[0] in "{}[]":
        raise FrontMatterError(line, "flow collections may not nest")
    if ": " in text or text.endswith(":"):
        raise FrontMatterError(line, "a value may not hold a mapping")
    return text


def parse_flow_mapping(line, text):
    mapping = {}
    for item in split_flow_items(line, text[1:-1]):
        key, value = split_pair(line, item.strip())
        if key in mapping:
            raise FrontMatterError(line, f"duplicate key {key!r}")
        mapping[key] = parse_scalar(line, value)
    return mapping


def parse_flow_sequence(line, text):
    return [parse_scalar(line, item) for item in split_flow_items(line, text[1:-1])]


def parse_value(line, text):
    text = strip_comment(text.strip())
    if text.startswith("{"):
        if not text.endswith("}"):
            raise FrontMatterError(line, "flow mapping is not closed on its line")
        return parse_flow_mapping(line, text)
    if text.startswith("["):
        if not text.endswith("]"):
            raise FrontMatterError(line, "flow sequence is not closed on its line")
        return parse_flow_sequence(line, text)
    return parse_scalar(line, text)


def split_pair(line, text):
    if ":" not in text:
        raise FrontMatterError(line, "expected 'key: value'")
    key, separator, value = text.partition(":")
    if separator and value and not value.startswith(" "):
        raise FrontMatterError(line, "expected a space after ':'")
    key = key.strip()
    if not FRONT_MATTER_KEY_PATTERN.match(key):
        raise FrontMatterError(line, f"bad key {key!r}")
    return key, value.strip()


def indent_of(text):
    return len(text) - len(text.lstrip(" "))


def is_noise(text):
    stripped = text.strip()
    return not stripped or stripped.startswith("#")


def parse_nested(block, index):
    while index < len(block) and is_noise(block[index][1]):
        index += 1
    if index >= len(block):
        return None, index
    number, first = block[index]
    indent = indent_of(first)
    if indent > 2:
        raise FrontMatterError(number, "nesting deeper than one level is not accepted")
    if first.lstrip().startswith("- "):
        return parse_block_sequence(block, index, indent)
    if indent == 0:
        return None, index
    return parse_block_mapping(block, index)


def parse_block_sequence(block, index, indent):
    items = []
    while index < len(block):
        number, text = block[index]
        if is_noise(text):
            index += 1
            continue
        current = indent_of(text)
        if current < indent or (current == 0 and not text.startswith("- ")):
            break
        if current != indent or not text[indent:].startswith("- "):
            raise FrontMatterError(number, "sequence items must share one indentation and start with '- '")
        item = strip_comment(text[indent + 2:].strip())
        if item.startswith(("{", "[")):
            raise FrontMatterError(number, "sequence items must be scalars")
        if ": " in item or item.endswith(":"):
            raise FrontMatterError(number, "nesting deeper than one level is not accepted")
        items.append(parse_scalar(number, item))
        index += 1
    return items, index


def parse_block_mapping(block, index):
    mapping = {}
    while index < len(block):
        number, text = block[index]
        if is_noise(text):
            index += 1
            continue
        current = indent_of(text)
        if current == 0:
            break
        if current != 2:
            raise FrontMatterError(number, "nested keys must be indented by two spaces")
        if text[2:].startswith("- "):
            raise FrontMatterError(number, "a mapping may not mix keys and sequence items")
        key, value = split_pair(number, text.strip())
        if not value:
            raise FrontMatterError(number, "nesting deeper than one level is not accepted")
        if key in mapping:
            raise FrontMatterError(number, f"duplicate key {key!r}")
        mapping[key] = parse_value(number, value)
        index += 1
    return mapping, index


def parse_front_matter(text, allowed_keys=None):
    lines = [line.rstrip("\r") for line in text.split("\n")]
    if not lines or lines[0] != "---":
        raise FrontMatterError(1, "the document must start with a '---' front matter block")
    end = next((number for number, line in enumerate(lines[1:], start=2) if line == "---"), None)
    if end is None:
        raise FrontMatterError(1, "the front matter block is not closed with '---'")
    block = [(number, lines[number - 1]) for number in range(2, end)]
    for number, line in block:
        if "\t" in line:
            raise FrontMatterError(number, "tabs are not allowed in the front matter")
    data = {}
    index = 0
    while index < len(block):
        number, line = block[index]
        if is_noise(line):
            index += 1
            continue
        if indent_of(line) > 0:
            raise FrontMatterError(number, "unexpected indentation")
        if line.startswith("- "):
            raise FrontMatterError(number, "the front matter must be a mapping")
        key, value = split_pair(number, line)
        if allowed_keys is not None and key not in allowed_keys:
            raise FrontMatterError(number, f"unknown key {key!r}")
        if key in data:
            raise FrontMatterError(number, f"duplicate key {key!r}")
        if value:
            data[key] = parse_value(number, value)
            index += 1
            continue
        nested, index = parse_nested(block, index + 1)
        if nested is None:
            raise FrontMatterError(number, f"{key!r} has no value")
        data[key] = nested
    return data, end + 1


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


def validate_agent(directory, agent):
    if not isinstance(agent, dict):
        fail(directory, "each agent must be an object")
    require_string(directory, agent, "agentId", AGENT_ID_PATTERN)
    require_string(directory, agent, "name")
    require_string(directory, agent, "command")
    if "icon" in agent:
        require_asset(directory, agent["icon"])


def validate_pathed(directory, kind, entry):
    if not isinstance(entry, dict):
        fail(directory, f"each entry in {kind} must be an object")
    require_string(directory, entry, "name")
    require_asset(directory, entry.get("path"))


def document_fail(directory, message):
    fail(directory, f"{DOCUMENT_NAME}: {message}")


def require_text(directory, data, key, limit, required=True):
    if key not in data:
        if required:
            document_fail(directory, f"front matter needs {key!r}")
        return None
    value = data[key]
    if not isinstance(value, str) or not value.strip():
        document_fail(directory, f"{key!r} must be a non-empty text")
    if len(value) > limit:
        document_fail(directory, f"{key!r} is longer than {limit} characters")
    return value


def require_https(directory, key, value):
    parts = urlsplit(value)
    if parts.scheme != "https" or not parts.netloc:
        document_fail(directory, f"{key!r} must be an https URL")
    return value


def require_media(directory, key, value, suffixes):
    if not isinstance(value, str) or not value.startswith(MEDIA_DIRECTORY + "/"):
        document_fail(directory, f"{key!r} must point under {MEDIA_DIRECTORY}/: {value!r}")
    require_asset(directory, value)
    suffix = Path(value).suffix[1:].lower()
    if suffix not in suffixes:
        document_fail(directory, f"{key!r} must end in one of {', '.join(sorted(suffixes))}: {value}")
    if not (directory / value).is_file():
        document_fail(directory, f"{key!r} is not a file: {value}")
    return value


def require_list(directory, data, key, limit):
    value = data.get(key, [])
    if not isinstance(value, list):
        document_fail(directory, f"{key!r} must be a sequence")
    if len(value) > limit:
        document_fail(directory, f"{key!r} holds more than {limit} entries")
    return value


def require_date(directory, key, value):
    if not isinstance(value, str) or not DATE_PATTERN.match(value):
        document_fail(directory, f"{key!r} must be a YYYY-MM-DD date")
    try:
        date.fromisoformat(value)
    except ValueError as error:
        document_fail(directory, f"{key!r} is not a valid date: {error}")
    return value


def utc_timestamp(moment):
    return moment.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def normalise_updated(directory, value):
    if not isinstance(value, str):
        document_fail(directory, "'updated' must be a date or an ISO 8601 timestamp")
    if DATE_PATTERN.match(value):
        require_date(directory, "updated", value)
        return f"{value}T00:00:00Z"
    try:
        moment = datetime.fromisoformat(value[:-1] + "+00:00" if value.endswith("Z") else value)
    except ValueError:
        document_fail(directory, f"'updated' is not an ISO 8601 timestamp: {value}")
    if moment.tzinfo is None:
        document_fail(directory, "'updated' needs a UTC offset or Z")
    return utc_timestamp(moment)


def git_updated(directory):
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%cI", "--", "."],
            cwd=directory, capture_output=True, text=True, timeout=30,
        )
    except (OSError, subprocess.TimeoutExpired):
        return None
    stamp = result.stdout.strip()
    if result.returncode != 0 or not stamp:
        return None
    try:
        return utc_timestamp(datetime.fromisoformat(stamp))
    except ValueError:
        return None


def validate_front_matter(directory, manifest, data):
    title = require_text(directory, data, "title", MAX_TITLE_CHARS)
    tagline = require_text(directory, data, "tagline", MAX_TAGLINE_CHARS)
    version = require_text(directory, data, "version", 32)
    if version != manifest["version"]:
        document_fail(directory, f"'version' is {version} but extension.json says {manifest['version']}")
    author = data.get("author")
    if not isinstance(author, dict):
        document_fail(directory, "front matter needs 'author' with a 'name'")
    unknown = set(author) - AUTHOR_KEYS
    if unknown:
        document_fail(directory, f"'author' has unknown keys: {', '.join(sorted(unknown))}")
    author_name = require_text(directory, author, "name", MAX_AUTHOR_CHARS)
    author_url = require_text(directory, author, "url", 2048, required=False)
    if author_url is not None:
        require_https(directory, "author.url", author_url)
    license_name = require_text(directory, data, "license", MAX_LICENSE_CHARS)
    created = require_date(directory, "created", data.get("created"))
    if "updated" in data:
        updated = normalise_updated(directory, data["updated"])
    else:
        updated = git_updated(directory) or f"{created}T00:00:00Z"
    icon = require_media(directory, "icon", data["icon"], ICON_SUFFIXES) if "icon" in data else None
    cover = require_media(directory, "cover", data["cover"], COVER_SUFFIXES) if "cover" in data else None
    tags = require_list(directory, data, "tags", MAX_TAGS)
    for tag in tags:
        if not isinstance(tag, str) or not TAG_PATTERN.match(tag):
            document_fail(directory, f"tag does not match {TAG_PATTERN.pattern}: {tag!r}")
    if len(set(tags)) != len(tags):
        document_fail(directory, "'tags' holds a duplicate")
    screenshots = require_list(directory, data, "screenshots", MAX_SCREENSHOTS)
    for shot in screenshots:
        require_media(directory, "screenshots", shot, IMAGE_SUFFIXES)
    return {
        "title": title,
        "tagline": tagline,
        "author": {"name": author_name, "url": author_url},
        "license": license_name,
        "created": created,
        "updated": updated,
        "icon": icon,
        "cover": cover,
        "tags": tags,
        "screenshots": screenshots,
    }


def load_document(directory, manifest):
    path = directory / DOCUMENT_NAME
    if not path.is_file():
        return None
    size = path.stat().st_size
    if size > MAX_DOCUMENT_BYTES:
        document_fail(directory, f"larger than {MAX_DOCUMENT_BYTES} bytes")
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError as error:
        document_fail(directory, f"not UTF-8: {error}")
    try:
        data, _ = parse_front_matter(text, FRONT_MATTER_KEYS)
    except FrontMatterError as error:
        fail(directory, f"{DOCUMENT_NAME}:{error.line}: {error.message}")
    card = validate_front_matter(directory, manifest, data)
    card["document"] = DOCUMENT_NAME
    card["documentBytes"] = size
    return card


def extension_files(directory):
    return sorted(p for p in directory.rglob("*") if p.is_file() and ".DS_Store" not in p.parts)


def check_media(directory):
    media_root = directory / MEDIA_DIRECTORY
    files = extension_files(media_root) if media_root.is_dir() else []
    if len(files) > MAX_MEDIA_FILES:
        fail(directory, f"{MEDIA_DIRECTORY}/ holds more than {MAX_MEDIA_FILES} files")
    entries = []
    total = 0
    for file in files:
        relative = file.relative_to(directory).as_posix()
        suffix = file.suffix[1:].lower()
        if suffix in VIDEO_SUFFIXES:
            limit = MAX_VIDEO_BYTES
        elif suffix == "gif":
            limit = MAX_GIF_BYTES
        elif suffix in MEDIA_SUFFIXES:
            limit = MAX_IMAGE_BYTES
        else:
            fail(directory, f"{relative}: {MEDIA_DIRECTORY}/ may only hold {', '.join(sorted(MEDIA_SUFFIXES))}")
        size = file.stat().st_size
        if size > limit:
            fail(directory, f"{relative} is larger than {limit} bytes")
        total += size
        entries.append({"path": relative, "bytes": size})
    if total > MAX_MEDIA_BYTES:
        fail(directory, f"{MEDIA_DIRECTORY}/ is larger than {MAX_MEDIA_BYTES} bytes in total")
    return entries, total


def referenced_paths(manifest):
    contributes = manifest.get("contributes", {})
    paths = set()
    for language in contributes.get("languages", []):
        if isinstance(language, dict) and isinstance(language.get("icon"), str):
            paths.add(language["icon"])
    for kind in ("themes", "iconThemes"):
        for entry in contributes.get(kind, []):
            if isinstance(entry, dict) and isinstance(entry.get("path"), str):
                paths.add(entry["path"])
    for agent in contributes.get("agents", []):
        if not isinstance(agent, dict):
            continue
        if isinstance(agent.get("icon"), str):
            paths.add(agent["icon"])
        hooks = agent.get("hooks")
        if isinstance(hooks, dict) and isinstance(hooks.get("template"), str):
            paths.add(hooks["template"])
    return {Path(p).as_posix() for p in paths}


def check_layout(directory, manifest):
    referenced = referenced_paths(manifest)
    for file in extension_files(directory):
        relative = file.relative_to(directory).as_posix()
        if relative in ("extension.json", DOCUMENT_NAME) or relative.startswith(MEDIA_DIRECTORY + "/"):
            continue
        if "/" not in relative and relative.startswith(("LICENSE", "README")):
            continue
        parents = {parent.as_posix() for parent in Path(relative).parents}
        if relative in referenced or parents & referenced:
            continue
        fail(directory, f"{relative} is not referenced by the manifest; media belongs under {MEDIA_DIRECTORY}/")


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
    for agent in contributes.get("agents", []):
        validate_agent(directory, agent)
    return manifest


def collect(extensions=None):
    collected = []
    seen = {}
    for directory in sorted(p for p in (extensions or EXTENSIONS).iterdir() if p.is_dir()):
        manifest = load_manifest(directory)
        if manifest["id"] in seen:
            fail(directory, f"id {manifest['id']!r} is already used by {seen[manifest['id']]}")
        seen[manifest["id"]] = describe(directory)
        check_layout(directory, manifest)
        media, media_bytes = check_media(directory)
        card = load_document(directory, manifest)
        if card is not None:
            card["media"] = media
            card["mediaBytes"] = media_bytes
        collected.append((directory, manifest, card))
    if not collected:
        raise ManifestError("no extensions found")
    return collected


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
    for directory, manifest, card in collect():
        name = f"{manifest['id']}-{manifest['version']}"
        tag = f"{manifest['id']}-v{manifest['version']}"
        archive = write_zip(directory, out / f"{name}.zip")
        data = archive.read_bytes()
        if len(data) > MAX_ZIP_BYTES:
            fail(directory, f"the zip is larger than {MAX_ZIP_BYTES} bytes")
        contributes = manifest["contributes"]
        entry = {
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
        }
        if card is not None:
            entry["card"] = card
        entries.append(entry)
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
            for directory, manifest, card in collect():
                media, media_bytes = check_media(directory)
                document = "yes" if card else "no"
                print(f"ok  {manifest['id']} {manifest['version']}  doc:{document}  media:{len(media)} files, {media_bytes / (1024 * 1024):.2f} MiB")
            return 0
        for entry in build(args.out, args.repo):
            print(f"{entry['id']} {entry['version']}  {entry['download']['bytes']} bytes  {entry['download']['sha256'][:12]}")
        return 0
    except ManifestError as error:
        print(f"error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
