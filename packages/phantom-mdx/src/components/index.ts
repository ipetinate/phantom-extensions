export { Unsupported, unsupported } from "./Unsupported.tsx";
import type { ComponentType } from "react";
import { Badge } from "./Badge.tsx";
import { Callout } from "./Callout.tsx";
import { Details } from "./Details.tsx";
import { Feature, Features } from "./Features.tsx";
import { Filter, Filters } from "./Filters.tsx";
import { IconBrowser } from "./IconBrowser.tsx";
import { Kbd } from "./Kbd.tsx";
import { Link } from "./Link.tsx";
import { Requirement } from "./Requirement.tsx";
import { Gallery, Screenshot } from "./Screenshot.tsx";
import { SearchField } from "./SearchField.tsx";
import { Showcase } from "./Showcase.tsx";
import { Step, Steps } from "./Steps.tsx";
import { Swatch, Swatches } from "./Swatches.tsx";
import { Table } from "./Table.tsx";
import { ThemePreview } from "./ThemePreview.tsx";
import { Video } from "./Video.tsx";
import { Window, WindowToolbar } from "./Window.tsx";

export {
  Badge,
  Callout,
  Details,
  Feature,
  Features,
  Filter,
  Filters,
  Gallery,
  IconBrowser,
  Kbd,
  Link,
  Requirement,
  Screenshot,
  SearchField,
  Showcase,
  Step,
  Steps,
  Swatch,
  Swatches,
  Table,
  ThemePreview,
  Video,
  Window,
  WindowToolbar,
};
export { GlyphIcon } from "./glyphs.tsx";

export const componentMap: Readonly<Record<string, ComponentType<any>>> = {
  Callout,
  Steps,
  Step,
  Kbd,
  Features,
  Feature,
  Screenshot,
  Gallery,
  Showcase,
  Video,
  Badge,
  Requirement,
  Details,
  ThemePreview,
  Swatches,
  Swatch,
  Window,
  WindowToolbar,
  SearchField,
  Filters,
  Filter,
  IconBrowser,
  a: Link,
  table: Table,
};
export { CopyButton } from "./CopyButton.tsx";
export { CodeBlock, textOf } from "./CodeBlock.tsx";
