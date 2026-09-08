# phantom-view-kit

The control kit for Phantom extension views. An extension that contributes a view ships one JavaScript file and one stylesheet, draws its own interface inside Phantom, and has to look like part of the window it opens in. This package holds the controls that make that the default: custom elements that wear the app's own colours, fonts, metrics and states, usable from plain JavaScript, React, Vue or anything else that can write HTML.

It is a library an author **bundles into their view**. It is never loaded at runtime: the page runs under `default-src 'none'; script-src 'self'; style-src 'self'` with no `http` or `https` source at any directive, so a script tag pointing at a CDN, a remote font and an injected `<style>` all fail, and fail silently. Everything below is designed around that.

## Installing

```sh
npm install phantom-view-kit
```

Then, once, wherever the view starts:

```ts
import { bindTheme, defineAll } from "phantom-view-kit";
import "phantom-view-kit/kit.css";

defineAll();
bindTheme();
```

`defineAll` registers the elements. `bindTheme` reads the running theme through `window.phantom` and follows every later one; it needs `theme.read` in the manifest's `permissions`, and does nothing at all without it, which leaves the kit's fallback palette in force.

The stylesheet import is what puts `kit.css` in the one stylesheet the view ships. Every bundler that handles a CSS import collects it there — `packages/bruno-view` is Vite, and Vite emits it into the single `style` file the manifest names. The kit cannot inject its CSS itself, because a stylesheet a page builds at runtime is what `style-src 'self'` refuses; `defineAll` checks for the stylesheet and warns in the console once when it is missing, since that failure is otherwise invisible.

For TypeScript, the package ships its own types. React authors add one more import for the JSX entries:

```ts
import "phantom-view-kit/react";
```

Vue authors tell the template compiler that these tags are elements rather than components:

```ts
// vite.config.ts
vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith("phantom-") } } });
```

## Why custom elements, in the light DOM

**Custom elements**, because framework-agnostic is the requirement and this is the only primitive every framework already renders. A React author writes `<phantom-button>`, a Vue author writes the same tag, and an author with no framework writes it in a template string. A component library per framework would be three libraries.

**In the light DOM, with no shadow root**, and that decision is forced by the policy above. A shadow root does not inherit stylesheets, so a kit that used one would have to put its CSS *inside* each root — as a `<style>` element, which `style-src 'self'` refuses, or as a constructed stylesheet, whose treatment under CSP is not something a view can test from inside Phantom. Custom properties do cross into a shadow root, so the theme would have arrived; the rules that use them would not. The light DOM also means the author's own CSS can reach the controls, and `label`, `:focus-within` and form participation work with no plumbing.

What the light DOM costs is projection: with no shadow root there is no `<slot>`, so a component cannot wrap the children an author wrote. Two rules follow, and every element here obeys them:

- **A component never moves, removes or reorders a child it did not create.** The children of `phantom-button`, `phantom-row` and `phantom-empty-state` belong to whoever wrote them, which is usually a framework that will re-render them.
- **The nodes the kit does own are inserted before the author's, never after.** React appends a new last child, so chrome sitting at the end would end up in the middle of it. Every kit-owned node carries `data-phantom-part` and sits at the front, in a fixed order.

That is why the button *is* the control — it takes `role`, the tab stop and the keyboard rather than wrapping a `<button>` it would have to move text into — and why `phantom-field` frames the `input` the author writes instead of rendering one.

## The theme

An extension view is drawn over whatever theme the reader installed, so a colour in a component is wrong by construction. Phantom answers `theme.read` with nine colours, two font stacks and a base size, and `applyTheme` writes them as custom properties on `<html>` through the CSSOM — not as a stylesheet, for the reason above, and not as a `<style>` element either.

These names are the host's, and the kit reads exactly them, so a view that already applies the theme itself needs no adapter:

| Token | What it is |
|---|---|
| `--bg` | The window's background |
| `--fg` | Text |
| `--accent` | The reader's accent: selection, the prominent button, the ring |
| `--muted` | Secondary text, captions, placeholders |
| `--border` | Hairlines |
| `--codeBg` | The code surface |
| `--danger`, `--warning`, `--success` | Status |
| `--font-ui`, `--font-mono` | The two font stacks |
| `--base-size` | The UI font size, in pixels |
| `data-scheme` on `<html>` | `light` or `dark` |

The kit derives everything else from those, in CSS, so a theme change needs no repaint pass in JavaScript. Each is a custom property an author may override.

