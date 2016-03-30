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
    new HtmlWebpackPlugin({
      template: './app/index.ejs',
      inject: true,
      title: 'Jukebot'
    }),
    new webpack.DefinePlugin({
      REDIRECT: JSON.stringify('https://0.0.0.0:' + PORT + '/home')
    })
  ]
};
