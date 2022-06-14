import { describe, expect, test } from "vitest";
import { getOutputFilePaths } from "../src/utils";

describe("index", () => {
  test("getOutputFilePaths", async () => {
    expect(
      getOutputFilePaths("src/consts")
    ).toMatchInlineSnapshot(`
      [
        "src/consts/index.js",
      ]
    `);

    expect(
      getOutputFilePaths(["src/consts", "src/utils"])
    ).toMatchInlineSnapshot(`
      [
        "src/consts/index.js",
        "src/utils/index.js",
      ]
    `);
  });
});
