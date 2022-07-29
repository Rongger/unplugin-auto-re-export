import type { Dir, Options, OptionsMap, MapValue } from "./types";
import fg from "fast-glob";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { parseExport, generateRaw, generateExportAllRaw } from "./parse";

const timerMap: Map<string, NodeJS.Timeout> = new Map();

export function genReExportFile(options: Options, path: string) {
  const dirs = resolveDir(options.dir);
  const result = dirs.find((i: string) => path.startsWith(i));
  if (!result) return;

  // 防止同一文件夹下的多个文件同时更改引发不必要的重复生成 index
  if (timerMap.has(result)) clearTimeout(timerMap.get(result));
  timerMap.set(
    result,
    setTimeout(() => {
      writeExportFromDir(result, options);
    }, 500)
  );
}

export function writeExportFromDir(dirPath: string, options: Options) {
  const [indexPath] = getOutputFilePaths(dirPath, options.outputFile);
  const optionsMap = genOptionsMap(options);
  const exportAll = getOptionsValue(optionsMap, dirPath, "exportAll");
  const baseNameMatch = getOptionsValue(optionsMap, dirPath, "baseNameMatch");

  const files = fg.sync(
    `${dirPath}/**/${baseNameMatch}.{js,jsx,ts,tsx,mjs,cjs}`,
    {
      ignore: [...options.ignore, indexPath],
      deep: getOptionsValue(optionsMap, dirPath, "deep"),
    }
  );

  const content = files.reduce<string>((raws, path) => {
    const raw = exportAll
      ? generateExportAllRaw(dirPath, path)
      : generateRaw(parseExport(path), dirPath, path);

    if (raw) raws += `${raw}\n`;
    return raws;
  }, "");

  if (content) {
    fs.writeFileSync(indexPath, content);
    tryToFormatCode(indexPath);
  }
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
  deep = Infinity,
  baseNameMatch = "*",
  ...arg
}: Partial<Options>): Options => {
  return { dir, ignore, outputFile, exportAll, deep, baseNameMatch, ...arg };
};

export function genOptionsMap(options: Options) {
  const { dir, exportAll, deep, baseNameMatch } = options;
  const map: OptionsMap = new Map([
    ["DEFAULT", { exportAll, deep, baseNameMatch }],
  ]);
  if (Array.isArray(dir)) {
    dir.forEach((i) => {
      if (typeof i !== "string") {
        const {
          exportAll = options.exportAll,
          deep = options.deep,
          baseNameMatch = options.baseNameMatch,
        } = i;
        map.set(i.path, { exportAll, deep, baseNameMatch });
      }
    });
  }
  return map;
}

export function getOptionsValue<T extends keyof MapValue<OptionsMap>>(
  map: OptionsMap,
  dirPath: string,
  key: T
) {
  return (map.has(dirPath) ? map.get(dirPath) : map.get("DEFAULT"))![key];
}

function tryToFormatCode(codePath: string) {
  exec(`eslint --fix  ${codePath}`);
  exec(`prettier --write ${codePath}`);
}
