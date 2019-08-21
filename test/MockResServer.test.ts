import MockResServer from "./MockResServer";

test("create instance", () => {
    const server: MockResServer = new MockResServer(100);
    expect(server).not.toBeNull();
});

test("load some data", () => {
    const server: MockResServer = new MockResServer(100);
    expect(server.load(20)).resolves.not.toBe(null);
});

test("load time", async () => {
    jest.useFakeTimers();

    const server: MockResServer = new MockResServer(100);
    const spyFn = jest.fn();
    server.load(20).then(spyFn);
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
