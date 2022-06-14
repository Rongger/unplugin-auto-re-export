import { createUnplugin } from "unplugin";
import chokidar from "chokidar";
import type { Options } from "./types";
import { genReExportFile, getOutputFilePaths } from "./utils";

export default createUnplugin<Options>((options) => {
  let watcher;
  if (options) {
    watcher = chokidar.watch(options.dir, {
      persistent: true,
      ignored: getOutputFilePaths(options.dir, options.outputFile),
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
