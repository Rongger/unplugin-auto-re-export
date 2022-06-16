/* eslint-disable prefer-const */
/* eslint-disable no-var */
const e = 5;
const f = 6;
const g = 7;
const h = "h";
const i = {
  j: "j",
  k: "k",
};
const l = "default";

// 导出单个特性
export function utilB(path: string): number {
  return path.length;
}
export const a = 1;
export var b = 2;
export let c = 3,
  d = 4;
export class ClassName {}

// 导出列表
export { e, f };

// 重命名导出
export { g as g1, h as h2 };

// 解构导出并重命名
export const { j, k: bar } = i;

// 默认导出
export default l;
// export default function () {
//   return true;
// }
// export default function n() {
//   return true;
// }
// export default class {}
// export default class m {}
// export { l as default };

// 导出模块合集
// export * from …; // does not set the default export
// export * as name1 from …; // Draft ECMAScript® 2O21
// export { name1, name2, …, nameN } from …;
// export { import1 as name1, import2 as name2, …, nameN } from …;
// export { default } from …;
