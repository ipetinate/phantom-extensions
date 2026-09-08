import { describe, expect, it, vi } from "vitest";
import { ACTIVATE_EVENT, SELECT_EVENT, type PhantomList, type PhantomRow, type RowDetail } from "../src/list.ts";
import { mount, press } from "./support.ts";

const markup = `
  <phantom-list>
    <phantom-row value="get-user">GET /user</phantom-row>
    <phantom-row value="create-user">POST /user</phantom-row>
    <phantom-row value="delete-user" disabled>DELETE /user</phantom-row>
  </phantom-list>
`;

function list(html = markup): PhantomList {
  return mount(html).querySelector("phantom-list") as PhantomList;
}

describe("phantom-list", () => {
  it("takes the listbox role and the tab stop, and gives its rows the option role", () => {
    const rows = list();

    expect(rows.getAttribute("role")).toBe("listbox");
    expect(rows.getAttribute("tabindex")).toBe("0");
    expect(rows.rows).toHaveLength(3);
    expect(rows.rows[0]?.getAttribute("role")).toBe("option");
    expect(rows.rows[0]?.getAttribute("aria-selected")).toBe("false");
  });

  it("selects the row that was clicked and reports it once", () => {
    const rows = list();
    const selected = vi.fn();
    rows.addEventListener(SELECT_EVENT, (event) => selected((event as CustomEvent<RowDetail>).detail));

    rows.rows[1]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(rows.value).toBe("create-user");
    expect(rows.rows[1]?.getAttribute("aria-selected")).toBe("true");
    expect(selected).toHaveBeenCalledTimes(1);
    expect(selected.mock.calls[0]?.[0]).toMatchObject({ value: "create-user", index: 1 });
  });

  it("selects the row a click inside a row landed on", () => {
    const rows = list(`
      <phantom-list>
        <phantom-row value="one"><span>one</span></phantom-row>
      </phantom-list>
    `);

    rows.querySelector("span")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(rows.value).toBe("one");
  });

  it("names the current row for a screen reader", () => {
    const rows = list();
    rows.select(rows.rows[0] as PhantomRow);

    expect(rows.getAttribute("aria-activedescendant")).toBe(rows.rows[0]?.id);
    expect(rows.rows[0]?.id).not.toBe("");
  });

  it("moves the selection with the arrows, Home and End", () => {
    const rows = list();

    press(rows, "ArrowDown");
    expect(rows.value).toBe("get-user");

    press(rows, "ArrowDown");
    expect(rows.value).toBe("create-user");

    press(rows, "ArrowDown");
    expect(rows.value).toBe("create-user");

    press(rows, "ArrowUp");
    expect(rows.value).toBe("get-user");

    press(rows, "End");
    expect(rows.value).toBe("create-user");

    press(rows, "Home");
    expect(rows.value).toBe("get-user");
  });

  it("opens the selection on Return", () => {
    const rows = list();
    const activated = vi.fn();
    rows.addEventListener(ACTIVATE_EVENT, (event) => activated((event as CustomEvent<RowDetail>).detail));

    press(rows, "Enter");
    expect(activated).not.toHaveBeenCalled();

    press(rows, "ArrowDown");
    press(rows, "Enter");

    expect(activated).toHaveBeenCalledTimes(1);
    expect(activated.mock.calls[0]?.[0]).toMatchObject({ value: "get-user" });
  });

  it("opens a row on a second click", () => {
    const rows = list();
    const activated = vi.fn();
    rows.addEventListener(ACTIVATE_EVENT, activated);

    rows.rows[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 1 }));
    expect(activated).not.toHaveBeenCalled();

    rows.rows[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 2 }));
    expect(activated).toHaveBeenCalledTimes(1);
  });

  it("passes over a disabled row, by key and by click", () => {
    const rows = list();

    press(rows, "End");
    expect(rows.value).toBe("create-user");

    rows.rows[2]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(rows.value).toBe("create-user");
  });

  it("moves the selection from a value without reporting it", () => {
    const rows = list();
    const selected = vi.fn();
    rows.addEventListener(SELECT_EVENT, selected);

    rows.value = "create-user";

    expect(rows.selectedRow?.value).toBe("create-user");
    expect(selected).not.toHaveBeenCalled();
  });

  it("ignores a value no row carries", () => {
    const rows = list();
    rows.value = "create-user";
    rows.value = "nothing-here";

    expect(rows.value).toBe("create-user");
  });

  it("reads the rows again after they change", () => {
    const rows = list();
    rows.rows[0]?.remove();

    const added = document.createElement("phantom-row") as PhantomRow;
    added.value = "put-user";
    rows.append(added);

    expect(rows.rows.map((row) => row.value)).toEqual(["create-user", "delete-user", "put-user"]);
  });
});
