import { ChartAnnotationType } from '../../../Visualizations/Enums/ChartAnnotationType';
import { ChartCategoryAnnotation } from '../../../Visualizations/Settings/Annotations/ChartCategoryAnnotation';
import { ChartCategoryRangeAnnotation } from '../../../Visualizations/Settings/Annotations/ChartCategoryRangeAnnotation';
import { ChartDataPointAnnotation } from '../../../Visualizations/Settings/Annotations/ChartDataPointAnnotation';

export function chartAnnotationConverter(json: Record<string, unknown>) {
  switch (json['AnnotationType']) {
    case ChartAnnotationType.Category:
      return ChartCategoryAnnotation;
    case ChartAnnotationType.CategoryRange:
      return ChartCategoryRangeAnnotation;
    case ChartAnnotationType.DataPoint:
    default:
      return ChartDataPointAnnotation;
  }
}
