const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const scssLoader = new ExtractTextPlugin('[name].[chunkhash:6].css');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const THEME_NAME = "yilia";
const OUTPUT_DIR = 'source';

// init `yilla_config.yml` in root dir,
if (!fs.existsSync(path.resolve(__dirname, '..', 'yilla_config.yml'))) {
  fs.copyFileSync(path.resolve(__dirname, '_config.yml'), path.resolve(__dirname, '..', 'yilla_config.yml'));
}


let target_dir = path.resolve(__dirname, '..', 'themes', THEME_NAME);

let minifyHTML = {
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
    path: path.resolve(target_dir, OUTPUT_DIR),
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
    new CleanWebpackPlugin(path.resolve(target_dir), {
      root: path.resolve(target_dir, '..')
    }),
    new CopyWebpackPlugin([{
        from: 'languages/**/*',
        to: path.join(target_dir)
      },
      {
        from: 'layout/**/*',
        to: path.join(target_dir)
      }
    ]),
    new CopyWebpackPlugin([{
        from: path.join(__dirname, '..', 'yilla_config.yml'),
        to: path.join(target_dir, '_config.yml')
      },
      {
        from: 'layout/**/*',
        to: path.join(target_dir)
      }
    ]),
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
      filename: path.resolve(target_dir, 'layout', '_partial', 'script.ejs')
    }),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      minify: minifyHTML,
      template: path.resolve(__dirname, 'source-src', 'css.ejs'),
      filename: path.resolve(target_dir, 'layout', '_partial', 'css.ejs')
    })
  ]
};
