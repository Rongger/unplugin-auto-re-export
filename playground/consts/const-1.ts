const e = 5;
const f = 6;

export function foo(path: string): number {
  return path.length;
}
export const a = 1;
export class ClassName {}

export type Type = string;
export interface Foo {
  a: number;
  call: (arg: string[]) => void;
}
export { e as g, f };
