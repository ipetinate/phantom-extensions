import { PhantomElement, readFlag, writeFlag } from "./element.ts";

/** What a selection or an activation says about the row it happened to. */
export interface RowDetail {
  readonly value: string | null;
  readonly index: number;
  readonly row: PhantomRow;
}

/** Fired when the selected row changes, by click or by key. */
export const SELECT_EVENT = "phantom-select";

/** Fired when a row is opened: Return, or a second click on the selection. */
export const ACTIVATE_EVENT = "phantom-activate";

/**
 * One row in a `phantom-list`.
 *
 * Two marks, and they say different things — the rule the file tree in the
 * app arrived at after drawing three fills at three strengths. `selected` is
 * an accent ring: the row a command would act on. `active` is the accent
 * fill: the row whose thing is open. A row that is both draws the fill only,
 * so one row never carries two marks for one fact.
 */
export class PhantomRow extends PhantomElement {
  static readonly tagName = "phantom-row";

  static get observedAttributes(): string[] {
    return ["selected", "active", "disabled"];
  }

  get selected(): boolean {
    return readFlag(this, "selected");
  }

  set selected(value: boolean) {
    writeFlag(this, "selected", value);
  }

  get active(): boolean {
    return readFlag(this, "active");
  }

  set active(value: boolean) {
    writeFlag(this, "active", value);
  }

  get disabled(): boolean {
    return readFlag(this, "disabled");
  }

  set disabled(value: boolean) {
    writeFlag(this, "disabled", value);
  }

  get value(): string | null {
    return this.getAttribute("value");
  }

  set value(next: string | null) {
    if (next === null) this.removeAttribute("value");
    else this.setAttribute("value", next);
  }

  protected override setup(): void {
    if (!this.hasAttribute("role")) this.setAttribute("role", "option");
  }

  protected override render(): void {
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
    if (this.disabled) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");
  }
}

/**
 * A list of rows, with one selection and the keys that move it.
 *
 * Down, up, Home and End move the selection and scroll it into view; Return
 * opens it. The list holds the focus and names the current row through
 * `aria-activedescendant`, so the reader hears the row without every row
 * competing for the tab stop.
 *
 * The rows are the author's own children. The list reads them on demand
 * rather than keeping a copy, which is what makes it survive a framework
 * adding, removing and reordering them behind its back.
 */
export class PhantomList extends PhantomElement {
  static readonly tagName = "phantom-list";

  static #ids = 0;

  /** Every row the author put directly inside this list, in document order. */
  get rows(): PhantomRow[] {
    return Array.from(this.querySelectorAll<PhantomRow>(`:scope > ${PhantomRow.tagName}`));
  }

  get selectedRow(): PhantomRow | null {
    return this.rows.find((row) => row.selected) ?? null;
  }

  /** The selected row's `value`, and the way to move the selection to one. */
  get value(): string | null {
    return this.selectedRow?.value ?? null;
  }

  set value(next: string | null) {
    const row = next === null ? null : (this.rows.find((candidate) => candidate.value === next) ?? null);
    if (row) this.select(row, { notify: false });
  }

  protected override setup(): void {
    if (!this.hasAttribute("role")) this.setAttribute("role", "listbox");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");

    this.addEventListener("keydown", (event) => this.#onKeyDown(event));
    this.addEventListener("click", (event) => this.#onClick(event));
  }

  /**
   * Moves the selection to `row`.
   *
   * `notify` is false when the caller is the author — a property assignment
   * is not news to the code that made it, and an event for it is how a
   * two-way binding starts looping.
   */
  select(row: PhantomRow, options: { notify?: boolean } = {}): void {
    if (row.disabled) return;

    for (const candidate of this.rows) candidate.selected = candidate === row;

    this.setAttribute("aria-activedescendant", this.#identify(row));
    if (typeof row.scrollIntoView === "function") row.scrollIntoView({ block: "nearest" });
    if (options.notify !== false) this.#announce(SELECT_EVENT, row);
  }

  /** Opens the selection, as Return does. */
  activate(row: PhantomRow): void {
    if (row.disabled) return;
    this.#announce(ACTIVATE_EVENT, row);
  }

  #onClick(event: Event): void {
    const target = event.target as Element | null;
    if (!target || typeof target.closest !== "function") return;

    const row = target.closest<PhantomRow>(PhantomRow.tagName);
    if (!row || row.parentElement !== this || row.disabled) return;

    this.select(row);
    if (((event as MouseEvent).detail ?? 0) > 1) this.activate(row);
  }

  #onKeyDown(event: KeyboardEvent): void {
    const rows = this.rows.filter((row) => !row.disabled);
    if (rows.length === 0) return;

    const current = rows.findIndex((row) => row.selected);
    const next = this.#nextIndex(event.key, current, rows.length);

    if (next === null) {
      if (event.key !== "Enter" || current < 0) return;
      event.preventDefault();
      this.activate(rows[current] as PhantomRow);
      return;
    }

    event.preventDefault();
    this.select(rows[next] as PhantomRow);
  }

  #nextIndex(key: string, current: number, count: number): number | null {
    switch (key) {
      case "ArrowDown":
        return current < 0 ? 0 : Math.min(current + 1, count - 1);
      case "ArrowUp":
        return current < 0 ? count - 1 : Math.max(current - 1, 0);
      case "Home":
        return 0;
      case "End":
        return count - 1;
      default:
        return null;
    }
  }

  #announce(name: string, row: PhantomRow): void {
    const detail: RowDetail = { value: row.value, index: this.rows.indexOf(row), row };
    this.dispatchEvent(new CustomEvent<RowDetail>(name, { detail, bubbles: true, composed: true }));
  }

  #identify(row: PhantomRow): string {
    if (row.id === "") row.id = `phantom-row-${(PhantomList.#ids += 1)}`;
    return row.id;
  }
}
