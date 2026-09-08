import { describe, expect, it, vi } from "vitest";
import { PhantomButton } from "../src/button.ts";
import { mount, press } from "./support.ts";

function button(html = "<phantom-button>Send</phantom-button>"): PhantomButton {
  return mount(html).querySelector("phantom-button") as PhantomButton;
}

describe("phantom-button", () => {
  it("takes the button role, the tab stop and the plain variant", () => {
    const control = button();

    expect(control.getAttribute("role")).toBe("button");
    expect(control.getAttribute("tabindex")).toBe("0");
    expect(control.variant).toBe("plain");
  });

  it("keeps a role the author gave it", () => {
    const control = button(`<phantom-button role="menuitem">Open</phantom-button>`);

    expect(control.getAttribute("role")).toBe("menuitem");
  });

  it("leaves its own children alone", () => {
    const control = button("<phantom-button><svg></svg>Send</phantom-button>");

    expect(control.querySelector("svg")).not.toBeNull();
    expect(control.textContent).toBe("Send");
  });

  it("clicks on Return and on Space, and on nothing else", () => {
    const control = button();
    const clicked = vi.fn();
    control.addEventListener("click", clicked);

    expect(press(control, "Enter").defaultPrevented).toBe(true);
    press(control, " ");
    press(control, "a");

    expect(clicked).toHaveBeenCalledTimes(2);
  });

  it("refuses the keyboard and the click while it is disabled", () => {
    const control = button(`<phantom-button disabled>Send</phantom-button>`);
    const clicked = vi.fn();
    control.addEventListener("click", clicked);

    expect(control.getAttribute("tabindex")).toBe("-1");
    expect(control.getAttribute("aria-disabled")).toBe("true");

    press(control, "Enter");
    control.click();

    expect(clicked).not.toHaveBeenCalled();
  });

  it("takes the tab stop back when it stops being disabled", () => {
    const control = button(`<phantom-button disabled>Send</phantom-button>`);
    control.disabled = false;

    expect(control.getAttribute("tabindex")).toBe("0");
    expect(control.hasAttribute("aria-disabled")).toBe(false);
  });

  it("answers with the variant it was given, and with plain for one it does not know", () => {
    expect(button(`<phantom-button variant="prominent">Go</phantom-button>`).variant).toBe("prominent");
    expect(button(`<phantom-button variant="icon">+</phantom-button>`).variant).toBe("icon");
    expect(button(`<phantom-button variant="danger">No</phantom-button>`).variant).toBe("plain");
  });
});
