/**
 * Identifies what a chart annotation is anchored to.
 */
export enum ChartAnnotationType {
  /** A data point in a chart series. */
  DataPoint = 'Point',

  /** A single position on the category axis. */
  Category = 'Slice',

  /** A range on the category axis. */
  CategoryRange = 'Strip',
}
