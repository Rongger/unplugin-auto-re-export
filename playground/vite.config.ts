import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import Unplugin from "../src/vite";

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      dir: ["consts"],
      ignore: ["consts/const-2.ts"],
      outputFile: "index.ts",
    }),
  ],
});
