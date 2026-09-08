import { PhantomElement } from "./element.ts";
import { PhantomBadge } from "./badge.ts";

/**
 * A labelled group of controls.
 *
 * The label is the uppercase caption the sidebar's filter panel uses, and
 * `count` puts a badge beside it — the app's answer to "how many of these are
 * in force", drawn the same way in every panel so a count always looks like a
 * count.
 */
export class PhantomSection extends PhantomElement {
  static readonly tagName = "phantom-section";

  static get observedAttributes(): string[] {
    return ["label", "count"];
  }

  get label(): string | null {
    return this.text("label");
  }

  set label(value: string | null) {
    if (value === null) this.removeAttribute("label");
    else this.setAttribute("label", value);
  }

  get count(): number | null {
    const raw = this.text("count");
    if (raw === null) return null;

    const count = Number.parseInt(raw, 10);
    return Number.isFinite(count) ? count : null;
  }

  set count(value: number | null) {
    if (value === null) this.removeAttribute("count");
    else this.setAttribute("count", String(value));
  }

  protected override render(): void {
    const label = this.label;
    if (label === null) {
      this.dropPart("label");
      return;
    }

    const part = this.ownPart("label", "div");
    const text = part.querySelector("span") ?? part.appendChild(document.createElement("span"));
    text.textContent = label;

    const count = this.count;
    const badge = part.querySelector(PhantomBadge.tagName);
    if (count === null || count <= 0) {
      badge?.remove();
      return;
    }

    const shown = badge ?? part.appendChild(document.createElement(PhantomBadge.tagName));
    shown.textContent = String(count);
  }
}
