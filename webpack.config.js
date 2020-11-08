/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
    ],
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },
  devServer: {
    contentBase: './dist',
    open: true,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'editor test',
      template: 'src/index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
};
