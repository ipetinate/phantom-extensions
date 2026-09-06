import { render } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import valid from "./fixtures/valid.mdx?raw";
import { Document, defaultLightTheme } from "../src/index.ts";

const base = "file:///ext/sample/";

function html(source: string, extra: Partial<Parameters<typeof Document>[0]> = {}): string {
  const { container } = render(<Document source={source} baseURL={base} {...extra} />);
  const body = container.querySelector(".ph-body");
  if (!body) throw new Error(`the document did not render: ${container.textContent}`);
  return body.innerHTML;
}

describe("Document", () => {
  it.each([
    ["Callout", '<Callout kind="warning" title="Careful">\nMind the *gap*.\n</Callout>\n'],
    ["Callout default", "<Callout>\nText\n</Callout>\n"],
    ["Steps", '<Steps>\n<Step title="One">\nFirst.\n</Step>\n<Step title="Two">\nSecond.\n</Step>\n</Steps>\n'],
    ["Kbd", "Press <Kbd>⌘</Kbd> <Kbd>K</Kbd>.\n"],
    ["Features", '<Features columns="3">\n<Feature title="Fast" icon="bolt">\nQuick.\n</Feature>\n<Feature title="Plain">\nNo icon.\n</Feature>\n</Features>\n'],
    ["Screenshot", '<Screenshot src="media/a.png" alt="A screen" caption="Caption" width="narrow" />\n'],
    ["Gallery", '<Gallery>\n<Screenshot src="media/a.png" alt="A" />\n<Screenshot src="media/b.webp" alt="B" />\n</Gallery>\n'],
    ["Video", '<Video src="media/a.mp4" poster="media/a.png" caption="Tour" loop="true" muted="true" />\n'],
    ["Badge", '<Badge label="Beta" tone="warning" /> <Badge label="Plain" />\n'],
    ["Requirement", '<Requirement command="lua-language-server" install="brew install lua-language-server" url="https://luals.github.io/">\nNeeded for diagnostics.\n</Requirement>\n'],
    ["Details", '<Details summary="More">\nHidden text.\n</Details>\n'],
    ["Markdown", "## Heading\n\nA [link](https://example.com) and `code`.\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n```lua\nprint(1)\n```\n"],
  ])("renders %s", (_name, source) => {
    expect(html(source)).toMatchSnapshot();
  });

  it("renders the whole fixture without warnings", async () => {
    const onRendered = vi.fn();
    const onFailed = vi.fn();
    await act(async () => {
      render(<Document source={valid} baseURL={base} onRendered={onRendered} onFailed={onFailed} />);
    });
    expect(onFailed).not.toHaveBeenCalled();
    expect(onRendered).toHaveBeenCalledWith([]);
  });

  it("strips the front matter from the body", () => {
    const output = html("---\ntitle: Secret title\ntags: [a]\n---\n\nVisible text\n");
    expect(output).toContain("Visible text");
    expect(output).not.toContain("Secret title");
    expect(output).not.toContain("<hr");
  });

  it("renders the cover first when given", () => {
    const { container } = render(<Document source={"Text\n"} baseURL={base} cover="media/cover.png" />);
    const cover = container.querySelector(".ph-cover");
    expect(cover).not.toBeNull();
    expect(cover!.getAttribute("src")).toBe(`${base}media/cover.png`);
    expect(container.querySelector(".ph-document")!.firstElementChild).toBe(cover);
  });

  it("does not show media that escapes the base and reports a warning", async () => {
    const onRendered = vi.fn();
    await act(async () => {
      render(<Document source={"Text\n"} baseURL="file:///ext/sample" cover="media/../../etc/x.png" onRendered={onRendered} />);
    });
    expect(document.querySelector(".ph-cover")).toBeNull();
    expect(onRendered).toHaveBeenCalledTimes(1);
    expect(onRendered.mock.calls[0]![0][0]).toContain("Cover");
  });

  it("draws the rest of the document and marks the part it cannot draw", async () => {
    const onFailed = vi.fn();
    const onRendered = vi.fn();
    await act(async () => {
      render(<Document source={"## Title\n\nkept\n\n<Unknown />\n"} baseURL={base} onFailed={onFailed} onRendered={onRendered} />);
    });
    expect(onFailed).not.toHaveBeenCalled();
    expect(document.querySelector(".ph-body")?.textContent).toContain("kept");
    expect(document.querySelector(".ph-unsupported")?.textContent).toContain("<Unknown>");
    expect(onRendered.mock.calls[0]?.[0]?.join(" ")).toContain("unknown component <Unknown>");
  });

  it("refuses a document it cannot parse at all", async () => {
    const onFailed = vi.fn();
    await act(async () => {
      render(<Document source={"<Callout kind={1} />\n"} baseURL={base} onFailed={onFailed} />);
    });
    expect(document.querySelector(".ph-body")).toBeNull();
  });

  it("routes link clicks through onLink and keeps default navigation otherwise", () => {
    const onLink = vi.fn();
    const routed = render(<Document source={"[a](https://example.com/x)\n"} baseURL={base} onLink={onLink} />);
    const anchor = routed.container.querySelector("a")!;
    anchor.click();
    expect(onLink).toHaveBeenCalledWith("https://example.com/x");
    expect(anchor.getAttribute("target")).toBeNull();
    routed.unmount();

    const plain = render(<Document source={"[a](https://example.com/x)\n"} baseURL={base} />);
    expect(plain.container.querySelector("a")!.getAttribute("target")).toBe("_blank");
  });

  it("applies the theme to its root when given", () => {
    const { container } = render(<Document source={"Text\n"} baseURL={base} theme={defaultLightTheme} />);
    const root = container.querySelector<HTMLElement>(".ph-document")!;
    expect(root.style.getPropertyValue("--ph-bg")).toBe(defaultLightTheme.colors.bg);
    expect(root.getAttribute("data-ph-scheme")).toBe("light");
  });
});
