/*jshint esversion: 6 */
/* globals __dirname, module, require, process, TOP_PATH */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const BASE_PATH = module.parent.path;
const SRC_PATH = BASE_PATH + '/src';
const DEFAULT_CONFIG = require(path.join(__dirname, 'webpack.base.config.js'));

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(DEFAULT_CONFIG, {
    context: SRC_PATH,
    output: {
        filename: '[name].min.js',
        path: `${BASE_PATH}/dist`
    },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|gif|png)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
        }),
    ]
});