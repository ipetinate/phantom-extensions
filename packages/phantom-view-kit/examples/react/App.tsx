import { useEffect, useRef, useState } from "react";
import { bindTheme, defineAll, type PhantomList, type RowDetail } from "phantom-view-kit";
import "phantom-view-kit/kit.css";
import "phantom-view-kit/react";

defineAll();

interface Request {
  readonly id: string;
  readonly method: string;
  readonly path: string;
}

export function App({ requests }: { requests: readonly Request[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const list = useRef<PhantomList>(null);

  useEffect(() => bindTheme(), []);

  useEffect(() => {
    const element = list.current;
    if (!element) return;

    const onSelect = (event: Event) => setSelected((event as CustomEvent<RowDetail>).detail.value);
    element.addEventListener("phantom-select", onSelect);
    return () => element.removeEventListener("phantom-select", onSelect);
  }, []);

  if (requests.length === 0) {
    return (
      <phantom-empty-state
        icon="icons/bruno.png"
        heading="No requests here"
        description="Open a folder with .bru files, or write your first request."
      >
        <phantom-button variant="prominent" onClick={() => console.log("new request")}>
          New request
        </phantom-button>
      </phantom-empty-state>
    );
  }

  return (
    <>
      <phantom-header heading="Requests">
        <phantom-badge>{requests.length}</phantom-badge>
      </phantom-header>

      <phantom-scroll style={{ flex: "1 1 auto" }}>
        <phantom-list ref={list}>
          {requests.map((request) => (
            <phantom-row key={request.id} value={request.id} selected={request.id === selected}>
              <phantom-badge tone={request.method === "GET" ? "accent" : "success"}>{request.method}</phantom-badge>
              <span>{request.path}</span>
            </phantom-row>
          ))}
        </phantom-list>
      </phantom-scroll>
    </>
  );
}
