import { bindingConverter } from "../../Core/Serialization/Converters/BindingConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BindingBase } from "../../Filters/Bindings/BindingBase";
import { UrlBinding } from "./UrlBinding";

export class DataSpecBindings {
    @JsonProperty("UrlBinding", { type: UrlBinding })
    urlBinding?: UrlBinding;

    @JsonProperty("Bindings", { converter: bindingConverter })
    bindings: BindingBase[] = [];
}