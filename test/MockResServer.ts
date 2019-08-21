import timeout from "timeout-as-promise";
export default class MockResServer {
    loadTime: number;
    constructor(loadTime: number) {
        this.loadTime = loadTime;
    }

    async load(key: number): Promise<number> {
        await timeout(this.loadTime);
        return key * 10;
    }
}
