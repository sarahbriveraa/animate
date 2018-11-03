const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  watch: true,
  entry: './docs/src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'docs/dist/')
  },
  mode: 'none',
  module: {
    rules: [{
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [/font-awesome/],
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
            outputPath: 'assets/'
          }
        }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'pages/'
          }
        }],
        exclude: path.resolve(__dirname, 'docs/src/index.html')
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/images/],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/' // where the fonts will go
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'docs/src/index.html'
    })
  ]
};