/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  console.log(env, argv);
  const config = {
    mode: 'development',
    entry: './public/index.ts',

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          include: [path.resolve(__dirname, 'src')],
          use: [
            // Creates `style` nodes from JS strings
            {
              loader: 'style-loader',
              options: { injectType: 'singletonStyleTag' },
            },
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
        },
        {
          test: /\.(js|ts)$/,
          include: [path.resolve(__dirname, 'src')],
          loader: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.mjs', '.scss'],
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
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
  };

  if (env.production) {
    config.mode = 'production';
    config.entry = './src/Editor.ts';
    config.output.libraryTarget = 'umd';
    config.output.filename = 'editor.js';
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({
        title: 'editor test',
        template: 'public/index.html',
      }),
    );
  }

  return config;
};
