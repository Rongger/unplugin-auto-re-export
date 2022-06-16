import path from "path";
import { describe, expect, test } from "vitest";
import { parseExport, generateRaw } from "../src/parse";

describe("parse", () => {
  const dirPath = path.resolve(__dirname, "./fixtures");

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
        },
        dirPath,
        path.join(dirPath, "/exports.ts")
      )
    ).toMatchSnapshot();
  });
});
