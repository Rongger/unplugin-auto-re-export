import { describe, expect, test } from "vitest";
import {
  getOutputFilePaths,
  resolveDir,
  resolveExportAll,
  isExportAll,
} from "../src/utils";
import { options1, options2, options3 } from "./fixtures/options";

describe("index", () => {
  test("getOutputFilePaths", () => {
    expect(getOutputFilePaths("src/consts", "index.js")).toMatchSnapshot();

    expect(
      getOutputFilePaths(["src/consts", "src/utils"], "index.js")
    ).toMatchSnapshot();
  });

  test("resolveDir", () => {
    expect(resolveDir(options1.dir)).toMatchSnapshot();

    expect(resolveDir(options2.dir)).toMatchSnapshot();

    expect(resolveDir(options3.dir)).toMatchSnapshot();
  });

  test("resolveExportAll", () => {
    expect(resolveExportAll(options3)).toMatchSnapshot();
  });

  test("isExportAll", () => {
    const map = resolveExportAll(options3);
    expect(isExportAll(map, "utils")).toMatchSnapshot();
  });
});
