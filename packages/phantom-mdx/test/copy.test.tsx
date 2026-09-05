import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Document } from "../src/render.tsx";
import { textOf } from "../src/components/CodeBlock.tsx";

describe("copy buttons", () => {
  it("puts a copy button on a fenced code block and on a requirement", () => {
    const source = "```lua\nprint(1)\n```\n\n<Requirement command=\"stylua\" install=\"brew install stylua\">\n\nNeeded for formatting.\n\n</Requirement>\n";
    const { container } = render(<Document source={source} baseURL="file:///tmp/x/" />);
    expect(container.querySelector(".ph-failure")?.textContent ?? "").toBe("");
    const buttons = container.querySelectorAll(".ph-copy");
    expect(buttons.length).toBe(2);
    expect(buttons.item(0)?.getAttribute("aria-label")).toBe("Copy");
  });

  it("reads the text of nested code children", () => {
    expect(textOf(["a", <code key="c">{"b\n"}</code>])).toBe("ab\n");
  });
});
