/**
 * The minimal set of Reveal SDK operations the DOM needs in order to bridge
 * between an `RdashDocument` and the SDK's runtime `RVDashboard`.
 *
 * `@revealbi/dom` never imports `reveal-sdk`. A consumer registers an
 * implementation via {@link registerRevealSdk} (or, for script-tag / UMD usage,
 * the DOM auto-detects the global `Reveal`). Everything is duck-typed as
 * `unknown` so the DOM keeps no named reference to the SDK or its types.
 */
export interface RevealSdkAdapter {
    /** Loads a dashboard from the server by id/name. Returns an `RVDashboard`. */
    loadDashboardById(id: string): Promise<unknown>;
    /** Builds an `RVDashboard` from a parsed rdash JSON object. */
    createDashboardFromJson(json: object): unknown | Promise<unknown>;
    /** Serializes an `RVDashboard` back to a parsed rdash JSON object. */
    dashboardToJson(rvDashboard: unknown): unknown | Promise<unknown>;
}

/**
 * Something shaped like the Reveal SDK namespace — i.e. the result of
 * `import * as RevealSdk from "reveal-sdk"`, or the global `Reveal`. Duck-typed
 * so the DOM never names the SDK's types.
 */
type RevealSdkLike = any;

let registeredAdapter: RevealSdkAdapter | undefined;

/**
 * Registers the Reveal SDK (or a custom adapter) used by the DOM's
 * `RdashDocument.load()` and `RdashDocument.toRVDashboard()` bridge methods.
 * Call once at application startup, before loading or converting dashboards.
 *
 * Pass the SDK namespace:
 * ```ts
 * import * as RevealSdk from "reveal-sdk";
 * registerRevealSdk(RevealSdk);
 * ```
 * Script-tag / UMD consumers can skip this — the DOM auto-detects the global
 * `Reveal`. Pass an object implementing {@link RevealSdkAdapter} to fully
 * override the default behavior.
 */
export function registerRevealSdk(sdkOrAdapter: RevealSdkLike | RevealSdkAdapter): void {
    registeredAdapter = isAdapter(sdkOrAdapter) ? sdkOrAdapter : toAdapter(sdkOrAdapter);
}

/**
 * @internal Resolves the active adapter. Resolution order:
 *   1. an adapter registered via {@link registerRevealSdk};
 *   2. the global `Reveal` (script-tag / UMD consumers), wrapped on the fly;
 *   3. otherwise throws with guidance.
 *
 * Reading `globalThis.Reveal` is a guarded global lookup, not an
 * `import "reveal-sdk"` — it never runs the SDK at module load, never forces the
 * dependency on every consumer, and is simply absent (→ throw) under Node.
 */
export function getRevealSdkAdapter(): RevealSdkAdapter {
    if (registeredAdapter) {
        return registeredAdapter;
    }

    const globalReveal = (globalThis as any).Reveal;
    if (globalReveal) {
        return toAdapter(globalReveal);
    }

    throw new Error(
        "Reveal SDK is not available. Register it once at startup with " +
        'registerRevealSdk(RevealSdk) (import * as RevealSdk from "reveal-sdk"), ' +
        "or include the Reveal SDK script so the global `Reveal` is present."
    );
}

function isAdapter(value: any): value is RevealSdkAdapter {
    return !!value
        && typeof value.loadDashboardById === "function"
        && typeof value.createDashboardFromJson === "function"
        && typeof value.dashboardToJson === "function";
}

/**
 * Wraps an SDK-like object into a {@link RevealSdkAdapter}. Prefers the public
 * API planned for a future SDK release (`RVDashboard.loadFromJson` /
 * `RVDashboard.toJson`) and falls back to the current 2.0 entry points, so the
 * same DOM build keeps working as the SDK evolves — no DOM change on SDK release.
 */
function toAdapter(sdk: RevealSdkLike): RevealSdkAdapter {
    return {
        loadDashboardById: (id: string) => sdk.RVDashboard.loadDashboard(id),
        createDashboardFromJson: (json: object) =>
            sdk.RVDashboard?.loadFromJson?.(json)
            ?? sdk.RevealUtility.createDashboardFromJsonObject(json),
        dashboardToJson: (rvDashboard: any) =>
            rvDashboard?.toJson?.()
            ?? rvDashboard?._dashboardModel?._dashboardModel?.toJson(),
    };
}
