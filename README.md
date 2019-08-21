# ResLoader
a generic resource loader to load remote resource and cache in local prestige storage


## Install
```sh
npm install -s res-loader
yarn add res-loader
```

## Usage
```ts
import ResLoader from "res-loader";

const config = {
  fetchRemote: key => remoteServer.load(key),
  fetchLocal: key => localStorage.load(key),
  saveLocal: (key, data) => localStorage.save(key, data),
};
const resLoader = new ResLoader<string>(config);

resLoader.load("key")....

```

### ResLoader config

|name|type|description|
|--|--|--|
|fetchRemote|(string) => Promise<DataType>| fetch data from remote server|
|fetchLocal|(string) => Promise<DataType>| fetch data from local storage|
|saveLocal|(string) => Promise<DataType>| store data to local storage|
