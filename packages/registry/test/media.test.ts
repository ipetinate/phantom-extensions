import { unlinkSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MAX_GIF_BYTES, MAX_IMAGE_BYTES, MAX_MEDIA_FILES, MAX_VIDEO_BYTES, checkMedia } from "../src/media.ts";
import { ExtensionFixture, MINIMAL_PNG, languageManifest, makeRoot, removeRoot } from "./fixture.ts";

let root: string;
let fixture: ExtensionFixture;

beforeEach(() => {
  root = makeRoot();
  fixture = new ExtensionFixture(root, "sample", languageManifest(), false);
});

afterEach(() => {
  removeRoot(root);
});

function check() {
  return checkMedia(fixture.directory);
}

function remove(relative: string): void {
  unlinkSync(path.join(fixture.directory, relative));
}

describe("checkMedia", () => {
  it("lists media with sizes", () => {
    fixture.write("media/b.png", MINIMAL_PNG);
    fixture.write("media/nested/a.webp", "x");
    expect(check()).toEqual({
      entries: [
        { path: "media/b.png", bytes: MINIMAL_PNG.length },
        { path: "media/nested/a.webp", bytes: 1 },
      ],
      bytes: MINIMAL_PNG.length + 1,
    });
  });

  it("accepts no media directory", () => {
    expect(check()).toEqual({ entries: [], bytes: 0 });
  });

  it("rejects other suffixes", () => {
    fixture.write("media/notes.txt", "x");
    expect(check).toThrow(/media\/ may only hold/);
    remove("media/notes.txt");
    fixture.write("media/clip.mov", "x");
    expect(check).toThrow(/media\/ may only hold/);
  });

  it("holds each kind to its size limit", () => {
    fixture.writeSized("media/big.png", MAX_IMAGE_BYTES + 1);
    expect(check).toThrow(/media\/big.png is larger than/);
    remove("media/big.png");
    fixture.writeSized("media/big.gif", MAX_GIF_BYTES + 1);
    expect(check).toThrow(/media\/big.gif is larger than/);
    remove("media/big.gif");
    fixture.writeSized("media/big.mp4", MAX_VIDEO_BYTES + 1);
    expect(check).toThrow(/media\/big.mp4 is larger than/);
    remove("media/big.mp4");
    fixture.writeSized("media/big.svg", MAX_IMAGE_BYTES + 1);
    expect(check).toThrow(/media\/big.svg is larger than/);
  });

  it("accepts files at the limit", () => {
    fixture.writeSized("media/ok.gif", MAX_GIF_BYTES);
    fixture.writeSized("media/ok.webm", MAX_VIDEO_BYTES);
    expect(check).not.toThrow();
  });

  it("holds the total", () => {
    for (let index = 0; index < 3; index += 1) fixture.writeSized(`media/v${index}.mp4`, 8 * 1024 * 1024);
    fixture.writeSized("media/extra.png", 1);
    expect(check).toThrow(/larger than .* in total/);
  });

  it("holds the file count", () => {
    for (let index = 0; index <= MAX_MEDIA_FILES; index += 1) fixture.write(`media/f${index}.png`, "x");
    expect(check).toThrow(/more than 32 files/);
  });

  it("ignores .DS_Store", () => {
    fixture.write("media/.DS_Store", "x");
    expect(check()).toEqual({ entries: [], bytes: 0 });
  });
});
