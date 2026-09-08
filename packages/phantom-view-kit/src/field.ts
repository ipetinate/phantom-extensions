import { PhantomElement, readFlag, writeFlag } from "./element.ts";

/**
 * The frame around one `input`, `textarea` or `select` the author writes.
 *
 * The control stays the author's, which is the point: React binds `value` and
 * `onChange` to it, Vue binds `v-model`, and plain HTML needs nothing. The
 * kit contributes the fill, the radius and the focus ring the app's own
 * fields wear, and the click target — a click anywhere in the frame lands in
 * the control, as it does in AppKit.
 */
export class PhantomField extends PhantomElement {
  static readonly tagName = "phantom-field";

  static get observedAttributes(): string[] {
    return ["invalid"];
  }

  /** The control inside the frame, or null while there is none. */
  get control(): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null {
    return this.querySelector("input, textarea, select");
  }

  get value(): string {
    return this.control?.value ?? "";
  }

  set value(next: string) {
    const control = this.control;
    if (control) control.value = next;
  }

  get invalid(): boolean {
    return readFlag(this, "invalid");
  }

  set invalid(value: boolean) {
    writeFlag(this, "invalid", value);
  }

  protected override setup(): void {
    this.addEventListener("mousedown", (event) => this.#focusControl(event));
  }

  protected override render(): void {
    const control = this.control;
    if (!control) return;

    if (this.invalid) control.setAttribute("aria-invalid", "true");
    else control.removeAttribute("aria-invalid");
  }

  #focusControl(event: MouseEvent): void {
    const control = this.control;
    if (!control || event.target === control || control.disabled) return;

    event.preventDefault();
    control.focus();
  }
}
