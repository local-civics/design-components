import postcss from "rollup-plugin-postcss";
import scss from "rollup-plugin-scss"
import svgr from "@svgr/rollup"
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild';

const bundle = config => ({
  ...config,
  input: './src/index.ts',
  external: id => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [
      svgr({
        titleProp: true,
        replaceAttrValues: {
          "#232A3A": "currentColor",
        },
      }),
      esbuild(),
      postcss({minimize: true}),
    ],
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [
      scss(),
      svgr({
        titleProp: true,
        replaceAttrValues: {
          "#232A3A": "currentColor",
        },
      }),
      dts(),
    ],
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
  }),
]
