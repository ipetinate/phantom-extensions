import { afterEach } from "vitest";
import { defineAll } from "../src/index.ts";

defineAll({ checkStylesheet: false });

const mounted: HTMLElement[] = [];

/** Puts `html` in the document and answers with the element holding it. */
export function mount(html: string): HTMLElement {
  const host = document.createElement("div");
  host.innerHTML = html;
  document.body.append(host);
  mounted.push(host);
  return host;
}

/** An empty element in the document, for a framework to render into. */
export function container(): HTMLElement {
  const host = document.createElement("div");
  document.body.append(host);
  mounted.push(host);
  return host;
}

/** Presses one key on an element, the way a reader would. */
export function press(element: Element, key: string): KeyboardEvent {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
  element.dispatchEvent(event);
  return event;
}

afterEach(() => {
  for (const host of mounted.splice(0)) host.remove();
  document.documentElement.removeAttribute("style");
  document.documentElement.removeAttribute("data-scheme");
});
