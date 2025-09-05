import { DateFilterValue } from "../../../Filters";

export function filterValueConverter(json: any) {
    const type = json["_type"];
    switch (type) {
        case "date":
            return DateFilterValue;
        default:
            return json;
    }
}