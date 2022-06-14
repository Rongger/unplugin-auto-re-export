import type { Dir, Options } from "./types";
import fg from "fast-glob";
import fs from "fs";
import path from "path";
import { parseExport, generateRaw } from "./parse";

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
  const { ignore = [] } = options;
  const [indexPath] = getOutputFilePaths(dirPath, options.outputFile);
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

function resolveDir(dir: Dir) {
  return Array.isArray(dir) ? dir : [dir];
}

export function getOutputFilePaths(dir: Dir, outputFile = "index.js") {
  return resolveDir(dir).map((dirPath) => path.join(dirPath, outputFile));
}
