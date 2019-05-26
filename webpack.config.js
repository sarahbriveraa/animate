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
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
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
            template: path.join(__dirname, "src", "views", "index.hbs"),
            // the output file name
            filename: path.join(__dirname, "dist", "index.html"),
            inject: "index"
          }),
          new HandlebarsPlugin({

            // Entry path and filename(s)
            entry: path.join(sourceDir, 'views', '*.hbs'),
            // Output path and filename(s)
            output: path.join(buildDir, "[name].html"),
            partials: [
                path.join(sourceDir, "views", "*", "*.hbs")
            ],
            // hooks
            onBeforeSetup: Handlebars => {
                return registerHandlersHelpers(Handlebars);
            },
            onBeforeAddPartials: function (Handlebars, partialsMap) {},
            onBeforeCompile: function (Handlebars, templateContent) {},
            onBeforeRender: (Handlebars, data) => {
                return makeDataReplacements(data);
            },
            onBeforeSave: function (Handlebars, resultHtml, filename) {},
            onDone: function (Handlebars, filename) {}

        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};

