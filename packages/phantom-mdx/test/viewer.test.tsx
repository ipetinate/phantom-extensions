import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Message = { type: string; [key: string]: unknown };

async function loadViewer(withBridge: boolean): Promise<Message[]> {
  const messages: Message[] = [];
  document.body.innerHTML = '<div id="root"></div>';
  if (withBridge) {
    window.webkit = { messageHandlers: { phantom: { postMessage: (message: unknown) => messages.push(message as Message) } } };
  } else {
    delete window.webkit;
  }
  vi.resetModules();
  await act(async () => {
    await import("../src/viewer/main.tsx");
  });
  return messages;
}

async function settle(): Promise<void> {
  await act(async () => {
    await Promise.resolve();
  });
}

describe("viewer", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("style");
  });

  afterEach(() => {
    delete window.webkit;
  });

  it("announces itself with the package version", async () => {
    const messages = await loadViewer(true);
    expect(messages).toEqual([{ type: "ready", version: __PHANTOM_MDX_VERSION__ }]);
    expect(window.phantomViewer.version).toBe(__PHANTOM_MDX_VERSION__);
    expect(document.documentElement.style.getPropertyValue("--ph-bg")).toBe("#282a36");
  });

  it("renders a document and reports rendered", async () => {
    const messages = await loadViewer(true);
    await act(async () => {
      window.phantomViewer.render({ source: "## Hello\n\nText\n", baseURL: "file:///ext/a/" });
    });
    await settle();
    expect(messages.at(-1)).toEqual({ type: "rendered", warnings: [] });
    expect(document.querySelector(".ph-body h2")?.textContent).toBe("Hello");
  });

  it("reports validation failures with a position", async () => {
    const messages = await loadViewer(true);
    await act(async () => {
      window.phantomViewer.render({ source: "Text\n\n<Unknown />\n", baseURL: "file:///ext/a/" });
    });
    await settle();
    const last = messages.at(-1)!;
    expect(last.type).toBe("failed");
    expect(last.line).toBe(3);
    expect(last.column).toBe(1);
    expect(String(last.message)).toContain("<Unknown>");
  });

  it("posts open for link clicks and prevents navigation when the bridge exists", async () => {
    const messages = await loadViewer(true);
    await act(async () => {
      window.phantomViewer.render({ source: "[docs](https://example.com/docs)\n", baseURL: "file:///ext/a/" });
    });
    await settle();
    const anchor = document.querySelector("a")!;
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    anchor.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(messages.at(-1)).toEqual({ type: "open", href: "https://example.com/docs" });
  });

  it("lets links navigate normally without the bridge", async () => {
    await loadViewer(false);
    await act(async () => {
      window.phantomViewer.render({ source: "[docs](https://example.com/docs)\n", baseURL: "file:///ext/a/" });
    });
    await settle();
    const anchor = document.querySelector("a")!;
    expect(anchor.getAttribute("target")).toBe("_blank");
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    anchor.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it("applies a host theme on render and on setTheme", async () => {
    await loadViewer(true);
    await act(async () => {
      window.phantomViewer.render({
        source: "Text\n",
        baseURL: "file:///ext/a/",
        theme: { scheme: "light", colors: { bg: "#ffffff" }, fonts: { ui: "Inter, sans-serif" }, baseSize: 15 },
      });
    });
    const root = document.documentElement;
    expect(root.style.getPropertyValue("--ph-bg")).toBe("#ffffff");
    expect(root.style.getPropertyValue("--ph-font-ui")).toBe("Inter, sans-serif");
    expect(root.style.getPropertyValue("--ph-base-size")).toBe("15px");
    expect(root.getAttribute("data-ph-scheme")).toBe("light");
    act(() => {
      window.phantomViewer.setTheme({ colors: { accent: "#123456" } });
    });
    expect(root.style.getPropertyValue("--ph-accent")).toBe("#123456");
    expect(root.style.getPropertyValue("--ph-bg")).toBe("#ffffff");
  });

  it("renders the cover before the body", async () => {
    const messages = await loadViewer(true);
    await act(async () => {
      window.phantomViewer.render({ source: "Text\n", baseURL: "file:///ext/a", cover: "media/cover.png" });
    });
    await settle();
    expect(document.querySelector(".ph-document")!.firstElementChild!.className).toBe("ph-cover");
    expect(document.querySelector<HTMLImageElement>(".ph-cover")!.getAttribute("src")).toBe("file:///ext/a/media/cover.png");
    expect(messages.at(-1)).toEqual({ type: "rendered", warnings: [] });
  });
});
