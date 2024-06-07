import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BindingTarget } from "./BindingTarget";

export class DashboardDataFilterBindingTarget extends BindingTarget
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.DataBasedGlobalFilterBindingTargetType;
    }

    @JsonProperty("GlobalFilterId")
    dashboardFilterId?: string;

    @JsonProperty("GlobalFilterFieldName")
    dashboardFilterFieldName?: string;
}