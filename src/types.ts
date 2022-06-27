import { __FILENAME__ } from "./parse";

type DirConfig = {
  path: string;
  exportAll?: boolean;
};

export type Dir = string | string[] | DirConfig[];

export interface Options {
  /**
   * An array of watched directory path
   * @default []
   */
  dir: Dir;

  /**
   * An array of file path to exclude watched file
   * @default []
   */
  ignore: string[];

  /**
   * Define the outputfile name and extension name
   * @default index.js
   */
  outputFile: string;

  /**
   * Is spread all exports with `export * from "mod"`
   * @default false
   */
  exportAll: boolean;
}

export interface Exports {
  default?: string | typeof __FILENAME__;
  nameds: string[];
  defaultType?: string | typeof __FILENAME__;
  namedTypes: string[];
}

export type ExportAllMap = Map<string, boolean>;

export type ExportName = {
  name?: string | typeof __FILENAME__;
  type: ExportNameTypes;
};

export enum ExportNameTypes {
  type,
  variable,
}
