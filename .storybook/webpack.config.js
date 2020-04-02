// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const resolveTsAliases = require('resolve-ts-aliases').resolveTsAliases;

require('../config/env');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            require.resolve('babel-plugin-macros'),
            require.resolve('babel-plugin-emotion'),
          ],
          presets: [
            require.resolve('@emotion/babel-preset-css-prop'),
            ['react-app', { flow: false, typescript: true }],
          ],
        },
      },
      require.resolve('react-docgen-typescript-loader'),
    ],
  });

  config.module.rules = config.module.rules.map((rule) => {
    if (!rule.test.test('.svg')) {
      return rule;
    }

    const newRule = rule;
    // Changes existing default rule to not handle SVG files
    newRule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
    return newRule;
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: require.resolve('@svgr/webpack'),
      },
      {
        loader: require.resolve('url-loader'),
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = {
    ...config.resolve.alias,
    ...resolveTsAliases(path.resolve('tsconfig.paths.json')),
  };

  return config;
};
