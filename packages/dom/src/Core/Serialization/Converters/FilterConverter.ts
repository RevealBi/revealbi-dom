import { DateTimeFilter, NumberFilter, TextFilter, TimeFilter, XmlaDateFilter, XmlaRegularFilter } from "../../../Filters";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";

export function filterConverter(json: any) {
    const filterType = json["_type"];
    switch (filterType) {
        case SchemaTypeNames.NumberFilterType:
            return NumberFilter;
        case SchemaTypeNames.StringFilterType:
            return TextFilter;
        case SchemaTypeNames.DateTimeFilterType:
            return DateTimeFilter;
        case SchemaTypeNames.TimeFilterType:
            return TimeFilter;
        case SchemaTypeNames.XmlaDateFilterType:
            return XmlaDateFilter;
        case SchemaTypeNames.XmlaRegularFilterType:
            return XmlaRegularFilter;
        default:
            throw new Error(`Filter not supported: ${filterType}`);
    }
}