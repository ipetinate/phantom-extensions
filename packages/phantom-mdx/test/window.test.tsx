import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Document } from "../src/render.tsx";
import { validate } from "../src/validate.ts";
import { Window, WindowToolbar, windowParts } from "../src/components/Window.tsx";

function draw(text: string) {
  const view = render(<Document source={text} baseURL="file:///tmp/x/" />);
  expect(view.container.querySelector(".ph-failure")).toBeNull();
  return view;
}

describe("Window", () => {
  it("accepts a bare window with content in it", () => {
    expect(validate('<Window title="Phantom">\n  Some **text**.\n</Window>\n')).toEqual([]);
  });

  it("draws three traffic lights at the leading edge and the title between them", () => {
    const { container } = draw('<Window title="Symbols">\n  Text.\n</Window>\n');
    const titlebar = container.querySelector(".ph-win-titlebar") as HTMLElement;
    const lights = titlebar.querySelector(".ph-win-lights") as HTMLElement;
    expect([...lights.children].map((light) => light.className)).toEqual([
      "ph-win-light ph-win-light-close",
      "ph-win-light ph-win-light-minimise",
      "ph-win-light ph-win-light-zoom",
    ]);
    expect(titlebar.querySelector(".ph-win-title")!.textContent).toBe("Symbols");
  });

  it("names itself Phantom when the author gives it no title", () => {
    expect(draw("<Window>\n  Text.\n</Window>\n").container.querySelector(".ph-win-title")!.textContent).toBe("Phantom");
  });

  it("holds the author's Markdown in a body of its own", () => {
    const { container } = draw("<Window>\n  A paragraph with a `code` span.\n</Window>\n");
    const body = container.querySelector(".ph-win-body") as HTMLElement;
    expect(body.querySelector("p")!.textContent).toBe("A paragraph with a code span.");
  });

  it("draws no toolbar band unless the author writes one", () => {
    expect(draw("<Window>\n  Text.\n</Window>\n").container.querySelector(".ph-win-toolbar")).toBeNull();
  });

  it("lifts the toolbar out of the scrolling body, above it", () => {
    const { container } = draw("<Window>\n  <WindowToolbar>\n    <SearchField />\n  </WindowToolbar>\n\n  Text.\n</Window>\n");
    const parts = [...(container.querySelector(".ph-win") as HTMLElement).children].map((child) => child.className);
    expect(parts).toEqual(["ph-win-titlebar", "ph-win-toolbar", "ph-win-body"]);
    expect(container.querySelector(".ph-win-body .ph-win-toolbar")).toBeNull();
    expect(container.querySelector(".ph-win-toolbar .ph-search")).not.toBeNull();
  });

  it("takes its maximum height from the author, and medium when it is not given", () => {
    expect(draw('<Window height="tall">\n  Text.\n</Window>\n').container.querySelector(".ph-win-tall")).not.toBeNull();
    expect(draw('<Window height="short">\n  Text.\n</Window>\n').container.querySelector(".ph-win-short")).not.toBeNull();
    expect(draw("<Window>\n  Text.\n</Window>\n").container.querySelector(".ph-win-medium")).not.toBeNull();
  });

  it("refuses a height it does not draw, and a prop it does not have", () => {
    expect(validate('<Window height="enormous">\n  Text.\n</Window>\n').map((v) => v.code)).toEqual(["bad-enum"]);
    expect(validate('<Window colour="red">\n  Text.\n</Window>\n').map((v) => v.code)).toEqual(["unknown-prop"]);
  });

  it("keeps the toolbar inside a window", () => {
    expect(validate("<WindowToolbar>\n  Text.\n</WindowToolbar>\n").map((v) => v.code)).toEqual(["misplaced"]);
  });

  it("still draws a band when the toolbar is used on its own", () => {
    const { container } = render(<WindowToolbar>toolbar</WindowToolbar>);
    expect(container.querySelector(".ph-win-toolbar")!.textContent).toBe("toolbar");
  });

  it("hands the body element to whoever asked for it", () => {
    let node: HTMLDivElement | null = null;
    render(
      <Window
        bodyRef={(element) => {
          node = element;
        }}
      >
        body
      </Window>,
    );
    expect((node as HTMLDivElement | null)?.className).toBe("ph-win-body");
  });

  it("drops the body padding when the caller asks for a flush window", () => {
    const { container } = render(<Window flush>body</Window>);
    expect(container.querySelector(".ph-win")!.className).toContain("is-flush");
  });
});

describe("windowParts", () => {
  it("splits the toolbar from the body and drops the blank lines between them", () => {
    const parts = windowParts([
      "\n  ",
      <WindowToolbar key="t">bar</WindowToolbar>,
      "\n  ",
      <p key="p">body</p>,
    ]);
    expect(parts.toolbar).toHaveLength(1);
    expect(parts.body).toHaveLength(1);
  });

  it("finds no toolbar in content that has none", () => {
    const parts = windowParts(<p>body</p>);
    expect(parts.toolbar).toEqual([]);
    expect(parts.body).toHaveLength(1);
  });
});
