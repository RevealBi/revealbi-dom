import { TabularDataDefinition } from "../../../Visualizations/DataDefinitions/TabularDataDefinition";
import { TextBoxDataDefinition } from "../../../Visualizations/DataDefinitions/TextBoxDataDefinition";
import { XmlaDataDefinition } from "../../../Visualizations/DataDefinitions/XmlaDataDefinition";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";

export function dataSpecConverter(json: any) {
    const dataSpecType = json["_type"];
    switch (dataSpecType) {
        case SchemaTypeNames.TabularDataSpecType:
            return TabularDataDefinition;
        case SchemaTypeNames.TextBoxDataSpecType:
            return TextBoxDataDefinition;
        case SchemaTypeNames.XmlaDataSpecType:
            return XmlaDataDefinition;
        default:
            throw new Error(`Unsupported data spec type: ${dataSpecType}`);
    }
}