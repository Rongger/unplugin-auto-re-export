import { resolveDefaultOptions } from "../../src/utils";
import type { Options } from "./../../src/types";

export const options1: Options = resolveDefaultOptions({
  dir: "consts",
  ignore: ["consts/exports.ts"],
  outputFile: "index.ts",
  exportAll: true,
});

export const options2: Options = resolveDefaultOptions({
  dir: ["consts"],
  ignore: ["consts/exports.ts"],
  outputFile: "index.ts",
  exportAll: true,
});

export const options3: Options = resolveDefaultOptions({
  dir: [
    {
      path: "consts",
      exportAll: true,
    },
    {
      path: "utils",
      deep: 2,
      baseNameMatch: "expr??",
    },
  ],
  ignore: ["consts/exports.ts"],
  outputFile: "index.ts",
  exportAll: false,
});
