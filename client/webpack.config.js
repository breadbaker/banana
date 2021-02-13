const HtmlWebPackPlugin = require("html-webpack-plugin");
var Visualizer = require('webpack-visualizer-plugin');
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')

// in config object

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  devServer: {
    before: function(app, server, compiler) {
      app.get('/welcome/:route', function(req, res) {
        res.sendFile(__dirname + '/src/index.html');
        return
      });
      app.get('/welcome/records/:route', function(req, res) {
        res.sendFile(__dirname + '/src/index.html');
        return
      });
      app.get('/records/:route', function(req, res) {
        res.sendFile(__dirname + '/src/index.html');
        return
      });
    }
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(ico|png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    htmlPlugin, 
    new Visualizer({
      filename: './statistics.html'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
],
  resolve: {
    extensions: ['.js', '.jsx', '.less']
  }
};