import { __FILENAME__ } from "./parse";

type DirConfig = {
  path: string;
  exportAll?: boolean;
  deep?: number;
  baseNameMatch?: string;
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

  /**
   * Specifies the maximum depth of a read directory relative to the start
   * directory
   * @default Infinity
   */
  deep: number;

  /**
   * The pattern to match basename.
   * - See {@link https://github.com/mrmlnc/fast-glob#pattern-syntax pattern-syntax}
   * @default *
   */
  baseNameMatch: string;
}

export interface Exports {
  default?: string | typeof __FILENAME__;
  nameds: string[];
  defaultType?: string | typeof __FILENAME__;
  namedTypes: string[];
}

export type OptionsMap = Map<
  string,
  Pick<Options, "deep" | "exportAll" | "baseNameMatch">
>;

export type ExportName = {
  name?: string | typeof __FILENAME__;
  type: ExportNameTypes;
};

export enum ExportNameTypes {
  type,
  variable,
}

export type MapValue<T extends Map<unknown, unknown>> = T extends Map<
  unknown,
  infer V
>
  ? V
  : never;
