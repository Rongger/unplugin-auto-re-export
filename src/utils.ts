import type { Dir, Options, ExportAllMap } from "./types";
import fg from "fast-glob";
import fs from "fs";
import path from "path";
import { parseExport, generateRaw, generateExportAllRaw } from "./parse";

export function getWatchFiles(dir: Dir): string[][] {
  const dirs = resolveDir(dir);
  return dirs.map((path) => {
    const source = resolveDir(path) as string[];
    return fg.sync(source);
  });
}

export function genReExportFile(options: Options, path: string) {
  const dirs = resolveDir(options.dir);

  const result = dirs.find((i: string) => path.startsWith(i));

  if (!result) return;

  writeExportFromDir(result, options);
}

export function writeExportFromDir(dirPath: string, options: Options) {
  const [indexPath] = getOutputFilePaths(dirPath, options.outputFile);
  const files = fg.sync(`${dirPath}/**/*.{js,jsx,ts,tsx}`, {
    ignore: [...options.ignore, indexPath],
  });

  const exportAll = isExportAll(resolveExportAll(options), dirPath);

  const content = files.reduce<string>((raws, path) => {
    const raw = exportAll
      ? generateExportAllRaw(dirPath, path)
      : generateRaw(parseExport(path), dirPath, path);

    if (raw) raws += `${raw}\n`;
    return raws;
  }, "");

  if (content) fs.writeFileSync(indexPath, content);
}

export function resolveDir(dir: Dir) {
  if (typeof dir === "string") return [dir];
  return dir.map((i) => (typeof i === "string" ? i : i.path));
}

export function getOutputFilePaths(dir: Dir, outputFile: string) {
  return resolveDir(dir).map((dirPath) => path.join(dirPath, outputFile));
}

export const resolveDefaultOptions = ({
  dir = [],
  ignore = [],
  outputFile = "index.js",
  exportAll = false,
  ...arg
}: Partial<Options>): Options => {
  return { dir, ignore, outputFile, exportAll, ...arg };
};

function resolveExportAll(options: Options) {
  const map: ExportAllMap = new Map([["DEFAULT", options.exportAll]]);
  if (Array.isArray(options.dir)) {
    options.dir.forEach((i) => {
      if (typeof i !== "string" && typeof i.exportAll !== "undefined") {
        map.set(i.path, i.exportAll);
      }
    });
  }
  return map;
}

function isExportAll(map: ExportAllMap, dirPath: string) {
  return map.has(dirPath) ? map.get(dirPath) : map.get("DEFAULT");
}
