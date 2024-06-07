import { dataSpecConverter } from "../Core/Serialization/Converters/DataSpecConverter";
import { settingConverter } from "../Core/Serialization/Converters/SettingsConverter";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataDefinitionBase } from "./DataDefinitions/DataDefinitionBase";
import { VisualizationLinker } from "./Primitives/VisualizationLinker";
import { VisualizationSettings } from "./Settings/VisualizationSettings";
import { VisualizationBase } from "./VisualizationBase";

export abstract class Visualization<TSettings extends VisualizationSettings, TDataDefinition extends DataDefinitionBase> extends VisualizationBase {

    constructor(title?: string) {
        super(title);
    }

    @JsonProperty("ActionsModel")
    linker?: VisualizationLinker;

    @JsonProperty("DataSpec", { converter: dataSpecConverter })
    dataDefinition!: TDataDefinition;

    get filterBindings() {
        return this.dataDefinition?.bindings?.bindings;
    }

    @JsonProperty("VisualizationSettings", { converter: settingConverter })
    settings!: TSettings;
}

