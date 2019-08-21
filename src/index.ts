interface ResourceLoaderConfig<DataType> {
    fetchRemote: (string) => Promise<DataType>;
    fetchLocal: (string) => Promise<DataType>;
    saveLocal: (string, DataType) => Promise<any>;
}

export default class ResourceLoader<DataType> {
    config: ResourceLoaderConfig<DataType>;
    actions: { [key: string]: Promise<DataType> } = {};

    constructor(config: ResourceLoaderConfig<DataType>) {
        this.config = config;
    }

    load(key: string): Promise<DataType> {
        if (this.actions[key]) {
            return this.actions[key];
        }
        const action = this._load(key);
        this.actions[key] = action;
        action.catch(() => (this.actions[key] = null));
        return action;
    }

    async _load(key: string): Promise<DataType> {
        const localData: DataType = await this.config.fetchLocal(key);
        if (localData) {
            return localData;
        }

        const remoteData: DataType = await this.config.fetchRemote(key);
        this.config.saveLocal(key, remoteData); // no wait

        return remoteData;
    }
}
