import { SchemaTypeNames } from '../../../Core/Constants/SchemaTypeNames';
import { SchemaType } from '../../../Core/SchemaType';
import { JsonProperty } from '../../../Core/Serialization/Decorators/JsonProperty';
import { ChartAnnotationType } from '../../Enums/ChartAnnotationType';

/**
 * Base class for annotations displayed on category charts.
 */
export abstract class ChartAnnotation extends SchemaType {
  private _annotationType: ChartAnnotationType = ChartAnnotationType.DataPoint;

  protected constructor(
    type: ChartAnnotationType = ChartAnnotationType.DataPoint
  ) {
    super();
    this.schemaTypeName = SchemaTypeNames.ChartAnnotationType;
    this.annotationType = type;
  }

  /**
   * Gets the kind of chart anchor represented by this annotation.
   */
  get type(): ChartAnnotationType {
    return this.annotationType;
  }

  /**
   * Gets or sets the persistent identifier used to update this annotation.
   */
  @JsonProperty('Identifier')
  id?: string;

  @JsonProperty('AnnotationType')
  protected get annotationType(): ChartAnnotationType {
    return this._annotationType;
  }
  protected set annotationType(value: ChartAnnotationType) {
    switch (value) {
      case ChartAnnotationType.Category:
      case ChartAnnotationType.CategoryRange:
      case ChartAnnotationType.DataPoint:
        this._annotationType = value;
        break;
      default:
        this._annotationType = ChartAnnotationType.DataPoint;
        break;
    }
  }

  /**
   * Gets or sets the annotation title.
   */
  @JsonProperty('Title')
  title?: string;

  /**
   * Gets or sets the annotation description.
   */
  @JsonProperty('Description')
  description?: string;

  @JsonProperty('TargetSeriesIndex')
  protected targetSeriesIndex = 0;

  @JsonProperty('TargetSeriesField')
  protected targetSeriesField?: string;

  @JsonProperty('XValue')
  protected xValue = 0;

  @JsonProperty('YValue')
  protected yValue = 0;

  @JsonProperty('StartValue')
  protected rangeStartValue = 0;

  @JsonProperty('EndValue')
  protected rangeEndValue = 0;

  /**
   * Gets or sets the annotation marker color as an RGB hex string.
   * When omitted, no marker is displayed.
   */
  @JsonProperty('MarkerColor')
  markerColor?: string;
}
