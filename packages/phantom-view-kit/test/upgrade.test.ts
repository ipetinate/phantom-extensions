import { describe, expect, it } from "vitest";
import { PhantomButton } from "../src/button.ts";
import type { PhantomList, PhantomRow } from "../src/list.ts";
import { container } from "./support.ts";
import "./support.ts";

describe("a property written before the definition arrives", () => {
  it("reaches the accessor once the element upgrades", () => {
    const host = container();
    host.innerHTML = "<phantom-later>Send</phantom-later>";

    const element = host.firstElementChild as PhantomButton & { variant: string };
    (element as unknown as Record<string, unknown>)["variant"] = "prominent";
    (element as unknown as Record<string, unknown>)["disabled"] = true;

    class Later extends PhantomButton {}
    customElements.define("phantom-later", Later);
    customElements.upgrade(host);

    expect(element.getAttribute("variant")).toBe("prominent");
    expect(element.getAttribute("tabindex")).toBe("-1");
    expect(element.disabled).toBe(true);
  });
});

describe("a framework appending children after the first render", () => {
  it("finds the rows it added", () => {
    const host = container();
    host.innerHTML = "<phantom-list></phantom-list>";

    const list = host.firstElementChild as PhantomList;
    for (const value of ["one", "two"]) {
      const row = document.createElement("phantom-row") as PhantomRow;
      row.value = value;
      list.append(row);
    }

    expect(list.rows).toHaveLength(2);
    list.value = "two";
    expect(list.selectedRow?.value).toBe("two");
  });
});
