import type { Root } from "mdast";
import type { MdxJsxAttribute, MdxJsxExpressionAttribute, MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";
import type { Node, Parent } from "unist";
import { visit } from "unist-util-visit";
import { isAllowedLink, isMediaPath } from "./media.ts";
import { parseDocument, toParseError } from "./parse.ts";
import { componentNames, components, IMAGE_SUFFIXES, VIDEO_SUFFIXES, type ComponentSpec, type PropSpec } from "./schema.ts";

export interface Violation {
  code: string;
  message: string;
  line: number;
  column: number;
}

export interface MediaReference {
  path: string;
  kind: "image" | "video";
  line: number;
  column: number;
}

type JsxElement = MdxJsxFlowElement | MdxJsxTextElement;
type Report = (node: Node | undefined, code: string, message: string) => void;

function isJsxElement(node: Node | undefined): node is JsxElement {
  return node !== undefined && (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement");
}

function startOf(node: Node | undefined): { line: number; column: number } {
  const start = node?.position?.start;
  return { line: start?.line ?? 1, column: start?.column ?? 1 };
}

function list(values: readonly string[]): string {
  return values.join(", ");
}

function checkPropValue(element: JsxElement, attribute: MdxJsxAttribute, spec: PropSpec, value: string, report: Report): void {
  const label = `<${element.name} ${spec.name}>`;
  if (spec.required && value.trim() === "") {
    report(attribute, "prop-value", `${label} must not be empty`);
    return;
  }
  if (spec.values && !spec.values.includes(value)) {
    report(attribute, "bad-enum", `${label} must be one of ${list(spec.values)}; got "${value}"`);
    return;
  }
  if (spec.kind === "image" && !isMediaPath(value, IMAGE_SUFFIXES)) {
    report(attribute, "media-path", `${label} must be a file under media/ ending in ${list(IMAGE_SUFFIXES)}; got "${value}"`);
  }
  if (spec.kind === "video" && !isMediaPath(value, VIDEO_SUFFIXES)) {
    report(attribute, "media-path", `${label} must be a file under media/ ending in ${list(VIDEO_SUFFIXES)}; got "${value}"`);
  }
  if (spec.kind === "url" && !/^https:\/\/[^/\s]+/i.test(value)) {
    report(attribute, "link", `${label} must be an https URL; got "${value}"`);
  }
}

function checkAttributes(element: JsxElement, spec: ComponentSpec, report: Report): void {
  const seen = new Set<string>();
  for (const attribute of element.attributes as Array<MdxJsxAttribute | MdxJsxExpressionAttribute>) {
    if (attribute.type === "mdxJsxExpressionAttribute") {
      report(attribute, "expression", `<${spec.name}> may not spread attributes`);
      continue;
    }
    if (seen.has(attribute.name)) {
      report(attribute, "duplicate-prop", `<${spec.name}> sets ${attribute.name} twice`);
      continue;
    }
    seen.add(attribute.name);
    const propSpec = spec.props.find((prop) => prop.name === attribute.name);
    if (!propSpec) {
      const accepted = spec.props.length ? `it takes ${list(spec.props.map((prop) => prop.name))}` : "it takes no props";
      report(attribute, "unknown-prop", `<${spec.name}> has no prop ${attribute.name}; ${accepted}`);
      continue;
    }
    const value = attribute.value;
    if (value === null || value === undefined) {
      report(attribute, "prop-value", `<${spec.name} ${attribute.name}> needs a quoted string value`);
      continue;
    }
    if (typeof value !== "string") {
      report(attribute, "expression", `<${spec.name} ${attribute.name}={…}> is not allowed; write a quoted string`);
      continue;
    }
    checkPropValue(element, attribute, propSpec, value, report);
  }
  for (const propSpec of spec.props) {
    if (propSpec.required && !seen.has(propSpec.name)) {
      report(element, "missing-prop", `<${spec.name}> needs ${propSpec.name}`);
    }
  }
}

function isBlank(node: Node): boolean {
  const value = (node as { value?: unknown }).value;
  return node.type === "text" && typeof value === "string" && value.trim() === "";
}

function isAllowedChild(node: Node, names: readonly string[]): boolean {
  return isJsxElement(node) && node.name !== null && names.includes(node.name);
}

function inlineChildren(paragraph: Node, names: readonly string[]): JsxElement | null {
  const children = (paragraph as Parent).children ?? [];
  const elements = children.filter((child) => !isBlank(child));
  if (elements.length === 0 || !elements.every((child) => isAllowedChild(child, names))) return null;
  return elements[0] as JsxElement;
}

function checkChildren(element: JsxElement, spec: ComponentSpec, report: Report): void {
  const rule = spec.children;
  const children = element.children as Node[];
  if (rule.kind === "none" && children.length > 0) {
    report(children[0], "children", `<${spec.name}> takes no children; write <${spec.name} … />`);
  }
  if (rule.kind === "text") {
    for (const child of children) {
      if (child.type !== "text") report(child, "children", `<${spec.name}> may hold text only`);
    }
  }
  if (rule.kind === "only") {
    for (const child of children) {
      if (isBlank(child) || isAllowedChild(child, rule.names)) continue;
      if (child.type === "paragraph" && inlineChildren(child, rule.names)) continue;
      report(child, "children", `<${spec.name}> may hold only <${rule.names.join(">, <")}>`);
    }
  }
}

function ownLineMessage(spec: ComponentSpec): string {
  if (spec.children.kind === "none") return `<${spec.name} … /> must stand on its own line`;
  return `<${spec.name}> must start on its own line, with its content on the lines between the tags`;
}

function checkPlacement(element: JsxElement, spec: ComponentSpec, ancestors: readonly Node[], report: Report): boolean {
  if (element.type === "mdxJsxTextElement" && !spec.inline) {
    report(element, "placement", ownLineMessage(spec));
    return false;
  }
  if (!spec.parent) return true;
  const parent = ancestors[ancestors.length - 1];
  if (isJsxElement(parent) && parent.name === spec.parent) return true;
  report(element, "misplaced", `<${element.name}> must sit directly inside <${spec.parent}>`);
  return true;
}

function checkElement(element: JsxElement, ancestors: readonly Node[], report: Report): void {
  const name = element.name;
  if (name === null) {
    report(element, "fragment", "fragments <>…</> are not allowed");
    return;
  }
  const spec = components[name];
  if (!spec) {
    if (/^[a-z]/.test(name)) {
      report(element, "html", `HTML element <${name}> is not allowed`);
    } else {
      report(element, "unknown-component", `unknown component <${name}>; the document may use ${list(componentNames)}`);
    }
    return;
  }
  const placed = checkPlacement(element, spec, ancestors, report);
  checkAttributes(element, spec, report);
  if (placed) checkChildren(element, spec, report);
}

function walk(node: Node, ancestors: Node[], visitor: (node: Node, ancestors: readonly Node[]) => void): void {
  visitor(node, ancestors);
  const children = (node as Parent).children;
  if (!Array.isArray(children)) return;
  ancestors.push(node);
  for (const child of children) walk(child, ancestors, visitor);
  ancestors.pop();
}

export function validateTree(tree: Root): Violation[] {
  const violations: Violation[] = [];
  const report: Report = (node, code, message) => {
    violations.push({ code, message, ...startOf(node) });
  };
  walk(tree, [], (untyped, ancestors) => {
    const node = untyped as Root["children"][number] | Root;
    switch (node.type) {
      case "mdxjsEsm":
        report(node, "esm", "import and export are not allowed");
        break;
      case "mdxFlowExpression":
      case "mdxTextExpression":
        report(node, "expression", "expressions {…} are not allowed; the document is never executed");
        break;
      case "html":
        report(node, "html", "raw HTML is not allowed");
        break;
      case "heading":
        if (node.depth === 1) report(node, "h1", "a level 1 heading is not allowed; the title comes from the front matter");
        break;
      case "link":
      case "definition":
        if (!isAllowedLink(node.url)) report(node, "link", `links must use https or mailto; got "${node.url}"`);
        break;
      case "image":
      case "imageReference":
        report(node, "image", "Markdown images are not allowed; use <Screenshot src alt>");
        break;
      case "mdxJsxFlowElement":
      case "mdxJsxTextElement":
        checkElement(node, ancestors, report);
        break;
      default:
        break;
    }
  });
  return violations.sort((a, b) => a.line - b.line || a.column - b.column);
}

export function validate(source: string): Violation[] {
  let tree: Root;
  try {
    tree = parseDocument(source).tree;
  } catch (error) {
    const parseError = toParseError(error);
    return [{ code: "syntax", message: parseError.message, line: parseError.line, column: parseError.column }];
  }
  return validateTree(tree);
}

export function collectMedia(tree: Root): MediaReference[] {
  const references: MediaReference[] = [];
  visit(tree, (node) => {
    if (!isJsxElement(node) || node.name === null) return;
    const spec = components[node.name];
    if (!spec) return;
    for (const attribute of node.attributes) {
      if (attribute.type !== "mdxJsxAttribute" || typeof attribute.value !== "string") continue;
      const propSpec = spec.props.find((prop) => prop.name === attribute.name);
      if (!propSpec || (propSpec.kind !== "image" && propSpec.kind !== "video")) continue;
      references.push({ path: attribute.value, kind: propSpec.kind, ...startOf(attribute) });
    }
  });
  return references;
}
