import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import svgr from '@svgr/rollup'
import pkg from "./package.json";

const cfg = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "umd",
        name: "components",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "linkify-it": "LinkifyIt",
          "react-string-replace": "ReactStringReplace",
          papaparse: "PapaParse",
        },
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [
      svgr({
        titleProp: true,
        replaceAttrValues: {
          "#232A3A": "currentColor",
        },
      }),
      typescript(),
      postcss({
        minimize: true,
      }),
      terser(),
    ],
    external: ["react", "react-dom", "react/jsx-runtime", "linkify-it", "react-string-replace", "papaparse"],
  },
];

export default cfg;
