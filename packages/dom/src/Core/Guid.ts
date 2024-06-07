export class Guid {
    static newGuid() {
        return crypto.randomUUID();
    }
}