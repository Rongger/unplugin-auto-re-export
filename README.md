# unplugin-auto-re-export

[![NPM version](https://img.shields.io/badge/npm-v0.0.1-orange)](https://www.npmjs.com/package/unplugin-auto-re-export)

Unified utils for auto generate re-export file.

###### feature

- Supports Vite, Webpack, Rollup, esbuild and more, powered by <a href="https://github.com/unjs/unplugin">unplugin</a>.
- Auto generate re-export file and modify when watched files change.

## Install

```bash
# npm
npm i -D unplugin-auto-re-export

# yarn
yarn add -D unplugin-auto-re-export

# pnpm
pnpm add -D unplugin-auto-re-export
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

## Options

| Key        | Type                 | Default    | Description                                   |
| ---------- | -------------------- | ---------- | --------------------------------------------- |
| dir        | `string \| string[]` | `[]`       | An array of watched directory path            |
| ignore     | `string[]`           | `[]`       | An array of file path to exclude watched file |
| outputFile | `string`             | `index.js` | Define the outputfile name and extension name |
