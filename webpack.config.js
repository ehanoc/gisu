const webpack = require('webpack')
const path = require('path')
const {join}  = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const projectDir = __dirname;
const nodeModules = __dirname + '/node_modules' ;

const includePaths = [
]



const clientDir = `${__dirname}/src/client`
const serverDir = `${__dirname}/src/server`
const srcDir = `${clientDir}`
const destDir = `${serverDir}/static`

const outputSourceMaps = false

const extractSass = new ExtractTextPlugin({ // define where to save the file
  filename: `[name].bundle.css`,
  allChunks: true,
})

module.exports = {
    cache: true,
    devtool: '#cheap-module-eval-source-map',
    context: `${srcDir}`,
    stats: {
      colors: true,
      modules: true,
      reasons: true,
      errorDetails: true
    },

    entry: {
        storybuilder: [
            './story-builder/index.js',
            './story-builder/style.scss'
        ],
        vendor: [
          'react', 'react-dom', 'react-router', 'lodash',
        ],
    },
    output: {
        path: destDir,
        filename: '[name].bundle.js',
    },
    externals: {
      "window": "window"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: join(__dirname, 'src'),
          use: [{
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['es2015', 'react', 'stage-2'],
              plugins: [ 'transform-object-assign'],
            },
          }],
        },
        {
          test: /\.svg/,
          use: {
            loader: 'url-loader',
            loader: 'svg-url-loader',
            loader: 'file-loader',
            options: {},
          },
        },
        { // sass / scss loader for webpack
          test: /\.(css|sass|scss)$/,
          use: extractSass.extract({
            use: [
              { loader: 'css-loader'},
              { loader: 'sass-loader', options: { includePaths } }
            ]
          })
        }
      ]
    },
    resolve: {
        modules: ["node_modules"]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      //new webpack.NoEmitOnErrorsPslugin(),
      extractSass,
      new webpack.DefinePlugin({
        BUILD_DATE: JSON.stringify(new Date()),
        BUILD_VERSION: JSON.stringify(require('./package.json').version)
      })
    ]
}
