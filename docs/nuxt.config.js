const { resolve } = require('path');
const { version } = require('../package.json');

module.exports = {
  srcDir: __dirname,
  head: {
    titleTemplate: '%s | Vue A11Y Calendar',
  },
  manifest: {
    lang: 'en',
    name: 'vue-a11y-calendar',
    short_name: 'vue-a11y-calendar',
    description: 'Flexible, accessible, internationalized calendar component for Vue',
    theme_color: '#3273dc',
    background_color: '#3273dc',
  },
  env: {
    version,
  },
  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
  ],
  markdownit: {
    use: [
      'markdown-it-prism',
      'markdown-it-emoji',
    ],
  },
  css: [
    '~/assets/docs.scss',
  ],
  router: {
    base: process.env.NODE_ENV === 'dev' ? '/' : '/vue-a11y-calendar/',
  },
  generate: {
    dir: resolve(__dirname, '../docs-dist'),
    routes: [
      '/components/calendar',
      '/components/datepicker',
    ],
  },
};
