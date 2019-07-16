# @dvpnt/express-async-patch
[![Build Status](https://travis-ci.org/dvpnt/express-async-patch.svg?branch=master)](https://travis-ci.org/dvpnt/express-async-patch)
[![Coverage Status](https://coveralls.io/repos/github/dvpnt/express-async-patch/badge.svg?branch=master)](https://coveralls.io/github/dvpnt/express-async-patch?branch=master)
[![NPM Version](https://img.shields.io/npm/v/@dvpnt/express-async-patch.svg)](https://www.npmjs.com/package/@dvpnt/express-async-patch)

Simple express monkey patch for async handlers support.

## Installation

    $ npm install @dvpnt/express-async-patch


## Usage
```js
require('@dvpnt/express-async-patch');

const express = require('express');

const app = express();

app.get('/', async () => {
	await Promise.reject(new Error('async error'));
});


app.use((err, req, res, next) => {
	console.log(err.message); // async error

	res.json({error: err.message});
});

```

## License

[The MIT License (MIT)](/LICENSE)