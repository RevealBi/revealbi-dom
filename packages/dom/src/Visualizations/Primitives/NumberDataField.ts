import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { NumberFilter } from "../../Filters/NumberFilter";
import { AggregationType } from "../Enums/AggregationType";
import { SortingType } from "../Enums/SortingType";
import { ConditionalFormatting } from "./ConditionalFormatting";
import { DataField } from "./DataField";
import { NumberFormatting } from "./NumberFormatting";

export class NumberDataField extends DataField {
    private _fieldLabel?: string;

    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        super(fieldName);
        this.schemaTypeName = SchemaTypeNames.SummarizationValueFieldType;
        this.fieldLabel = fieldName;
    }

    @JsonProperty("FieldLabel")
    get fieldLabel(): string | undefined {
        return this._fieldLabel;
    }

    set fieldLabel(value: string | undefined) {
        this._fieldLabel = value;
        this.userCaption = value;
    }

    /**
     * The userCaption is used to display a custom label in the UI.
     * However, the FieldLabel is also used to display a custom label in the UI and is generated from the data provides if it exists.
     * To simplify the API, we are using the FieldLabel as the primary label and hiding UserCaption from the public API.
     * We may want to switch to the @internal tag in the future - https://www.typescriptlang.org/tsconfig/#stripInternal
     */
    @JsonProperty("UserCaption")
    private userCaption?: string;

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
    formatting: NumberFormatting = new NumberFormatting();

    @JsonProperty("ConditionalFormatting", { type: ConditionalFormatting })
    conditionalFormatting?: ConditionalFormatting;

    @JsonProperty("Filter", { type: NumberFilter })
    private filter?: NumberFilter;
}