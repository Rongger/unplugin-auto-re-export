import path from "path";
import { describe, expect, test } from "vitest";
import { parseExport, generateRaw } from "../src/parse";

describe("parse", () => {
  const dirPath = "playground/consts";

  test("parseExport", async () => {
    expect(
      parseExport(path.join(dirPath, "/const-1.ts"))
    ).toMatchInlineSnapshot(`
      {
        "default": "Def",
        "nameds": [
          "NAME",
          "test",
          "test1",
        ],
      }
    `);
  });

  test("generateRaw", () => {
    expect(
      generateRaw(
        {
          default: "Def",
          nameds: ["NAME", "AGE", "toString"],
        },
        dirPath,
        path.join(dirPath, "/const-1.ts")
      )
    ).toMatchInlineSnapshot(
      '"export { default as Def, NAME, AGE, toString } from \\"./const-1\\""'
    );
  });
});
