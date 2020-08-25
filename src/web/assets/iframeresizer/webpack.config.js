/* jshint esversion: 6 */
/* globals module, require, __dirname */
const merge = require('webpack-merge');
const decache = require('decache');
decache('../../../../webpack.base.asset.config');
const BASE_CONFIG = require('../../../../webpack.base.asset.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NODE_MODULES = __dirname + '/../../../../node_modules/';

module.exports = merge(BASE_CONFIG, {
    entry: {'entry': './entry.js'},
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: NODE_MODULES + '/iframe-resizer/js',
                    from: 'iframeResizer.min.js',
                    to: 'iframeResizer.js',
                },
                {
                    context: NODE_MODULES + '/iframe-resizer/js',
                    from: 'iframeResizer.contentWindow.min.js',
                    to: 'iframeResizer.contentWindow.js',
                },
            ],
        }),
    ]
});