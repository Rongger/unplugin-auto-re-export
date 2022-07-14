import { defineConfig } from "vite";
import Unplugin from "../src/vite";

export default defineConfig({
  plugins: [
    Unplugin({
      dir: ["consts"],
      ignore: ["consts/const-2.ts"],
      outputFile: "index.ts",
      // exportAll: true,
    }),
  ],
});
