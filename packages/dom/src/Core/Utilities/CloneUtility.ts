export class CloneUtility {
    static clone<T>(source: T): T {
        if (source === null || typeof source !== 'object') {
            return source;
        }
    
        // Handle Dates
        if (source instanceof Date) {
            return new Date(source.getTime()) as any;
        }
    
        // Handle Arrays
        if (Array.isArray(source)) {
            return source.map(item => this.clone(item)) as any;
        }
    
        // Handle custom objects (classes)
        if (source.constructor && source.constructor !== Object) {
            const cloneObj = new (source.constructor as { new (): T })();
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    (cloneObj as any)[key] = this.clone((source as any)[key]);
                }
            }
            return cloneObj;
        }
    
        // Handle plain objects
        const clonedObj = {} as T;
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                (clonedObj as any)[key] = this.clone((source as any)[key]);
            }
        }
    
        return clonedObj;
    }
}