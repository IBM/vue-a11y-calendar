const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.conf.js');
const WebpackDevServer = require('webpack-dev-server');

function resolve(dir) {
  return path.join(__dirname, '../..', dir);
}

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  contentBase: resolve('tests/.dist'),
  quiet: true,
  noInfo: true,
  clientLogLevel: 'error',
});

module.exports = server;
