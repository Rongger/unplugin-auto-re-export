import path from "path";
import { describe, expect, test } from "vitest";
import { parseExport, generateRaw } from "../src/parse";

describe("parse", () => {
  const dirPath = "playground/utils";

  test("parseExport", async () => {
    expect(parseExport(path.join(dirPath, "/exports.ts")))
      .toMatchInlineSnapshot(`
        {
          "default": "l",
          "nameds": [
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
        }
      `);
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
    ).toMatchInlineSnapshot(
      '"export { default as l, utilB, a, b, d, ClassName, e, f, g1, h2, bar } from \\"./exports\\""'
    );
  });
});
