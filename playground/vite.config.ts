import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import Unplugin from "../src/vite";

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      dir: ["utils"],
      ignore: ["consts/README.md"],
      outputFile: "index.ts",
    }),
  ],
});
