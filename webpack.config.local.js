//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//const MinifyPlugin = require("babel-minify-webpack-plugin");
const BundleTracker = require('webpack-bundle-tracker')
const webpack = require('webpack')
const merge = require('lodash').merge
const config = require('./webpack.config.js')

const bundleUrl = 'http://localhost:8081/bundles/'

const localConfig = merge({}, config, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    publicPath: bundleUrl,
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    clientLogLevel: 'error',
    host: '0.0.0.0',
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    stats: {
      verbose: true
    },
  },

  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },

  output: {
    publicPath: bundleUrl
  },

  entry: {
    app: [
      'react-hot-loader/patch',
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8081', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    ].concat(config.entry.app)
  },

  module: {
    // Extend babel loader
    rules: [
      {
        use: [
          {
            options : {
              plugins: [
                'react-hot-loader/babel'
              ].concat(config.module.rules[0].use[0].options.plugins)
            }
          }
        ]
      }
    ]
  },

  plugins: config.plugins.concat([
    //new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),

  ])

})

//console.log('Babel config', localConfig.module.rules[0].use[0])

module.exports = localConfig
