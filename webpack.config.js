/*jshint esversion: 6 */
/* globals __dirname, module, require, process */
'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const decache = require('decache');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');


// Constants
const ASSETS_PATH = path.join(__dirname, 'src/web/assets');

// Setup configs
let configs = [];

// Import libs config
configs.push(require(path.join(__dirname, 'webpack.libs.config')));

// Import asset configs
let assetWebpackConfigs = [];
let assetWebPackConfigFiles = fs.readdirSync(ASSETS_PATH).filter(f => {
    let dirPath = path.join(ASSETS_PATH, f);
    let filePath = path.join(dirPath, 'webpack.config.js');
    return fs.statSync(dirPath).isDirectory() && fs.existsSync(filePath);
}).map(p => path.join(ASSETS_PATH, p, 'webpack.config'));

let loop = 1;
assetWebPackConfigFiles.forEach(asset => {
    let assetConfig = require(asset);
    configs.push(assetConfig);
});

module.exports = configs;
