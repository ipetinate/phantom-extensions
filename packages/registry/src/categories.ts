export const CATEGORIES = ["script", "compiled", "markup", "frontendFramework", "styles", "data", "infrastructure"] as const;

export type Category = (typeof CATEGORIES)[number];
