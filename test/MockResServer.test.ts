import MockResServer from "./MockResServer";

beforeEach(() => jest.useRealTimers());

test("create instance", () => {
    const server: MockResServer = new MockResServer(100);
    expect(server).not.toBeNull();
});

test("load time", async () => {
    jest.useFakeTimers();

    const server: MockResServer = new MockResServer(100);
    const spyFn = jest.fn();
    server.load("aa").then(spyFn);
    expect(spyFn).not.toBeCalled();

    jest.advanceTimersByTime(99);
    await Promise.resolve(); // fake timer + promise issue work around
    await Promise.resolve();
    expect(spyFn).not.toBeCalled();

    jest.advanceTimersByTime(1);
    await Promise.resolve();
    await Promise.resolve();
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
