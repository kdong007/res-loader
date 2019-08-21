# ResourceLoader

a generic resource loader to load remote resource and cache in local prestige storage

## Install

```sh
npm install -s resource-loader
yarn add resource-loader
```

## Usage

```ts
import ResourceLoader from "resource-loader";

const config = {
  fetchRemote: key => remoteServer.load(key),
  fetchLocal: key => localStorage.load(key),
  saveLocal: (key, data) => localStorage.save(key, data),
};
const resLoader = new ResourceLoader<string>(config);

resLoader.load("key")....

```

### ResourceLoader config

| name        | type                          | description                   |
| ----------- | ----------------------------- | ----------------------------- |
| fetchRemote | (string) => Promise<DataType> | fetch data from remote server |
| fetchLocal  | (string) => Promise<DataType> | fetch data from local storage |
| saveLocal   | (string) => Promise<DataType> | store data to local storage   |
