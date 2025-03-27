import { NumberFormatting } from './NumberFormatting';
import { LineStyle, FixedLineType  } from '../Enums';
import { SchemaType } from '../../Core/SchemaType';
import { JsonProperty } from '../../Core/Serialization/Decorators/JsonProperty';

export abstract class FixedLine extends SchemaType {
    /**
     * Gets or sets the color of the fixed line.
     */
    @JsonProperty('Color')
    color?: number;
  
    /**
     * Gets or sets the formatting of the fixed line.
     */
    @JsonProperty('Formatting', { type: NumberFormatting })
    formatting: NumberFormatting = new NumberFormatting();
  
    /**
     * The identifier of the fixed line. This is only used internally in the RevealView
     * to prevent multiple fixed lines with the same identifier.
     */
    @JsonProperty('Identifier')
    protected identifier?: string;
  
    /**
     * Gets or sets the line style of the fixed line.
     */
    @JsonProperty('LineStyle')
    lineStyle: LineStyle = LineStyle.Solid;
  
    /**
     * The type of the fixed line. This is only used internally in the RevealView
     * to determine the type of the fixed line.
     */
    @JsonProperty('LineType')
    protected fixedLineType: FixedLineType = FixedLineType.None;
  
    /**
     * Gets or sets the thickness of the fixed line.
     */
    @JsonProperty('Thickness')
    thickness: number = 2;
  
    /**
     * Gets or sets the title of the fixed line.
     */
    @JsonProperty('Title')
    title?: string;
  }