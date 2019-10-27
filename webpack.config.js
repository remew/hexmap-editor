'use strict';
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const isFileLoaderRegExp = /\.(png|jpg|svg|ttf)$/;

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'inline-source-map' : undefined,
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/react',
                [
                  '@babel/env',
                  {
                    modules: false,
                  },
                ],
              ],
              plugins: [
                'styled-jsx/babel',
              ],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: isFileLoaderRegExp,
        use: [
          {
            loader: 'file-loader',
            options: {
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, 'template/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: 'vendor',
    },
  },
  devServer: {
    host: '0.0.0.0',
  },
};
