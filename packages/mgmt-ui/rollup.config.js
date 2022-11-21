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
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
            '@mantine/core': 'MantineCore',
            '@mantine/dates': 'MantineDates',
            '@mantine/dropzone': 'MantineDropzone',
            '@mantine/form': 'MantineForm',
            '@mantine/modals': 'MantineModals',
            '@mantine/notifications': 'MantineNotifications',
            '@tabler/icons': 'TablerIcons',
            'papaparse': 'Papaparse',
            'recharts': 'Recharts',
        },
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
    external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        '@mantine/core',
        '@mantine/dates',
        '@mantine/dropzone',
        '@mantine/form',
        '@mantine/modals',
        '@mantine/notifications',
        '@tabler/icons',
        'papaparse',
        'recharts',
    ],
  },
];

export default cfg;
