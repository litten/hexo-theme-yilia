var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require('path')
// 模板压缩
// 详见：https://github.com/kangax/html-minifier#options-quick-reference

var minifyHTML = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyJS:true
}

module.exports = {
  mode: "development",
  entry: {
    main: "./source-src/js/main.js",
    slider: "./source-src/js/slider.js",
    mobile: ["babel-polyfill", "./source-src/js/mobile.js"]
  },
  output: {
    path: path.resolve(process.cwd(),"source"),
    publicPath: "./",
    filename: "[name].[chunkhash:6].js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(scss|sass|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      })
    }, {
      test: /\.(gif|jpg|png)\??.*$/,
      loader: 'url-loader?limit=500&name=img/[name].[ext]'
    }, {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: "file-loader?name=fonts/[name].[hash:6].[ext]"
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin('[name].[chunkhash:6].css'),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      minify: minifyHTML,
      template: './source-src/script.ejs',
      filename: '../layout/_partial/script.ejs'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      minify: minifyHTML,
      template: './source-src/css.ejs',
      filename: '../layout/_partial/css.ejs'
    })
  ]
}
