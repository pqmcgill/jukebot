var webpack = require('webpack');
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules'),
  entryPath = path.resolve(__dirname, './app/App.js'),
  outputPath = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    app: entryPath,
    vendors: ['react']
  },
  output: {
    path: outputPath,
    filename: '.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};
