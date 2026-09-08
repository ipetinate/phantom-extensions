import { PhantomElement } from "./element.ts";

/**
 * A block of monospaced text: a body, a header dump, a stack trace.
 *
 * It draws the app's code surface — the theme's `codeBg` inside a hairline
 * border — and its own thin scroll indicator, and it adds no behaviour at
 * all. It is an element rather than a class so a view names one vocabulary
 * for its controls, and so `wrap` is a property a framework can bind.
 */
export class PhantomCode extends PhantomElement {
  static readonly tagName = "phantom-code";

  get wrap(): boolean {
    return this.getAttribute("wrap") !== "off";
  }

  set wrap(value: boolean) {
    this.setAttribute("wrap", value ? "on" : "off");
  }
}
