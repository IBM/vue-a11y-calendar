const { resolve } = require('path');
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
  ],
  css: [
    '~/assets/docs.scss',
  ],
  router: {
    base: '/vue-a11y-calendar/',
  },
  generate: {
    dir: resolve(__dirname, '../docs-dist'),
    routes: [
      '/components/calendar',
      '/components/datepicker',
    ],
  },
};
