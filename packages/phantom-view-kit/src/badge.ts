import { PhantomElement } from "./element.ts";

/**
 * How a badge is coloured.
 *
 * `neutral` is the app's count capsule — a quiet fill, secondary text, the
 * same in every panel. The rest carry a status: they mix the theme's own
 * `success`, `warning` and `danger` at the strength the Bruno view already
 * draws a response code with.
 */
export type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger";

/**
 * A short count or label in a capsule.
 *
 * Its content is whatever the author writes inside it, so a number, a method
 * name or a status code all work, and the kit never rewrites the text a
 * framework is binding.
 */
export class PhantomBadge extends PhantomElement {
  static readonly tagName = "phantom-badge";

  get tone(): BadgeTone {
    const value = this.getAttribute("tone");
    switch (value) {
      case "accent":
      case "success":
      case "warning":
      case "danger":
        return value;
      default:
        return "neutral";
    }
  }

  set tone(value: BadgeTone) {
    this.setAttribute("tone", value);
  }
}
