import MockResServer from "./MockResServer";
import ResLoader from "../src";

test("simple load", () => {
    const testKey = "ttt";
    const testVal = "ttt123";

    const remoteServer = new MockResServer(10, { [testKey]: testVal });
    const localServer = new MockResServer(10);
    const loader = new ResLoader<string>({
        fetchRemote: key => remoteServer.load(key),
        fetchLocal: key => localServer.load(key),
        saveLocal: (key, data) => localServer.save(key, data),
    });

    // cold load
    expect(loader.load(testKey)).resolves.toBe(testVal);

    // hot load
    expect(loader.load(testKey)).resolves.toBe(testVal);
});

test("remote storage", async () => {
    const testKey = "ttt";
    const testVal = "ttt123";

    const fetchRemoteSpy = jest.fn();
    const fetchLocalSpy = jest.fn();
    const saveLocalSpy = jest.fn();
    const loadCompleteSpy = jest.fn();

    const remoteServer = new MockResServer(10, { [testKey]: testVal });
    const localServer = new MockResServer(10);
    const loader = new ResLoader<string>({
        fetchRemote: key => {
            fetchRemoteSpy();
            return remoteServer.load(key);
        },
        fetchLocal: key => {
            fetchLocalSpy();
            return localServer.load(key);
        },
        saveLocal: (key, data) => {
            saveLocalSpy();
            return localServer.save(key, data);
        },
    });

    // cold load
    await loader.load(testKey).then(loadCompleteSpy);
    expect(loadCompleteSpy).toBeCalledTimes(1);
    expect(fetchRemoteSpy).toBeCalledTimes(1);
    expect(fetchLocalSpy).toBeCalledTimes(1);
    expect(saveLocalSpy).toBeCalledTimes(1);

    // hot load(cached in memory)
    await loader.load(testKey).then(loadCompleteSpy);
    expect(loadCompleteSpy).toBeCalledTimes(2);
    expect(fetchRemoteSpy).toBeCalledTimes(1);
    expect(fetchLocalSpy).toBeCalledTimes(1);
    expect(saveLocalSpy).toBeCalledTimes(1);
});

// data exists in local storage
test("local storage", async () => {
    const testKey = "ttt";
    const testVal = "ttt123";

    const fetchRemoteSpy = jest.fn();
    const fetchLocalSpy = jest.fn();
    const saveLocalSpy = jest.fn();
    const loadCompleteSpy = jest.fn();

    const remoteServer = new MockResServer(10);
    const localServer = new MockResServer(10, { [testKey]: testVal });
    const loader = new ResLoader<string>({
        fetchRemote: key => {
            fetchRemoteSpy();
            return remoteServer.load(key);
        },
        fetchLocal: key => {
            fetchLocalSpy();
            return localServer.load(key);
        },
        saveLocal: (key, data) => {
            saveLocalSpy();
            return localServer.save(key, data);
        },
    });

    // cold load
    await loader.load(testKey).then(loadCompleteSpy);
    expect(loadCompleteSpy).toBeCalledTimes(1);
    expect(fetchRemoteSpy).not.toBeCalled();
    expect(fetchLocalSpy).toBeCalledTimes(1);
    expect(saveLocalSpy).not.toBeCalled();

    // hot load(cached in memory)
    await loader.load(testKey).then(loadCompleteSpy);
    expect(loadCompleteSpy).toBeCalledTimes(2);
    expect(fetchRemoteSpy).not.toBeCalled();
    expect(fetchLocalSpy).toBeCalledTimes(1);
    expect(saveLocalSpy).not.toBeCalled();
});
