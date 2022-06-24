export type Type = {
  attr: string;
};

export interface StringValidator {
  isAcceptable(s: string): boolean;
}

export enum Enum {
  a,
  b,
  c,
}

const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

export { ZipCodeValidator as mainValidator };

export declare let T: Type;
