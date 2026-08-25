import { ChartAnnotationType } from '../../Enums/ChartAnnotationType';
import { ChartAnnotation } from './ChartAnnotation';

/**
 * An annotation anchored to a range on the category axis.
 */
export class ChartCategoryRangeAnnotation extends ChartAnnotation {
  constructor();
  constructor(startValue: number, endValue: number);
  constructor(startValue = 0, endValue = 0) {
    super(ChartAnnotationType.CategoryRange);
    this.startValue = startValue;
    this.endValue = endValue;
  }

  /**
   * Gets or sets the beginning of the range on the category axis.
   */
  get startValue(): number {
    return this.rangeStartValue;
  }
  set startValue(value: number) {
    this.rangeStartValue = value;
  }

  /**
   * Gets or sets the end of the range on the category axis.
   */
  get endValue(): number {
    return this.rangeEndValue;
  }
  set endValue(value: number) {
    this.rangeEndValue = value;
  }
}
