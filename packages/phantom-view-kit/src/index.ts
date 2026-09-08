export * from "./element.ts";
export * from "./theme.ts";
export * from "./button.ts";
export * from "./field.ts";
export * from "./list.ts";
export * from "./header.ts";
export * from "./section.ts";
export * from "./badge.ts";
export * from "./emptyState.ts";
export * from "./code.ts";
export * from "./scroll.ts";

import { PhantomButton } from "./button.ts";
import { PhantomField } from "./field.ts";
import { PhantomList, PhantomRow } from "./list.ts";
import { PhantomHeader } from "./header.ts";
import { PhantomSection } from "./section.ts";
import { PhantomBadge } from "./badge.ts";
import { PhantomEmptyState } from "./emptyState.ts";
import { PhantomCode } from "./code.ts";
import { PhantomScroll } from "./scroll.ts";

/** A definable element: a constructor that knows the tag it answers to. */
export type PhantomElementConstructor = CustomElementConstructor & { readonly tagName: string };

/** Every element the kit defines, in the order it defines them. */
export const ELEMENTS: readonly PhantomElementConstructor[] = [
  PhantomButton,
  PhantomField,
  PhantomList,
  PhantomRow,
  PhantomHeader,
  PhantomSection,
  PhantomBadge,
  PhantomEmptyState,
  PhantomCode,
  PhantomScroll,
];

/** The tag name of every element the kit defines. */
export const TAG_NAMES: readonly string[] = ELEMENTS.map((element) => element.tagName);

export interface DefineOptions {
  /** Somewhere other than the page's own registry. Tests use this. */
  registry?: CustomElementRegistry;

  /** Whether to warn when the kit's stylesheet is missing. True by default. */
  checkStylesheet?: boolean;
}

let hasWarned = false;

/**
 * Defines every element in the kit.
 *
 * Idempotent, and safe to call from more than one module: a tag another copy
 * of the kit already defined is left alone rather than redefined, which would
 * throw and take the view's first paint with it.
 */
export function defineAll(options: DefineOptions = {}): void {
  const registry = options.registry ?? customElements;

  for (const element of ELEMENTS) {
    if (registry.get(element.tagName)) continue;
    registry.define(element.tagName, element);
  }

  if (options.checkStylesheet !== false) warnIfUnstyled();
}

/**
 * Whether the kit's stylesheet reached the page, with a warning when it did
 * not.
 *
 * The kit ships its CSS as a file rather than a string it injects, because
 * the page's policy is `style-src 'self'`: a stylesheet the view builds at
 * runtime is refused, and refused silently. So the one failure an author
 * cannot see — forgetting to bundle `kit.css` — says so in the console
 * instead, once.
 */
export function warnIfUnstyled(root: HTMLElement = document.documentElement): boolean {
  const marker = getComputedStyle(root).getPropertyValue("--pk-loaded").trim();
  if (marker !== "") return true;

  if (!hasWarned) {
    hasWarned = true;
    console.warn("phantom-view-kit: kit.css is not on the page, so the controls are unstyled. Import it from your view's stylesheet.");
  }
  return false;
}
