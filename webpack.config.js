//Last Time: HtmlWebpackPlugin is outputting an html file, but where is HandlebarsPlugin outputting to? Is that even working?
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HandlebarsPlugin = require("handlebars-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: '[name].css'
});

const sourceDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'dist');

const {
    makeDataReplacements,
    registerHandlersHelpers
} = require('./webpack.helpers.js');

module.exports = {
    mode: 'development',
    entry: {
        app: path.join(sourceDir, '/index.js')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: buildDir
    },

    
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
              from: './src/assets',
              to: './assets'
            }
          ]),
        miniCssExtractPlugin,
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Generic Head Title",
            // the template you want to use
            template: path.join(sourceDir, "views", "index.hbs"),
            // the output file name
            filename: path.join(buildDir, "index.html"),
            inject: "index"
          }),
          new HandlebarsPlugin({

            // Entry path and filename(s)
            entry: path.join(sourceDir, 'views', '*.hbs'),
            // Output path and filename(s)
            output: path.join(buildDir, "[name].html"),
            partials: [
                path.join(sourceDir, "views", "*", "*.hbs")
            ]
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(buildDir),
        publicPath: '/'
    }
};

