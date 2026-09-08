import type { HTMLAttributes, Key, Ref } from "react";
import type { PhantomButton, ButtonVariant } from "./button.ts";
import type { PhantomField } from "./field.ts";
import type { PhantomList, PhantomRow } from "./list.ts";
import type { PhantomHeader } from "./header.ts";
import type { PhantomSection } from "./section.ts";
import type { PhantomBadge, BadgeTone } from "./badge.ts";
import type { PhantomEmptyState } from "./emptyState.ts";
import type { PhantomCode } from "./code.ts";
import type { PhantomScroll, ScrollWeight } from "./scroll.ts";

/**
 * The JSX types for the kit's elements.
 *
 * React renders an unknown tag without being told anything, but TypeScript
 * refuses one it has no entry for. A React author imports this module once —
 * `import "phantom-view-kit/react";` — and then writes the elements in JSX
 * with their own attributes checked and `ref` typed as the element it is.
 *
 * `title` is left out on purpose: the attribute of that name draws a tooltip,
 * which is why the heading of a header and of an empty state is `heading`.
 */
type KitElement<Attributes, Element> = Attributes &
  Omit<HTMLAttributes<Element>, "title"> & {
    key?: Key;
    ref?: Ref<Element>;
  };

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "phantom-button": KitElement<{ variant?: ButtonVariant; disabled?: boolean }, PhantomButton>;
      "phantom-field": KitElement<{ invalid?: boolean }, PhantomField>;
      "phantom-list": KitElement<{ value?: string }, PhantomList>;
      "phantom-row": KitElement<
        { value?: string; selected?: boolean; active?: boolean; disabled?: boolean },
        PhantomRow
      >;
      "phantom-header": KitElement<{ heading?: string }, PhantomHeader>;
      "phantom-section": KitElement<{ label?: string; count?: number | string }, PhantomSection>;
      "phantom-badge": KitElement<{ tone?: BadgeTone }, PhantomBadge>;
      "phantom-empty-state": KitElement<
        { icon?: string; heading?: string; description?: string },
        PhantomEmptyState
      >;
      "phantom-code": KitElement<{ wrap?: "on" | "off" }, PhantomCode>;
      "phantom-scroll": KitElement<{ weight?: ScrollWeight }, PhantomScroll>;
    }
  }
}
