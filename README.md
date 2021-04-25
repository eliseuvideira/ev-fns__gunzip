# @ev-fns/gunzip

Async gunzip file

## Install

```sh
yarn add @ev-fns/gunzip
```

## Usage

```js
const { gunzip } = require("@ev-fns/gunzip");

const filename = "./backup_file.gz";

gunzip(filename).then(() => {
  console.log("gunzip finished");
});
```
