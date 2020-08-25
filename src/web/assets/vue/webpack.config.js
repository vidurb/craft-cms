/* jshint esversion: 6 */
/* globals module, require, __dirname */
const merge = require('webpack-merge');
const decache = require('decache');
decache('../../../../webpack.base.asset.config');
const BASE_CONFIG = require('../../../../webpack.base.asset.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

const NODE_MODULES = __dirname + '/../../../../node_modules/';

module.exports = merge(BASE_CONFIG, {
    entry: {'entry': './entry.js'},
    plugins: [
        new MergeIntoSingleFilePlugin({
            files: {
                'vue.js': [
                    NODE_MODULES + '/vue/dist/vue.min.js',
                    NODE_MODULES + '/vue-router/dist/vue-router.min.js',
                    NODE_MODULES + '/vuex/dist/vuex.min.js',
                    NODE_MODULES + '/vue-autosuggest/dist/vue-autosuggest.js',
                ],
            },
        }),
    ]
});