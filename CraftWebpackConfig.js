/* jshint esversion: 6 */
/* globals  require, module, process */

// Libs
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

// Plugins
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

/**
 * CraftWebpackConfig class
 */
class CraftWebpackConfig {
    constructor(options = {}) {
        this.types = [
            'base',
            'asset',
            'vue',
        ];

        // Settings
        this.basePath = module.parent.path;
        this.srcPath = this.basePath + '/src';
        this.distPath = this.basePath + '/dist';
        this.jsFilename = '[name].min.js';

        // Set options from class call
        this.type = options.type || 'asset';
        this.config = options.config || {};

        if (this.types.indexOf(this.type) === -1) {
            throw 'Type "' + this.type + '" is not a valid config type.';
        }

        return merge(this[this.type](), this.config);
    }

    /**
     * Base webpack config
     */
    base() {
        const baseConfig = {
            mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
            devtool: 'source-map',
            optimization: {
                minimize: true,
                minimizer: [
                    new TerserWebpackPlugin({
                        extractComments: false,
                        parallel: true,
                        sourceMap: true,
                        terserOptions: {
                            output: {
                                comments: false,
                            },
                        },
                        test: /\.js(\?.*)?$/i,
                    }),
                ],
            },
            resolve: {
                extensions: ['.wasm', '.mjs', '.js', '.json', '.vue'],
            },
            module: {
                rules: [
                    // Babel
                    {
                        test: /.m?js?$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    },
                ]
            },
            plugins: [
                new CleanWebpackPlugin(),
            ]
        };

        return baseConfig;
    }

    /**
     * Asset webpack config
     */
    asset() {
        const assetConfig = {
            context: this.srcPath,
            output: {
                filename: this.jsFilename,
                path: this.distPath,
            },
            module: {
                rules: [
                    {
                        test: /\.s?[ac]ss$/i,
                        use: [
                            'vue-style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'sass-loader',
                        ],
                    },
                    {
                        test: /\.(jpg|gif|png|svg)$/,
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ],
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: 'css/[name].css',
                    chunkFilename: 'css/[name].css',
                }),
            ]
        };

        return merge(this.base(), assetConfig);
    }

    /**
     * Vue webpack config
     */
    vue() {
        const vueConfig = {
            context: this.srcPath,
            output: {
                filename: this.jsFilename,
                path: this.distPath,
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
        };

        return merge(this.asset(), vueConfig);
    }
}

module.exports = CraftWebpackConfig;