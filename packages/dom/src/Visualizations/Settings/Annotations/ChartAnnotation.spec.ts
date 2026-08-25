import { describe, expect, it } from 'vitest';
import {
  AreaChartVisualizationSettings,
  AssetVisualizationSettings,
  BarChartVisualizationSettings,
  BubbleVisualizationSettings,
  BulletGraphVisualizationSettings,
  CandleStickVisualizationSettings,
  CategoryChartVisualizationSettings,
  ChartAnnotationType,
  ChartCategoryAnnotation,
  ChartCategoryRangeAnnotation,
  ChartDataPointAnnotation,
  ChoroplethVisualizationSettings,
  CircularGaugeVisualizationSettings,
  ColumnChartVisualizationSettings,
  ComboChartVisualizationSettings,
  CustomVisualizationSettings,
  DoughnutChartVisualizationSettings,
  FunnelChartVisualizationSettings,
  GaugeVisualizationSettings,
  GridVisualizationSettings,
  JsonConvert,
  KpiTargetVisualizationSettings,
  KpiTimeVisualizationSettings,
  LinearGaugeVisualizationSettings,
  LineChartVisualizationSettings,
  OHLCVisualizationSettings,
  PieChartVisualizationSettings,
  RadialVisualizationSettings,
  PivotVisualizationSettings,
  ScatterVisualizationSettings,
  ScatterMapVisualizationSettings,
  SparklineVisualizationSettings,
  SingleRowVisualizationSettings,
  SplineAreaChartVisualizationSettings,
  SplineChartVisualizationSettings,
  StackedAreaChartVisualizationSettings,
  StackedBarChartVisualizationSettings,
  StackedColumnChartVisualizationSettings,
  StepAreaChartVisualizationSettings,
  StepLineChartVisualizationSettings,
  TimeSeriesVisualizationSettings,
  TextBoxVisualizationSettings,
  TextVisualizationSettings,
  TreeMapVisualizationSettings,
} from '../../../index';

const annotationDefaults = (annotationType: ChartAnnotationType) => ({
  _type: 'ChartAnnotationType',
  AnnotationType: annotationType,
  TargetSeriesIndex: 0,
  XValue: 0,
  YValue: 0,
  StartValue: 0,
  EndValue: 0,
});

