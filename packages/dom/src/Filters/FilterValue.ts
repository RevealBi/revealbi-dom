import { filterValueConverter } from "../Core/Serialization/Converters/FilterValueConverter";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";

export class FilterValue
{
    @JsonProperty("Name")
    name?: string;

    @JsonProperty("Value", { converter: filterValueConverter })
    value?: any;
}