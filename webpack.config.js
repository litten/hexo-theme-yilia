var webpack = require("webpack")

module.exports = {
  entry: {
    main: "./source-src/js/main.js",
    style: "./source-src/css/style.js"
  },
  output: {
    path: "./source",
    publicPath: "/source/",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }, {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=50000&name=[path][name].[ext]'
    }]
  },
  watch: true
}