import { DateField } from "../../../Visualizations/Primitives/DateField";
import { DateTimeField } from "../../../Visualizations/Primitives/DateTimeField";
import { NumberField } from "../../../Visualizations/Primitives/NumberField";
import { TextField } from "../../../Visualizations/Primitives/TextField";
import { TimeField } from "../../../Visualizations/Primitives/TimeField";

export function fieldsConverter(json: any) {
    const fieldType = json["FieldType"];
    switch (fieldType) {
        case "Date":
            return DateField;
        case "DateTime":
            return DateTimeField;
        case "Number":
            return NumberField;
        case "Time":
            return TimeField;
        case "String":
            return TextField;
        default:
            throw new Error(`Field not supported: ${fieldType}`);
    }
}