import { bindTheme, defineAll, type PhantomList, type RowDetail } from "phantom-view-kit";
import "phantom-view-kit/kit.css";

defineAll();
bindTheme();

const root = document.querySelector("#root") as HTMLElement;

root.innerHTML = `
  <phantom-header heading="Requests">
    <phantom-button variant="icon" id="refresh" aria-label="Refresh">&#8635;</phantom-button>
  </phantom-header>

  <phantom-scroll style="flex: 1 1 auto">
    <phantom-list id="requests">
      <phantom-row value="get-user">
        <phantom-badge tone="accent">GET</phantom-badge>
        <span>/user</span>
      </phantom-row>
      <phantom-row value="create-user">
        <phantom-badge tone="success">POST</phantom-badge>
        <span>/user</span>
      </phantom-row>
    </phantom-list>
  </phantom-scroll>

  <phantom-section label="Response" count="0">
    <phantom-code>{}</phantom-code>
  </phantom-section>
`;

const requests = root.querySelector<PhantomList>("#requests");

requests?.addEventListener("phantom-select", (event) => {
  const detail = (event as CustomEvent<RowDetail>).detail;
  console.log("selected", detail.value);
});

requests?.addEventListener("phantom-activate", (event) => {
  const detail = (event as CustomEvent<RowDetail>).detail;
  console.log("send", detail.value);
});
