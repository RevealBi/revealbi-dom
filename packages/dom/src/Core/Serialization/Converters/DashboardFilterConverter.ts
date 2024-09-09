import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";
import { DashboardDataFilter, DashboardDateFilter, DashboardXmlaFilter } from "../../../Filters";

export function dashboardFilterConverter(json: any) {
    const filterType = json["_type"];
    switch (filterType) {
        case SchemaTypeNames.DateGlobalFilterType:
            return DashboardDateFilter;
        case SchemaTypeNames.TabularGlobalFilterType:
            return DashboardDataFilter;
        case SchemaTypeNames.XmlaGlobalFilterType:
            return DashboardXmlaFilter
        default:
            throw new Error(`DashboardFilter not supported: ${filterType}`); 
    }
}