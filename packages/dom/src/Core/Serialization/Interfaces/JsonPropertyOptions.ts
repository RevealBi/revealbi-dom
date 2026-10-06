
export interface JsonPropertyOptions {
    type?: new (...args: any[]) => any;
    converter?: (json: any) => new (...args: any[]) => any;
}
