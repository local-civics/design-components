import pkg from "./package.json";

import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";

const cfg = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        preferBuiltins: true
      }),
      postcss({
        sourceMap: true,
        minimize: true,
      }),
      commonjs(),
      typescript(),
      terser(),
    ],
  },
];

export default cfg;
