/*jshint esversion: 6 */
/* globals  module, require, process */
// Plugins
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                test: /\.js(\?.*)?$/i,
            }),
        ],
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.vue'],
    },
    module: {
        rules: [
            // Babel
            {
                test: /.m?js?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
};