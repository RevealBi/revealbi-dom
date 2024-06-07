import 'reflect-metadata';
import { Reflection } from "./Utilities/Reflection";
import { JsonRecord } from "./Interfaces/JsonRecord";
import { PrimitiveArray } from "./Interfaces/PrimitiveArray";
import { JsonPropertyOptions } from './Interfaces/JsonPropertyOptions';

export class JsonConvert {

    static deserialize<T>(json: string, type: new () => T | T): T {
        const object = JSON.parse(json);
        return this.deserializeObject(object, type);
    }

    static deserializeObject<T>(jsonObject: Record<string, any>, type: new () => T | T): T {
        const instance: any = new type();
        const propertyKeys = Reflection.getPropertyKeys(type.prototype);

        for (const key of propertyKeys) {
            const jsonName = Reflection.getJsonPropertyName(instance, key) || key;

            if (jsonObject.hasOwnProperty(jsonName)) {
                const value = jsonObject[jsonName];
                const propertyOptions = Reflection.getJsonPropertyOptions(instance, key);
                let propertyType = propertyOptions && propertyOptions.type ? propertyOptions.type : type;

                if (propertyType === JsonRecord) {
                    instance[key] = this.deserializeJsonRecord(value);
                } else if (propertyType === PrimitiveArray) {
                    instance[key] = this.deserializePrimitiveArray(value);
                } else if (Array.isArray(value)) {
                    instance[key] = this.deserializeArray(value, propertyOptions, propertyType);
                } else if (typeof value === "object") {
                    instance[key] = this.deserializeValue(value, propertyOptions, propertyType);
                } else {
                    instance[key] = value;
                }
            }
        }

        return instance;
    }

    static deserializeJsonRecord(value: any) {
        return Array.isArray(value) ? value.reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {}) : value;
    }

    static deserializePrimitiveArray(value: any) {
        return Array.isArray(value) ? [...value] : value;
    }

    static deserializeArray(value: any, propertyOptions: JsonPropertyOptions, type: new () => any) {
        return value.map((item: any) => {
            if (propertyOptions && propertyOptions.converter) {
                type = propertyOptions.converter(item)
            }
            return this.deserializeObject(item, type)
        });
    }

    static deserializeValue(value: any, propertyOptions: JsonPropertyOptions, type: new () => any) {
        if (propertyOptions && propertyOptions.converter) {
            type = propertyOptions.converter(value)
        }
        return this.deserializeObject(value, type);
    }

    static serialize(value: object) {
        const jsonObject = this.serializeObject(value);
        return JSON.stringify(jsonObject, undefined, 4);
    }

    static serializeObject(instance: any): Record<string, any> {
        const json: Record<string, any> = {};

        // Starting with the instance itself, then move up the prototype chain.
        let currentObject: any = instance;
        while (currentObject && currentObject.constructor.name !== "Object") {
            const propertyKeys = Reflection.getPropertyKeys(currentObject);

            for (const key of propertyKeys) {
                const jsonName = Reflection.getJsonPropertyName(currentObject, key) || key;

                if (json[jsonName] === undefined) { // Avoid overriding if a derived class already set it
                    const value = instance[key];
                    const propertyOptions = Reflection.getJsonPropertyOptions(currentObject, key);

                    if (value !== undefined) {
                        if (Array.isArray(value)) {
                            if (propertyOptions?.type === PrimitiveArray) {
                                json[jsonName] = [...value];
                            } else {
                                json[jsonName] = value.map(item => this.serializeObject(item));
                            }
                        } else if (typeof value === "object" && value !== null) {
                            // Check if it's a Record<string, any> type
                            if (propertyOptions?.type === JsonRecord) {
                                json[jsonName] = { ...value }; // Directly copy the values of the record
                            } else {
                                json[jsonName] = this.serializeObject(value);
                            }
                        } else {
                            json[jsonName] = value;
                        }
                    }
                }
            }

            currentObject = Object.getPrototypeOf(currentObject);
        }

        return json;
    }
}