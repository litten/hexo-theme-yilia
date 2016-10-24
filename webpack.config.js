var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: "./source-src/js/main.js"
  },
  output: {
    path: "./source",
    publicPath: "/",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass!postcss-loader')
    }, {
      test: /\.(gif|jpg|png)\??.*$/,
      loader: 'url-loader?limit=5000&name=img/[name].[ext]'
    }, {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: "file-loader?name=fonts/[name].[ext]"
    }]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  watch: true
}