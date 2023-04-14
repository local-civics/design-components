import postcss from "rollup-plugin-postcss";
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
    plugins: [dts()],
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
  }),
]
