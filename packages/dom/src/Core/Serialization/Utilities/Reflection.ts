import 'reflect-metadata';
import { JsonPropertyOptions } from "../Interfaces/JsonPropertyOptions";

const JSON_NAME_KEY = Symbol("jsonName");
const JSON_OPTIONS_KEY = Symbol("jsonOptions");
const KEYS_KEY = Symbol("keys");

export class Reflection {

    static getMetadataKeys(target: any) {
        return Reflect.getMetadata(KEYS_KEY, target) || [];
    }

    static getPropertyKeys(target: any) {
        //return Reflect.getMetadata(JSON_NAME_KEY, target) || [];

        return this.getMetadataKeys(target);
    }

    static getPropertyType(target: any, key: string) {
        return Reflect.getMetadata("design:type", target, key);
    }

    static getJsonPropertyName(target: any, key: string) {
        return Reflect.getMetadata(JSON_NAME_KEY, target, key);
    }

    // static hasJsonPropertyName(target: any, key: string) {
    //     return Reflect.hasMetadata(JSON_NAME_KEY, target, key);
    // }

    static setJsonPropertyName(name: string | undefined, target: any, key: string) {
        // let properties = Reflect.getMetadata(JSON_NAME_KEY, target) || [];
        // properties.push([key, name]);
        // Reflect.defineMetadata(JSON_NAME_KEY, properties, target);

        //store in the keys collection to make it easier to get all keys for an object
        // const keys = Reflect.getMetadata(KEYS_KEY, target) || [];
        // Reflect.defineMetadata(KEYS_KEY, [...keys, key], target);

        Reflect.defineMetadata(JSON_NAME_KEY, name || key, target, key);

        // Adding key to KEYS_KEY metadata for easier retrieval later
        const keys = this.getMetadataKeys(target);
        if (!keys.includes(key)) {
            Reflect.defineMetadata(KEYS_KEY, [...keys, key], target);
        }
    }

    static setJsonPropertyOptions(options: JsonPropertyOptions, target: any, key: string){
        Reflect.defineMetadata(JSON_OPTIONS_KEY , options, target, key);
    }

    static getJsonPropertyOptions(target: any, key: string){
        return Reflect.getMetadata(JSON_OPTIONS_KEY, target, key);
    }
}