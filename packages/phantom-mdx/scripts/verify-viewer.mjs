import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const viewerDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "viewer");
const html = readFileSync(path.join(viewerDirectory, "viewer.html"), "utf8");
const css = readFileSync(path.join(viewerDirectory, "viewer.css"), "utf8");
readFileSync(path.join(viewerDirectory, "viewer.js"));

const problems = [];
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
if (scripts.length !== 1) problems.push(`expected one script tag, found ${scripts.length}`);
for (const [tag, body] of scripts) {
  if (body.trim() !== "") problems.push("inline script content");
  if (!/\ssrc="viewer\.js"/.test(tag)) problems.push(`script does not load viewer.js: ${tag}`);
  if (!/type="module"/.test(tag)) problems.push("script is not a module");
}
if (/<style\b/i.test(html)) problems.push("inline <style> element");
if (/\sstyle="/i.test(html)) problems.push("inline style attribute");
if (!/<link rel="stylesheet" href="viewer\.css">/.test(html)) problems.push("stylesheet link is not viewer.css");
if (!/<meta http-equiv="Content-Security-Policy"/.test(html)) problems.push("the Content-Security-Policy meta is missing");
if (/\s(?:src|href)="(?:https?:)?\/\//i.test(html)) problems.push("external reference in the html");
if (/crossorigin/i.test(html)) problems.push("crossorigin attribute left in the html");
if (/@import|url\(/i.test(css)) problems.push("the stylesheet imports or loads a resource");

if (problems.length > 0) {
  for (const problem of problems) process.stderr.write(`viewer: ${problem}\n`);
  process.exit(1);
}
process.stdout.write(`viewer ok: ${viewerDirectory}\n`);
