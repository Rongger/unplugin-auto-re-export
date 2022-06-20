import { basename, resolve } from "path";
import { promises as fs } from "fs";
import fg from "fast-glob";
import chalk from "chalk";

async function run() {
  const files = await fg("*.js", {
    ignore: ["chunk-*"],
    absolute: true,
    cwd: resolve(__dirname, "../dist"),
  });

  for (const file of files) {
    // eslint-disable-next-line no-console
    console.log(chalk.cyan.inverse(" POST "), `Fix ${basename(file)}`);

    let code = await fs.readFile(file, "utf8");
    code = code.replace(
      'var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);',
      'var __toCommonJS = (mod) => __copyProps(__defProp(mod.default ?? {}, "__esModule", { value: true }), mod);'
    );
    const moduleExports = code.match(/^module.exports = .*$/m)?.[0];
    if (moduleExports === undefined)
      throw new Error("module.exports is not defined");
    code += moduleExports;
    await fs.writeFile(file, code);

    // generate submodule .d.ts redirecting
    const name = basename(file, ".js");
    await fs.writeFile(
      `${name}.d.ts`,
      `export { default } from './dist/${name}'\n`
    );
  }
}

run();
