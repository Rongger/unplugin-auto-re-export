import { Options } from "./../../src/types";

export const options1: Options = {
  dir: "consts",
  ignore: ["consts/exports.ts"],
  outputFile: "index.ts",
  exportAll: true,
};

export const options2: Options = {
  dir: ["consts"],
  ignore: ["consts/exports.ts"],
  outputFile: "index.ts",
  exportAll: true,
};

export const options3: Options = {
  dir: [
    {
      path: "consts",
    },
    {
      path: "utils",
      exportAll: true,
    },
  ],
  ignore: ["consts/exports.ts"],
  outputFile: "index.ts",
  exportAll: false,
};
