const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, '/public'),
      compress: true,
      port: 9000,
      publicPath: '/',
    },
    entry: './src/index',
    output: {
      path: path.join(__dirname, '/public'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    watch: true,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: path.join(__dirname, '/src'),
          query: {
            presets: ['react', 'es2015'],
          },
        },
        { 
          test: /\.jsx$/, 
          loader: 'babel-loader', 
          exclude: /node_modules/ },
        { 
          test: /\.css$/,
          use: ExtractTextPlugin.extract(
            { fallback: "style-loader",
              use: "css-loader"
            }
          )
        },
        { 
          test: /\.less$/,
          use: ExtractTextPlugin.extract(
            { 
              fallback: "style-loader",
              use: "css-loader!less-loader"
            }
          )
        },
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
      ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({filename:'app.bundle.css'}),
        new HtmlWebpackPlugin({template: './public/index.html', filename: 'index.html', inject: 'body'})
    ]
};
