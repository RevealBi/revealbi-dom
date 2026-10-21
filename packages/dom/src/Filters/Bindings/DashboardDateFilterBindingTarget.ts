import { registerJsonFactory } from "../../Core/Serialization/JsonConstruction";
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
    dashboardFilterId?: string;
    static { registerJsonFactory(this, () => { const target = new DashboardDateFilterBindingTarget(); target.dashboardFilterId = "_date"; return target; }); }

    @JsonProperty("GlobalFilterFieldName")
    globalFilterFieldName?: string;
}