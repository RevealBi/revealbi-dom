import { SchemaTypeNames } from '../../Core/Constants/SchemaTypeNames';
import { FixedLineType } from '../Enums';
import { FixedLine } from './FixedLine';

export class FixedLineMinimum extends FixedLine {
  constructor(title: string = 'Minimum') {
    super();
    this.schemaTypeName = SchemaTypeNames.FixedLineLowestType;
    this.fixedLineType = FixedLineType.Lowest;
    this.identifier = '_rp_fll_'; // hardcoded value used in RevealView
    this.title = title;
  }
}
