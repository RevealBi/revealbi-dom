import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DateAggregationType } from "../Enums/DateAggregationType";
import { DateFormatting } from "./DateFormatting";
import { DimensionDataField } from "./DimensionDataField";

export class DateDataField extends DimensionDataField
{
    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string)
    {
        super(fieldName);
        this.schemaTypeName = SchemaTypeNames.SummarizationDateFieldType;
    }

    @JsonProperty("DateAggregationType")
    aggregationType: DateAggregationType = DateAggregationType.Year;

    @JsonProperty("DateFormatting")
    formatting?: DateFormatting;
}