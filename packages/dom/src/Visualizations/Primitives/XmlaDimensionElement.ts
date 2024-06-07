import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { PrimitiveArray } from "../../Core/Serialization/Interfaces/PrimitiveArray";
import { XmlaFilter } from "../../Filters/XmlaFilter";
import { DateAggregationType } from "../Enums/DateAggregationType";
import { SortingType } from "../Enums/SortingType";
import { XmlaDimensionType } from "../Enums/XmlaDimensionType";
import { XmlaMember } from "./XmlaMember";

export class XmlaDimensionElement {

    @JsonProperty("UniqueName")
    uniqueName?: string;

    @JsonProperty("Caption")
    caption?: string;

    @JsonProperty("UserCaption")
    userCaption?: string;

    @JsonProperty("DimensionUniqueName")
    dimensionUniqueName?: string;

    @JsonProperty("DimensionType")
    dimensionType?: XmlaDimensionType;

    @JsonProperty("DrillDownElements", { type: PrimitiveArray })
    drillDownElements: string[] = [];

    @JsonProperty("Sorting")
    sorting: SortingType = SortingType.None;

    @JsonProperty("FieldSortingByLabel")
    fieldSortingByLabel: boolean = false;

    @JsonProperty("XmlaFilter")
    xmlaFilter?: XmlaFilter;

    @JsonProperty("FullyExpandedLevels")
    fullyExpandedLevels: number = 0;

    @JsonProperty("ExpandedItems", { type: PrimitiveArray })
    expandedItems: string[] = [];

    @JsonProperty("DateAggregationType")
    dateAggregationType: DateAggregationType = DateAggregationType.Year;

    @JsonProperty("DateFiscalYearStartMonth")
    dateFiscalYearStartMonth: number = 0;

    @JsonProperty("DrillDownMembers")
    drillDownMembers: XmlaMember[] = [];
}