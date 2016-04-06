var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: "eval",
  entry: ['./src/index.js','webpack-hot-middleware/client'],
  worker: {
    output: {
      filename: "hash.worker.js",
      chunkFilename: "[id].hash.worker.js"
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader",
      include: path.join(__dirname, 'css')
    }
    ]
  }
};
