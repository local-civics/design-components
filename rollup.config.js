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
        format: "umd",
        name: "components",
        globals: { react: "React", "react-dom": "ReactDOM", "react/jsx-runtime": "ReactJSXRuntime"},
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [
      typescript(),
      postcss({
        minimize: true,
      }),
      terser(),
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
];

export default cfg;
