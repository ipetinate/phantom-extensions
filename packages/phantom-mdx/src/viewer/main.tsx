import { createRoot } from "react-dom/client";
import { Document, type RenderFailure } from "../render.tsx";
import { applyTheme, defaultTheme, normalizeTheme, type Theme } from "../theme.ts";
import { bridgeHandler, post, type PhantomViewer, type RenderRequest } from "./bridge.ts";

const VERSION = __PHANTOM_MDX_VERSION__;

const container = document.getElementById("root");
if (!container) throw new Error("the viewer page has no #root element");
const root = createRoot(container);

let theme: Theme = defaultTheme;
let current: RenderRequest | null = null;

function openLink(href: string): void {
  post({ type: "open", href });
}

function copyText(text: string): void {
  post({ type: "copy", text });
}

function rendered(warnings: string[]): void {
  post({ type: "rendered", warnings });
}

function failed(failure: RenderFailure): void {
  post({ type: "failed", message: failure.message, line: failure.line, column: failure.column });
}

function paint(): void {
  if (!current) return;
  root.render(
    <Document
      source={current.source}
      baseURL={current.baseURL}
      cover={current.cover}
      onLink={bridgeHandler() ? openLink : undefined}
      onCopy={bridgeHandler() ? copyText : undefined}
      onRendered={rendered}
      onFailed={failed}
    />,
  );
}

function setTheme(payload: unknown): void {
  theme = normalizeTheme(payload, theme);
  applyTheme(document.documentElement, theme);
}

function render(request: RenderRequest): void {
  if (request.theme !== undefined) setTheme(request.theme);
  current = { source: String(request.source ?? ""), baseURL: String(request.baseURL ?? ""), cover: request.cover };
  paint();
}

applyTheme(document.documentElement, theme);

const viewer: PhantomViewer = {
  render,
  setTheme,
  get version() {
    return VERSION;
  },
  get theme() {
    return theme;
  },
};

window.phantomViewer = viewer;
post({ type: "ready", version: VERSION });
