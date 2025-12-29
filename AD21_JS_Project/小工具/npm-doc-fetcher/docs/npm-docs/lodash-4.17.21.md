# lodash

## Package Information

- **Name**: lodash
- **Version**: 4.17.21
- **Description**: Lodash modular utilities.
- **Author**: John-David Dalton
- **License**: MIT
- **Homepage**: https://lodash.com/
- **Repository**: git+https://github.com/lodash/lodash.git
- **Keywords**: modules, stdlib, util

## Available Versions

0.1.0, 0.2.0, 0.2.1, 0.2.2, 0.3.0, 0.3.1, 0.3.2, 0.4.0, 0.4.1, 0.4.2, 0.5.0-rc.1, 0.5.0, 0.5.1, 0.5.2, 0.6.0, 0.6.1, 0.7.0, 0.8.0, 0.8.1, 0.8.2

## README

# lodash v4.17.21

The [Lodash](https://lodash.com/) library exported as [Node.js](https://nodejs.org/) modules.

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i --save lodash
```

In Node.js:
```js
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

See the [package source](https://github.com/lodash/lodash/tree/4.17.21-npm) for more details.

**Note:**<br>
Install [n_](https://www.npmjs.com/package/n_) for Lodash use in the Node.js < 6 REPL.

## Support

Tested in Chrome 74-75, Firefox 66-67, IE 11, Edge 18, Safari 11-12, & Node.js 8-12.<br>
Automated [browser](https://saucelabs.com/u/lodash) & [CI](https://travis-ci.org/lodash/lodash/) test runs are available.
