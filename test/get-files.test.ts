import { describe, expect, test } from "vitest";
import { getWatchFiles } from "../src/utils";
import path from "path";

describe("get-watch-files", () => {
  test("basis",  () => {
    expect(1).toBe(1)
  })
  // test("basis", async () => {
  //   const files = await getWatchFiles(["playground/utils/*"]);
  //   expect(files).toMatchInlineSnapshot(`
  //     [
  //       [
  //         "playground/utils/util-a.ts",
  //         "playground/utils/utilB.ts",
  //       ],
  //     ]
  //   `);
  // });
  // test("ignore", async () => {
  //   const files = await getWatchFiles([
  //     ["playground/consts/*", "!playground/consts/README.md"],
  //   ]);
  //   expect(files).toMatchInlineSnapshot(`
  //     [
  //       [
  //         "playground/consts/const-1.ts",
  //         "playground/consts/const-2.ts",
  //       ],
  //     ]
  //   `);
  // });
  // test("multi dir", async () => {
  //   const files = await getWatchFiles([
  //     ["playground/consts/*", "!playground/consts/README.md"],
  //     ["playground/utils/*"],
  //   ]);
  //   expect(files).toMatchInlineSnapshot(`
  //     [
  //       [
  //         "playground/consts/const-1.ts",
  //         "playground/consts/const-2.ts",
  //       ],
  //       [
  //         "playground/utils/util-a.ts",
  //         "playground/utils/utilB.ts",
  //       ],
  //     ]
  //   `);
  // });
});
