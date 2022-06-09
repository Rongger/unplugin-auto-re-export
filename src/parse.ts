/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Exports } from "./types";
import { Parser } from "acorn";
import path from "path";
import fs from "fs";

export function parseExport(filePath: string): Exports {
  const ast: any = generateAST(filePath);

  const namedExports: string[] = [];
  let defaultExport;

  if (ast.type === "Program") {
    ast.body.forEach((node: any) => {
      const declarations = node.declarations || [node.declaration];

      switch (node.type) {
        case "ExportNamedDeclaration":
          declarations.forEach((namedNode: any) => {
            if (namedNode === null) console.log(node);

            if (namedNode.type === "FunctionDeclaration") {
              // if (!namedNode.id) return;

              namedExports.push(namedNode.id.name);
            } else if (namedNode.type === "VariableDeclaration") {
              namedNode.declarations.forEach((varNode: any) => {
                namedExports.push(varNode.id.name);
              });
            }
          });
          break;
        case "ExportDefaultDeclaration":
          if (!node.declaration.id) return;

          defaultExport = node.declaration.id.name;
          break;

        default:
          break;
      }
    });
  }

  return {
    default: defaultExport,
    nameds: namedExports,
  };
}

export function generateRaw(
  exports: Exports,
  dirPath: string,
  filePath: string
) {
  const exportList = (
    exports.default ? [`default as ${exports.default}`] : []
  ).concat(exports.nameds);

  if (exportList.length === 0) return "";

  const relativePath = getRelativePath(dirPath, filePath);
  return `export { ${exportList.join(", ")} } from "${relativePath}"`;
}

export function generateAST(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const ast: any = Parser.parse(content, {
    ecmaVersion: "latest",
    sourceType: "module",
  });
  return ast;
}

function getRelativePath(dirPath: string, filePath: string) {
  const { dir, name } = path.parse(filePath);

  return "./" + path.join(path.relative(dirPath, dir), name);
}
