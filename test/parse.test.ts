import path from "path";
import { describe, expect, test } from "vitest";
import { parseExport, generateRaw, generateExportAllRaw } from "../src/parse";

describe("parse", () => {
  const dirPath = path.resolve(__dirname, "./fixtures/consts");

  test("parseExport", async () => {
    expect(parseExport(path.join(dirPath, "/exports.ts"))).toMatchSnapshot();
  });

  test("parseTSExport", async () => {
    expect(parseExport(path.join(dirPath, "/ts-exports.ts"))).toMatchSnapshot();
  });

  test("generateRaw", () => {
    expect(
      generateRaw(
        {
          default: "l",
          nameds: [
            "utilB",
            "a",
            "b",
            "d",
            "ClassName",
            "e",
            "f",
            "g1",
            "h2",
            "bar",
          ],
          defaultType: undefined,
          namedTypes: ["Type"],
        },
        dirPath,
        path.join(dirPath, "/exports.ts")
      )
    ).toMatchSnapshot();
  });

  test("generateExportAllRaw", () => {
    expect(
      generateExportAllRaw(dirPath, path.join(dirPath, "/exports.ts"))
    ).toMatchSnapshot();
  });
});
