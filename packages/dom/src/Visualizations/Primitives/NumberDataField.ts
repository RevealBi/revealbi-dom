import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { NumberFilter } from "../../Filters/NumberFilter";
import { AggregationType } from "../Enums/AggregationType";
import { SortingType } from "../Enums/SortingType";
import { ConditionalFormatting } from "./ConditionalFormatting";
import { DataField } from "./DataField";
import { NumberFormatting } from "./NumberFormatting";

export class NumberDataField extends DataField {

    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string){
        super(fieldName);
        this.schemaTypeName = SchemaTypeNames.SummarizationValueFieldType;
        this.fieldLabel = fieldName;
    }

    @JsonProperty("FieldLabel")
    fieldLabel?: string;

    @JsonProperty("IsHidden")
    isHidden?: boolean = false;

    @JsonProperty("AggregationType")
    aggregationType?: AggregationType = AggregationType.Sum;

    @JsonProperty("Sorting")
    sorting?: SortingType = SortingType.None;

    @JsonProperty("IsCalculated")
    isCalculated?: boolean = false;

    @JsonProperty("Expression")
    expression?: string;

    @JsonProperty("Formatting", { type: NumberFormatting })
    formatting?: NumberFormatting;

    @JsonProperty("ConditionalFormatting", { type: ConditionalFormatting })    
    conditionalFormatting?: ConditionalFormatting;

    @JsonProperty("Filter", { type: NumberFilter }) 
    private filter?: NumberFilter;
}