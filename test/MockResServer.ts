import timeout from "timeout-as-promise";
export default class MockResServer {
    loadTime: number;
    data: { [key: string]: any } = {};

    constructor(loadTime: number) {
        this.loadTime = loadTime;
    }

    async load(key: string): Promise<any> {
        await timeout(this.loadTime);
        return this.data[key];
    }
}
