const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { SourceMapDevToolPlugin } = require("webpack");
const dotenv = require('dotenv')

require('dotenv').config({ path: './.env' });


module.exports = {


    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        // publicPath: '/',
        path: path.join(__dirname, '/bundle'),
        filename: 'index_bundle.js'
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3001/',
                changeOrigin: true, // Change the origin to the target's origin
                secure: false, // Allow self-signed certificates (if applicable)
            },
        }
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'assets/[hash].[ext]' },
                    },
                ],
            },
        ]

    },
    plugins: [
        // new Dotenv({ systemvars: true }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        })

    ],
    ignoreWarnings: [/Failed to parse source map/],
}