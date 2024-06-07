
export interface JsonPropertyOptions {
    type?: new () => any;
    converter?: (json: any) => new () => any;
}
