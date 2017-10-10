const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WebpackDevServer = require('webpack-dev-server');

function resolve(dir) {
  return path.join(__dirname, '../..', dir);
}

const compiler = webpack(merge(config, {
  entry: {
    app: resolve('tests/test-server/main.js'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: resolve('tests/test-server/wrapper.ejs'),
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
}));

const server = new WebpackDevServer(compiler, {
  contentBase: resolve('tests/.dist'),
  quiet: true,
  noInfo: true,
  clientLogLevel: 'error',
});

module.exports = server;
