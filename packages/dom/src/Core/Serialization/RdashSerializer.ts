import { RdashDocument } from "../../RdashDocument";
import { JsonConvert } from "./JsonConvert";
import { RdashDocumentValidator } from "./Utilities/RdashDocumentValidator";
import { unzip, zipSync } from "fflate";

export class RdashSerializer {
    static _rdashJsonFileName = "Dashboard.json";

    static deserialize(input: string | Record<string, any> ): RdashDocument {
        if (typeof input === "string") {
            return JsonConvert.deserialize(input, RdashDocument);
        }
        else {
            return JsonConvert.deserializeObject(input, RdashDocument);
        }
     }

    static serialize(document: RdashDocument) {
        RdashDocumentValidator.validate(document);
        return JsonConvert.serialize(document);
    }

    static toBlob(document: RdashDocument) {
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
            // Convert Blob to ArrayBuffer
            const arrayBuffer = await blob.arrayBuffer();

            // Unzip the buffer
            return new Promise((resolve, reject) => {
                const buffer = new Uint8Array(arrayBuffer);
                unzip(buffer, (err, unzippedData) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    // Extract the contents
                    const dashboardJsonU8 = unzippedData[this._rdashJsonFileName];
                    if (!dashboardJsonU8) {
                        reject(new Error(`${this._rdashJsonFileName} not found in the zip file`));
                        return;
                    }

                    // Convert the extracted content to a JSON string
                    const decoder = new TextDecoder();
                    const dashboardJson = decoder.decode(dashboardJsonU8);
                    resolve(dashboardJson);
                });
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error processing the blob: ' + error.message);
            } else {
                throw new Error('An unknown error occurred process the blob.');
            }
        }
    }
}