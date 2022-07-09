import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const cfg = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [
      postcss({
        minimize: true,
      }),
      typescript(),
      terser(),
    ],

    external: ["react", "react-dom", "react/jsx-runtime"],
  },
];

export default cfg;