describe('Chart annotations', () => {
  it('uses the RDASH annotation enum values', () => {
    expect(ChartAnnotationType).toEqual({
      DataPoint: 'Point',
      Category: 'Slice',
      CategoryRange: 'Strip',
    });
  });

  it('uses the translated API defaults', () => {
    const settings = new LineChartVisualizationSettings();
    const point = new ChartDataPointAnnotation();
    const category = new ChartCategoryAnnotation();
    const range = new ChartCategoryRangeAnnotation();

    expect(settings.annotations).toEqual([]);

    expect(point.type).toBe(ChartAnnotationType.DataPoint);
    expect(point.seriesIndex).toBe(0);
    expect(point.seriesField).toBeUndefined();
    expect(point.categoryValue).toBe(0);
    expect(point.value).toBe(0);

    expect(category.type).toBe(ChartAnnotationType.Category);
    expect(category.categoryValue).toBe(0);

    expect(range.type).toBe(ChartAnnotationType.CategoryRange);
    expect(range.startValue).toBe(0);
    expect(range.endValue).toBe(0);

    expect(JSON.parse(JsonConvert.serialize(point))).toEqual(
      annotationDefaults(ChartAnnotationType.DataPoint)
    );
    expect(JSON.parse(JsonConvert.serialize(category))).toEqual(
      annotationDefaults(ChartAnnotationType.Category)
    );
    expect(JSON.parse(JsonConvert.serialize(range))).toEqual(
      annotationDefaults(ChartAnnotationType.CategoryRange)
    );
    expect(JSON.parse(JsonConvert.serialize(settings)).Annotations).toEqual([]);
  });

  it('serializes a data-point annotation to the exact RDASH shape', () => {
    const annotation = new ChartDataPointAnnotation(7.25, 1588598);
    annotation.id = 'd1545d80-7012-4fe2-500a-67734c7174af';
    annotation.title = 'Large transaction';
    annotation.description = 'Review this value';
    annotation.seriesIndex = 2;
    annotation.seriesField = 'Sum of amount';
    annotation.markerColor = '#8961a9';

    expect(JSON.parse(JsonConvert.serialize(annotation))).toEqual({
      _type: 'ChartAnnotationType',
      Identifier: 'd1545d80-7012-4fe2-500a-67734c7174af',
      AnnotationType: 'Point',
      Title: 'Large transaction',
      Description: 'Review this value',
      TargetSeriesIndex: 2,
      TargetSeriesField: 'Sum of amount',
      XValue: 7.25,
      YValue: 1588598,
      StartValue: 0,
      EndValue: 0,
      MarkerColor: '#8961a9',
    });
  });

  it('serializes a category annotation to the exact RDASH shape', () => {
    const annotation = new ChartCategoryAnnotation(9);
    annotation.id = 'category-id';
    annotation.title = 'Launch';
    annotation.description = 'Product launch';

    expect(JSON.parse(JsonConvert.serialize(annotation))).toEqual({
      _type: 'ChartAnnotationType',
      Identifier: 'category-id',
      AnnotationType: 'Slice',
      Title: 'Launch',
      Description: 'Product launch',
      TargetSeriesIndex: 0,
      XValue: 9,
      YValue: 0,
      StartValue: 0,
      EndValue: 0,
    });
  });

  it('serializes a category-range annotation to the exact RDASH shape', () => {
    const annotation = new ChartCategoryRangeAnnotation(9, 15);
    annotation.id = 'range-id';
    annotation.title = 'Campaign';
    annotation.description = 'Campaign period';
    annotation.markerColor = '#e051a9';

    expect(JSON.parse(JsonConvert.serialize(annotation))).toEqual({
      _type: 'ChartAnnotationType',
      Identifier: 'range-id',
      AnnotationType: 'Strip',
      Title: 'Campaign',
      Description: 'Campaign period',
      TargetSeriesIndex: 0,
      XValue: 0,
      YValue: 0,
      StartValue: 9,
      EndValue: 15,
      MarkerColor: '#e051a9',
    });
  });

  it('deserializes every annotation type to its public DOM class and round-trips it', () => {
    const annotationsJson = [
      {
        _type: 'ChartAnnotationType',
        Identifier: 'point-id',
        AnnotationType: 'Point',
        Title: 'Point',
        Description: 'Point description',
        TargetSeriesIndex: 3,
        TargetSeriesField: 'Revenue',
        XValue: 2,
        YValue: 125,
        StartValue: 0,
        EndValue: 0,
        MarkerColor: '#123456',
      },
      {
        _type: 'ChartAnnotationType',
        Identifier: 'category-id',
        AnnotationType: 'Slice',
        Title: 'Category',
        Description: 'Category description',
        TargetSeriesIndex: 0,
        XValue: 4,
        YValue: 0,
        StartValue: 0,
        EndValue: 0,
      },
      {
        _type: 'ChartAnnotationType',
        Identifier: 'range-id',
        AnnotationType: 'Strip',
        Title: 'Range',
        Description: 'Range description',
        TargetSeriesIndex: 0,
        XValue: 0,
        YValue: 0,
        StartValue: 5,
        EndValue: 8,
        MarkerColor: '#abcdef',
      },
    ];

    const settings = JsonConvert.deserialize(
      JSON.stringify({ Annotations: annotationsJson }),
      LineChartVisualizationSettings
    );

    expect(settings.annotations[0]).toBeInstanceOf(ChartDataPointAnnotation);
    expect(settings.annotations[1]).toBeInstanceOf(ChartCategoryAnnotation);
    expect(settings.annotations[2]).toBeInstanceOf(
      ChartCategoryRangeAnnotation
    );

    const point = settings.annotations[0] as ChartDataPointAnnotation;
    expect(point.type).toBe(ChartAnnotationType.DataPoint);
    expect(point.id).toBe('point-id');
    expect(point.seriesIndex).toBe(3);
    expect(point.seriesField).toBe('Revenue');
    expect(point.categoryValue).toBe(2);
    expect(point.value).toBe(125);
    expect(point.markerColor).toBe('#123456');

    const category = settings.annotations[1] as ChartCategoryAnnotation;
    expect(category.type).toBe(ChartAnnotationType.Category);
    expect(category.categoryValue).toBe(4);

    const range = settings.annotations[2] as ChartCategoryRangeAnnotation;
    expect(range.type).toBe(ChartAnnotationType.CategoryRange);
    expect(range.startValue).toBe(5);
    expect(range.endValue).toBe(8);

    const roundTrip = JSON.parse(JsonConvert.serialize(settings));
    expect(roundTrip.Annotations).toEqual(annotationsJson);
  });

  it('defaults missing or unknown annotation types to a data-point annotation', () => {
    const settings = JsonConvert.deserialize(
      JSON.stringify({
        Annotations: [
          { _type: 'ChartAnnotationType' },
          { _type: 'ChartAnnotationType', AnnotationType: 'Unknown' },
        ],
      }),
      LineChartVisualizationSettings
    );

    expect(settings.annotations[0]).toBeInstanceOf(ChartDataPointAnnotation);
    expect(settings.annotations[0].type).toBe(ChartAnnotationType.DataPoint);
    expect(settings.annotations[1]).toBeInstanceOf(ChartDataPointAnnotation);
    expect(settings.annotations[1].type).toBe(ChartAnnotationType.DataPoint);
  });
});

