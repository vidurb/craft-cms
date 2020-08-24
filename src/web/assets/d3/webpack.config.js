/*jshint esversion: 6 */
/* globals module, require */
const merge = require('webpack-merge');
const decache = require('decache');
decache('../../../../webpack.base.asset.config');
const BASE_CONFIG = require('../../../../webpack.base.asset.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const JSONMinifyPlugin = require('node-json-minify');
const NODE_MODULES = __dirname + '/../../../../node_modules/';

module.exports = merge(BASE_CONFIG, {
    entry: {'entry': './entry.js'},
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: NODE_MODULES,
                    from: 'd3/build/d3.min.js',
                    to: 'd3.js',
                },
                {
                    context: NODE_MODULES,
                    from: 'd3-format/locale/*.json',
                    transform: function(content) {
                        return JSONMinifyPlugin(content.toString());
                    }
                },
                {
                    context: NODE_MODULES,
                    from: 'd3-time-format/locale/*.json',
                    transform: function(content) {
                        return JSONMinifyPlugin(content.toString());
                    }
                }
            ],
        }),
    ]
});