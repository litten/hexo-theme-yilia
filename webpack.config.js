var webpack = require("webpack")
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
      loader: ExtractTextPlugin.extract('style', 'css!sass')
    }, {
      test: /\.(gif|jpg|png)\??.*$/,
      loader: 'url-loader?limit=5000&name=img/[name].[ext]'
    }, {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: "file-loader?name=fonts/[name].[ext]"
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  watch: true
}