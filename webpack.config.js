var path = require('path');

var entryPath = path.resolve(__dirname, './app/App.js'),
  buildPath = path.resolve(__dirname, './public'),
  node_modules = path.resolve(__dirname, 'node_modules');

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
        exclude: /node_modules/,
        loaders: ['babel?presets[]=react,presets[]=es2015', 'react-hot']
      }
    ]
  }
};
