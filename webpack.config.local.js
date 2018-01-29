//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack')
const extend = require('lodash').extend
const config = require('./webpack.config.js')

module.exports = extend({}, config, {
  //devtool: false,
  plugins: config.plugins.concat([
    //new BundleAnalyzerPlugin(),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    //new MinifyPlugin(),
  ])
})
