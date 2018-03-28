const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const scssLoader = new ExtractTextPlugin('[name].[chunkhash:6].css');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OUTPUT_DIR = 'source';

var minifyHTML = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyJS: true
}

module.exports = {
  entry: {
    main: "./source-src/js/main.js",
    slider: "./source-src/js/slider.js",
    mobile: ["babel-polyfill", "./source-src/js/mobile.js"]
  },
  output: {
    path: path.resolve(__dirname, OUTPUT_DIR),
    publicPath: "./",
    filename: "[name].[chunkhash:6].js"
  },
  resolve: {
    extensions: [
      '.js', '.json'
    ],
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  watch: process.env.NODE_ENV == "development",
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ['style-loader'].concat(scssLoader.extract([{
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [require('autoprefixer')()]
          }
        }, 'sass-loader']))
      }, {
        test: /\.(gif|jpg|png)\??.*$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 500,
            name: 'img/[name].[ext]'
          }
        }]
      }, {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:6].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    scssLoader,
    new CleanWebpackPlugin(OUTPUT_DIR),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      minify: minifyHTML,
      template: path.resolve(__dirname, 'source-src', 'script.ejs'),
      filename: path.resolve(__dirname, 'layout', '_partial', 'script.ejs')
    }),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      minify: minifyHTML,
      template: path.resolve(__dirname, 'source-src', 'css.ejs'),
      filename: path.resolve(__dirname, 'layout', '_partial', 'css.ejs')
    })
  ]
};
