import type { ComponentType } from "react";
import { Badge } from "./Badge.tsx";
import { Callout } from "./Callout.tsx";
import { Details } from "./Details.tsx";
import { Feature, Features } from "./Features.tsx";
import { Kbd } from "./Kbd.tsx";
import { Link } from "./Link.tsx";
import { Requirement } from "./Requirement.tsx";
import { Gallery, Screenshot } from "./Screenshot.tsx";
import { Showcase } from "./Showcase.tsx";
import { Step, Steps } from "./Steps.tsx";
import { Table } from "./Table.tsx";
import { Video } from "./Video.tsx";

export { Badge, Callout, Details, Feature, Features, Gallery, Kbd, Link, Requirement, Screenshot, Showcase, Step, Steps, Table, Video };
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
  a: Link,
  table: Table,
};
export { CopyButton } from "./CopyButton.tsx";
export { CodeBlock, textOf } from "./CodeBlock.tsx";
