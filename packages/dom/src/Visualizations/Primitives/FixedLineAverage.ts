import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { FixedLineType } from "../Enums";
import { FixedLine } from "./FixedLine";

export class FixedLineAverage extends FixedLine {
    constructor(title: string = 'Average') {
      super();
      this.schemaTypeName = SchemaTypeNames.FixedLineAverageType;
      this.fixedLineType = FixedLineType.Average;
      this.identifier = '_rp_fla_'; // hardcoded value used in RevealView
      this.title = title;
    }
  }