describe('Chart annotation availability', () => {
  const supportedSettings: [
    string,
    new () => CategoryChartVisualizationSettings
  ][] = [
    ['area', AreaChartVisualizationSettings],
    ['bar', BarChartVisualizationSettings],
    ['column', ColumnChartVisualizationSettings],
    ['line', LineChartVisualizationSettings],
    ['spline area', SplineAreaChartVisualizationSettings],
    ['spline', SplineChartVisualizationSettings],
    ['step area', StepAreaChartVisualizationSettings],
    ['step line', StepLineChartVisualizationSettings],
    ['time series', TimeSeriesVisualizationSettings],
  ];

  it.each(supportedSettings)(
    'is available on %s charts',
    (_name, SettingsType) => {
      const settings = new SettingsType();
      settings.annotations.push(new ChartCategoryAnnotation(1));

      expect(settings.annotations).toHaveLength(1);
      expect(JSON.parse(JsonConvert.serialize(settings)).Annotations).toEqual([
        {
          ...annotationDefaults(ChartAnnotationType.Category),
          XValue: 1,
        },
      ]);
    }
  );

  const unsupportedSettings: [string, new () => object][] = [
    ['asset', AssetVisualizationSettings],
    ['bullet graph', BulletGraphVisualizationSettings],
    ['choropleth', ChoroplethVisualizationSettings],
    ['circular gauge', CircularGaugeVisualizationSettings],
    ['custom', CustomVisualizationSettings],
    ['gauge', GaugeVisualizationSettings],
    ['KPI target', KpiTargetVisualizationSettings],
    ['KPI time', KpiTimeVisualizationSettings],
    ['linear gauge', LinearGaugeVisualizationSettings],
    ['pivot', PivotVisualizationSettings],
    ['scatter map', ScatterMapVisualizationSettings],
    ['single row', SingleRowVisualizationSettings],
    ['text box', TextBoxVisualizationSettings],
    ['text', TextVisualizationSettings],
    ['stacked area', StackedAreaChartVisualizationSettings],
    ['stacked bar', StackedBarChartVisualizationSettings],
    ['stacked column', StackedColumnChartVisualizationSettings],
    ['bubble', BubbleVisualizationSettings],
    ['candlestick', CandleStickVisualizationSettings],
    ['combo', ComboChartVisualizationSettings],
    ['doughnut', DoughnutChartVisualizationSettings],
    ['funnel', FunnelChartVisualizationSettings],
    ['OHLC', OHLCVisualizationSettings],
    ['pie', PieChartVisualizationSettings],
    ['radial', RadialVisualizationSettings],
    ['scatter', ScatterVisualizationSettings],
    ['grid', GridVisualizationSettings],
    ['sparkline', SparklineVisualizationSettings],
    ['tree map', TreeMapVisualizationSettings],
  ];

  it.each(unsupportedSettings)(
    'is absent from %s settings',
    (_name, SettingsType) => {
      const settings = new SettingsType();

      expect(settings).not.toHaveProperty('annotations');
      expect(JSON.parse(JsonConvert.serialize(settings))).not.toHaveProperty(
        'Annotations'
      );
    }
  );
});
