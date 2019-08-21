import MockResServer from "./MockResServer";
import timeout from "timeout-as-promise";

beforeEach(() => jest.useRealTimers());

test("create instance", () => {
    const server: MockResServer = new MockResServer(100);
    expect(server).not.toBeNull();
});

test("load time", async () => {
    const server: MockResServer = new MockResServer(100);
    const spyFn = jest.fn();
    server.load("aa").then(spyFn);
    expect(spyFn).not.toBeCalled();

    await timeout(90);
    expect(spyFn).not.toBeCalled();

    await timeout(10);
    expect(spyFn).toBeCalled();
});

test("savd and load", async () => {
    const server: MockResServer = new MockResServer(100);
    const testKey = "ttt";
    const testVal = "ttt123";

    expect(server.load(testKey)).resolves.toBeNull();

    await server.save(testKey, testVal);
    expect(server.load(testKey)).resolves.toBe(testVal);
});
