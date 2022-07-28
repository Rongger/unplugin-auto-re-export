import { defineConfig } from "vite";
import Unplugin from "../src/vite";

export default defineConfig({
  plugins: [
    Unplugin({
      dir: [
        {
          path: "consts",
          deep: 2,
        },
      ],
      ignore: ["consts/const-2.ts"],
      outputFile: "index.ts",
      exportAll: true,
      deep: 1,
      baseNameMatch: "const??",
    }),
  ],
});
