const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const package_data = require("../../package.json")
module.exports = {
    mode: 'production',
    entry: path.join(__dirname, "..", "..", "src", "web", "project", 'index.js'),
    output: {
        
        filename: 'bundle.js',
        path: path.resolve(__dirname, '..', "..", 'build', 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, '.babelrc'),
                    },
                },
            },
            {
                test: /\.css$/, 
                use: [
                    'style-loader', 
                    'css-loader',   
                    'postcss-loader' 
                ]
            },
            {
                test: /\.svg/,
                type: 'asset/inline'
            }
        ],
    },
    
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "..", "..", "src", "web", "project", 'index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new webpack.DefinePlugin({
            'process.env.version': JSON.stringify(package_data.version),
        })
        
    ],
    devServer: {
        static: [
            {directory: path.join(__dirname, "..", "..", "node_modules", "@excalidraw", "excalidraw", "dist","excalidraw-assets-dev"),},
            {directory: path.join(__dirname, "..", "..", "node_modules", "@excalidraw", "excalidraw", "dist","excalidraw-assets-dev","locales"),},
            {directory: path.join(__dirname, "..", "..", "src", "web", "project", './'),},
            {directory: path.join(__dirname, "..", "..", "src", "web", "project", 'component', "file", "component", "image", "js")},
            {directory: path.join(__dirname, "..", "..", "src", "web", "project", 'component', "toolbox", "rdp", "client", "js")},
            {directory: path.join(__dirname, "..", "..", "src", "web", "meta", 'resources', "img", "./",)}
        ],
        port: 3301,
        open: false,
        
        
        
        
        
        
        
        allowedHosts: "all", 
    },
};