| Token | Default | Mirrors |
|---|---|---|
| `--pk-surface` | `color-mix(in srgb, var(--fg) 8%, transparent)` | `Color.secondary.opacity(0.08)`, the sidebar's card fill |
| `--pk-stroke` | the same at `16%` | the card's border |
| `--pk-fill` | the same at `12%` | the search and excludes fields |
| `--pk-hover` | the same at `14%` | a hovered control |
| `--pk-quiet` | the same at `8%` | `.quaternary`, the count capsule and the icon chip's highlight |
| `--pk-row-hover` | `color-mix(in srgb, var(--accent) 12%, transparent)` | a hovered row in the file tree |
| `--pk-row-active` | the same at `45%` | the row whose file is open |
| `--pk-ring` | the same at `55%` | the selection ring |
| `--pk-on-accent` | measured from the accent | the label on a filled prominent button |
| `--pk-scroll-knob` | `color-mix(in srgb, var(--fg) 22%, transparent)` | `ThinScroller`, chrome weight |
| `--pk-scroll-knob-content` | the same at `34%` | `ThinScroller`, content weight |
| `--pk-radius`, `--pk-radius-small` | `6px`, `5px` | the card and the chip |
| `--pk-row-height` | `28px` | `SidebarIconChipMetrics.rowHeight` |
| `--pk-chip-width`, `--pk-chip-height` | `24px`, `22px` | `SidebarIconChipMetrics` |
| `--pk-pad-x`, `--pk-gap` | `8px`, `6px` | the sidebar's insets |
| `--pk-text-caption` … `--pk-text-hero` | `0.78` to `1.15` of `--base-size` | 10, 11, 12 and 15 point against a 13 point base |
| `--pk-empty-art` | `44px` | the placeholder's artwork |

`--pk-on-accent` is the one the kit cannot express as a mix: it is the text on top of the accent, and which end of the scale it belongs at depends on how bright the accent is. `applyTheme` measures the accent's relative luminance and writes it, and `labelOn` is exported for a view drawing its own accent-filled surface. A host that ever sends `colors.onAccent` wins over the measurement.

Fonts and sizes are relative to `--base-size`, never absolute, so a reader who runs the app at 15 points gets a view at 15 points.

## The elements

Ten tags, and each one draws something the app already draws. `title` is never an attribute name — that one paints a tooltip — so a heading is `heading`.

