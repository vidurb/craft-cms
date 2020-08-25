/* jshint esversion: 6 */
/* globals module, require, __dirname */
const merge = require('webpack-merge');
const decache = require('decache');
decache('../../../../webpack.base.asset.config');
const BASE_CONFIG = require('../../../../webpack.base.asset.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NODE_MODULES = __dirname + '/../../../../node_modules/';

module.exports = merge(BASE_CONFIG, {
    entry: {'prism': './prism.js'},
});