# Reveal DOM for TypeScript

`@revealbi/dom` lets you create, manipulate, and serialize Reveal `.rdash` dashboard
documents as plain TypeScript objects — in the browser or in Node. It has **no direct
dependency on the Reveal SDK**: you can build and serialize dashboards entirely from
JSON, and opt in to the SDK only when you need to render a dashboard in a `RevealView`
or read one back from a live `RVDashboard`.

## Installation

```bash
npm install @revealbi/dom
```

To render dashboards (or load them from a Reveal server) you also need the Reveal client SDK:

```bash
npm install reveal-sdk
```

## Reveal SDK 2.0 & the adapter

Reveal SDK 2.0 replaced the legacy jQuery `$.ig` global with a real package
(`reveal-sdk`, ESM) and a `Reveal` global (script tag). `@revealbi/dom` never imports
the SDK directly — instead you **register** it once, and the DOM's `load()` /
`toRVDashboard()` bridge methods use whatever you registered. This keeps the DOM
SDK-agnostic (and fully usable in Node with no SDK at all) while keeping the same
`RdashDocument` API existing apps already use.

### NPM / ESM

```ts
import * as RevealSdk from "reveal-sdk";
import { registerRevealSdk } from "@revealbi/dom";

// once, at application startup
registerRevealSdk(RevealSdk);
RevealSdk.RevealSdkSettings.setBaseUrl("https://your-reveal-server/");
```

### Script tag / CDN (IIFE)

Load the SDK and the DOM as globals — `Reveal` and `RevealDom`. The DOM
**auto-detects** the `Reveal` global, so no `registerRevealSdk` call is needed:

```html
<script src="https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@revealbi/dom/index.iife.js"></script>
<script>
  (async () => {
    Reveal.RevealSdkSettings.setBaseUrl("https://your-reveal-server/");

    const doc  = await RevealDom.RdashDocument.load("Sales");
    const view = new Reveal.RevealView("#viewer");
    view.dashboard = await doc.toRVDashboard();
  })();
</script>
```

> **CDN ESM note:** if you load the SDK from its ESM URL (`reveal-sdk.esm.js`) it
> sets no global, so the DOM can't auto-detect it — call
> `registerRevealSdk(RevealSdk)` explicitly with the imported namespace.

## Working with dashboards

### Build a dashboard and render it

```ts
import { RdashDocument } from "@revealbi/dom";

const doc = new RdashDocument("My Dashboard");
// ...add data sources & visualizations...

const rv   = await doc.toRVDashboard();        // RdashDocument -> RVDashboard
const view = new RevealView("#viewer");
view.dashboard = rv;
```

### Load an existing dashboard, edit it, render it

```ts
const doc = await RdashDocument.load("Sales"); // by id from the Reveal server
doc.title = "Sales (edited)";
view.dashboard = await doc.toRVDashboard();
```

`RdashDocument.load()` accepts a dashboard **id**, an `.rdash` **`Blob`**, or a live
**`RVDashboard`** instance.

### JSON & files — no SDK required

These run anywhere (Node or browser) with no SDK registered:

```ts
const doc  = RdashDocument.loadFromJson(jsonString);
const doc2 = await RdashDocument.loadFromBuffer(rdashBytes);

const json = doc.toJson();         // object
const text = doc.toJsonString();   // string
const blob = doc.toBlob();         // .rdash Blob
```

## Upgrading from 1.x

| | 1.x | 2.0 |
|---|---|---|
| SDK delivery | `<script>` → `$.ig` global | `reveal-sdk` (NPM/ESM) or `Reveal` global (IIFE) |
| Wiring | implicit (DOM reached `$.ig`) | `registerRevealSdk(RevealSdk)` once at startup |
| `RdashDocument.load()` / `toRVDashboard()` | — | **unchanged** |
| DOM script-tag global | `window.dom` | `window.RevealDom` |

The only change for your dashboard code is a one-time `registerRevealSdk(...)` when you
use the SDK via NPM/ESM — or nothing at all when you use the script-tag globals (the
`Reveal` global is auto-detected). Your `load()` / `toRVDashboard()` call sites do not
change.

### Custom adapter (advanced)

`registerRevealSdk` accepts the `reveal-sdk` namespace, or a custom object implementing
`RevealSdkAdapter` if you need full control over how dashboards are loaded and converted:

```ts
import { registerRevealSdk, RevealSdkAdapter } from "@revealbi/dom";

const adapter: RevealSdkAdapter = {
  loadDashboardById:       (id)   => /* ... */,
  createDashboardFromJson: (json) => /* ... */,
  dashboardToJson:         (rv)   => /* ... */,
};
registerRevealSdk(adapter);
```
