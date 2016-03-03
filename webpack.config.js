var path = require('path'),
  webpack = require('webpack');

var entryPath = path.resolve(__dirname, './app/index.js'),
  buildPath = path.resolve(__dirname, './public'),
  node_modules = path.resolve(__dirname, 'node_modules');

var PORT = process.env.PORT || 3000;

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:' + PORT,
    entryPath
  ],
  devServer: {
    port: PORT,
    contentBase: '/public',
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://localhost:8080'
    }
  },
  output: {
    filename: '/bundle.js',
    path: buildPath 
  },
  module: {
    loaders: [

      // babel es6 transpiler
      {
        test: /\.js$/,
        exclude: /(node_modules|vendor|construction)/,
        loaders: ['babel?presets[]=react,presets[]=es2015', 'react-hot']
      },

      // load jquery into rhapsody.js
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
    new HtmlWebpackPlugin({
      template: './app/index.ejs',
      inject: true,
      title: 'Jukebot'
    }),
    new webpack.DefinePlugin({
      REDIRECT: JSON.stringify('http://localhost:' + PORT + '/home')
    })
  ]
};
