import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { IDimensionDataField } from "../Interfaces/IDimensionDataField";
import { AdHocExpandedElement } from "./AdHocExpandedElement";
import { NumberDataField } from "./NumberDataField";

export class SummarizationSpec
{
    @JsonProperty("HideGrandTotalRow")
    hideGrandTotalRow: boolean = false;

    @JsonProperty("HideGrandTotalCol")
    hideGrandTotalCol: boolean = false;

    @JsonProperty("AdHocFields")
    adHocFields?: number;

    @JsonProperty("Rows")
    rows: IDimensionDataField[] = [];

    @JsonProperty("Columns")
    columns: IDimensionDataField[] = [];

    @JsonProperty("Values")
    values: NumberDataField[] = [];

    @JsonProperty("AdHocExpandedElements", { type: AdHocExpandedElement })
    adHocExpandedElements: AdHocExpandedElement[] = [];
}