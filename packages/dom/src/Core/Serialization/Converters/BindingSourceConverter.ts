import { FieldBindingSource } from "../../../Filters/Bindings/FieldBindingSource";
import { ParameterBindingSource } from "../../../Filters/Bindings/ParameterBindingSource";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";

export function bindingSourceConverter(json: any) {
    const targetType = json["_type"];
    switch (targetType) {
        case SchemaTypeNames.FieldBindingSourceType:
            return FieldBindingSource;
        case SchemaTypeNames.ParameterBindingSourceType:
            return ParameterBindingSource;
        default:
            throw new Error(`Binding Source not supported: ${targetType}`); 
    }
}