import timeout from "timeout-as-promise";

interface DataStorage {
    [key: string]: any;
}
export default class MockResServer {
    loadTime: number;
    data: DataStorage;

    constructor(loadTime: number, initialData?: DataStorage) {
        this.loadTime = loadTime;
        this.data = initialData || {};
    }

    async load(key: string): Promise<any> {
        await timeout(this.loadTime);
        if (key in this.data) {
            return this.data[key];
        }
        return null;
    }

    async save(key: string, data: any): Promise<void> {
        await timeout(this.loadTime);
        this.data[key] = data;
    }
}
