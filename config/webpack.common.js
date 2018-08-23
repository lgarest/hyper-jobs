/* 3rd party imports */
/* eslint-disable object-shorthand */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')


// creates our HTML serving the webpack bundles
const myHtmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Find me a job',
  meta: {
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    'apple-mobile-web-app-capable': 'content=yes',
    'apple-mobile-web-app-status-bar-style': 'content=default',
    'apple-mobile-web-app-title': 'content=Find me a job',
    'msapplication-TileImage': 'content=/src/asssets/icon-128.png',
    'msapplication-TileColor': 'content=#000',
  },
})

const myHotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin({})
const myCleanWebpackPlugin = new CleanWebpackPlugin(
  ['dist'],
  { root: path.resolve(__dirname, '..') },
)

const myWebpackPwaManifest = new WebpackPwaManifest({
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
})

const myFaviconsWebpackPlugin = new FaviconsWebpackPlugin({
  logo: path.resolve('src/assets/icon-512.png'),
  title: 'Find me a job',
})

const mySWPrecacheWebpackPlugin = new SWPrecacheWebpackPlugin({
  cacheId: 'find-me-a-job',
  filename: 'find-me-a-job-service-worker.js',
  stripPrefix: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/manifest.*.json',
    'dist/**/*.js',
  ],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'fastest', // fastest | cacheFirst | networkFirst
    },
  ],
})

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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    myHtmlWebpackPlugin,
    myHotModuleReplacementPlugin,
    myCleanWebpackPlugin,
    myWebpackPwaManifest,
    myFaviconsWebpackPlugin,
    mySWPrecacheWebpackPlugin,
  ],
}

module.exports = config
