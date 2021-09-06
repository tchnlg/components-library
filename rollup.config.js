import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import postcss from "rollup-plugin-postcss";

export default ["es", "umd"].map((format) => {
  const UMD = format === "umd";

  return {
    input: "src",
    output: {
      format,
      file: UMD ? pkg.main : pkg.module,
      name: UMD ? "components-library" : undefined,
    },
    external: Object.keys(pkg.dependencies),
    plugins: [
      svelte({
        emitCss: true,
        preprocess: sveltePreprocess({
          postcss: true,
        }),
      }),
      postcss({
        extract: true,
      }),
      resolve(),
      commonjs(),
      UMD && terser(),
    ],
  };
});
