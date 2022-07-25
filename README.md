# unplugin-auto-re-export

[![NPM version](https://img.shields.io/npm/v/unplugin-auto-re-export?color=orange&label=npm)](https://www.npmjs.com/package/unplugin-auto-re-export)

Auto generate re-export file for Vite, Webpack, Rollup and more. Powered by <a href="https://github.com/unjs/unplugin">unplugin</a>.

If you have some files like

```js
// utils/func.js
export function foo() {
  /* ... */
}

// utils/types.js
export const bar = 1;
```

the plugin can generate a file to re-export

```js
// utils/index.js
export { foo } from "./func";
export { bar } from "./types";
```

by options

```js
autoReExportPlugin({
  dir: ["utils"],
});
```

and modify when watched files change.

## Install

```bash
npm i -D unplugin-auto-re-export
```

## Usage

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import autoReExportPlugin from "unplugin-auto-re-export/vite";

export default defineConfig({
  plugins: [
    autoReExportPlugin({
      /* options */
    }),
  ],
});
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-auto-re-export/webpack")({
      /* options */
    }),
  ],
};
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import autoReExportPlugin from "unplugin-auto-re-export/rollup";

export default {
  plugins: [
    autoReExportPlugin({
      /* options */
    }),
  ],
};
```

<br></details>

## Options

| Key        | Type                                 | Default    | Description                                      |
| ---------- | ------------------------------------ | ---------- | ------------------------------------------------ |
| dir        | `string \| string[] \| DirConfig[] ` | `[]`       | An array of watched directory path               |
| ignore     | `string[]`                           | `[]`       | An array of file path to exclude watched file    |
| outputFile | `string`                             | `index.js` | Define the outputfile name and extension name    |
| exportAll  | `boolean`                            | `false`    | Is spread all exports with `export * from "mod"` |
| deep       | `boolean`                            | `false`    | Whether to re-export the directory deeply        |

##### DirConfig

```ts
type DirConfig = {
  path: string;
  exportAll?: boolean;
};
```
