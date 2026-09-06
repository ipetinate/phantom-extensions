export class ManifestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ManifestError";
  }
}

export class FrontMatterError extends Error {
  readonly line: number;
  readonly detail: string;

  constructor(line: number, detail: string) {
    super(`line ${line}: ${detail}`);
    this.name = "FrontMatterError";
    this.line = line;
    this.detail = detail;
  }
}

export function quoted(value: unknown): string {
  return typeof value === "string" ? `'${value}'` : String(value);
}
