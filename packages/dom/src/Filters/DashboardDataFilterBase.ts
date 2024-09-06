import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DashboardFilter } from "./DashboardFilter";
import { FilterItem } from "./FilterItem";

    export abstract class DashboardDataFilterBase extends DashboardFilter
    {
        @JsonProperty("IsDynamic")
        isDynamic: boolean = true;

        @JsonProperty("AllowMultipleSelection")
        allowMultipleSelection: boolean = true;

        @JsonProperty("AllowEmptySelection")
        allowEmptySelection: boolean = true;

        @JsonProperty("SortByLabel")
        sortByLabel: boolean = true;

        @JsonProperty("SelectedItems", { type: FilterItem })
        selectedItems: FilterItem[] = [];
    }