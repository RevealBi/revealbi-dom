import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";
import { DashboardDataFilter, DashboardDateFilter } from "../../../Filters";

export function dashboardFilterConverter(json: any) {
    const filterType = json["_type"];
    switch (filterType) {
        case SchemaTypeNames.DateGlobalFilterType:
            return DashboardDateFilter;
        case SchemaTypeNames.TabularGlobalFilterType:
            return DashboardDataFilter;
        default:
            throw new Error(`DashboardFilter not supported: ${filterType}`); 
    }
}