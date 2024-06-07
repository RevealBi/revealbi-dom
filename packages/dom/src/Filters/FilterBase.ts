import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { FilterType } from "./Enums/FilterType";
import { FilterValue } from "./FilterValue";
import { IFilter } from "./Interfaces/IFilter";

export abstract class FilterBase extends SchemaType implements IFilter
{
    @JsonProperty("FilterType")
    filterType: FilterType = FilterType.AllValues;

    @JsonProperty("SelectedValues", { type: FilterValue })
    selectedValues?: FilterValue[];
}