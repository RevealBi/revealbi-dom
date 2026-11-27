import { describe, expect, it } from "vitest";
import { DataSourceItem, MapZoomRectangle, NumberField, RdashDocument, ScatterMapVisualization, TextField } from "../../index";

function scatterMap(): ScatterMapVisualization {
    const data = new DataSourceItem("Cities");
    data.fields = [new TextField("City"), new NumberField("Lat"), new NumberField("Lon")];
    return new ScatterMapVisualization("Cities", data).setLatitude("Lat").setLongitude("Lon").setLabel("City");
}

function settingsJson(document: RdashDocument): any {
    return JSON.parse(document.toJsonString()).Widgets[0].VisualizationSettings;
}

describe("ScatterMapVisualizationSettings zoom", () => {
    it("leaves the zoom area out when it isn't set, so Reveal shows the whole map", () => {
        const document = new RdashDocument("Maps");
        document.visualizations = [scatterMap()];

        expect(settingsJson(document)).not.toHaveProperty("ZoomRectangle");
    });

    it("keeps a set zoom area through a round trip", () => {
        const map = scatterMap().configureSettings(settings => {
            const zoom = new MapZoomRectangle();
            zoom.longitude = -180;
            zoom.latitude = -60;
            zoom.degreesLongitude = 360;
            zoom.degreesLatitude = 150;
            settings.zoom = zoom;
        });
        const document = new RdashDocument("Maps");
        document.visualizations = [map];
        const expected = { X: -180, Y: -60, Width: 360, Height: 150 };
        expect(settingsJson(document).ZoomRectangle).toEqual(expected);

        const loaded = RdashDocument.loadFromJson(document.toJsonString());

        expect((loaded.visualizations[0] as ScatterMapVisualization).settings.zoom).toBeInstanceOf(MapZoomRectangle);
        expect(settingsJson(loaded).ZoomRectangle).toEqual(expected);
    });

    it("keeps a missing zoom area missing through a round trip", () => {
        const document = new RdashDocument("Maps");
        document.visualizations = [scatterMap()];

        const loaded = RdashDocument.loadFromJson(document.toJsonString());

        expect(settingsJson(loaded)).not.toHaveProperty("ZoomRectangle");
    });
});
