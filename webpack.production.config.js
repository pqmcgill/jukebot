var webpack = require('webpack');
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules'),
  entryPath = path.resolve(__dirname, './app/index.js'),
  outputPath = path.resolve(__dirname, './dist');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
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
      },
      // Images
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=25000'
      },

      // Fonts
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

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
    }),
    new webpack.DefinePlugin({
      REDIRECT: JSON.stringify('http://morning-spire-97331.herokuapp.com')
    })
  ]
};

if (process.env.SOURCE_MAP === 'true') {
  config.devtool = 'source-map';
}

module.exports = config;
