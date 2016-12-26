var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: "./source-src/js/main.js",
    slider: "./source-src/js/slider.js",
    mobile: "./source-src/js/mobile.js"
  },
  output: {
    path: "./source",
    publicPath: "/",
    filename: "[name].[chunkhash:6].js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(scss|sass|css)$/,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader?-autoprefixer', 'postcss-loader', 'sass-loader'])
    }, {
      test: /\.(gif|jpg|png)\??.*$/,
      loader: 'url-loader?limit=500&name=img/[name].[ext]'
    }, {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: "file-loader?name=fonts/[name].[ext]"
    }]
  },
  alias: {
    'vue$': 'vue/dist/vue.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devtool: '#eval-source-map',
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      template: './source-src/script.ejs',
      filename: '../layout/_partial/script.ejs'
    })
  ],
  watch: true
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}