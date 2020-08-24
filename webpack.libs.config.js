/*jshint esversion: 6 */
/* globals __dirname, module, require */
'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const BASE_PATH = __dirname;
const LIB_PATH = BASE_PATH + '/lib/js';
const DEFAULT_CONFIG = require(path.join(__dirname, 'webpack.base.config'));

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const JSONMinifyPlugin = require('node-json-minify');

let jsLibs = {
    'd3': 'd3/build/d3.min.js',
    'element-resize-detector': 'element-resize-detector/dist/element-resize-detector.min.js',
    'fabric': 'fabric/dist/fabric.js',
    'fileupload': 'blueimp-file-upload/js/jquery.fileupload.js',
    'garnishjs': 'garnishjs/dist/garnish.min.js',
    'iframe-resizer': 'iframe-resizer/js/iframeResizer.min.js',
    'iframe-resizer-cw': 'iframe-resizer/js/iframeResizer.contentWindow.min.js',
    'inputmask': 'inputmask/dist/min/jquery.inputmask.bundle.min.js',
    'jquery': 'jquery/dist/jquery.min.js',
    'jquery-touch-events': '@benmajor/jquery-touch-events/src/jquery.mobile-events.min.js',
    'jquery.payment': 'jquery.payment/lib/jquery.payment.min.js',
    'picturefill': 'picturefill/dist/picturefill.min.js',
    'punycode': 'punycode/punycode.js',
    'selectize': 'selectize/dist/js/standalone/selectize.min.js',
    'timepicker': 'timepicker/jquery.timepicker.min.js',
    'velocity': 'velocity-animate/velocity.min.js',
    'xregexp': 'xregexp/xregexp-all.js',
    'yii2-pjax': 'yii2-pjax/jquery.pjax.js',
};

let copyFiles = [
    'd3-format/locale/*.json',
    'd3-time-format/locale/*.json',
];

module.exports = merge({}, {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    context: BASE_PATH + '/lib',
    entry: './libs.js',
    output: {
        filename: '[name]/[name].js',
        path: LIB_PATH,
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: copyFiles.map(row => {
                if (typeof row === 'string') {
                    return {
                        from: BASE_PATH + '/node_modules/' + row,
                        to: LIB_PATH + '/.',
                        transform: function(content) {
                            return JSONMinifyPlugin(content.toString());
                        }
                    };
                }

                return row;
            }),
        }),
    ],
});
