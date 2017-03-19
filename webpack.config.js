const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: path.join(__dirname, 'app', 'app.js'),
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'app'),
      loader: ['babel-loader'],
      query: {
        cacheDirectory: 'babel_cache'
      }
    }]
  }
}  