var webpack = require('webpack');
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules'),
  entryPath = path.resolve(__dirname, './app/index.js'),
  outputPath = path.resolve(__dirname, './dist');

var HtmlWebpackPlugin = require('html-webpack-plugin');

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
      },
      // SASS
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
      // Images
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=25000'
      },

      // Fonts
      {
        test: /\.(ttf)$/,
        loader: 'url?limit=100000'
      },

      // inline svg
      {
        test: /\.(svg)$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlWebpackPlugin({
      title: 'Jukebot',
      template: './app/index.ejs',
      inject: true
    });
  ]
};
