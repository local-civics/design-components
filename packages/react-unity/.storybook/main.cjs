module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links", "@storybook/addon-a11y", {
    name: "@storybook/addon-postcss",
    options: {
      postcssLoaderOptions: {
        implementation: require("postcss")
      }
    }
  }],
  framework: "@storybook/react",
  features: {
    emotionAlias: false
  },
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config, {
    configType
  }) => {
    config.module.rules.push({
      resolve: { fullySpecified: false },
    })
    config.resolve.extensions.push('.ts', '.tsx');
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });
    config.resolve.extensions.push('.mjs');

    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    // https://medium.com/@derek_19900/config-storybook-4-to-use-svgr-webpack-plugin-22cb1152f004
    config.module.rules.push({
      test: /\.svg$/,
      enforce: "pre",
      use: [{
        loader: '@svgr/webpack',
        options: {
          titleProp: true,
          replaceAttrValues: {
            "#232A3A": "currentColor"
          }
        }
      }]
    });

    // Return the altered config
    return config;
  },
  docs: {
    autodocs: true
  }
};