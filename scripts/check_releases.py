#!/usr/bin/env python3
import argparse
import hashlib
import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class ReleaseCheckError(Exception):
    pass


def run_gh(*args):
    return subprocess.run(["gh", *args], capture_output=True, text=True)


def published_assets(tag):
    result = run_gh("release", "view", tag, "--json", "assets")
    if result.returncode != 0:
        if "release not found" in result.stderr.lower():
            return None
        raise ReleaseCheckError(f"gh release view {tag}: {result.stderr.strip() or result.stdout.strip()}")
    return [asset["name"] for asset in json.loads(result.stdout)["assets"]]


def download_asset(tag, name, into):
    into.mkdir(parents=True, exist_ok=True)
    result = run_gh("release", "download", tag, "--pattern", name, "--dir", str(into))
    if result.returncode != 0:
        raise ReleaseCheckError(f"gh release download {tag}: {result.stderr.strip()}")
    return into / name


def sha256_of(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read_rows(dist):
    rows = []
    for line in (dist / "releases.tsv").read_text(encoding="utf-8").splitlines():
        if line.strip():
            tag, zip_path, _title = line.split("\t")
            rows.append((tag, zip_path))
    return rows


def local_digest(zip_path, entry):
    path = Path(zip_path)
    if not path.is_absolute():
        path = ROOT / path
    if path.is_file():
        return sha256_of(path)
    return entry["download"]["sha256"]


def check(dist):
    index = json.loads((dist / "index.json").read_text(encoding="utf-8"))
    by_tag = {f"{entry['id']}-v{entry['version']}": entry for entry in index["extensions"]}
    failures = 0
    with tempfile.TemporaryDirectory() as temp:
        for tag, zip_path in read_rows(dist):
            entry = by_tag[tag]
            assets = published_assets(tag)
            if assets is None:
                print(f"new      {tag}")
                continue
            name = Path(zip_path).name
            if name not in assets:
                print(f"::error::{entry['id']} {entry['version']} has a release without {name}; delete the release or raise version")
                failures += 1
                continue
            published = sha256_of(download_asset(tag, name, Path(temp) / tag))
            if published != local_digest(zip_path, entry):
                print(f"::error::{entry['id']} {entry['version']} is already published with different bytes; raise version")
                failures += 1
                continue
            print(f"same     {tag}")
    return 1 if failures else 0


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dist", type=Path, default=ROOT / "dist")
    args = parser.parse_args()
    try:
        return check(args.dist)
    except (ReleaseCheckError, FileNotFoundError, KeyError) as error:
        print(f"error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
