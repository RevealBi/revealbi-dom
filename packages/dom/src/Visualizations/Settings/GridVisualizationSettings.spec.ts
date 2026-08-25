import { describe, expect, it } from "vitest";
import {
    Alignment,
    GridColumnHyperlink,
    GridColumnPinPosition,
    GridColumnSettings,
    GridVisualizationSettings,
    JsonConvert,
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

    it("uses an empty column settings collection by default", () => {
        const settings = new GridVisualizationSettings();

        expect(settings.columnSettings).toEqual([]);
        expect(JSON.parse(JsonConvert.serialize(settings)).VisualizationColumns).toEqual([]);
    });
});
