import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { FilterBase } from "./FilterBase";
import { XmlaFilterRule } from "./XmlaFilterRule";

export class XmlaRegularFilter extends FilterBase
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaRegularFilterType;
    }

    @JsonProperty("FilterRule", { type: XmlaFilterRule})
    filterRule?: XmlaFilterRule;
}