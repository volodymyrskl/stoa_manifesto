const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')

module.exports = {
  entry: [
    './app/js/front.js',
    './app/scss/style.scss'
  ],
  output: {
    filename: './js/bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.js$/, exclude: /node_modules/,
        include: path.resolve(__dirname, 'app/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/env'
            ]
          }
        }
      },
      { 
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'css/fonts/',
              publicPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'app/scss'),
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.pug/,
        loaders: [
          {
            loader: 'html-loader?attrs=false'
          },
          {
            loader: 'pug-html-loader',
            options: {
              minimize: true
            }
          }],
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './css/style.bundle.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/views/index.pug'
    }),
    new HtmlWebpackPugPlugin()
  ]
}