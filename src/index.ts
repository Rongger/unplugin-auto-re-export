import { createUnplugin } from "unplugin";
import type { Options } from "./types";
import { initWatcher } from "./watcher";
import { resolveDefaultOptions } from "./utils";

export default createUnplugin<Partial<Options>>((_options = {}) => {
  const name = "unplugin-auto-re-export";
  const options = resolveDefaultOptions(_options);
  const watcher = initWatcher(options);

  return {
    name,
    webpack(compiler) {
      compiler.hooks.watchClose.tap(name, () => {
        watcher?.close();
      });
    },
    vite: {
      closeWatcher() {
        watcher?.close();
      },
    },
    rollup: {
      closeWatcher() {
        watcher?.close();
      },
    },
  };
});
