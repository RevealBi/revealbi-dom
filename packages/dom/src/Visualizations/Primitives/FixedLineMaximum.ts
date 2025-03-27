import { SchemaTypeNames } from '../../Core/Constants/SchemaTypeNames';
import { FixedLineType } from '../Enums';
import { FixedLine } from './FixedLine';

export class FixedLineMaximum extends FixedLine {
  constructor(title: string = 'Maximum') {
    super();
    this.schemaTypeName = SchemaTypeNames.FixedLineHighestType;
    this.fixedLineType = FixedLineType.Highest;
    this.identifier = '_rp_flh_'; // hardcoded value used in RevealView
    this.title = title;
  }
}
