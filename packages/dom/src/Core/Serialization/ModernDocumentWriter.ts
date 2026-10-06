// Complete the wire shapes produced by DOM builders, without pretending to migrate arbitrary old dashboards.
type WireObject = Record<string, any>;
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export function prepareModernDocument(document: WireObject): void {
    for (const widget of document["Widgets"] ?? []) {
        const data = widget.DataSpec;
        const spec = widget.VisualizationDataSpec;
        if (data) {
            prepareDateSettings(data["Fields"]);
            prepareDateSettings(data.TransposedFields);
        }
        if (spec) {
            prepareHierarchy(spec, data);
            prepareXmlaMembers(spec);
            prepareTextFormatting(widget.VisualizationSettings, spec);
        }
    }
}

function prepareDateSettings(fields: WireObject[] = []): void {
    for (const field of fields) {
        const filter = field["Filter"];
        if (field["Settings"] != null || filter?._type !== "DateTimeFilterType") continue;
        const month = filter.DateFiscalYearStartMonth ?? 0;
        field["Settings"] = { _type: "DateTimeFieldSettingsType",
            DateFiscalYearStartMonth: month > 1 && month <= 12 ? month : 0,
            DisplayInLocalTimeZone: filter.DisplayInLocalTimeZone ?? false };
        if (month > 1 && month <= 12) filter.DateFiscalYearStartMonth = 0;
    }
}

function prepareHierarchy(spec: WireObject, data?: WireObject): void {
    if (spec["FormatVersion"] !== 0) return;
    spec["FormatVersion"] = 1;
    const first = spec["Rows"]?.[0];
    const date = first?.SummarizationField;
    if (date?._type !== "SummarizationDateFieldType" || (spec["AdHocFields"] ?? 0) > 1) return;
    const field = data?.["Fields"]?.find((item: WireObject) => item["FieldName"] === date["FieldName"]);
    if (!field) return;
    const levels = field.FieldType === "Date" ? ["Year", "Month", "Day"]
        : field.FieldType === "Time" ? ["Hour", "Minute"]
        : ["Year", "Month", "Day", "Hour", "Minute"];
    const index = levels.indexOf(date.DateAggregationType ?? "Year");
    if (index < 0 || index === levels.length - 1) return;
    const expanded = [clone(first)];
    for (const level of levels.slice(index + 1)) {
        const column = clone(first);
        column.SummarizationField.DateAggregationType = level;
        // A deeper level needs its own formatting and drill selection.
        column.SummarizationField.DrillDownElements = [];
        delete column.SummarizationField.DateFormatting;
        expanded.push(column);
    }
    spec["AdHocFields"] = expanded.length;
    spec["Rows"] = [...expanded, ...spec["Rows"].slice(1).map(clone)];
}

function prepareXmlaMembers(value: any): void {
    if (value == null || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
        if (key === "XmlaElement" && child && typeof child === "object") {
            const element = child as WireObject;
            if (element["DrillDownElements"]?.length) {
                const members: WireObject[] = element["DrillDownMembers"] ?? [];
                for (const name of element["DrillDownElements"] as string[]) {
                    if (members.some(member => member["UniqueName"] === name)) continue;
                    const match = /\[((?:[^\]]|\]\])*)\]$/.exec(name);
                    members.push({ UniqueName: name, Caption: match ? match[1].replace(/\]\]/g, "]") : name });
                }
                element["DrillDownMembers"] = members;
                element["DrillDownElements"] = [];
            }
        }
        prepareXmlaMembers(child);
    }
}

function prepareTextFormatting(settings: WireObject | undefined, spec: WireObject): void {
    if (!settings?.["SingleValueFormattingEnabled"]) return;
    const value = spec["Value"]?.[0];
    const measure = value?.SummarizationField ?? value?.XmlaMeasure;
    if (!measure || measure.ConditionalFormatting != null || !settings["GaugeBands"]) return;
    const formatting: WireObject = { Bands: settings["GaugeBands"].map((band: WireObject) =>
        ({ ...clone(band), _type: "ConditionalFormattingBandType" })) };
    for (const bound of ["Minimum", "Maximum"])
        if (settings[bound] != null) formatting[bound] = clone(settings[bound]);
    measure.ConditionalFormatting = formatting;
}
