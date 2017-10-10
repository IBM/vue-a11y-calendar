const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '../..', dir);
}

module.exports = {
  output: {
    path: resolve('tests/.dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    mainFiles: ['index', 'index.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve(''),
    }
  },
  devtool: '#inline-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: [
            {
              test: /\.css$/,
              use: ['vue-style-loader', {
                loader: 'css-loader',
                options: {
                  minimize: false,
                  sourceMap: false,
                },
              }],
            },
            {
              test: /\.scss$/,
              use: ['vue-style-loader', {
                loader: 'sass-loader',
                options: {}
              }],
            },
            {
              test: /\.sass$/,
              use: ['vue-style-loader', {
                loader: 'sass-loader',
                options: {}
              }],
            },
          ],
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('calendar'), resolve('datepicker'), resolve('tests')],
      },
    ],
  },
  resolveLoader: {
    alias: {
      'scss-loader': 'sass-loader',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"',
      },
    }),
  ],
}
