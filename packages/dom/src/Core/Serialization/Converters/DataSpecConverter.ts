import { TabularDataDefinition } from "../../../Visualizations/DataDefinitions/TabularDataDefinition";

export function dataSpecConverter(json: any) {
    //todo: add support for other data definitions
    return TabularDataDefinition;
}