import chokidar from "chokidar";
import { resolveDir, genReExportFile, getOutputFilePaths } from "./utils";
import type { Options } from "./types";

export function initWatcher(options: Options) {
  let watcher;

  if (options.dir) {
    watcher = chokidar.watch(resolveDir(options.dir), {
      persistent: true,
      ignored: [
        ...options.ignore,
        ...getOutputFilePaths(options.dir, options.outputFile),
      ],
    });
    watcher
      .on("add", (path) => genReExportFile(options, path))
      .on("change", (path) => genReExportFile(options, path))
      .on("unlink", (path) => genReExportFile(options, path));
  }
  return watcher;
}
