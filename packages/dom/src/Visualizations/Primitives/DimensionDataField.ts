import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { PrimitiveArray } from "../../Core/Serialization/Interfaces/PrimitiveArray";
import { IDimensionDataField } from "../Interfaces/IDimensionDataField";
import { DataField } from "./DataField";

export abstract class DimensionDataField extends DataField implements IDimensionDataField
{
    constructor(fieldName?: string) {
        super(fieldName);
    }
    
    @JsonProperty("DrillDownElements", { type: PrimitiveArray })
    drillDownElements: string[] = [];

    //used to visually expand hierachy in the vizualization, only used by the pivot grid
    @JsonProperty("ExpandedItems", { type: PrimitiveArray })
    expandedItems: string[] = [];

    @JsonProperty("sortByField")
    sortByField?: string;
}