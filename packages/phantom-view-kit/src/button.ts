import { PhantomElement, readFlag, writeFlag } from "./element.ts";

/**
 * How much of the reader's attention the button asks for.
 *
 * `plain` is the quiet bordered control the app uses for a secondary action.
 * `prominent` is the accent-filled one — `.borderedProminent` tinted with the
 * running theme's accent, as the commit button in the Git panel is — and a
 * view should have at most one on screen. `icon` is the sidebar's chip: 24 by
 * 22 points, no border, a highlight on hover.
 */
export type ButtonVariant = "plain" | "prominent" | "icon";

/**
 * A button that carries whatever the author puts inside it.
 *
 * The element **is** the control: it takes the role, the focus and the
 * keyboard, and it never touches its own children. That is what lets a label,
 * an icon, or a framework's re-rendered text live inside it without the kit
 * and the framework writing over each other.
 */
export class PhantomButton extends PhantomElement {
  static readonly tagName = "phantom-button";

  static get observedAttributes(): string[] {
    return ["disabled", "variant"];
  }

  get variant(): ButtonVariant {
    const value = this.getAttribute("variant");
    return value === "prominent" || value === "icon" ? value : "plain";
  }

  set variant(value: ButtonVariant) {
    this.setAttribute("variant", value);
  }

  get disabled(): boolean {
    return readFlag(this, "disabled");
  }

  set disabled(value: boolean) {
    writeFlag(this, "disabled", value);
  }

  protected override setup(): void {
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");

    this.addEventListener("keydown", (event) => this.#onKeyDown(event));
    this.addEventListener("click", (event) => this.#onClick(event), true);
  }

  protected override render(): void {
    const disabled = this.disabled;
    this.setAttribute("tabindex", disabled ? "-1" : "0");
    if (disabled) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");
  }

  #onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    this.click();
  }

  #onClick(event: Event): void {
    if (!this.disabled) return;

    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
