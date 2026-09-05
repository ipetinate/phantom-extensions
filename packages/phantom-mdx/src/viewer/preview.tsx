import "./preview.css";
import { defaultLightTheme, defaultTheme, type Theme } from "../theme.ts";
import { STATUS_EVENT, type ViewerMessage } from "./bridge.ts";

const DOCUMENT_NAMES = ["extension.mdx", "extension.md"];

const bar = document.createElement("div");
bar.className = "ph-preview-bar";
const schemeButton = document.createElement("button");
const presetButton = document.createElement("button");
presetButton.textContent = "Phantom default theme";
const status = document.createElement("span");
status.className = "ph-preview-status";
bar.append(schemeButton, presetButton, status);
document.body.append(bar);

let theme: Theme = defaultTheme;

function labelScheme(): void {
  schemeButton.textContent = theme.scheme === "dark" ? "Switch to light" : "Switch to dark";
}

function setStatus(text: string, state: "ok" | "warning" | "failed"): void {
  status.textContent = text;
  status.dataset.state = state;
  status.title = text;
}

function coverOf(source: string): string | undefined {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  const block = match?.[1] ?? "";
  const line = block.split(/\r?\n/).find((entry) => /^cover:\s*\S/.test(entry));
  return line?.replace(/^cover:\s*/, "").replace(/^['"]|['"]$/g, "").trim();
}

async function fetchDocument(): Promise<string> {
  for (const name of DOCUMENT_NAMES) {
    const response = await fetch(`/ext/${name}?t=${Date.now()}`, { cache: "no-store" });
    if (response.ok) return response.text();
  }
  throw new Error(`no ${DOCUMENT_NAMES.join(" or ")} in the extension directory`);
}

async function load(): Promise<void> {
  try {
    const source = await fetchDocument();
    window.phantomViewer.render({ source, baseURL: `${location.origin}/ext/`, theme, cover: coverOf(source) });
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), "failed");
  }
}

window.addEventListener(STATUS_EVENT, (event) => {
  const message = (event as CustomEvent<ViewerMessage>).detail;
  if (message.type === "rendered") {
    setStatus(message.warnings.length ? `rendered with ${message.warnings.length} warning(s): ${message.warnings.join("; ")}` : "rendered", message.warnings.length ? "warning" : "ok");
  } else if (message.type === "failed") {
    setStatus(`${message.line ?? ""}${message.line ? ":" : ""}${message.column ?? ""} ${message.message}`.trim(), "failed");
  }
});

schemeButton.addEventListener("click", () => {
  theme = theme.scheme === "dark" ? defaultLightTheme : defaultTheme;
  labelScheme();
  window.phantomViewer.setTheme(theme);
});

presetButton.addEventListener("click", () => {
  theme = defaultTheme;
  labelScheme();
  window.phantomViewer.setTheme(theme);
});

if (import.meta.hot) {
  import.meta.hot.on("phantom-mdx:changed", () => {
    void load();
  });
}

labelScheme();
void load();
