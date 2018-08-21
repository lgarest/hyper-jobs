/* 3rd party imports */
/* eslint-disable object-shorthand */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const config = {
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  // enable devtool for better debugging experience
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        // process js files with babel loader to use modern javascript
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // include: path.resolve(__dirname, 'src'),
        use: [
          'babel-loader',
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   use: ['file-loader'],
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: ['file-loader'],
      // },
      // {
      //   test: /\.(csv|tsv)$/,
      //   use: ['csv-loader'],
      // },
      // {
      //   test: /\.xml$/,
      //   use: ['xml-loader'],
      // },
    ],
  },
  plugins: [
    // creates our HTML serving the webpack bundles
    new HtmlWebpackPlugin({
      title: 'Hyperapp IT jobs finder',
      meta: {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'apple-mobile-web-app-capable': 'content=yes',
        'apple-mobile-web-app-status-bar-style': 'content=default',
        'apple-mobile-web-app-title': 'content=Find me a job',
        'msapplication-TileImage': 'content=/src/asssets/icon-128.png',
        'msapplication-TileColor': 'content=#000',
      },
    }),
    /*
      Hot Module Replacement (HMR) exchanges, adds, or removes modules while an
      application is running, without a full reload. This can significantly
      speed up development in a few ways:

      Retain application state which is lost during a full reload. Save valuable
      development time by only updating what's changed.
      More info in: https://webpack.js.org/concepts/hot-module-replacement/
     */
    new webpack.HotModuleReplacementPlugin({}),

    new CleanWebpackPlugin(
      ['dist'],
      { root: path.resolve(__dirname, '..') },
    ),

    new WebpackPwaManifest({
      name: 'Find me a job',
      short_name: 'FMAJ',
      description: 'Find me a job PWA',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#2e428c',
      // can be null, use-credentials or anonymous
      crossorigin: 'anonymous',
      icons: [
        {
          src: path.resolve('src/assets/icon-512.png'),
          size: '512x512', // multiple sizes
          // sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        }, {
          src: path.resolve('src/assets/icon-128.png'),
          size: '128x128', // multiple sizes
        }, {
          src: path.resolve('src/assets/icon-32.png'),
          size: '32x32', // multiple sizes
        },
        // {
        //   src: path.resolve('src/assets/large-icon.png'),
        //   size: '1024x1024', // you can also use the specifications pattern
        // },
      ],
    }),

    new FaviconsWebpackPlugin({
      logo: path.resolve('src/assets/icon-512.png'),
      title: 'Find me a job',
    }),

    new SWPrecacheWebpackPlugin({
      cacheId: 'find-me-a-job',
      filename: 'find-me-a-job-service-worker.js',
      stripPrefix: 'dist/',
      staticFileGlobs: [
        'index.html',
        'manifest.*.json',
        'dist/**/*.js',
        // path.resolve(__dirname, 'index.html'),
        // path.resolve(__dirname, 'manifest.*.json'),
        // path.resolve(__dirname, '**.js'),
        // 'manifest.*.json',
        // './**.js',
        // './**.js',
      ],
    }),
  ],
}

module.exports = config
