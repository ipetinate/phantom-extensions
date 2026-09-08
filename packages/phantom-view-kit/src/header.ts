import { PhantomElement } from "./element.ts";

/**
 * The bar at the top of a pane: a heading, and the actions beside it.
 *
 * The heading is an attribute and the actions are children, so a view writes
 * `<phantom-header heading="Requests"><phantom-button …></phantom-header>`
 * and gets the sidebar's own row height and inset. It is `heading` rather
 * than `title` because `title` is the attribute that draws a tooltip, and a
 * pane header is not a tooltip.
 */
export class PhantomHeader extends PhantomElement {
  static readonly tagName = "phantom-header";

  static get observedAttributes(): string[] {
    return ["heading"];
  }

  get heading(): string | null {
    return this.text("heading");
  }

  set heading(value: string | null) {
    if (value === null) this.removeAttribute("heading");
    else this.setAttribute("heading", value);
  }

  protected override render(): void {
    const heading = this.heading;
    if (heading === null) {
      this.dropPart("heading");
      return;
    }

    this.ownPart("heading").textContent = heading;
  }
}
