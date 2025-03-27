import { SchemaTypeNames } from '../../Core/Constants/SchemaTypeNames';
import { JsonProperty } from '../../Core/Serialization/Decorators/JsonProperty';
import { FixedLineType } from '../Enums';
import { FixedLine } from './FixedLine';
import { MeasureColumn } from './MeasureColumn';
import { NumberDataField } from './NumberDataField';

export class FixedLineData extends FixedLine {

  constructor();
  constructor(fieldName: string);
  constructor(fieldName: string, title: string);
  constructor(field: NumberDataField);
  constructor(field: NumberDataField, title: string);
  constructor(arg1?: string | NumberDataField, arg2?: string) {
    super();
    this.schemaTypeName = SchemaTypeNames.FixedLineDataType;
    this.fixedLineType = FixedLineType.Data;

    if (typeof arg1 === 'string') {
      const field = new NumberDataField(arg1);
      const title = arg2 ?? arg1;
      this.dataField = new MeasureColumn(field);
      this.title = title;
      this.identifier = field.fieldName;
    } else if (arg1 instanceof NumberDataField) {
      const field = arg1;
      const title = arg2 ?? field.fieldName;
      this.dataField = new MeasureColumn(field);
      this.title = title;
      this.identifier = field.fieldName;
    }
  }

  @JsonProperty('DataField', { type: MeasureColumn })
  private dataField!: MeasureColumn;
}
