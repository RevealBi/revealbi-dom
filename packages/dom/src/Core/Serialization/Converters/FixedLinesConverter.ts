import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";
import { FixedLineAverage, FixedLineData, FixedLineFixedValue, FixedLineMaximum, FixedLineMinimum } from "../../../Visualizations/Primitives";

export function fixedLineConverter(json: any) {
    const fixedLineType = json["_type"];
    switch (fixedLineType) {
        case SchemaTypeNames.FixedLineAverageType:
            return FixedLineAverage;
        case SchemaTypeNames.FixedLineDataType:
            return FixedLineData;
        case SchemaTypeNames.FixedLineFixedValueType:
            return FixedLineFixedValue;
        case SchemaTypeNames.FixedLineHighestType:
            return FixedLineMaximum;
        case SchemaTypeNames.FixedLineLowestType:
            return FixedLineMinimum;
        default:
            throw new Error(`Fixed Line not supported: ${fixedLineType}`); 
    }
}