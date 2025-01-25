import { RdashDocument } from "../../RdashDocument";
import { JsonConvert } from "./JsonConvert";
import { RdashDocumentValidator } from "../Utilities/RdashDocumentValidator";
import { unzip, zipSync } from "fflate";

export class RdashSerializer {
    static _rdashJsonFileName = "Dashboard.json";

    static deserialize(input: string | Record<string, any>): RdashDocument {
        if (typeof input === "string") {
            return JsonConvert.deserialize(input, RdashDocument);
        }
        else {
            return JsonConvert.deserializeObject(input, RdashDocument);
        }
    }

    static serialize(document: RdashDocument): string {
        RdashDocumentValidator.validate(document);
        return JsonConvert.serialize(document);
    }

    static toBlob(document: RdashDocument): Blob {
        document.savedWith = "Reveal.Sdk.DOM";
        const json = this.serialize(document);
        const uint8Array = new TextEncoder().encode(json);
        const files = {
            [this._rdashJsonFileName]: uint8Array
        };
        const zip = zipSync(files);
        return new Blob([zip], { type: "application/zip" });
    }

    static async blobToJson(blob: Blob): Promise<string> {
        try {
            const arrayBuffer = await blob.arrayBuffer();
            return await this.bufferToJson(arrayBuffer);
        } catch (error: any) {
            throw new Error('Error processing the blob: ' + error.message);
        }
    }

    static async bufferToJson(buffer: ArrayBuffer | Buffer): Promise<string> {
        const array = new Uint8Array(buffer);
        return await this.uint8ArrayToJson(array);
    }

    static async uint8ArrayToJson(array: Uint8Array): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            unzip(array, (err, unzippedData) => {
                if (err) {
                    reject(err);
                    return;
                }

                const dashboardJsonU8 = unzippedData[this._rdashJsonFileName];
                if (!dashboardJsonU8) {
                    reject(new Error(`${this._rdashJsonFileName} not found in the zip file`));
                    return;
                }

                const dashboardJson = new TextDecoder().decode(dashboardJsonU8);
                resolve(dashboardJson);
            });
        });
    }
}