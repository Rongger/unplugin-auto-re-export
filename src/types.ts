import { __FILENAME__ } from "./parse";

type DirConfig = {
  path: string;
  exportAll?: boolean;
};

export type Dir = string | string[] | DirConfig[];

export interface Options {
  dir: Dir;
  ignore: string[];
  outputFile: string;
  exportAll: boolean;
}

export interface Exports {
  default?: string | typeof __FILENAME__;
  nameds: string[];
}

export type ExportAllMap = Map<string, boolean>;
