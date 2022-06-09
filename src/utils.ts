import type { Options } from "./types";
import fg from "fast-glob";
import fs from "fs";
import path from "path";
import { parseExport, generateRaw } from "./parse";

export function getWatchFiles(dir: Options["dir"]): string[][] {
  const dirs = resolvePath2List(dir);
  return dirs.map((path) => {
    const source = resolvePath2List(path) as string[];
    return fg.sync(source);
  });
}

export function genReExportFile(options: Options, path: string) {
  const dirs = resolvePath2List(options.dir);

  const result = dirs.find((i: string) => path.startsWith(i));

  if (!result) return;

  writeExportFromDir(result, options);
}

export function writeExportFromDir(dirPath: string, options: Options) {
  const { ignore = [], outputFile = "index.js" } = options;
  const indexPath = path.join(dirPath, outputFile);
  const files = fg.sync(`${dirPath}/**/*.{js,jsx,ts,tsx}`, {
    ignore: [...ignore, indexPath],
  });
  // console.log(files);

  const content = files.reduce<string>((raws, path) => {
    const exports = parseExport(path);
    const raw = generateRaw(exports, dirPath, path);

    if (raw) raws += `${raw}\n`;
    return raws;
  }, "");

  if (content) fs.writeFileSync(indexPath, content);
}

function resolvePath2List(path: string | string[]) {
  return Array.isArray(path) ? path : [path];
}
