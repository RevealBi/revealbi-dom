import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { FormattingBase } from "./FormattingBase";

export class DateFormatting extends FormattingBase {
    constructor()
    constructor(dateFormat: string)
    constructor(dateFormat?: string) {
        super();
        this.schemaTypeName = SchemaTypeNames.DateFormattingSpecType;
        this.dateFormat = dateFormat;
    }

    /**
     * Gets or sets the date format. For example: dd-MMM-yyyy
     */
    @JsonProperty("DateFormat")
    dateFormat?: string;
}