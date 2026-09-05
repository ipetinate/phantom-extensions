import type { Theme } from "../theme.ts";

export interface RenderRequest {
  source: string;
  baseURL: string;
  theme?: unknown;
  cover?: string;
}

export type ViewerMessage =
  | { type: "ready"; version: string }
  | { type: "rendered"; warnings: string[] }
  | { type: "failed"; message: string; line?: number; column?: number }
  | { type: "open"; href: string }
  | { type: "copy"; text: string };

export interface PhantomViewer {
  render(request: RenderRequest): void;
  setTheme(theme: unknown): void;
  readonly version: string;
  readonly theme: Theme;
}

interface MessageHandler {
  postMessage(message: unknown): void;
}

declare global {
  interface Window {
    phantomViewer: PhantomViewer;
    webkit?: { messageHandlers?: { phantom?: MessageHandler } };
  }
}

export const STATUS_EVENT = "phantom-mdx:status";

export function bridgeHandler(): MessageHandler | null {
  return window.webkit?.messageHandlers?.phantom ?? null;
}

export function post(message: ViewerMessage): void {
  bridgeHandler()?.postMessage(message);
  window.dispatchEvent(new CustomEvent(STATUS_EVENT, { detail: message }));
}
