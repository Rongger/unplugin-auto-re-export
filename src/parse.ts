import type { Exports } from "./types";
import * as t from "@babel/types";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import path from "path";
import fs from "fs";
import humps from "humps";
import type { TraverseOptions } from "babel__traverse";
import type { ParseResult } from "@babel/parser";

export const __FILENAME__ = Symbol(`__FILENAME__`);

export function parseExport(filePath: string): Exports {
  const ast = generateAST(filePath);

  return traverseAST(ast);
}

export function generateRaw(
  exports: Exports,
  dirPath: string,
  filePath: string
) {
  const def =
    exports.default === __FILENAME__
      ? humps.camelize(path.parse(filePath).name)
      : exports.default;

  const exportList = (exports.default ? [`default as ${def}`] : []).concat(
    exports.nameds
  );

  if (exportList.length === 0) return "";

  const relativePath = getRelativePath(dirPath, filePath);
  return `export { ${exportList.join(", ")} } from "${relativePath}";`;
}

export function generateAST(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const ast = parse(content, {
    sourceType: "module",
    plugins: ["typescript"],
  });
  return ast;
}

export function traverseAST(ast: ParseResult<t.File>): Exports {
  const namedExports: string[] = [];
  let defaultExport;

  const visitor: TraverseOptions = {
    ExportNamedDeclaration(path) {
      if (!path.node.declaration) return;

      const name = parseDeclaration(path.node.declaration);
      if (name) namedExports.push(name as string);
    },
    ExportDefaultDeclaration(path) {
      const name = parseDeclaration(path.node.declaration);
      if (name) defaultExport = name;
    },
    ExportSpecifier(path) {
      if (t.isIdentifier(path.node.exported))
        path.node.exported.name === "default"
          ? (defaultExport = path.node.local.name)
          : namedExports.push(path.node.exported.name);
    },
  };

  traverse(ast, visitor);

  return {
    nameds: namedExports,
    default: defaultExport,
  };
}

function getRelativePath(dirPath: string, filePath: string) {
  const { dir, name } = path.parse(filePath);

  return "./" + path.join(path.relative(dirPath, dir), name);
}

function parseDeclaration(declaration: t.Declaration | t.Expression) {
  let name;

  if (t.isIdentifier(declaration)) name = declaration.name;
  // 函数导出
  else if (t.isFunctionDeclaration(declaration)) {
    if (declaration.id) name = declaration.id.name;
    else name = __FILENAME__;
  }
  // 变量导出
  else if (t.isVariableDeclaration(declaration)) {
    declaration.declarations.forEach((d) => {
      // 解构导出
      if (t.isObjectPattern(d.id)) {
        d.id.properties.forEach((property) => {
          if (t.isObjectProperty(property) && t.isIdentifier(property.value)) {
            name = property.value.name;
          }
        });
      }
      // 导出单个特性
      else if (t.isIdentifier(d.id)) name = d.id.name;
    });
  }
  // 类导出
  else if (t.isClassDeclaration(declaration)) {
    name = declaration.id.name;
  }

  return name;
}
