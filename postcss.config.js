module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-normalize': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
      stage: 3,
    },
  },
};
