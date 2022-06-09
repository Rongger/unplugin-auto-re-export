type Dir = string | string[];

export interface Options {
  dir: Dir;
  ignore?: string[];
  outputFile?: string;
}

export interface Exports {
  default?: string;
  nameds: string[];
}
