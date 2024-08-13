import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { ColumnBase } from "./ColumnBase";
import { NumberDataField } from "./NumberDataField";
import { XmlaMeasure } from "./XmlaMeasure";

export class MeasureColumn extends ColumnBase
{
    constructor()
    constructor(dataField: NumberDataField)
    constructor(dataField?: NumberDataField) {
        super();
        this.schemaTypeName = SchemaTypeNames.MeasureColumnSpecType;
        this.dataField = dataField;
    }

    /**
     * Gets or sets the <see cref="DataField"/>.
     */
    @JsonProperty("SummarizationField", { type: NumberDataField })
    dataField?: NumberDataField;

    @JsonProperty("XmlaMeasure", { type: XmlaMeasure })
    xmlaMeasure?: XmlaMeasure;
}