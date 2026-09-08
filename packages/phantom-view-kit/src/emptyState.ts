import { PhantomElement } from "./element.ts";

/**
 * The panel a view shows when it has nothing to show.
 *
 * Art, a heading, a sentence, and the actions that fix it — the shape the
 * app's own placeholders take, sized for a pane rather than a window. The
 * first three are attributes the kit draws; the actions are the author's
 * children, so they are ordinary `phantom-button` elements with ordinary
 * handlers.
 *
 * `icon` is a path or a `data:` URI the package ships. The page's policy
 * allows images from `file:` and `data:` and nothing else, so a remote logo
 * does not load — and a view that names one shows an empty frame with no
 * error anywhere.
 */
export class PhantomEmptyState extends PhantomElement {
  static readonly tagName = "phantom-empty-state";

  static get observedAttributes(): string[] {
    return ["icon", "heading", "description"];
  }

  get icon(): string | null {
    return this.text("icon");
  }

  set icon(value: string | null) {
    if (value === null) this.removeAttribute("icon");
    else this.setAttribute("icon", value);
  }

  get heading(): string | null {
    return this.text("heading");
  }

  set heading(value: string | null) {
    if (value === null) this.removeAttribute("heading");
    else this.setAttribute("heading", value);
  }

  get description(): string | null {
    return this.text("description");
  }

  set description(value: string | null) {
    if (value === null) this.removeAttribute("description");
    else this.setAttribute("description", value);
  }

  protected override get partOrder(): readonly string[] {
    return ["art", "heading", "description"];
  }

  protected override render(): void {
    this.#renderArt();
    this.#renderText("heading", this.heading, "div");
    this.#renderText("description", this.description, "p");
  }

  #renderArt(): void {
    const icon = this.icon;
    if (icon === null) {
      this.dropPart("art");
      return;
    }

    const art = this.ownPart("art", "img") as HTMLImageElement;
    art.src = icon;
    art.alt = "";
    art.setAttribute("aria-hidden", "true");
  }

  #renderText(name: string, value: string | null, tag: string): void {
    if (value === null) {
      this.dropPart(name);
      return;
    }

    this.ownPart(name, tag).textContent = value;
  }
}
