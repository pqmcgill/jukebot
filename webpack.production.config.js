var webpack = require('webpack');
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules'),
  entryPath = path.resolve(__dirname, './app/index.js'),
  outputPath = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    app: entryPath,
    vendors: ['react']
  },
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|vendor)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: __dirname + '/vendor/rhapsody.js',
        loader: 'imports?jQuery=jquery'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};
