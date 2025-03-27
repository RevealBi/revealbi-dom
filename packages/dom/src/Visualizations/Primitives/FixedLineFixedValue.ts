import { SchemaTypeNames } from '../../Core/Constants/SchemaTypeNames';
import { JsonProperty } from '../../Core/Serialization/Decorators/JsonProperty';
import { FixedLineType } from '../Enums';
import { FixedLine } from './FixedLine';

export class FixedLineFixedValue extends FixedLine {
    constructor();
    constructor(value: number);
    constructor(value: number, title: string);
    constructor(value?: number, title: string = 'Fixed Value') {
        super();
        this.schemaTypeName = SchemaTypeNames.FixedLineFixedValueType;
        this.fixedLineType = FixedLineType.FixedValue;

        if (value !== undefined) {
            this.value = value;
            this.title = title;
            this.identifier = `_rp_flfv_${value}`; // hardcoded prefix used in RevealView
        }
    }

    /**
     * Gets or sets the value of the fixed line.
     */
    @JsonProperty('Value')
    value: number = 0.0;
}
