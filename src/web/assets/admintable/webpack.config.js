/*jshint esversion: 6 */
/* globals module, require, process */
const merge = require('webpack-merge');
const decache = require('decache');
decache('../../../../webpack.base.vue.config');
const BASE_CONFIG = require('../../../../webpack.base.vue.config');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(BASE_CONFIG, {
    entry: { app: './main.js'},
    output: {
        filename: 'js/app.js',
        chunkFilename: 'js/[name].js',
    },
    optimization: {
        splitChunks: {
            name: false,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'chunk-vendors',
                    chunks: 'all'
                }
            }
        }
    },
});
