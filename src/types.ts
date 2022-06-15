import { __FILENAME__ } from "./parse";

export type Dir = string | string[];

export interface Options {
  dir: Dir;
  ignore?: string[];
  outputFile?: string;
}

export interface Exports {
  default?: string | typeof __FILENAME__;
  nameds: string[];
}
