import { DateTimeFilter, NumberFilter, TextFilter, TimeFilter } from "../../../Filters";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";

export function filterConverter(json: any) {
    const bandType = json["_type"];
    switch (bandType) {
        case SchemaTypeNames.NumberFilterType:
            return NumberFilter;
        case SchemaTypeNames.StringFilterType:
            return TextFilter;
        case SchemaTypeNames.DateTimeFilterType:
            return DateTimeFilter;
        case SchemaTypeNames.TimeFilterType:
            return TimeFilter;
        default:
            throw new Error(`Band not supported: ${bandType}`); 
    }
}