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
      test: /\.(scss|sass)$/,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader?-autoprefixer', 'postcss-loader', 'sass-loader'])
    }, {
      test: /\.(gif|jpg|png)\??.*$/,
      loader: 'url-loader?limit=5000&name=img/[name].[ext]'
    }, {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: "file-loader?name=fonts/[name].[ext]"
    }]
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  watch: true
}