import { ChartAnnotationType } from '../../Enums/ChartAnnotationType';
import { ChartAnnotation } from './ChartAnnotation';

/**
 * An annotation anchored to a data point in a chart series.
 */
export class ChartDataPointAnnotation extends ChartAnnotation {
  constructor();
  constructor(categoryValue: number, value: number);
  constructor(categoryValue = 0, value = 0) {
    super(ChartAnnotationType.DataPoint);
    this.categoryValue = categoryValue;
    this.value = value;
  }

  /**
   * Gets or sets the last-known zero-based index of the target series.
   * The series field is used first when it is available.
   */
  get seriesIndex(): number {
    return this.targetSeriesIndex;
  }
  set seriesIndex(value: number) {
    this.targetSeriesIndex = value;
  }

  /**
   * Gets or sets the data field key that identifies the target series.
   */
  get seriesField(): string | undefined {
    return this.targetSeriesField;
  }
  set seriesField(value: string | undefined) {
    this.targetSeriesField = value;
  }

  /**
   * Gets or sets the point's position on the category axis.
   */
  get categoryValue(): number {
    return this.xValue;
  }
  set categoryValue(value: number) {
    this.xValue = value;
  }

  /**
   * Gets or sets the point's value on the value axis.
   */
  get value(): number {
    return this.yValue;
  }
  set value(value: number) {
    this.yValue = value;
  }
}
