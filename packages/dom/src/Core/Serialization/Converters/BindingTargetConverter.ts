import { DashboardDataFilterBindingTarget } from "../../../Filters/Bindings/DashboardDataFilterBindingTarget";
import { DashboardDateFilterBindingTarget } from "../../../Filters/Bindings/DashboardDateFilterBindingTarget";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";

export function bindingTargetConverter(json: any) {
    const targetType = json["_type"];
    switch (targetType) {
        case SchemaTypeNames.DataBasedGlobalFilterBindingTargetType:
            return DashboardDataFilterBindingTarget;
        case SchemaTypeNames.DateGlobalFilterBindingTargetType:
            return DashboardDateFilterBindingTarget;
        // case SchemaTypeNames.GlobalVariableBindingTargetType: //todo: finish
        //     return GlobalVariableBindingTargetType;
        default:
            throw new Error(`Binding Target not supported: ${targetType}`); 
    }
}