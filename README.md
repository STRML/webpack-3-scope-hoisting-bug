# Webpack 3 Strict 'This' Module Concatenation Bug

When using `module.strictThisContextOnImports` (required to work around [#5135](https://github.com/webpack/webpack/issues/5135) and others),
imported `const`s from other modules are not properly referenced when calling a function on a namespace
referred to by an `import *`.

This bug only seems to manifest under these conditions:

* `module.strictThisContextOnImports: true`,
* A constant must be imported from another file,
* That constant must be used in a function referenced on an `import * from`.

The output:


```js
"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./constants.js
const constants_FOO = 'BAR';

// CONCATENATED MODULE: ./functions.js
function print(str) {
  console.log(str);
}

// CONCATENATED MODULE: ./index.js
function init() {
  console.log(constants_FOO)
  print(FOO);
}
```

Notice that the `print` call is referring to `FOO`, not `constants_FOO`.

If we are using the `CommonsChunkPlugin` or split in such a way that `constants` becomes another module,
the `console.log()` line will properly use the imported constant, but the `print()` will not, e.g.:

```js
console.log(__WEBPACK_IMPORTED_MODULE_10_constants__["f" /* FOO */]);
print(FOO);
```

`FOO` is of course not defined in this instance and this will fail at runtime.


### To Reproduce

```bash
yarn
npm run build
cat index.build.js
```
