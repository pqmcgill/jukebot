var path = require('path'),
  webpack = require('webpack');

var entryPath = path.resolve(__dirname, './app/index.js'),
  buildPath = path.resolve(__dirname, './public'),
  node_modules = path.resolve(__dirname, 'node_modules');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    entryPath
  ],
  output: {
    filename: 'bundle.js',
    path: buildPath 
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|vendor|construction)/,
        loaders: ['babel?presets[]=react,presets[]=es2015', 'react-hot']
      },
      {
        test: __dirname + '/vendor/rhapsody.js',
        loader: 'imports?jQuery=jquery'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.ejs',
    inject: true,
    title: 'Jukebot'
  })]
};
