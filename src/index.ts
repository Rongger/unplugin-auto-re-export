import { createUnplugin } from "unplugin";
import type { Options } from "./types";

export default createUnplugin<Options>((options) => {
  // const list = getWatchFiles(options?.dirs);

  return {
    name: "unplugin-auto-re-export",
    transformInclude(id) {
      return id.endsWith("main.ts");
    },
    transform(code) {
      return code.replace("__UNPLUGIN__", `Hello Unplugin! ${options}`);
    },
    watchChange(this, id, change) {
      // genReExportFile(list);
    },
  };
});
