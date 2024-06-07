import { bindingSourceConverter } from "../../Core/Serialization/Converters/BindingSourceConverter";
import { bindingTargetConverter } from "../../Core/Serialization/Converters/BindingTargetConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BindingBase } from "./BindingBase";
import { BindingSource } from "./BindingSource";
import { BindingTarget } from "./BindingTarget";

export class Binding<TSource extends BindingSource, TTarget extends BindingTarget> extends BindingBase {

    @JsonProperty("Source", { converter: bindingSourceConverter })
    source?: TSource;

    @JsonProperty("Target", { converter: bindingTargetConverter })
    target?: TTarget;
}