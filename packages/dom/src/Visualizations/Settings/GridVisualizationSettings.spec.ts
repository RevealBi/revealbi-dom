import { describe, expect, it } from "vitest";
import {
    Alignment,
    GridColumnGrouping,
    GridColumnHyperlink,
    GridColumnPinPosition,
    GridColumnSettings,
    GridColumnSort,
    GridVisualizationSettings,
    JsonConvert,
    PivotVisualizationSettings,
    SortingType,
    SparklineVisualizationSettings,
    UrlLink,
    UrlLinkTarget
} from "../../index";

describe("GridVisualizationSettings column settings", () => {
    it("serializes column appearance and URL hyperlink settings", () => {
        const settings = new GridVisualizationSettings();
        const column = new GridColumnSettings("Website");
        column.width = 240;
        column.textAlignment = Alignment.Left;
        column.pinPosition = GridColumnPinPosition.Left;
        column.hyperlink = new GridColumnHyperlink(
            new UrlLink("Open website", "https://example.com", UrlLinkTarget.SameTab),
            "Visit website"
        );
        settings.columnSettings.push(column);

        const json = JSON.parse(JsonConvert.serialize(settings));

        expect(json.VisualizationColumns).toEqual([
            {
                ColumnName: "Website",
                Width: 240,
                TextAlignment: "Left",
                Pinning: "Left",
                Hyperlink: {
                    Action: {
                        Title: "Open website",
                        Type: "OpenUrl",
                        Url: "https://example.com",
                        Target: "Self"
                    },
                    DisplayTextTemplate: "Visit website"
                }
            }
        ]);
    });

    it("deserializes URL hyperlinks into the public DOM types", () => {
        const settings = JsonConvert.deserialize(JSON.stringify({
            VisualizationColumns: [
                {
                    ColumnName: "Website",
                    Width: 180,
                    TextAlignment: "Center",
                    Pinning: "Right",
                    Hyperlink: {
                        Action: {
                            Type: "OpenUrl",
                            Title: "Details",
                            Url: "https://example.com/details",
                            Target: "Blank"
                        },
                        DisplayTextTemplate: "View details"
                    }
                }
            ]
        }), GridVisualizationSettings);

        const column = settings.columnSettings[0];
        expect(column).toBeInstanceOf(GridColumnSettings);
        expect(column.pinPosition).toBe(GridColumnPinPosition.Right);
        expect(column.hyperlink).toBeInstanceOf(GridColumnHyperlink);
        expect(column.hyperlink?.displayTextTemplate).toBe("View details");
        expect(column.hyperlink?.link).toBeInstanceOf(UrlLink);

        const link = column.hyperlink?.link as UrlLink;
        expect(link.url).toBe("https://example.com/details");
        expect(link.target).toBe(UrlLinkTarget.NewTab);
    });

    it("deserializes column settings containing only format properties", () => {
        const settings = JsonConvert.deserialize(JSON.stringify({
            VisualizationColumns: [
                {
                    ColumnName: "Amount",
                    Width: 120,
                    TextAlignment: "Right"
                }
            ]
        }), GridVisualizationSettings);

        const column = settings.columnSettings[0];
        expect(column).toBeInstanceOf(GridColumnSettings);
        expect(column.columnName).toBe("Amount");
        expect(column.width).toBe(120);
        expect(column.textAlignment).toBe(Alignment.Right);
        expect(column.pinPosition).toBe(GridColumnPinPosition.Inherit);
    });

    it("uses empty column collections by default", () => {
        const settings = new GridVisualizationSettings();

        expect(settings.columnSettings).toEqual([]);
        expect(settings.groupedColumns).toEqual([]);
        expect(settings.sortedColumns).toEqual([]);

        const json = JSON.parse(JsonConvert.serialize(settings));
        expect(json.VisualizationColumns).toEqual([]);
        expect(json.GroupedColumns).toEqual([]);
        expect(json.SortedColumns).toEqual([]);
    });

    it("serializes grouped columns in grouping priority order", () => {
        const settings = new GridVisualizationSettings();
        settings.groupedColumns.push(
            new GridColumnGrouping("Country"),
            new GridColumnGrouping("State", SortingType.Desc)
        );

        const json = JSON.parse(JsonConvert.serialize(settings));

        expect(json.GroupedColumns).toEqual([
            {
                ColumnName: "Country",
                SortDirection: "Asc"
            },
            {
                ColumnName: "State",
                SortDirection: "Desc"
            }
        ]);
    });

    it("deserializes grouped columns into the public DOM type", () => {
        const settings = JsonConvert.deserialize(JSON.stringify({
            GroupedColumns: [
                {
                    ColumnName: "Region",
                    SortDirection: "Desc"
                }
            ]
        }), GridVisualizationSettings);

        expect(settings.groupedColumns).toHaveLength(1);
        expect(settings.groupedColumns[0]).toBeInstanceOf(GridColumnGrouping);
        expect(settings.groupedColumns[0].columnName).toBe("Region");
        expect(settings.groupedColumns[0].sortDirection).toBe(SortingType.Desc);
    });

    it("serializes sorted columns independently in sorting priority order", () => {
        const settings = new GridVisualizationSettings();
        settings.groupedColumns.push(new GridColumnGrouping("Country"));
        settings.sortedColumns.push(
            new GridColumnSort("Revenue", SortingType.Desc),
            new GridColumnSort("Date")
        );

        const json = JSON.parse(JsonConvert.serialize(settings));

        expect(json.GroupedColumns).toEqual([
            {
                ColumnName: "Country",
                SortDirection: "Asc"
            }
        ]);
        expect(json.SortedColumns).toEqual([
            {
                ColumnName: "Revenue",
                SortDirection: "Desc"
            },
            {
                ColumnName: "Date",
                SortDirection: "Asc"
            }
        ]);
    });

    it("deserializes sorted columns into the public DOM type", () => {
        const settings = JsonConvert.deserialize(JSON.stringify({
            SortedColumns: [
                {
                    ColumnName: "OrderDate",
                    SortDirection: "Desc"
                }
            ]
        }), GridVisualizationSettings);

        expect(settings.sortedColumns).toHaveLength(1);
        expect(settings.sortedColumns[0]).toBeInstanceOf(GridColumnSort);
        expect(settings.sortedColumns[0].columnName).toBe("OrderDate");
        expect(settings.sortedColumns[0].sortDirection).toBe(SortingType.Desc);
    });

    it("does not expose grid-only column collections on pivot or sparkline settings", () => {
        const pivotJson = JSON.parse(JsonConvert.serialize(new PivotVisualizationSettings()));
        const sparklineJson = JSON.parse(JsonConvert.serialize(new SparklineVisualizationSettings()));

        expect(pivotJson).not.toHaveProperty("GroupedColumns");
        expect(pivotJson).not.toHaveProperty("SortedColumns");
        expect(sparklineJson).not.toHaveProperty("GroupedColumns");
        expect(sparklineJson).not.toHaveProperty("SortedColumns");
    });
});
