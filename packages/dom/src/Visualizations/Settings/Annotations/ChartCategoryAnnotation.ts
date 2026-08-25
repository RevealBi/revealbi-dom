import { ChartAnnotationType } from '../../Enums/ChartAnnotationType';
import { ChartAnnotation } from './ChartAnnotation';

/**
 * An annotation anchored to a single position on the category axis.
 */
export class ChartCategoryAnnotation extends ChartAnnotation {
  constructor();
  constructor(categoryValue: number);
  constructor(categoryValue = 0) {
    super(ChartAnnotationType.Category);
    this.categoryValue = categoryValue;
  }

  /**
   * Gets or sets the annotation's position on the category axis.
   */
  get categoryValue(): number {
    return this.xValue;
  }
  set categoryValue(value: number) {
    this.xValue = value;
  }
}
