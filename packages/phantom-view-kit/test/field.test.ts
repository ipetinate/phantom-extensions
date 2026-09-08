import { describe, expect, it } from "vitest";
import { PhantomField } from "../src/field.ts";
import { mount } from "./support.ts";

function field(html = `<phantom-field><input value="node_modules" /></phantom-field>`): PhantomField {
  return mount(html).querySelector("phantom-field") as PhantomField;
}

describe("phantom-field", () => {
  it("reads and writes the control the author wrote", () => {
    const frame = field();

    expect(frame.control?.tagName).toBe("INPUT");
    expect(frame.value).toBe("node_modules");

    frame.value = "*.log";
    expect((frame.control as HTMLInputElement).value).toBe("*.log");
  });

  it("frames a textarea and a select as well", () => {
    expect(field(`<phantom-field><textarea>body</textarea></phantom-field>`).value).toBe("body");
    expect(field(`<phantom-field><select><option value="get">GET</option></select></phantom-field>`).value).toBe("get");
  });

  it("answers with an empty value while there is no control", () => {
    const frame = field("<phantom-field></phantom-field>");

    expect(frame.control).toBeNull();
    expect(frame.value).toBe("");
    expect(() => (frame.value = "x")).not.toThrow();
  });

  it("marks the control invalid, and unmarks it", () => {
    const frame = field(`<phantom-field invalid><input /></phantom-field>`);
    expect(frame.control?.getAttribute("aria-invalid")).toBe("true");

    frame.invalid = false;
    expect(frame.control?.hasAttribute("aria-invalid")).toBe(false);
  });

  it("puts a click in the frame into the control", () => {
    const frame = field();
    const event = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
    frame.dispatchEvent(event);

    expect(document.activeElement).toBe(frame.control);
    expect(event.defaultPrevented).toBe(true);
  });

  it("leaves a click on the control to the control", () => {
    const frame = field();
    const event = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
    frame.control?.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
  });
});
