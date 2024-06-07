import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { TabularColumn } from "../Primitives/TabularColumn";
import { VisualizationDataSpec } from "./VisualizationDataSpec";

export class AssetVisualizationDataSpec extends VisualizationDataSpec
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.AssetVisualizationDataSpecType;
    }

    @JsonProperty("UrlColumn", { type: TabularColumn })
    urlColumn?: TabularColumn;
}