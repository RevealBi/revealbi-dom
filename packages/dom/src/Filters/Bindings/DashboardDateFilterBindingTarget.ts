import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BindingTarget } from "./BindingTarget";

export class DashboardDateFilterBindingTarget extends BindingTarget
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.DateGlobalFilterBindingTargetType;
    }

    @JsonProperty("GlobalFilterId")
    dashboardFilterId: string = "_date";

    @JsonProperty("GlobalFilterFieldName")
    globalFilterFieldName?: string;
}