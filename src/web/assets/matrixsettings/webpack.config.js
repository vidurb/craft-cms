/*jshint esversion: 6 */
/* globals module, require */
const merge = require('webpack-merge');
const decache = require('decache');
decache('../../../../webpack.base.asset.config');
const BASE_CONFIG = require('../../../../webpack.base.asset.config');

module.exports = merge(BASE_CONFIG,{
    entry: {'MatrixConfigurator': './MatrixConfigurator.js'},
});