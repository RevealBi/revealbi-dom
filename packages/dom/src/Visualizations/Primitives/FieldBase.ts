import { filterConverter } from "../../Core/Serialization/Converters/FilterConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { JsonRecord } from "../../Core/Serialization/Interfaces/JsonRecord";
import { DataType } from "../../Enums/DataType";
import { IFilter } from "../../Filters/Interfaces/IFilter";
import { IField } from "../Interfaces/IField";
import { IFieldDataType } from "../Interfaces/IFieldDataType";

export abstract class FieldBase<TFilter extends IFilter> implements IField, IFieldDataType {
    private _fieldLabel?: string;

    constructor(fieldName?: string) {
        this.fieldName = fieldName || "";
        this.fieldLabel = fieldName;
    }

    @JsonProperty("FieldName")
    fieldName: string;

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
    private userCaption?: string; //this property is used by slingshot and is not meant to be used by the DOM directly. It is here for backwards compatibility.

    @JsonProperty("FieldType")
    dataType: DataType = DataType.String; //todo: in .net this is internal. maybe make it a getter only? Do we even need the IFieldDataType interface now?

    @JsonProperty("IsCalculated")
    isCalculated: boolean = false;

    @JsonProperty("Expression")
    expression?: string;

    /**
     * Gets or sets the data filter to apply to the field.
     */
    @JsonProperty("Filter", { converter: filterConverter})
    dataFilter?: TFilter;

    //certain connectors like SalesForce use this - this is generated by Reveal and not currently meant for external use
    @JsonProperty("Properties", { type: JsonRecord })
    private properties?: Record<string, any>;

    //used when joining data from multiple sources
    @JsonProperty("TableAlias")
    private tableAlias?: string;

    //Slingshot seems to use this - maybe when fieldLabel is set we should also set userContext
    @JsonProperty("UserContext")
    private userContext?: string;
}