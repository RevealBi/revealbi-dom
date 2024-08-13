import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { SortingType } from "../Enums/SortingType";
import { ConditionalFormatting } from "./ConditionalFormatting";
import { FormattingBase } from "./FormattingBase";

export class XmlaMeasure {

    @JsonProperty("IsHidden")
    isHidden: boolean = false;

    @JsonProperty("UniqueName")
    uniqueName?: string;

    @JsonProperty("Caption")
    caption?: string;

    @JsonProperty("DisplayFolder")
    displayFolder?: string;

    @JsonProperty("MeasureGroupName")
    measureGroupName?: string;

    @JsonProperty("UserCaption")
    userCaption?: string;

    @JsonProperty("IsCalculated")
    isCalculated: boolean = false;

    @JsonProperty("Expression")
    expression?: string;

    @JsonProperty("Formatting")
    formatting?: FormattingBase;

    @JsonProperty("ConditionalFormatting", { type: ConditionalFormatting })
    conditionalFormatting?: ConditionalFormatting;

    @JsonProperty("Description")
    description?: string;

    @JsonProperty("Sorting")
    sorting: SortingType = SortingType.None;
}