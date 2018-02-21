//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack')
const merge = require('lodash').merge
const config = require('./webpack.config.js')

const bundlePath = '/static/bundles/'

const localConfig = merge({}, config, {
  //devtool: false,

  devServer: {
    publicPath: bundlePath,
    hot: true,
    historyApiFallback: true
  },

  output: {
    publicPath: bundlePath
  },

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:8081', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    ].concat(config.entry.app)
  },

  module: {
    // Extend babel loader
    rules: [
      {
        use: [{
          options : {
            plugins: [
              'react-hot-loader/babel'
            ]//.concat(config.module.rules[0].use[0].options.plugins)
          }
        }]
      }
    ]
  },

  plugins: config.plugins.concat([
    //new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

  ])

})

module.exports = localConfig
