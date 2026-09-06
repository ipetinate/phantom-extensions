import type { Root as HastRoot } from "hast";
import { toJsxRuntime, type Components, type Evaluater, type Jsx } from "hast-util-to-jsx-runtime";
import type { Root } from "mdast";
import { Component, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { componentMap, unsupported } from "./components/index.ts";
import { CodeBlock } from "./components/CodeBlock.tsx";

const renderComponents = { ...componentMap, pre: CodeBlock };
import { DocumentContext, useMedia, type DocumentContextValue } from "./context.ts";
import { parseDocument, toParseError } from "./parse.ts";
import { IMAGE_SUFFIXES } from "./schema.ts";
import { applyTheme, type Theme } from "./theme.ts";
import { validateTree, type Violation } from "./validate.ts";

export interface RenderFailure {
  message: string;
  line?: number;
  column?: number;
}

export interface DocumentProps {
  source: string;
  baseURL: string;
  theme?: Theme;
  onLink?: (href: string) => void;
  onCopy?: (text: string) => void;
  cover?: string;
  onRendered?: (warnings: string[]) => void;
  onFailed?: (failure: RenderFailure) => void;
}

type Compiled =
  | { kind: "ok"; content: ReactNode; violations: Violation[] }
  | { kind: "invalid"; violations: Violation[]; failure: RenderFailure }
  | { kind: "error"; failure: RenderFailure };

const toHast = unified().use(remarkRehype, {
  allowDangerousHtml: false,
  passThrough: ["mdxJsxFlowElement", "mdxJsxTextElement"],
});

interface NamedExpression {
  type: string;
  name?: string;
}

/// A violation the document cannot survive.
///
/// Only a parse failure qualifies: there is no tree to draw. Everything else
/// costs the document the node it names and nothing more, because a reader's
/// Phantom can be older than the document it opens, and refusing the page for
/// one unknown name loses everything the reader could still have read.
const FATAL_CODES = new Set(["syntax"]);

function isFatal(violation: Violation): boolean {
  return FATAL_CODES.has(violation.code);
}

function componentEvaluater(): Evaluater {
  return {
    evaluateExpression(expression: NamedExpression) {
      if (expression.type === "Identifier" && expression.name) {
        if (Object.prototype.hasOwnProperty.call(componentMap, expression.name)) {
          return componentMap[expression.name];
        }
        return unsupported(expression.name);
      }
      throw new Error(`the document may not evaluate ${expression.type}`);
    },
    evaluateProgram() {
      throw new Error("import and export are not allowed");
    },
  };
}

export function renderTree(tree: Root): ReactNode {
  const hast = toHast.runSync(tree) as HastRoot;
  return toJsxRuntime(hast, {
    Fragment,
    jsx: jsx as Jsx,
    jsxs: jsxs as Jsx,
    components: renderComponents as unknown as Partial<Components>,
    createEvaluater: componentEvaluater,
    elementAttributeNameCase: "react",
    stylePropertyNameCase: "dom",
    tableCellAlignToStyle: false,
    passNode: false,
  });
}

export function compile(source: string): Compiled {
  let tree: Root;
  try {
    tree = parseDocument(source).tree;
  } catch (error) {
    const parseError = toParseError(error);
    const violation: Violation = { code: "syntax", message: parseError.message, line: parseError.line, column: parseError.column };
    return { kind: "invalid", violations: [violation], failure: violation };
  }
  const violations = validateTree(tree);
  const fatal = violations.filter(isFatal);
  if (fatal.length > 0) {
    const first = fatal[0] as Violation;
    return { kind: "invalid", violations: fatal, failure: { message: first.message, line: first.line, column: first.column } };
  }
  try {
    return { kind: "ok", content: renderTree(tree), violations };
  } catch (error) {
    return { kind: "error", failure: { message: error instanceof Error ? error.message : String(error) } };
  }
}

interface BoundaryProps {
  onError: (failure: RenderFailure) => void;
  children?: ReactNode;
}

class Boundary extends Component<BoundaryProps, { failure: RenderFailure | null }> {
  state = { failure: null as RenderFailure | null };

  static getDerivedStateFromError(error: unknown) {
    return { failure: { message: error instanceof Error ? error.message : String(error) } };
  }

  componentDidCatch(error: unknown) {
    this.props.onError({ message: error instanceof Error ? error.message : String(error) });
  }

  render() {
    if (this.state.failure) return <Failure failure={this.state.failure} />;
    return this.props.children;
  }
}

function Failure({ failure, violations }: { failure: RenderFailure; violations?: Violation[] }) {
  return (
    <div className="ph-failure" role="alert">
      <p className="ph-failure-title">The document could not be shown</p>
      <ul>
        {(violations ?? [failure]).map((item, index) => (
          <li key={index}>
            {item.line !== undefined ? <code>{`${item.line}:${item.column ?? 1}`}</code> : null} {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cover({ path }: { path: string }) {
  const resolved = useMedia(path, IMAGE_SUFFIXES, "Cover");
  if (!resolved) return null;
  return <img className="ph-cover" src={resolved} alt="" decoding="async" />;
}

export function Document({ source, baseURL, theme, onLink, onCopy, cover, onRendered, onFailed }: DocumentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const caught = useRef<RenderFailure | null>(null);
  const compiled = useMemo(() => compile(source), [source]);
  const warnings = useMemo(() => new Set<string>(), [source, baseURL, cover]);
  const context = useMemo<DocumentContextValue>(
    () => ({ baseURL, onLink, onCopy, warn: (message) => warnings.add(message) }),
    [baseURL, onLink, onCopy, warnings],
  );

  useLayoutEffect(() => {
    if (theme && rootRef.current) applyTheme(rootRef.current, theme);
  }, [theme]);

  useEffect(() => {
    if (compiled.kind !== "ok") {
      onFailed?.(compiled.failure);
    } else if (caught.current) {
      onFailed?.(caught.current);
    } else {
      const reported = compiled.kind === "ok"
        ? compiled.violations.map((v) => `line ${v.line}: ${v.message}`)
        : [];
      onRendered?.([...reported, ...warnings]);
    }
  }, [compiled, warnings, onRendered, onFailed]);

  const recordFailure = (failure: RenderFailure) => {
    caught.current = failure;
  };

  return (
    <div className="ph-document" ref={rootRef}>
      <DocumentContext.Provider value={context}>
        {compiled.kind === "invalid" ? <Failure failure={compiled.failure} violations={compiled.violations} /> : null}
        {compiled.kind === "error" ? <Failure failure={compiled.failure} /> : null}
        {compiled.kind === "ok" ? (
          <Boundary key={`${source.length}:${baseURL}`} onError={recordFailure}>
            {cover ? <Cover path={cover} /> : null}
            <div className="ph-body">{compiled.content}</div>
          </Boundary>
        ) : null}
      </DocumentContext.Provider>
    </div>
  );
}
