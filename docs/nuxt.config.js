const { join } = require('path');
const { version } = require('../package.json');

module.exports = {
  srcDir: __dirname,
  head: {
    titleTemplate: '%s | Vue A11Y Calendar',
  },
  env: {
    version,
  },
  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/bulma',
  ],
  build: {
    postcss: false,
    // Fix problem with gh-pages where _* resources are not allowed and throws 404
    publicPath: '/assets/',
    filenames: {
      chunk: '[chunkhash].js',
    },
  },
  router: {
    base: '/vue-a11y-calendar/',
  },
  generate: {
    dir: join(__dirname, 'dist'),
    routes: [
      '/components/calendar',
      '/components/datepicker',
    ],
  },
};
