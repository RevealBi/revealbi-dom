import { XmlaDimension, XmlaHierarchyLevel, XmlaHierarchy, XmlaSet } from "../../../Visualizations/Primitives";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";


export function xmlaDimensionElementConverter(json: any) {
    const type = json["_type"];
    switch (type) {
        case SchemaTypeNames.XmlaDimensionType:
            return XmlaDimension;
        case SchemaTypeNames.XmlaHierarchyLevelType:
            return XmlaHierarchyLevel;
        case SchemaTypeNames.XmlaHierarchyType:
            return XmlaHierarchy;
        case SchemaTypeNames.XmlaSetType:
            return XmlaSet;
        default:
            throw new Error(`XmlaDimensionElement not supported: ${type}`); 
    }
}