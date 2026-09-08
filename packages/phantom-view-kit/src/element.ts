/**
 * The base every element in the kit extends.
 *
 * It solves three problems the light DOM creates, once, so no component has
 * to solve them again.
 *
 * **A property set before the definition arrives.** React sets a property on
 * an element it recognises and an attribute on one it does not, and a view
 * bundles the kit beside its framework, so the order of the two is not fixed.
 * A property written onto the instance before the upgrade shadows the
 * accessor that arrives with it, and every later read returns the stale own
 * value. `connectedCallback` moves those values back through the accessors.
 *
 * **Nodes the framework owns.** React and Vue append and remove the children
 * an author wrote, and an element that rewrites its own subtree fights them.
 * So a component never touches a child it did not create: `part` inserts the
 * nodes the kit owns *before* the author's, and leaves them there.
 *
 * **Rendering on an attribute change.** `attributeChangedCallback` calls
 * `render` for every attribute the subclass observes, and never before
 * `setup` has run.
 */
export abstract class PhantomElement extends HTMLElement {
  static readonly partAttribute = "data-phantom-part";

  #isSetUp = false;

  connectedCallback(): void {
    this.#adoptEagerProperties();
    if (!this.#isSetUp) {
      this.#isSetUp = true;
      this.setup();
    }
    this.render();
  }

  attributeChangedCallback(): void {
    if (this.#isSetUp) this.render();
  }

  /** Runs once, on the first connection. Attach listeners and roles here. */
  protected setup(): void {}

  /** Runs on every connection and every observed attribute change. */
  protected render(): void {}

  /**
   * The kit-owned node named `name`, created on first use.
   *
   * Every part sits before the first child the author wrote, in the order the
   * calls are made, so a framework appending a child still puts it after the
   * kit's chrome.
   */
  protected ownPart(name: string, tag = "span"): HTMLElement {
    const selector = `:scope > [${PhantomElement.partAttribute}="${name}"]`;
    const existing = this.querySelector<HTMLElement>(selector);
    if (existing) return existing;

    const part = document.createElement(tag);
    part.setAttribute(PhantomElement.partAttribute, name);
    this.insertBefore(part, this.#anchorFor(name));
    return part;
  }

  /**
   * The order the kit's own nodes are drawn in.
   *
   * A part that arrives late — an icon set after the heading, which is what a
   * framework binding an optional property does — still lands where this says
   * it belongs rather than after the parts already there.
   */
  protected get partOrder(): readonly string[] {
    return [];
  }

  /** Removes the kit-owned node named `name`, if the kit made one. */
  protected dropPart(name: string): void {
    this.querySelector(`:scope > [${PhantomElement.partAttribute}="${name}"]`)?.remove();
  }

  /** The attribute `name`, or null when it is absent or empty. */
  protected text(name: string): string | null {
    const value = this.getAttribute(name);
    return value === null || value === "" ? null : value;
  }

  #anchorFor(name: string): ChildNode | null {
    const order = this.partOrder;
    const place = order.indexOf(name);
    if (place < 0) return this.#firstForeignChild();

    for (const child of Array.from(this.children)) {
      const part = child.getAttribute(PhantomElement.partAttribute);
      if (part === null) break;
      if (order.indexOf(part) > place) return child;
    }
    return this.#firstForeignChild();
  }

  #firstForeignChild(): ChildNode | null {
    for (const child of Array.from(this.childNodes)) {
      const part = child.nodeType === Node.ELEMENT_NODE && (child as Element).hasAttribute(PhantomElement.partAttribute);
      if (part) continue;
      return child;
    }
    return null;
  }

  #adoptEagerProperties(): void {
    for (const name of Object.getOwnPropertyNames(this)) {
      const own = Object.getOwnPropertyDescriptor(this, name);
      if (!own || own.get || own.set) continue;
      if (!this.#hasAccessor(name)) continue;

      delete (this as unknown as Record<string, unknown>)[name];
      (this as unknown as Record<string, unknown>)[name] = own.value;
    }
  }

  #hasAccessor(name: string): boolean {
    let prototype: object | null = Object.getPrototypeOf(this) as object | null;
    while (prototype && prototype !== HTMLElement.prototype) {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
      if (descriptor?.get || descriptor?.set) return true;
      prototype = Object.getPrototypeOf(prototype) as object | null;
    }
    return false;
  }
}

/** Reads a boolean attribute the way HTML does: present is true. */
export function readFlag(element: Element, name: string): boolean {
  return element.hasAttribute(name);
}

/** Writes a boolean attribute the way HTML does: absent rather than false. */
export function writeFlag(element: Element, name: string, value: boolean): void {
  if (value) element.setAttribute(name, "");
  else element.removeAttribute(name);
}
