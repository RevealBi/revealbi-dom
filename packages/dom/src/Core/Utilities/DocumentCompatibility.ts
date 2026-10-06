import { RdashDocument } from "../../RdashDocument";
import { DashboardDateFilter } from "../../Filters/DashboardDateFilter";

const reported = new WeakMap<RdashDocument, Set<string>>();
function warnOnce(document: RdashDocument, code: string, message: string): void {
    let codes = reported.get(document);
    if (!codes) { codes = new Set(); reported.set(document, codes); }
    if (!codes.has(code)) { codes.add(code); console.warn(message); }
}

export function checkDateIds(document: RdashDocument): void {
    if (document?.formatVersion < 7 && document.filters?.some(filter => filter instanceof DashboardDateFilter &&
        filter.id !== "_date" && !filter.id?.startsWith("xFiltering_")))
        warnOnce(document, "legacy-date-ids", "RdashCompatibility: This legacy document contains date-filter IDs that an SDK migration may rewrite. The DOM preserves them. If filtering or links behave differently, save with a current Reveal SDK and reload.");
}

export function checkLegacyImport(target: RdashDocument, source: RdashDocument): void {
    if (target.formatVersion >= 7 && source.formatVersion < 7)
        warnOnce(target, "legacy-import", "RdashCompatibility: Importing legacy visualizations into a modern document on a best-effort basis. If rendering, date settings, or links differ, save the source with a current Reveal SDK and reload before importing.");
}
