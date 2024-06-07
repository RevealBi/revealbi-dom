import { DateDataField } from "../../../Visualizations/Primitives/DateDataField";
import { NumberDataField } from "../../../Visualizations/Primitives/NumberDataField";
import { TextDataField } from "../../../Visualizations/Primitives/TextDataField";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";

export function dataFieldConverter(json: any) {
    const dataFieldType = json["_type"];
    switch (dataFieldType) {
        case SchemaTypeNames.SummarizationDateFieldType:
            return DateDataField;
        case SchemaTypeNames.SummarizationRegularFieldType:
            return TextDataField;
        case SchemaTypeNames.SummarizationValueFieldType:
            return NumberDataField;
        default:
            throw new Error(`Data Field not supported: ${dataFieldType}`); 
    }
}