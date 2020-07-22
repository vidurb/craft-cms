/*jshint esversion: 6 */
/* globals __dirname, module, require, process, TOP_PATH */
const webpack = require('webpack');
const merge = require('webpack-merge');
const decache = require('decache');
const BASE_CONFIG_PATH = './webpack.base.asset.config.js';
decache(BASE_CONFIG_PATH);
const BASE_PATH = module.parent.path;
const SRC_PATH = BASE_PATH + '/src';
const BASE_CONFIG = require(BASE_CONFIG_PATH);
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge(BASE_CONFIG, {
    context: SRC_PATH,
    output: {
        filename: '[name].min.js',
        path: `${BASE_PATH}/dist`
    },
    module: {
        rules: [
            {
                test: /\.vue$/i,
                use: [
                    'vue-loader',
                ]
            }
        ]
    },
    devServer: {
        port: process.env.DEV_SERVER_PORT,
        headers: {"Access-Control-Allow-Origin": "*"},

        // Fix bug caused by webpack-dev-server 3.1.11.
        // https://github.com/vuejs/vue-cli/issues/3173#issuecomment-449573901
        disableHostCheck: true,
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios'
    },
    plugins: [
        new VueLoaderPlugin(),
        new ManifestPlugin({
            publicPath: '/'
        }),
    ],
});