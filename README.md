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

## Date filter rules and IDs

Date filters require an explicit selection. Use the same rule API for dashboard, tabular-field, and XMLA date filters:

```ts
import { DashboardDateFilter, DateTimeFilter, XmlaDateFilter, DateFilterRule,
    PeriodType, DateLinkFilter } from "@revealbi/dom";

const salesDate = new DashboardDateFilter("Sales Date",
    DateFilterRule.last(90, PeriodType.Day, false));
doc.filters.push(salesDate);
salesDate.rule = DateFilterRule.this(PeriodType.Quarter);
salesDate.setRule(DateFilterRule.next(7, PeriodType.Day));

const fieldDate = new DateTimeFilter(DateFilterRule.previous(3, PeriodType.Month));
const xmlaDate = new XmlaDateFilter(DateFilterRule.toDate(PeriodType.Year));
const customDate = new DashboardDateFilter(
    DateFilterRule.custom(new Date("2026-01-01T00:00:00Z"), null));

visualization.connectDashboardFilter(salesDate, "OrderDate");
const dateLink = new DateLinkFilter(salesDate, targetDateFilter);
// Or: new DateLinkFilter(salesDate, targetDateFilter.id)
```

`last` is a rolling window; `previous` selects complete preceding periods. `next` starts at the beginning of the next period; `this` selects the current period in full. `toDate` selects its start through today. Weeks start on Monday. `last` and `toDate` accept `includeToday`; `false` evaluates the window as of yesterday. `custom` accepts inclusive endpoints, with null/undefined for an open endpoint. `DateFilterRule.allTime` removes the date restriction.

Assigning `rule` to a field filter activates rule filtering and clears its old selected values. Raw `ruleType`, `customRule`, `customDateRange`, and `includeToday` properties are private; `DateRuleType` is no longer exported. Legacy wire values remain readable and round-trip through private serialization members. Constructors without a rule are no longer supported. Fiscal and local-time settings belong on `DateField.settings` or `DateTimeField.settings` (`DateTimeFieldSettings`), not the old filter-level properties.

New documents use **format 8**, and new date filters have unique GUIDs. Bindings, imports, and links use the selected filter's actual ID; `_date` fallback defaults exist only in JSON readers. Replace `new DashboardDateFilterBinding("OrderDate")` with `new DashboardDateFilterBinding(salesDate, "OrderDate")`, or use `connectDashboardFilter`. Date links require both source and target filters/IDs.

The writer emits the date hierarchies, field settings, XMLA drill members, and single-value conditional formatting required by the new format. Loading, saving, and importing older dashboards are best-effort operations. Loaded documents keep their version and legacy date values. Recoverable concerns (SDK migration possibly rewriting IDs, or importing legacy visualizations into modern documents) produce `console.warn` diagnostics once per issue per document, without dashboard data, and do not block the operation. If runtime filtering, rendering, or links differ, saving with a current Reveal SDK and reloading can resolve the issue. Malformed JSON still reports a parse error.

The tested runtime baseline is **Reveal SDK 2.2.1**, not a claim about the earliest supported release. SDK 1.7.3 rewrites date IDs regardless of the declared format and is incompatible with GUID-based creation.
