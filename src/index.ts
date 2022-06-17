import { createUnplugin } from "unplugin";
import chokidar from "chokidar";
import type { Options } from "./types";
import {
  resolveDir,
  genReExportFile,
  getOutputFilePaths,
  resolveDefaultOptions,
} from "./utils";

export default createUnplugin<Partial<Options>>((_options = {}) => {
  let watcher;
  const options = resolveDefaultOptions(_options);

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

  return {
    name: "unplugin-auto-re-export",
    // buildEnd() {
    //   watcher.close().then(() => console.log("closed"));
    // },
  };
});
