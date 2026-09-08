import { act } from "react";
import { createRoot } from "react-dom/client";
import { createApp, h } from "vue";
import { describe, expect, it, vi } from "vitest";
import type { PhantomList, RowDetail } from "../src/list.ts";
import { container } from "./support.ts";
import "../src/react.d.ts";

(globalThis as Record<string, unknown>)["IS_REACT_ACT_ENVIRONMENT"] = true;

describe("React", () => {
  it("renders the elements, keeps their children and hears their clicks", async () => {
    const host = container();
    const send = vi.fn();

    const root = createRoot(host);
    await act(async () => {
      root.render(
        <phantom-header heading="Requests">
          <phantom-badge tone="success">2</phantom-badge>
          <phantom-button variant="prominent" onClick={send}>
            Send
          </phantom-button>
        </phantom-header>,
      );
    });

    const header = host.querySelector("phantom-header") as HTMLElement;
    const button = host.querySelector("phantom-button") as HTMLElement;

    expect(header.querySelector('[data-phantom-part="heading"]')?.textContent).toBe("Requests");
    expect(header.querySelector("phantom-badge")?.textContent).toBe("2");
    expect(button.textContent).toBe("Send");
    expect(button.getAttribute("role")).toBe("button");

    await act(async () => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(send).toHaveBeenCalledTimes(1);

    await act(async () => root.unmount());
  });

  it("keeps the kit's chrome ahead of the children it re-renders", async () => {
    const host = container();
    const root = createRoot(host);

    function Panel({ rows }: { rows: string[] }) {
      return (
        <phantom-empty-state heading="No requests" description="Open a folder with .bru files.">
          {rows.map((row) => (
            <phantom-button key={row}>{row}</phantom-button>
          ))}
        </phantom-empty-state>
      );
    }

    await act(async () => root.render(<Panel rows={["one"]} />));
    await act(async () => root.render(<Panel rows={["one", "two", "three"]} />));

    const empty = host.querySelector("phantom-empty-state") as HTMLElement;
    const order = Array.from(empty.children).map(
      (child) => child.getAttribute("data-phantom-part") ?? child.textContent,
    );

    expect(order).toEqual(["heading", "description", "one", "two", "three"]);

    await act(async () => root.unmount());
  });
});

describe("Vue", () => {
  it("renders the elements, binds an attribute and hears a kit event", () => {
    const host = container();
    const selected = vi.fn();

    const app = createApp({
      data: () => ({ heading: "Requests" }),
      render(this: { heading: string }) {
        return h(
          "phantom-list",
          { onPhantomSelect: (event: CustomEvent<RowDetail>) => selected(event.detail.value) },
          [
            h("phantom-row", { value: "get-user" }, "GET /user"),
            h("phantom-row", { value: "create-user" }, this.heading),
          ],
        );
      },
    });
    app.config.compilerOptions.isCustomElement = (tag: string) => tag.startsWith("phantom-");
    app.mount(host);

    const list = host.querySelector("phantom-list") as PhantomList;
    expect(list.rows).toHaveLength(2);
    expect(list.rows[1]?.textContent).toBe("Requests");

    list.rows[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(list.value).toBe("get-user");
    expect(selected).toHaveBeenCalledWith("get-user");

    app.unmount();
  });

  it("hears the event under the name a template compiles to", () => {
    const host = container();
    const selected = vi.fn();

    const app = createApp({
      render: () => h("phantom-list", { "onPhantom-select": selected }, [h("phantom-row", { value: "one" }, "one")]),
    });
    app.mount(host);

    const list = host.querySelector("phantom-list") as PhantomList;
    list.rows[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(selected).toHaveBeenCalledTimes(1);

    app.unmount();
  });
});
