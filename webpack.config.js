const path = require('path')

module.exports = {
  entry: [
    './app/js/front.js',
  ],
  output: {
    filename: './js/bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
        test: /\.js$/,
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
    ]
  },
  plugins: [
  ]
}