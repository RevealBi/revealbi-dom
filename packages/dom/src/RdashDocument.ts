import { GlobalConstants } from "./Core/Constants/GlobalConstants";
import { dashboardFilterConverter } from "./Core/Serialization/Converters/DashboardFilterConverter";
import { visualizationConverter } from "./Core/Serialization/Converters/VisualizationConverter";
import { JsonProperty } from "./Core/Serialization/Decorators/JsonProperty";
import { RdashSerializer } from "./Core/Serialization/RdashSerializer";
import { RvDashboardLoader } from "./Core/Utilities";
import { RdashDocumentImporter } from "./Core/Utilities/RdashDocumentImporter";
import { DataSource } from "./Data/DataSource";
import { Theme } from "./Enums";
import { DashboardFilter } from "./Filters/DashboardFilter";
import { ImportOptions } from "./Primitives/Interfaces";
import { IVisualization } from "./Visualizations/Interfaces/IVisualization";

/**
 * Represents a Reveal .rdash file.
 */
export class RdashDocument {
    /**
     * Creates a new instance of an `RdashDocument`.
     */
    constructor()
    constructor(title: string)
    constructor(title?: string) {
        this.title = title || "New Dashboard";
    }

    /**
     * Gets or sets the title of the dashboard.
     */
    @JsonProperty("Title")
    title: string;

    /**
     * Gets or sets the description of the dashboard.
     */
    @JsonProperty("Description")
    description?: string;

    /**
     * Gets or sets the name of the theme the dashboard will apply to all visualizations.
     */
    @JsonProperty("ThemeName")
    theme: Theme = Theme.Mountain;

    /**
     * Gets the name of the API that created the .rdash file.
     */
    @JsonProperty("CreatedWith")
    readonly createdWith: string = GlobalConstants.createdWith;

    /**
     * Gets or sets the name of the API that last saved the .rdash file.
     */
    @JsonProperty("SavedWith")
    savedWith?: string;

    @JsonProperty("FormatVersion")
    formatVersion: number = 6;

    /**
     * Gets or sets whether the viewer displaying the dashboard will automatically layout visualizations, or use an absolute layout controlled by each visualization's ColumnSpan and RowSpan properties. True by default.
     */
    @JsonProperty("UseAutoLayout")
    useAutoLayout: boolean = true;

    /**
     * Gets or sets the tags associated with the dashboard.
     */
    @JsonProperty("Tags")
    tags?: string;

    /**
     * Gets or sets the collection of data sources available for creating visualizations.
     */
    @JsonProperty("DataSources", { type: DataSource })
    dataSources: DataSource[] = [];

    /**
     * Gets or sets the collection of dashboard filters that can bound to any visualization using the visualization's FilterBindings property.
     */
    @JsonProperty("GlobalFilters", { converter: dashboardFilterConverter })
    filters: DashboardFilter[] = [];

    /**
     * Gets or sets the collection of visualizations that are displayed in the dashboard.
     */
    @JsonProperty("Widgets", { converter: visualizationConverter })
    visualizations: IVisualization[] = [];

    /***
     * Creates a new instance of an `RdashDocument` from an existing Reveal dashboard.
     * @param dashboard The dashboard ID or name used to load the dashboard from the Reveal SDK server.
     * @returns A promise that resolves to the loaded `RdashDocument`.
     * @throws An error if the dashboard cannot be loaded.
     */
    static async load(dashboard: string): Promise<RdashDocument>
    /**
     * Creates a new instance of an `RdashDocument` from an existing Reveal dashboard.
     * @param dashboard The Blob representation of the Reveal dashboard.
     * @returns A promise that resolves to the loaded `RdashDocument`.
     * @throws An error if the dashboard cannot be loaded.
     */
    static async load(dashboard: Blob): Promise<RdashDocument>
    /**
     * Creates a new instance of an `RdashDocument` from an existing Reveal dashboard.
     * @param dashboard The `RVDashboard` object instance.
     * @returns A promise that resolves to the loaded `RdashDocument`.
     * @throws An error if the dashboard cannot be loaded.
     */
    static async load(dashboard: unknown): Promise<RdashDocument>
    static async load(dashboard: string | Blob | unknown): Promise<RdashDocument> {
        if (!dashboard) {
            throw new Error("dashboard cannot be null or undefined");
        }

        let dashboardJson;

        if (dashboard instanceof Blob) {
            dashboardJson = await RdashSerializer.blobToJson(dashboard);
        } else {
            const loadedDashboard = await RvDashboardLoader.load(dashboard);
            if (!loadedDashboard) {
                throw new Error("Could not load dashboard");
            }
            dashboardJson = loadedDashboard._dashboardModel.__dashboardModel.toJson(); //todo: improve this in SDK
        }

        return RdashSerializer.deserialize(dashboardJson);
    }

    /**
     * Loads an RdashDocument from a binary buffer.
     * This function accepts a binary buffer (ArrayBuffer or Node.js Buffer) that represents an RDASH file.
     * @param buffer - The binary buffer containing the RDASH data.
     * @returns A promise that resolves to an RdashDocument instance.
     * @throws An error if the buffer cannot be processed or deserialized.
     */
    static async loadFromBuffer(buffer: ArrayBuffer | Buffer): Promise<RdashDocument> {
        const dashboardJson = await RdashSerializer.bufferToJson(buffer);
        return RdashSerializer.deserialize(dashboardJson);
    }

    /**
     * Creates a new instance of an `RdashDocument` from a JSON string which represents the contents of the RDASH file.
     * @param json The JSON string representation of the contents of the RDASH file.
     * @returns A new instance of an `RdashDocument`.
     */
    static loadFromJson(json: string): RdashDocument {
        return RdashSerializer.deserialize(json);
    }

    /**
     * Imports visualizations from another `RdashDocument` into this one.
     * @param document The `RdashDocument` to import from.
     * @param visualization The visualization to import. If not specified, all visualizations are imported.
     */
    import(document: RdashDocument, visualization?: string | IVisualization, options?: ImportOptions): void {
        RdashDocumentImporter.import(this, document, visualization, options);
    }

    /**
     * Converts the RdashDocument to a Blob.
     * @returns A Blob representation of the `Rdash` file.
     */
    toBlob(): Blob {
        return RdashSerializer.toBlob(this);
    }

    /**
     * Converts the `RdashDocument` to a JSON string representation of the contents of the RDASH file.
     * @returns A JSON string representation of the contents of the RDASH file.
     */
    toJsonString(): string {
        return RdashSerializer.serialize(this);
    }

    /**
     * Converts the `RdashDocument` to an RVDashboard object.
     * @returns An RVDashboard object.
     */
    toRVDashboard(): Promise<any> {
        return RvDashboardLoader.loadRVDashboardFromJson(this.toJsonString());
    }
}