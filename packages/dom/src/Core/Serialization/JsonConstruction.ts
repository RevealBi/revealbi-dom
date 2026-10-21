// Constructors describe the public API; wire readers use explicitly registered internal factories.
export type JsonConstructor<T = any> = new (...args: any[]) => T;
const factories = new WeakMap<Function, () => unknown>();

export function registerJsonFactory<T>(type: JsonConstructor<T>, factory: () => T): void {
    factories.set(type, factory);
}

export function constructFromJson<T>(type: JsonConstructor<T>): T {
    const factory = factories.get(type);
    return factory ? factory() as T : new type();
}
