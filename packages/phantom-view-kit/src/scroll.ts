import { PhantomElement } from "./element.ts";

/**
 * How heavy the scroll indicator reads.
 *
 * The app's own distinction, and it is content against furniture: a bar
 * beside something the reader is reading stays legible, and a bar beside a
 * tree or a list is only there while a gesture is in flight.
 */
export type ScrollWeight = "chrome" | "content";

/**
 * A scrolling region that draws the app's thin overlay indicator.
 *
 * The bar is 3.5 points of knob for chrome and 5 for content, with no track
 * behind it, and it appears while the region is scrolling or under the
 * pointer and fades out afterwards — which is what an overlay scroller does
 * in the app, and why the region is an element: the visible-while-scrolling
 * part is a timer, and CSS has no timer.
 */
export class PhantomScroll extends PhantomElement {
  static readonly tagName = "phantom-scroll";

  /** How long the bar stays after the last scroll event, in milliseconds. */
  static readonly fadeDelay = 700;

  #timer: ReturnType<typeof setTimeout> | null = null;

  get weight(): ScrollWeight {
    return this.getAttribute("weight") === "content" ? "content" : "chrome";
  }

  set weight(value: ScrollWeight) {
    this.setAttribute("weight", value);
  }

  protected override setup(): void {
    this.addEventListener("scroll", () => this.#show(), { passive: true });
  }

  disconnectedCallback(): void {
    if (this.#timer !== null) clearTimeout(this.#timer);
    this.#timer = null;
    this.removeAttribute("data-scrolling");
  }

  #show(): void {
    this.setAttribute("data-scrolling", "");
    if (this.#timer !== null) clearTimeout(this.#timer);

    this.#timer = setTimeout(() => {
      this.#timer = null;
      this.removeAttribute("data-scrolling");
    }, PhantomScroll.fadeDelay);
  }
}
