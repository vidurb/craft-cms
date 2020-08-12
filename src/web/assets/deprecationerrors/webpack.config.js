/*jshint esversion: 6 */
/* globals module, require */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const decache = require('decache');
decache('../../../../webpack.base.asset.config');
const BASE_CONFIG = require('../../../../webpack.base.asset.config');

module.exports = merge(BASE_CONFIG,{
    entry: {'deprecator': './deprecator.js'},
});