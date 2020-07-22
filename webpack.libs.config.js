/*jshint esversion: 6 */
/* globals __dirname, module, require */
'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const BASE_PATH = __dirname;
const LIB_PATH = BASE_PATH + '/lib';
const DEFAULT_CONFIG = require(path.join(__dirname, 'webpack.base.config'));

const CopyWebpackPlugin = require('copy-webpack-plugin');

let jsLibs = {
    'jquery-touch-events': '@benmajor/jquery-touch-events/src/jquery.mobile-events.js',
    'fileupload': 'blueimp-file-upload/js/jquery.fileupload.js',
    'd3': 'd3/build/d3.js',
    'element-resize-detector': 'element-resize-detector/dist/element-resize-detector.js',
    'fabric': 'fabric/dist/fabric.js',
    'garnishjs': 'garnishjs/dist/garnish.js',
    'inputmask': 'inputmask/dist/jquery.inputmask.bundle.js',
    'jquery': 'jquery/dist/jquery.js',
    'jquery.payment': 'jquery.payment/lib/jquery.payment.js',
    'iframe-resizer': 'iframe-resizer/js/iframeResizer.js',
    'iframe-resizer-cw': 'iframe-resizer/js/iframeResizer.contentWindow.js',
    'picturefill': 'picturefill/dist/picturefill.js',
    'punycode': 'punycode/punycode.js',
    'selectize': 'selectize/dist/js/standalone/selectize.js',
    'timepicker': 'timepicker/jquery.timepicker.js',
    'velocity': 'velocity-animate/velocity.js',
    'xregexp': 'xregexp/xregexp-all.js',
    'yii2-pjax': 'yii2-pjax/jquery.pjax.js',
};

let copyFiles = [
    'd3-format/locale/*.json',
    'd3-time-format/locale/*.json',
];

module.exports = merge(DEFAULT_CONFIG, {
    context: BASE_PATH + '/node_modules',
    entry: jsLibs,
    output: {
        filename: '[name]/[name].js',
        path: LIB_PATH,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: copyFiles.map(row => {
                if (typeof row === 'string') {
                    return {
                        from: row,
                        to: '.',
                    };
                }

                return row;
            }),
        }),
    ],
});
