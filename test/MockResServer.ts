import timeout from "timeout-as-promise";
export default class MockResServer {
    loadTime: number;
    data: { [key: string]: any } = {};

    constructor(loadTime: number) {
        this.loadTime = loadTime;
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
