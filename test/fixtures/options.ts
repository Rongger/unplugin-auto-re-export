import { Options } from "./../../src/types";

export const options1: Options = {
  dir: "consts",
  ignore: ["consts/exports.ts"],
  outputFile: "index.ts",
  exportAll: true,
  deep: Infinity,
};

export const options2: Options = {
  dir: ["consts"],
  ignore: ["consts/exports.ts"],
  outputFile: "index.ts",
  exportAll: true,
  deep: Infinity,
};

export const options3: Options = {
  dir: [
    {
      path: "consts",
      exportAll: true,
    },
    {
      path: "utils",
      deep: 2,
    },
  ],
  ignore: ["consts/exports.ts"],
  outputFile: "index.ts",
  exportAll: false,
  deep: Infinity,
};
