import { describe, expect, test } from "vitest";
import { getOutputFilePaths } from "../src/utils";

describe("index", () => {
  test("getOutputFilePaths", async () => {
    expect(getOutputFilePaths("src/consts", "index.js")).toMatchSnapshot();

    expect(
      getOutputFilePaths(["src/consts", "src/utils"], "index.js")
    ).toMatchSnapshot();
  });
});
