import type { Exports, ExportName } from "./types";
import { ExportNameTypes } from "./types";
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
  const exportList = resolveDefaultRaw(exports.default, filePath).concat(
    exports.nameds
  );
  const exportTypeList = resolveDefaultRaw(
    exports.defaultType,
    filePath
  ).concat(exports.namedTypes);

  const relativePath = getRelativePath(dirPath, filePath);

  const exportRaw =
    exportList.length === 0
      ? ""
      : `export { ${exportList.join(", ")} } from "${relativePath}";`;

  const exportTypeRaw =
    exportTypeList.length === 0
      ? ""
      : `export type { ${exportTypeList.join(", ")} } from "${relativePath}";`;

  return [exportRaw, exportTypeRaw].filter(Boolean).join("\n");
}

export function generateExportAllRaw(dirPath: string, filePath: string) {
  const relativePath = getRelativePath(dirPath, filePath);
  return `export * from "${relativePath}";`;
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
  const namedExports: string[] = [],
    namedTypeExports: string[] = [];
  let defaultExport, defaultTypeExport;

  const visitor: TraverseOptions = {
    ExportNamedDeclaration(path) {
      if (!path.node.declaration) return;

      const { name, type } = parseDeclaration(path.node.declaration);
      if (!name) return;
      (type === ExportNameTypes.variable
        ? namedExports
        : namedTypeExports
      ).push(name as string);
    },
    ExportDefaultDeclaration(path) {
      const { name, type } = parseExportDefaultDeclaration(
        path.node.declaration
      );
      if (!name) return;

      if (type === ExportNameTypes.variable) defaultExport = name;
      else defaultTypeExport = name;
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
    namedTypes: namedTypeExports,
    defaultType: defaultTypeExport,
  };
}

function getRelativePath(dirPath: string, filePath: string) {
  const { dir, name } = path.parse(filePath);

  return "./" + path.join(path.relative(dirPath, dir), name);
}

function parseDeclaration(declaration: t.Declaration): ExportName {
  let name,
    type = ExportNameTypes.variable;

  // 函数导出
  if (t.isFunctionDeclaration(declaration)) {
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
  // typescript 类型、接口导出
  else if (
    t.isTSTypeAliasDeclaration(declaration) ||
    t.isTSInterfaceDeclaration(declaration)
  ) {
    name = declaration.id.name;
    type = ExportNameTypes.type;
  }

  return { name, type };
}

function parseExportDefaultDeclaration(
  declaration: t.ExportDefaultDeclaration["declaration"]
): ExportName {
  if (t.isDeclaration(declaration)) {
    return parseDeclaration(declaration);
  }
  let name;

  // expression 导出
  if (t.isExpression(declaration)) {
    if (t.isIdentifier(declaration)) {
      name = declaration.name;
    } else {
      name = __FILENAME__;
    }
  }

  return { name, type: ExportNameTypes.variable };
}

function resolveDefaultRaw(
  defaultRaw: string | typeof __FILENAME__ | undefined,
  filePath: string
) {
  const def =
    defaultRaw === __FILENAME__
      ? humps.camelize(path.parse(filePath).name)
      : defaultRaw;
  return exports.default ? [`default as ${def}`] : [];
}
