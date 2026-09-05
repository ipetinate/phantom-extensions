import { createContext, useContext } from "react";
import { resolveMedia } from "./media.ts";

export interface DocumentContextValue {
  baseURL: string;
  onLink?: (href: string) => void;
  onCopy?: (text: string) => void;
  warn: (message: string) => void;
}

export const DocumentContext = createContext<DocumentContextValue>({ baseURL: "", warn: () => undefined });

export function useDocumentContext(): DocumentContextValue {
  return useContext(DocumentContext);
}

export function useMedia(path: string | undefined, suffixes: readonly string[], what: string): string | null {
  const { baseURL, warn } = useDocumentContext();
  if (path === undefined) return null;
  const resolved = resolveMedia(path, baseURL, suffixes);
  if (resolved === null) warn(`${what} "${path}" does not resolve inside the extension and was not shown`);
  return resolved;
}