| Element | Attributes | Children | What it mirrors in the app |
|---|---|---|---|
| `phantom-button` | `variant` plain, prominent or icon (default plain); `disabled` | the label, an icon, or both | `.borderedProminent` tinted with the accent for prominent (the Git panel's commit button); `SidebarChromeButton` for plain; `SidebarIconChipMetrics`, 24 by 22 at radius 5 with a `.quaternary` hover, for icon |
| `phantom-field` | `invalid` | one `input`, `textarea` or `select` | the file explorer's search and excludes fields: a `12%` fill at radius 6, seven points of horizontal padding |
| `phantom-list` | `value` | `phantom-row` | the file tree: one selection, arrow keys, Return |
| `phantom-row` | `value`; `selected`; `active`; `disabled` | anything | `FileExplorerRowEmphasis`: `selected` is the accent ring, `active` is the accent fill, and a row that is both draws the fill only |
| `phantom-header` | `heading` | the actions | the sidebar's section header — 12 point semibold over the chip row height |
| `phantom-section` | `label`; `count` | the content | the filter panel's labelled rows: an uppercase 10 point caption, with `SidebarCountBadge` beside it when a count is in force |
| `phantom-badge` | `tone` neutral, accent, success, warning or danger | a count or a short label | `SidebarCountBadge` for neutral; the response-code capsules in the Bruno view for the rest |
| `phantom-empty-state` | `icon`; `heading`; `description` | the actions | the panels' placeholders and the welcome window's hero, at pane scale |
| `phantom-code` | `wrap` on or off (default on) | text | the code surface: `--codeBg` inside a hairline at radius 6 |
| `phantom-scroll` | `weight` chrome or content (default chrome) | anything | `ThinScroller` and `OverlayScrollers`: a 3.5 point knob for furniture, 5 for something being read, no track, and gone again after the gesture |

### What they do, beyond looking right

`phantom-button` answers Return and Space, refuses both while `disabled`, and takes `role="button"` unless the author named a role.

`phantom-list` moves its selection with Down, Up, Home and End, opens the selection on Return, selects on a click and opens on a second one, passes over a `disabled` row, and names the current row with `aria-activedescendant`. It reads its rows from the DOM every time rather than keeping a copy, which is what lets a framework add, remove and reorder them behind its back. It reports two events, both bubbling and composed, with `{ value, index, row }`:

| Event | When |
|---|---|
| `phantom-select` | The selection moved. Not fired for a `value` the author assigns. |
| `phantom-activate` | Return, or a second click on a row. |

`phantom-field` puts a click anywhere in the frame into the control, the way an AppKit field does, and marks the control `aria-invalid` while the frame is `invalid`.

`phantom-scroll` shows its indicator while it is scrolling or under the pointer and hides it 700 milliseconds after the last scroll — the one part of an overlay scroller that is a timer, which is why it is an element and not a class.

`phantom-badge` and `phantom-code` add no behaviour. They are elements so a view names one vocabulary for its controls, and so their attributes are properties a framework can bind.

## Plain JavaScript

```ts
import { bindTheme, defineAll, type PhantomList, type RowDetail } from "phantom-view-kit";
import "phantom-view-kit/kit.css";

defineAll();
bindTheme();

document.querySelector("#root")!.innerHTML = `
  <phantom-header heading="Requests">
    <phantom-button variant="icon" aria-label="Refresh">&#8635;</phantom-button>
  </phantom-header>

  <phantom-list id="requests">
    <phantom-row value="get-user"><phantom-badge tone="accent">GET</phantom-badge><span>/user</span></phantom-row>
    <phantom-row value="create-user"><phantom-badge tone="success">POST</phantom-badge><span>/user</span></phantom-row>
  </phantom-list>
`;

document.querySelector<PhantomList>("#requests")?.addEventListener("phantom-activate", (event) => {
  send((event as CustomEvent<RowDetail>).detail.value);
});
```

## React

```tsx
import { useEffect, useRef, useState } from "react";
import { bindTheme, defineAll, type PhantomList, type RowDetail } from "phantom-view-kit";
import "phantom-view-kit/kit.css";
import "phantom-view-kit/react";

defineAll();

export function Requests({ requests }: { requests: Request[] }) {
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
      <phantom-empty-state icon="icons/bruno.png" heading="No requests here" description="Open a folder with .bru files.">
        <phantom-button variant="prominent" onClick={newRequest}>New request</phantom-button>
      </phantom-empty-state>
    );
  }

  return (
    <phantom-list ref={list}>
      {requests.map((request) => (
        <phantom-row key={request.id} value={request.id} selected={request.id === selected}>
          <phantom-badge tone="accent">{request.method}</phantom-badge>
          <span>{request.path}</span>
        </phantom-row>
      ))}
    </phantom-list>
  );
}
```

A native `on…` prop reaches a custom element, so `onClick` is enough for a click. A **custom** event is not a React prop, so `phantom-select` and `phantom-activate` are heard through a ref and `addEventListener`, as above.

## Vue

```vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { bindTheme, defineAll, type RowDetail } from "phantom-view-kit";
import "phantom-view-kit/kit.css";

defineAll();

const props = defineProps<{ requests: Request[] }>();
const selected = ref<string | null>(null);

onMounted(() => bindTheme());
</script>

<template>
  <phantom-empty-state
    v-if="props.requests.length === 0"
    icon="icons/bruno.png"
    heading="No requests here"
    description="Open a folder with .bru files."
  >
    <phantom-button variant="prominent" @click="$emit('new-request')">New request</phantom-button>
  </phantom-empty-state>

  <phantom-list v-else @phantom-select="selected = ($event as CustomEvent<RowDetail>).detail.value">
    <phantom-row v-for="request in props.requests" :key="request.id" :value="request.id" :selected="request.id === selected">
      <phantom-badge tone="accent">{{ request.method }}</phantom-badge>
      <span>{{ request.path }}</span>
    </phantom-row>
  </phantom-list>
</template>
```

Vue hears a custom event with no plumbing: `@phantom-select` in a template. In a render function the same listener is `onPhantomSelect` — Vue only treats an `on…` key as a listener when what follows `on` is not a lowercase letter, so `onphantom-select` is written as an attribute and never fires.

`examples/` holds all three of these as files.

## What is deliberately not here

A kit of forty elements nobody uses is worse than ten that are right, so these are left out until something needs them:

- **A menu, a popover and a tooltip.** Phantom draws its own menus in AppKit, over the whole window, which a page inside a `WKWebView` cannot do. A view that needs a menu should ask for one through the bridge rather than draw a worse one.
- **A modal dialog.** It needs a focus trap and an escape route, and a pane the width of a sidebar is the wrong place for one.
- **Tabs, a table, a tree, a split pane.** No view has asked yet, and each is a week of keyboard behaviour to get right.
- **A checkbox, a radio and a switch.** The native controls already inherit the accent, and the kit has nothing to add beyond size.
- **A copy button on the code block.** The clipboard needs a gesture and a handler the host has to allow, and nothing here can verify that from inside the page.
- **An icon set.** An extension ships its own artwork, and a name the reader's system does not resolve is how a row disappears from a list with nothing logged.
- **A colour of its own.** There is no palette in this package beyond the fallback one, and a test fails the build if a rule names a colour that is not a token.

## Building and testing

```sh
npm run build   # dist/index.js, dist/index.d.ts, dist/kit.css, dist/react.d.ts
npm test        # tsc --noEmit, then vitest
```

The suite covers the behaviour of every element, the theme, and three things about the stylesheet that are easy to break by hand: that no rule names a colour outside the fallback palette, that every token it uses is documented here, and that it reaches nothing off this machine. It also renders the elements under React 19 and Vue 3 in jsdom, because framework-agnostic is a claim and a claim needs a test.
